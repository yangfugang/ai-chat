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

namespace app\dao\chat\user;


use app\models\chat\user\ChatUserLabelAssist;
use crmeb\basic\BaseDao;

/**
 * Class ChatUserLabelAssistDao
 * @package app\dao\chat\user
 */
class ChatUserLabelAssistDao extends BaseDao
{

    /**
     * 获取当前模型
     * @return string
     */
    protected function setModel(): string
    {
        return ChatUserLabelAssist::class;
    }

    public function setUserLabel()
    {

    }
}
