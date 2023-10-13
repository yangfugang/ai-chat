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

namespace app\controller\admin\chat;


use app\controller\admin\AuthController;
use app\services\ApplicationServices;
use app\services\other\QrcodeServices;

/**
 * 随机几个客服内的二维码
 * Class Qrcode
 * @package app\controller\admin\chat
 */
class Qrcode extends AuthController
{

    /**
     * Qrcode constructor.
     * @param QrcodeServices $services
     */
    public function __construct(QrcodeServices $services)
    {
        parent::__construct();
        $this->services = $services;
    }

    /**
     * @return mixed
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function index()
    {
        $where = $this->request->getMore([
            ['name', ''],
        ]);

        return $this->success($this->services->getList($where));
    }

    /**
     * 获取创建二维码表单
     * @param ApplicationServices $services
     * @param $id
     * @return mixed
     * @throws \FormBuilder\Exception\FormBuilderException
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function create(ApplicationServices $services, $id)
    {
        $appid = $services->getAppId();
        return $this->success($this->services->getForm($appid, $id));
    }

    /**
     * @param $id
     * @return mixed
     */
    public function save($id)
    {
        $data = $this->request->postMore([
            ['name', ''],
            ['user_ids', []],
            ['sort', 0]
        ]);

        $this->services->saveQrcode($data, $id);

        return $this->success($id ? '修改成功' : '保存成功');
    }

    /**
     * @param $id
     * @return mixed
     */
    public function delete($id)
    {
        if (!$id) {
            return $this->fail('缺少参数');
        }
        if ($this->services->delete($id)) {
            return $this->success('删除成功');
        } else {
            return $this->success('删除失败');
        }
    }
}
