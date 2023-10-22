<?php

namespace app\webscoket;

use crmeb\services\CacheService;
use Swoole\WebSocket\Frame;
use think\cache\Driver;
use think\cache\TagSet;
use think\Config;
use think\Container;
use think\Event;
use think\facade\Log;
use think\Request;
use think\response\Json;
use think\swoole\contract\websocket\HandlerInterface;
use think\swoole\pool\proxy\Store;
use think\swoole\Websocket;
use think\swoole\websocket\Event as WsEvent;

class Handler implements HandlerInterface
{
    /**
     * @var Ping
     */
    protected Ping $pingService;

    /**
     * @var int
     */
    protected int $cache_timeout;

    /**
     * @var Response
     */
    protected Response $response;

    /**
     * @var Driver|TagSet
     */
    protected Driver|TagSet $cache;

    /**
     * @var Room
     */
    protected Room $nowRoom;

    /**
     * @var Websocket
     */
    protected Websocket $websocket;

    /**
     * @var Config
     */
    protected Config $config;

    const USER_TYPE = ['admin', 'user', 'kefu'];

    protected $event;

    /**
     * @param Event $event
     * @param Response $response
     * @param Ping $ping
     * @param Room $nowRoom
     */
    public function __construct(Container $container, Config $config, Websocket $websocket, Event $event)
    {
        $this->websocket = $websocket;
        $this->event = $event;
        $this->response = $container->make(Response::class);
        $this->pingService = $container->make(Ping::class);
        $this->nowRoom = $container->make(Room::class);
        $this->cache = CacheService::redisHandler();
        $this->nowRoom->setCache($this->cache);

        $this->config = $config;
        $this->cache_timeout = intval($this->config->get('swoole.websocket.ping_timeout', 60000) / 1000) + 2;
    }

    /**
     * "onOpen" listener.
     *
     * @param Request $request
     */
    public function onOpen(Request $request)
    {
        $type = $request->get('type');
        $token = $request->get('token');
        $app = $request->get('app', 0);
        if (!$token || !in_array($type, self::USER_TYPE)) {
            $this->websocket->close();
        }
        $this->nowRoom->type($type);

        $fd = $this->websocket->getSender();
        try {
            $data = $this->exec($type, 'login', [$fd, $request->get('form_type', null), ['token' => $token, 'app' => $app], $this->response])->getData();

            $uid = $data['data']['uid'] ?? 0;

            if ($uid) {
                $this->login($type, $uid, $fd);
            }

            $this->nowRoom->add($fd, $data['data']['appid'] ?? '', $uid);
            $this->pingService->createPing($fd, time(), $this->cache_timeout);
            $this->send($fd, $this->response->message('ping', ['now' => time()]));
            $this->send($fd, $this->response->success($data['data']));
            $this->event->trigger('swoole.websocket.Open', $request);
        } catch (\Exception $e) {
            $this->websocket->close();
            Log::error($e->getMessage());
        }
    }

    /**
     * "onMessage" listener.
     *
     * @param Frame $frame
     */
    public function onMessage(Frame $frame)
    {
        $this->event->trigger('swoole.websocket.Message', $frame);

        $this->event->trigger('swoole.websocket.Event', $this->decode($frame->data));
    }

    /**
     * "onClose" listener.
     */
    public function onClose()
    {
        $this->event->trigger('swoole.websocket.Close');
    }

    protected function decode($payload)
    {
        $data = json_decode($payload, true);

        return new WsEvent($data['type'] ?? null, $data['data'] ?? null);
    }

    public function encodeMessage($message)
    {
        if ($message instanceof WsEvent) {
            return json_encode([
                'type' => $message->type,
                'data' => $message->data,
            ]);
        }
        return $message;
    }

    /**
     * 执行事件调度
     * @param $type
     * @param $method
     * @param $result
     * @return null|Json
     */
    protected function exec($type, $method, $result)
    {
        if (!in_array($type, self::USER_TYPE)) {
            return null;
        }
        if (!is_array($result)) {
            return null;
        }
        /** @var Json $response */
        return $this->event->until('swoole.websocket.' . $type, [$method, $result, $this, $this->nowRoom]);
    }

    /**
     * 发送文本响应
     * @param $fd
     * @param Json $json
     * @return bool
     */
    public function send($fd, Json $json)
    {
        $this->pingService->createPing($fd, time(), $this->cache_timeout);
        return $this->pushing($fd, $json->getData());
    }

    /**
     * 发送
     * @param $fds
     * @param $data
     * @param null $exclude
     * @return bool
     */
    public function pushing($fds, $data, $exclude = null)
    {
        if ($data instanceof Json) {
            $data = $data->getData();
        }
        $data = is_array($data) ? json_encode($data) : $data;
        $fds = is_array($fds) ? $fds : [$fds];
        foreach ($fds as $fd) {
            if (!$fd) {
                continue;
            }
            if ($exclude && is_array($exclude) && !in_array($fd, $exclude)) {
                continue;
            } elseif ($exclude && $exclude == $fd) {
                continue;
            }
            try {
                $this->websocket->push($data);
            } catch (\Throwable $e) {

            }
        }
        return true;
    }

    public function login($type, $uid, $fd)
    {
        $key = '_ws_' . $type;
        $this->cache->sadd($key, $fd);
        $this->cache->sadd($key . $uid, $fd);
        $this->refresh($type, $uid);
    }

    /**
     * 刷新key
     * @param $type
     * @param $uid
     */
    public function refresh($type, $uid)
    {
        $key = '_ws_' . $type;
        $this->cache->expire($key, 1800);
        $this->cache->expire($key . $uid, 1800);
    }
}
