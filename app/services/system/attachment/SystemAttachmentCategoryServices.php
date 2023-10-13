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
declare (strict_types=1);

namespace app\services\system\attachment;

use crmeb\basic\BaseServices;
use app\dao\system\attachment\SystemAttachmentCategoryDao;
use crmeb\exceptions\AdminException;
use crmeb\services\FormBuilder as Form;
use crmeb\utils\Arr;
use think\facade\Route as Url;

/**
 *
 * Class SystemAttachmentCategoryServices
 * @package app\services\attachment
 * @method get($id) 获取一条数据
 * @method count($where) 获取条件下数据总数
 */
class SystemAttachmentCategoryServices extends BaseServices
{

    /**
     * SystemAttachmentCategoryServices constructor.
     * @param SystemAttachmentCategoryDao $dao
     */
    public function __construct(SystemAttachmentCategoryDao $dao)
    {
        $this->dao = $dao;
    }

    /**
     * 获取分类列表
     * @param array $where
     * @return array
     */
    public function getAll(array $where)
    {
        $categoryList = $this->dao->getList($where);
        if ($where['name'] != '') {
            $pids = Arr::getUniqueKey($categoryList, 'pid');
            $parentList = $this->dao->getList(['id' => $pids]);
            $categoryList = array_merge($categoryList, $parentList);
            foreach ($categoryList as $key => $item) {
                $arr = $categoryList[$key];
                unset($categoryList[$key]);
                if (!in_array($arr, $categoryList)) {
                    $categoryList[] = $arr;
                }
            }
        }
        $list = $this->tidyMenuTier($categoryList);
        return compact('list');
    }

    /**
     * 格式化列表
     * @param $menusList
     * @param int $pid
     * @param array $navList
     * @return array
     */
    public function tidyMenuTier($menusList, $pid = 0, $navList = [])
    {
        foreach ($menusList as $k => $menu) {
            $menu['title'] = $menu['name'];
            if ($menu['pid'] == $pid) {
                unset($menusList[$k]);
                $menu['children'] = $this->tidyMenuTier($menusList, $menu['id']);
                if ($menu['children']) $menu['expand'] = true;
                $navList[] = $menu;
            }
        }
        return $navList;
    }

    /**
     * 创建新增表单
     * @return array
     * @throws \FormBuilder\Exception\FormBuilderException
     */
    public function createForm($pid)
    {
        return create_form('添加分类', $this->form(['pid' => $pid]), Url::buildUrl('/file/category'), 'POST');
    }

    /**
     * 创建编辑表单
     * @param $id
     * @return array
     * @throws \FormBuilder\Exception\FormBuilderException
     */
    public function editForm(int $id)
    {
        $info = $this->dao->get($id);
        return create_form('编辑分类', $this->form($info), Url::buildUrl('/file/category/' . $id), 'PUT');
    }

    /**
     * 生成表单参数
     * @param array $info
     * @return array
     * @throws \FormBuilder\Exception\FormBuilderException
     */
    public function form($info = [])
    {
        return [
            Form::select('pid', '上级分类', (int)($info['pid'] ?? ''))->setOptions($this->getCateList(['pid' => 0]))->filterable(1),
            Form::input('name', '分类名称', $info['name'] ?? '')->maxlength(30),
        ];
    }

    /**
     * 获取分类列表（添加修改）
     * @param array $where
     * @return mixed
     */
    public function getCateList(array $where)
    {
        $list = $this->dao->getList($where);
        $options = [['value' => 0, 'label' => '所有分类']];
        foreach ($list as $id => $cateName) {
            $options[] = ['label' => $cateName['name'], 'value' => $cateName['id']];
        }
        return $options;
    }

    /**
     * 保存新建的资源
     * @param array $data
     */
    public function save(array $data)
    {
        if ($this->dao->getOne(['name' => $data['name']])) {
            throw new AdminException('该分类已经存在');
        }
        $res = $this->dao->save($data);
        if (!$res) throw new AdminException('新增失败！');
        return $res;
    }

    /**
     * 保存修改的资源
     * @param int $id
     * @param array $data
     */
    public function update(int $id, array $data)
    {
        $attachment = $this->dao->getOne(['name' => $data['name']]);
        if ($attachment && $attachment['id'] != $id) {
            throw new AdminException('该分类已经存在');
        }
        $res = $this->dao->update($id, $data);
        if (!$res) throw new AdminException('编辑失败！');
    }

    /**
     * 删除分类
     * @param int $id
     */
    public function del(int $id)
    {
        $count = $this->dao->getCount(['pid' => $id]);
        if ($count) {
            throw new AdminException('请先删除下级分类！');
        } else {
            $res = $this->dao->delete($id);
            if (!$res) throw new AdminException('请先删除下级分类！');
        }
    }


    /**
     * 获取一条数据
     * @param $where
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getOne($where)
    {
        return $this->dao->getOne($where);
    }
}
