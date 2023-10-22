<?php

use app\webscoket\Handler;
use Swoole\Table;

return [
    'http' => [
        'enable' => true,
        'host' => env('SWOOLE_HOST', '0.0.0.0'),
        'port' => env('SWOOLE_PORT', 20108),
        'worker_num' => swoole_cpu_num() * 4,
        'options'   => [
            'daemonize'             => true,//是否守护进程
            // Normally this value should be 1~4 times larger according to your cpu cores.
            'reactor_num'           => swoole_cpu_num() * 4,
            'package_max_length'    => 20 * 1024 * 1024,
            'buffer_output_size'    => 10 * 1024 * 1024,
            'socket_buffer_size'    => 128 * 1024 * 1024,
        ],
    ],
    'websocket' => [
        'enable' => true,
        'handler' => Handler::class,
        #'handler' => \think\swoole\websocket\Handler::class,
        'ping_interval' => 25000,
        'ping_timeout' => 60000,
        'room' => [
            'type'  => 'table',
            'table' => [
                'room_rows'   => 4096,
                'room_size'   => 2048,
                'client_rows' => 8192,
                'client_size' => 2048,
            ],
            'redis' => [
                'host'          => env('REDIS_HOSTNAME', 'redis'),
                'port'          => env('PORT', 6397),
                'max_active'    => 10,
                'max_wait_time' => 5,
            ],
        ],
        'listen' => [],
        'subscribe' => [],
    ],
    'rpc' => [
        'server' => [
            'enable' => false,
            'host' => '0.0.0.0',
            'port' => 9000,
            'worker_num' => swoole_cpu_num(),
            'services' => [],
        ],
        'client' => [],
    ],
    //队列
    'queue' => [
        'enable' => true,
        'workers' => [],
    ],
    'hot_update' => [
        'enable' => env('APP_DEBUG', false),
        'name' => ['*.php'],
        'include' => [app_path()],
        'exclude' => [],
    ],
    //连接池
    'pool' => [
        'db' => [
            'enable' => true,
            'max_active' => 3,
            'max_wait_time' => 5,
        ],
        'cache' => [
            'enable' => true,
            'max_active' => 3,
            'max_wait_time' => 5,
        ],
        //自定义连接池
    ],
    'ipc' => [
        'type' => 'unix_socket',
        'redis' => [
            'host' => '127.0.0.1',
            'port' => 6379,
            'max_active' => 3,
            'max_wait_time' => 5,
        ],
    ],
    // 高性能内存数据库
    'tables' => [
        'user' => [
            'size' => 2048 * 50,
            'columns' => [
                ['name' => 'fd', 'type' => Table::TYPE_INT],
                ['name' => 'type', 'size' => 1024, 'type' => Table::TYPE_STRING],
                ['name' => 'user_id', 'type' => Table::TYPE_INT],
                ['name' => 'to_user_id', 'type' => Table::TYPE_INT],
                ['name' => 'tourist', 'type' => Table::TYPE_INT],
                ['name' => 'is_open', 'type' => Table::TYPE_INT],
                ['name' => 'appid', 'size' => 1024, 'type' => Table::TYPE_STRING],
            ]
        ]
    ],
    //每个worker里需要预加载以共用的实例
    'concretes' => [],
    //重置器
    'resetters' => [],
    //每次请求前需要清空的实例
    'instances' => [],
    //每次请求前需要重新执行的服务
    'services' => [],
];