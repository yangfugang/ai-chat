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


use app\services\other\CategoryServices;
use crmeb\services\FormBuilder;
use FormBuilder\Exception\FormBuilderException;
use think\exception\ValidateException;

/**
 * 话术分类
 * Class ChatServiceSpeechcraftCateServices
 * @package app\services\chat
 */
class ChatServiceSpeechcraftCateServices extends CategoryServices
{
    /**
     * 获取分类表单
     * @param array $data
     * @return mixed
     */
    public function serviceSpeechcraftCateForm(array $data = [])
    {
        $f[] = FormBuilder::input('name', '分类名称', $data['name'] ?? '')->required();
        $f[] = FormBuilder::number('sort', '排序', (int)($data['sort'] ?? 0));
        return $f;
    }

    /**
     * 获取创建表单
     * @return array
     * @throws FormBuilderException
     */
    public function createForm()
    {
        return create_form('添加分类', $this->serviceSpeechcraftCateForm(), $this->url('chat/speechcraftcate'), 'POST');
    }

    /**
     * 获取编辑表单
     * @param int $id
     * @return array
     * @throws FormBuilderException
     */
    public function editForm(int $id)
    {
        $cateInfo = $this->dao->get($id);
        if (!$cateInfo) {
            throw new ValidateException('分类没有查询到');
        }
        return create_form('修改分类', $this->serviceSpeechcraftCateForm($cateInfo->toArray()), $this->url('chat/speechcraftcate/' . $id), 'PUT');
    }
}
