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

namespace app\models\other;


use crmeb\basic\BaseModel;

class SiteStatistics extends BaseModel
{

    /**
     * @var string
     */
    protected $name = 'site_statistics';

    /**
     * @var string
     */
    protected $pk = 'id';

    /**
     * @param $query
     * @param $value
     */
    public function searchProvinceAttr($query, $value)
    {
        if ($value !== '') {
            $query->whereLike('province', '%' . $value . '%');
        }
    }

}
