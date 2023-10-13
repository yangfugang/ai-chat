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

namespace app\services\chat;


use app\dao\chat\ChatServiceDao;
use app\services\ApplicationServices;
use app\services\other\QrcodeServices;
use crmeb\basic\BaseServices;
use crmeb\exceptions\AdminException;
use crmeb\services\FormBuilder;
use crmeb\services\SwooleTaskService;
use FormBuilder\Exception\FormBuilderException;
use Psr\SimpleCache\InvalidArgumentException;
use PullWord\PullWord;
use Swoole\Timer;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\Exception;
use think\exception\ValidateException;
use think\App;
use think\facade\Log;
use app\openai\OpenAi;

/**
 * Class ChatServiceServices
 * @package app\services\chat
 * @mixin ChatServiceDao
 */
class ChatServiceServices extends BaseServices
{

    /**
     * 创建form表单
     * @var FormBuilder
     */
    protected $builder;

    /**
     * ChatServiceServices constructor.
     * @param ChatServiceDao $dao
     * @param FormBuilder $builder
     */
    public function __construct(ChatServiceDao $dao, FormBuilder $builder)
    {
        $this->dao = $dao;
        $this->builder = $builder;
    }

    /**
     * 获取客服列表
     * @param array $where
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getServiceList(array $where)
    {
        [$page, $limit] = $this->getPageValue();
        $list = $this->dao->getServiceList($where, $page, $limit);
        $count = $this->dao->count($where);
        return compact('list', 'count');
    }

    /**
     * 创建客服表单
     * @param array $formData
     * @return mixed
     * @throws FormBuilderException
     */
    public function createServiceForm(array $formData = [])
    {
        /** @var ChatServiceGroupServices $seervice */
        $seervice = app()->make(ChatServiceGroupServices::class);
        $field[] = $this->builder->select('group_id', '请选择分组', $formData['group_id'] ?? 0)->options($seervice->getOptions());
        $field[] = $this->builder->frameImage('avatar', '客服头像', $this->url('admin/widget.images/index', ['fodder' => 'avatar'], true), $formData['avatar'] ?? '')->icon('ios-add')->width('950px')->height('420px');
        $field[] = $this->builder->input('nickname', '客服名称', $formData['nickname'] ?? '')->col(24)->required();
        $field[] = $this->builder->input('phone', '手机号码', $formData['phone'] ?? '')->col(24)->required();
        if ($formData) {
            $field[] = $this->builder->input('account', '登录账号', $formData['account'] ?? '')->col(24)->required();
            $field[] = $this->builder->input('password', '登录密码')->type('password')->col(24);
            $field[] = $this->builder->input('true_password', '确认密码')->type('password')->col(24);
        } else {
            $field[] = $this->builder->input('account', '登录账号')->col(24)->required();
            $field[] = $this->builder->input('password', '登录密码')->type('password')->col(24)->required();
            $field[] = $this->builder->input('true_password', '确认密码')->type('password')->col(24)->required();
        }
        $field[] = $this->builder->textarea('welcome_words', '欢迎语', $formData['welcome_words'] ?? '');
        $field[] = $this->builder->switches('auto_reply', '自动回复', (int)($formData['auto_reply'] ?? 0))->falseValue(0)->trueValue(1)->openStr('打开')->closeStr('关闭')->size('large');
        $field[] = $this->builder->switches('status', '客服状态', (int)($formData['status'] ?? 0))->falseValue(0)->trueValue(1)->openStr('打开')->closeStr('关闭')->size('large');
        return $field;
    }

    /**
     * 创建客服获取表单
     * @return array
     * @throws FormBuilderException
     */
    public function create()
    {
        return create_form('添加客服', $this->createServiceForm(), $this->url('/chat/kefu'), 'POST');
    }

    /**
     * 编辑获取表单
     * @param int $id
     * @return array
     * @throws FormBuilderException
     */
    public function edit(int $id)
    {
        $serviceInfo = $this->dao->get($id);
        if (!$serviceInfo) {
            throw new AdminException('数据不存在!');
        }
        return create_form('编辑客服', $this->createServiceForm($serviceInfo->toArray()), $this->url('/chat/kefu/' . $id), 'PUT');
    }

    /**
     * 获取某人的聊天记录用户列表
     * @param int $uid
     * @return array|array[]
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getChatUser(int $userId)
    {
        /** @var ChatServiceDialogueRecordServices $serviceLog */
        $serviceLog = app()->make(ChatServiceDialogueRecordServices::class);
        /** @var ChatUserServices $serviceUser */
        $serviceUser = app()->make(ChatUserServices::class);
        $userIds = $serviceLog->getChatUserIds($userId);
        if (!$userIds) {
            return [];
        }
        return $serviceUser->getUserList(['ids' => $userIds], 'nickname,uid,avatar as headimgurl');
    }

    /**
     * 检查用户是否是客服
     * @param array $where
     * @return bool
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function checkoutIsService(array $where)
    {
        return $this->dao->count($where) ? true : false;
    }

    /**
     * 查询聊天记录和获取客服uid
     * @param string $appId APPID
     * @param array $user
     * @param int $idTo 上翻页id
     * @param int $limit 展示条数
     * @param int $toUserId 客服id
     * @param int $cookieUid
     * @param int $kefuId
     * @param int $kefuRand
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     * @throws InvalidArgumentException
     */
    public function getRecord(string $appId, array $user, int $idTo, int $limit = 10, int $toUserId = 0, int $cookieUid = 0, int $kefuId = 0, int $kefuRand = 0)
    {
        $uid = $user['uid'] ?? 0;
        /** @var ChatUserServices $userServices */
        $userServices = app()->make(ChatUserServices::class);
        //查找用户,没用自动生成游客
        $userInfo = $userServices->get(['uid' => $uid, 'appid' => $appId]);
        if (!$uid || !$userInfo) {
            /** @var ApplicationServices $appService */
            $appService = app()->make(ApplicationServices::class);
            $userInfo = $appService->createUser($appId, $user);
            $uid = $userInfo['uid'];
            $userId = $userInfo['id'];
        } else {
            $userId = $userInfo->id;
            $save = false;
            if (isset($user['nickname']) && $user['nickname'] && $user['nickname'] != $userInfo->nickname) {
                $save = true;
                $userInfo->nickname = $user['nickname'];
            }
            if (isset($user['avatar']) && $user['avatar'] && $user['avatar'] != $userInfo->avatar) {
                $save = true;
                $userInfo->nickname = $user['avatar'];
            }
            if ($save) {
                $userInfo->save();
            }
            $userInfo = $userInfo->toArray();
        }
        //获取当前分配客服
        $toUserId = $this->dao->count(['appid' => $appId, 'status' => 1, 'user_id' => $toUserId]) ? $toUserId : 0;
        if (!$toUserId && $kefuId) {
            $toUserId = $this->dao->value(['appid' => $appId, 'status' => 1, 'id' => $kefuId], 'user_id');
        }
        //随机客服
        if (!$toUserId && $kefuRand) {
            /** @var QrcodeServices $qrcodeService */
            $qrcodeService = app()->make(QrcodeServices::class);
            $userIds = $qrcodeService->value($kefuRand, 'user_ids');
            $userIds = is_array($userIds) ? $userIds : json_decode($userIds, true);
            mt_srand();
            $toUserId = $userIds[array_rand($userIds)] ?? 0;
        }
        //是否为自动分配的客服
        if ($toUserId) {
            //查找当前用户有没有被转接,转接了使用转接人的to_user_id
            /** @var ChatServiceAuxiliaryServices $transfeerService */
            $transfeerService = app()->make(ChatServiceAuxiliaryServices::class);
            $relationId = $transfeerService->value(['appid' => $appId, 'binding_id' => $userId], 'relation_id');
            if ($relationId) {
                //转接客服不在线继续随机分配
                $toUserId = $this->dao->count(['appid' => $appId, 'online' => 1, 'status' => 1, 'user_id' => $relationId]) ? $relationId : 0;
            }
        }
        //对话人不再,重新查找
        if (!$toUserId) {
            //查找当前在线客服
            $serviceInfoList = $this->getServiceList(['appid' => $appId, 'status' => 1, 'online' => 1]);
            if (!count($serviceInfoList)) {
                throw new ValidateException('暂无客服人员在线，请稍后联系');
            }
            $uids = array_column($serviceInfoList['list'], 'user_id');
            if (!$uids) {
                throw new ValidateException('暂无客服人员在线，请稍后联系');
            }
            /** @var ChatServiceRecordServices $recordServices */
            $recordServices = app()->make(ChatServiceRecordServices::class);
            //上次聊天客服优先对话
            $toUserId = $recordServices->getLatelyMsgUid(['appid' => $appId, 'to_user_id' => $userId], 'user_id');
            //如果上次聊天的客不在当前客服中从新
            if (!in_array($toUserId, $uids)) {
                $toUserId = 0;
            }
            if (!$toUserId) {
                mt_srand();
                $toUserId = $uids[array_rand($uids)] ?? 0;
            }
            if (!$toUserId) {
                throw new ValidateException('暂无客服人员在线，请稍后联系');
            }
        }
        //组合数据
        $toUserInfo = $this->dao->get(['user_id' => $toUserId], ['nickname', 'avatar']);
        /** @var ChatServiceDialogueRecordServices $logServices */
        $logServices = app()->make(ChatServiceDialogueRecordServices::class);
        $result = [
            'serviceList' => [],
            'to_user_id' => $toUserId,
            'is_tourist' => $userInfo['is_tourist'],
            'uid' => $uid,
            'user_id' => $userId,
            'site_name' => sys_config('site_name'),
            'nickname' => $userInfo['nickname'],
            'avatar' => $userInfo['avatar'],
            'to_user_nickname' => $toUserInfo['nickname'],
            'to_user_avatar' => $toUserInfo['avatar']
        ];
        //查找聊天记录
        $serviceLogList = $logServices->getServiceChatList(['appid' => $appId, 'to_user_id' => $userId], $limit, $idTo);
        $result['serviceList'] = array_reverse($logServices->tidyChat($serviceLogList));
        $result['welcome'] = $idTo ? false : $this->welcomeWordsV2($appId, $toUserId, $userId);

        return $result;
    }

    /**
     * 自动回复
     * @param string $appId
     * @param int $userId
     * @param int $toUserId
     * @param string $msg
     * @param int $msntype
     * @param array $other
     * @return array|bool
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function autoReply(App $app, string $appId, int $userId, int $toUserId, string $msg, int $msntype, array $other)
    {
        $this->dao->setApp($app);

        $data = [
            'add_time' => time(),
            'appid' => $appId,
            'user_id' => $userId,
            'to_user_id' => $toUserId,
            'msn_type' => $msntype,
            'type' => 1,
            'is_send' => 1
        ];
        if (in_array($msntype, [5, 6])) {
            $data['other'] = json_encode($other);
        } else {
            $data['other'] = '';
        }
        if (!$msg) {
            return false;
        }
        $data['msn'] = '';

        // 读取聊天记录
        $userService = app()->make(ChatUserServices::class);
        $userInfo = $userService->getUserInfo($toUserId, ['uid', 'nickname', 'appid']);
        $user = [
            'uid' => $userInfo->uid,
            'avatar' => $userInfo->avatar,
            'nickname' => $userInfo->nickname
        ];
        $records = $this->getRecord($appId, $user, 0, 20);
        $logs = array_reverse($records['serviceList']);
        // 调用ChatGPT实现自动回复
        try {
            // Define messages
            $messages = [
                [
                    'role' => 'system',
                    'content' => sys_config('gpt_prompt')
                ],
            ];
            // 加载聊天记录
            foreach ($logs as $log) {
                if($log['msn'] == '正在查询相关资料，请稍候...') continue;
                $strings = array_column($messages, 'content');
                $contents = implode(',', $strings);
                if(mb_strlen($contents) > 4096) {
                    break;
                }
                $line = [
                    'role' => $log['to_user_id'] == $toUserId ? 'assistant' : 'user',
                    'content' => $log['msn']
                ];
                $messages[] = $line;
            }
            // 加载自动回复，作为上下文
            $authReplyService = $app->make(ChatAutoReplyServices::class);
            $reply = $authReplyService->setApp($app)->getReplyList(['appid' => $appId, 'user_id' => $userId]);
            foreach ($reply as $item) {
                $strings = array_column($messages, 'content');
                $contents = implode(',', $strings);
                if(mb_strlen($contents) > 4096) {
                    break;
                }
                $anwser = [
                    'role' => 'assistant',
                    'content' => $item['content']
                ];
                $question = [
                    'role' => 'user',
                    'content' => $item['keyword']
                ];
                array_unshift($messages, $anwser);
                array_unshift($messages, $question);
            }

            $messages[] = [
                'role' => 'user',
                'content' => $msg
            ];
            // Define data
            $gpt_model_key = sys_config('gpt_model');
            switch ($gpt_model_key) {
                case 1:
                    $gpt_model = 'gpt-4';
                    break;
                case 2:
                    $gpt_model = 'gpt-3.5-turbo';
                    break;
            }
            $params = [
                'model' => $gpt_model,
                'messages' => $messages,
                'max_tokens' => 4000,
                'temperature' => 0.8
            ];

            $open_ai_key = sys_config('openai_api_key');
            $org_code = sys_config('org_code');
            $open_ai = new OpenAi($open_ai_key);
            $open_ai->setORG($org_code);
            #$open_ai->setProxy('http://192.168.2.240:7890');

            $back = $open_ai->chat($params);
            $result = json_decode($back);
            if(!isset($result->choices)) {
                throw new Exception($result->error->message);
            }
            $data['msn'] = $result->choices[0]->message->content;
        } catch (\Exception $e) {
            Log::error($e->getMessage());
        }

        /** @var ChatServiceDialogueRecordServices $logServices */
        $logServices = $app->make(ChatServiceDialogueRecordServices::class);
        $data = $logServices->setApp($app)->save($data);
        $data = $data->toArray();
        $data['_add_time'] = $data['add_time'];
        $data['add_time'] = strtotime($data['add_time']);

        /** @var ChatUserServices $userService */
        $userService = $app->make(ChatUserServices::class);
        $_userInfo = $userService->setApp($app)->getUserInfo($data['user_id'], ['nickname', 'avatar', 'is_tourist']);
        $isTourist = $_userInfo['is_tourist'];
        $data['nickname'] = $_userInfo['nickname'] ?? '';
        $data['avatar'] = $_userInfo['avatar'] ?? '';

        //用户向客服发送消息，判断当前客服是否在登录中
        /** @var ChatServiceRecordServices $serviceRecored */
        $serviceRecored = $app->make(ChatServiceRecordServices::class);
        $unMessagesCount = $logServices->setApp($app)->getMessageNum(['user_id' => $userId, 'to_user_id' => $toUserId, 'type' => 0]);
        //记录当前用户和他人聊天记录
        $data['recored'] = $serviceRecored->setApp($app)->saveRecord(
            $appId,
            $userId,
            $toUserId,
            $msg,
            $formType ?? 0,
            $msntype,
            $unMessagesCount,
            (int)$isTourist,
            $data['nickname'],
            $data['avatar'],
            0
        );

        #SwooleTaskService::kefu()->type('chat_auth')->to($params['to_user_id'])->data([$normalData, $data])->push();
        return $data;
    }

    /**
     * 欢迎语
     * @param string $appId
     * @param int $userId
     * @param int $toUserId
     * @return array|bool
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function welcomeWords(App $app, string $appId, int $userId, int $toUserId, array $userInfo)
    {
        $this->dao->setApp($app);
        /** @var ChatServiceDialogueRecordServices $logServices */
        $logServices = $app->make(ChatServiceDialogueRecordServices::class);
        $unMessagesCount = $logServices->setApp($app)->chatCount($appId, $toUserId);
        /** @var ChatServiceDialogueRecordServices $logServices */
        $logServices = $app->make(ChatServiceDialogueRecordServices::class)->setApp($app);
        $msg = $this->dao->value(['user_id' => $userId, 'appid' => $appId], 'welcome_words');
        /** @var ChatUserServices $userService */
        $userService = $app->make(ChatUserServices::class)->setApp($app);
        /** @var ChatServiceRecordServices $serviceRecored */
        $serviceRecored = $app->make(ChatServiceRecordServices::class)->setApp($app);
        if (!$unMessagesCount && $msg) {
            $data = [
                'add_time' => time(),
                'appid' => $appId,
                'user_id' => $userId,
                'to_user_id' => $toUserId,
                'msn_type' => 1,
                'type' => 1,
                'is_send' => 1
            ];
            $data['other'] = '';
            $data['msn'] = $msg;
            $data = $logServices->save($data);
            $data = $data->toArray();
            $data['_add_time'] = $data['add_time'];
            $data['add_time'] = strtotime($data['add_time']);
            $_userInfo = $userService->setApp($app)->getUserInfo($data['user_id'], ['nickname', 'avatar', 'is_tourist', 'type']);
            $isTourist = $_userInfo['is_tourist'];
            $data['nickname'] = $_userInfo['nickname'] ?? '';
            $data['avatar'] = $_userInfo['avatar'] ?? '';
            $formType = $_userInfo['type'] ?? 0;
            $unMessagesCount = $logServices->setApp($app)->getMessageNum(['user_id' => $userId, 'to_user_id' => $toUserId, 'type' => 0]);
            //记录当前用户和他人聊天记录
            $online = $this->dao->value(['appid' => $appId, 'user_id' => $toUserId], 'online');
            $data['recored'] = $serviceRecored->setApp($app)->saveRecord(
                $appId,
                $userId,
                $toUserId,
                $msg,
                (int)$formType,
                1,
                $unMessagesCount,
                (int)$isTourist,
                $data['nickname'],
                $data['avatar'],
                $online ?: 0
            );
            //回复给用户
            SwooleTaskService::user($app)->type('reply')->to($toUserId)->data($data)->push();
        }
        //回复给客服
    }

    /**
     * 欢迎语
     * @param string $appId
     * @param int $userId
     * @param int $toUserId
     * @return array|bool
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function welcomeWordsV2(string $appId, int $userId, int $toUserId)
    {
        /** @var ChatServiceDialogueRecordServices $logServices */
        $logServices = app()->make(ChatServiceDialogueRecordServices::class);
        $unMessagesCount = $logServices->chatCount($appId, $toUserId);
        $msg = $this->dao->value(['user_id' => $userId, 'appid' => $appId], 'welcome_words');
        /** @var ChatUserServices $userService */
        $userService = app()->make(ChatUserServices::class);
        /** @var ChatServiceRecordServices $serviceRecored */
        $serviceRecored = app()->make(ChatServiceRecordServices::class);
        if (!$unMessagesCount && $msg) {
            $data = [
                'add_time' => time(),
                'appid' => $appId,
                'user_id' => $userId,
                'to_user_id' => $toUserId,
                'msn_type' => 1,
                'type' => 1,
                'is_send' => 1
            ];
            $data['other'] = '';
            $data['msn'] = $msg;
            $data = $logServices->save($data);
            $data = $data->toArray();
            $data['_add_time'] = $data['add_time'];
            $data['add_time'] = strtotime($data['add_time']);
            $_userInfo = $userService->getUserInfo($data['user_id'], ['nickname', 'avatar', 'is_tourist', 'type']);
            $isTourist = $_userInfo['is_tourist'];
            $data['nickname'] = $_userInfo['nickname'] ?? '';
            $data['avatar'] = $_userInfo['avatar'] ?? '';
            $formType = $_userInfo['type'] ?? 0;
            $unMessagesCount = $logServices->getMessageNum(['user_id' => $userId, 'to_user_id' => $toUserId, 'type' => 0]);
            //记录当前用户和他人聊天记录
            $online = $this->dao->value(['appid' => $appId, 'user_id' => $toUserId], 'online');
            $data['recored'] = $serviceRecored->saveRecord(
                $appId,
                $userId,
                $toUserId,
                $msg,
                (int)$formType,
                1,
                $unMessagesCount,
                (int)$isTourist,
                $data['nickname'],
                $data['avatar'],
                $online ?: 0
            );
            //回复给用户
            return $data;
        } else {
            return false;
        }
    }

    /**
     * 提醒用户等候
     * @param string $appId
     * @param int $userId
     * @param int $toUserId
     * @return array|bool
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function waitingMessage(string $appId, int $userId, int $toUserId)
    {
        /** @var ChatServiceDialogueRecordServices $logServices */
        $logServices = app()->make(ChatServiceDialogueRecordServices::class);
        $msg = '正在查询相关资料，请稍候...';
        /** @var ChatUserServices $userService */
        $userService = app()->make(ChatUserServices::class);
        /** @var ChatServiceRecordServices $serviceRecored */
        $serviceRecored = app()->make(ChatServiceRecordServices::class);
        if ($msg) {
            $data = [
                'add_time' => time(),
                'appid' => $appId,
                'user_id' => $userId,
                'to_user_id' => $toUserId,
                'msn_type' => 1,
                'type' => 1,
                'is_send' => 1
            ];
            $data['other'] = '';
            $data['msn'] = $msg;
            $data = $logServices->save($data);
            $data = $data->toArray();
            $data['_add_time'] = $data['add_time'];
            $data['add_time'] = strtotime($data['add_time']);
            $_userInfo = $userService->getUserInfo($data['user_id'], ['nickname', 'avatar', 'is_tourist', 'type']);
            $isTourist = $_userInfo['is_tourist'];
            $data['nickname'] = $_userInfo['nickname'] ?? '';
            $data['avatar'] = $_userInfo['avatar'] ?? '';
            $formType = $_userInfo['type'] ?? 0;
            $unMessagesCount = $logServices->getMessageNum(['user_id' => $userId, 'to_user_id' => $toUserId, 'type' => 0]);
            //记录当前用户和他人聊天记录
            $online = $this->dao->value(['appid' => $appId, 'user_id' => $toUserId], 'online');
            $data['recored'] = $serviceRecored->saveRecord(
                $appId,
                $userId,
                $toUserId,
                $msg,
                (int)$formType,
                2,
                $unMessagesCount,
                (int)$isTourist,
                $data['nickname'],
                $data['avatar'],
                $online ?: 0
            );
            //回复给用户
            return $data;
        } else {
            return false;
        }
    }

    public function createGUID() {
        if (function_exists('com_create_guid') === true)
        {
            return trim(com_create_guid(), '{}');
        }
        return sprintf('%04X%04X-%04X-%04X-%04X-%04X%04X%04X', mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(16384, 20479), mt_rand(32768, 49151), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535));
    }
}
