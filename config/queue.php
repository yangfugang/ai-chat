<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: yunwuxin <448901948@qq.com>
// +----------------------------------------------------------------------
use think\facade\Env;

return [
    'default'     => 'redis',
    'prefix'      => 'crmeb_',
    'connections' => [
        'sync'     => [
            'driver' => 'sync',
        ],
        'database' => [
            'driver' => 'database',
            'queue'  => 'default',
            'table'  => 'jobs',
        ],
        'redis'    => [
            'driver'     => 'redis',
            'queue'      => Env::get('queue.listen_name','CRMEB_CHAT'),
            'son_queue'  => Env::get('queue.listen_name_batch','BATCH-CRMEB'),
            'host'       => Env::get('redis.redis_hostname', 'redis'),
            'port'       => Env::get('redis.port', 6379),
            'password'   => Env::get('redis.redis_password'),
            'select'     => Env::get('redis.select', 2),
            'timeout'    => 0,
            'persistent' => false,
        ],
    ],
    'failed'      => [
        'type'  => 'database',
        'table' => 'failed_jobs',
    ],
];
