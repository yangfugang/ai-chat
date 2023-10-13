<?php

// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2020 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------


namespace crmeb\listeners;

use app\services\chat\ChatServiceServices;
use app\webscoket\Manager;
use crmeb\interfaces\ListenerInterface;
use crmeb\services\SwooleTaskService;
use Swoole\Server;
use Swoole\Server\Task;
use think\facade\Log;

class SwooleTaskListen implements ListenerInterface
{
    /**
     * @var Task
     */
    protected $task;

    public function handle($task): void
    {
        $this->task = $task;
        if (method_exists($this, $task->data['type'])) {
            $this->{$task->data['type']}($task->data['data']);
        } else {
            Log::error('任务执行失败,' . $task->data['type'] . '方法不存在');
        }
//        异步事件执行回调
//        $task->finish($task->data);
        return;
    }

    public function message(array $data)
    {
        /** @var Server $server */
        $server = app()->make(Server::class);
        $userId = is_array($data['user_id']) ? $data['user_id'] : [$data['user_id']];
        $except = $data['except'] ?? [];
        if (!count($userId) && $data['type'] != 'user') {
            $fds = Manager::userFd(0);
            foreach ($fds as $fd) {
                if (!in_array($fd, $except) && $server->isEstablished($fd))
                    $server->push((int)$fd, json_encode($data['data']));
            }
        } else {
            foreach ($userId as $id) {
                $fds = Manager::userFd($data['type'], $id);
                foreach ($fds as $fd) {
                    if (!in_array($fd, $except) && $server->isEstablished($fd))
                        $server->push((int)$fd, json_encode($data['data']));
                }
            }
        }
    }

    //在这里执行自动回复操作
    public function autoReply(array $data) {
        $services = app()->make(ChatServiceServices::class);

        $params = $data['data']['data'];
        $except = $data['except'] ?? [];

        // 获取自动回复的内容
        $autoReplyData = $services->autoReply(app(), $params['appid'], $params['to_user_id'], $params['user_id'], $params['msn'], $params['msn_type'], (array)$params['other']);
        $autoReplyData['guid'] = $services->createGUID();

        $server = app()->make(Server::class);
        $fds = Manager::userFd('user', $autoReplyData['to_user_id']);
        foreach ($fds as $fd) {
            if (!in_array($fd, $except) && $server->isEstablished($fd))
                $server->push((int)$fd, json_encode(['type' => 'reply', 'data' => $autoReplyData]));
        }
    }
}
