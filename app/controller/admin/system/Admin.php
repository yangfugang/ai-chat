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
namespace app\controller\admin\system;

use app\controller\admin\AuthController;
use app\services\system\admin\SystemAdminServices;
use app\validate\system\SystemAdminValidata;
use crmeb\services\CacheService;
use think\facade\{Config};

/**
 * Class SystemAdmin
 * @package app\controller\admin\system
 */
class Admin extends AuthController
{
    /**
     * SystemAdmin constructor.
     * @param SystemAdminServices $services
     */
    public function __construct(SystemAdminServices $services)
    {
        parent::__construct();
        $this->services = $services;
    }

    /**
     * 显示管理员资源列表
     *
     * @return \think\Response
     */
    public function index()
    {
        $where          = $this->request->getMore([
            ['name', '', '', 'account_like'],
            ['roles', ''],
            ['is_del', 1],
            ['status', '']
        ]);
        $where['level'] = $this->adminInfo['level'] + 1;
        return $this->success($this->services->getAdminList($where));
    }

    /**
     * 创建表单
     * @return mixed
     */
    public function create()
    {
        return $this->success($this->services->createForm($this->adminInfo['level'] + 1));
    }

    /**
     * 保存管理员
     * @return mixed
     */
    public function save()
    {
        $data = $this->request->postMore([
            ['account', ''],
            ['conf_pwd', ''],
            ['pwd', ''],
            ['real_name', ''],
            ['roles', []],
            ['status', 0],
        ]);

        $this->validate($data, SystemAdminValidata::class);

        $data['level'] = $this->adminInfo['level'] + 1;
        $this->services->create($data);
        return $this->success('添加成功');
    }

    /**
     * 显示编辑资源表单页.
     *
     * @param int $id
     * @return \think\Response
     */
    public function edit($id)
    {
        if (!$id) {
            return $this->fail('管理员信息读取失败');
        }

        return $this->success($this->services->updateForm($this->adminInfo['level'] + 1, (int)$id));
    }

    /**
     * 修改管理员信息
     * @param $id
     * @return mixed
     */
    public function update($id)
    {
        $data = $this->request->postMore([
            ['account', ''],
            ['conf_pwd', ''],
            ['pwd', ''],
            ['real_name', ''],
            ['roles', []],
            ['status', 0],
        ]);

        $this->validate($data, SystemAdminValidata::class, 'update');

        if ($this->services->save((int)$id, $data)) {
            return $this->success('修改成功');
        } else {
            return $this->fail('修改失败');
        }
    }

    /**
     * 删除管理员
     * @param $id
     * @return mixed
     */
    public function delete($id)
    {
        if (!$id) return $this->fail('删除失败，缺少参数');
        if ($this->services->update((int)$id, ['is_del' => 1, 'status' => 0]))
            return $this->success('删除成功！');
        else
            return $this->fail('删除失败');
    }

    /**
     * 修改状态
     * @param $id
     * @param $status
     * @return mixed
     */
    public function set_status($id, $status)
    {
        $this->services->update((int)$id, ['status' => $status]);
        return $this->success($status == 0 ? '关闭成功' : '开启成功');
    }

    /**
     * 获取当前登陆管理员的信息
     * @return mixed
     */
    public function info()
    {
        return $this->success($this->adminInfo);
    }

    /**
     * 修改当前登陆admin信息
     * @return mixed
     */
    public function update_admin()
    {
        $data = $this->request->postMore([
            ['real_name', ''],
            ['head_pic', ''],
            ['pwd', ''],
            ['new_pwd', ''],
            ['conf_pwd', ''],
        ]);
        if (!preg_match('/^(?![^a-zA-Z]+$)(?!\D+$).{6,}$/', $data['new_pwd'])) {
            return $this->fail('设置的密码过于简单(不小于六位包含数字字母)');
        }
        if ($this->services->updateAdmin($this->adminId, $data))
            return $this->success('修改成功');
        else
            return $this->fail('修改失败');
    }

    /**
     * 退出登陆
     * @return mixed
     */
    public function logout()
    {
        $key = trim(ltrim($this->request->header(Config::get('cookie.token_name')), 'Bearer'));
        CacheService::redisHandler()->delete($key);
        return $this->success();
    }
}
