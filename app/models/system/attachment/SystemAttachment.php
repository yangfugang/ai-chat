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

namespace app\models\system\attachment;

use crmeb\basic\BaseModel;
use crmeb\traits\ModelTrait;
use think\Model;

/**
 * 附件管理模型
 * Class SystemAttachment
 * @package app\models\system\attachment
 */
class SystemAttachment extends BaseModel
{
    use ModelTrait;

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'att_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'system_attachment';

    /**
     * 图片类型搜索器
     * @param Model $query
     * @param $value
     */
    public function searchModuleTypeAttr($query, $value)
    {
        $query->where('module_type', $value ?: 1);
    }

    /**
     * pid搜索器
     * @param Model $query
     * @param $value
     */
    public function searchPidAttr($query, $value)
    {
        if ($value) $query->where('pid', $value);
    }

    /**
     * name模糊搜索
     * @param Model $query
     * @param $value
     */
    public function searchLikeNameAttr($query, $value)
    {
        if ($value) $query->where('name','LIKE' ,"$value%");
    }
}
