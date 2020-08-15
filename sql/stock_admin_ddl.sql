create database stock_admin character set utf8;
use stock_admin;

CREATE TABLE IF NOT EXISTS `stock_info`(
    `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '自增id',
    `stock_id` VARCHAR(64) NOT NULL COMMENT '公司编号',
    `stock_name` VARCHAR(128) NOT NULL COMMENT '公司名称',
    `rating` CHAR(1) NOT NULL COMMENT '公司评级',
    `status` tinyint(2) NOT NULL DEFAULT '0' COMMENT '0-有效 4-删除',
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY `idx_id` (`id`),
    UNIQUE KEY `idx_stock_id` (`stock_id`),
    UNIQUE KEY `idx_stock_name` (`stock_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT '公司信息表';

CREATE TABLE IF NOT EXISTS `stock_finance`(
    `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '自增id',
    `stock_id` VARCHAR(64) NOT NULL COMMENT '公司编号',
    `report_year` datetime NOT NULL COMMENT '报告时间',
    `roe` DECIMAL(10,2) NOT NULL DEFAULT '0' COMMENT '净资产收益率',
    `net_profit` DECIMAL(24,2) NOT NULL DEFAULT '0' COMMENT '净利',
    `profit_margin` DECIMAL(10,2) NOT NULL DEFAULT '0' COMMENT '净利率',
    `net_asset_per` DECIMAL(10,2) NOT NULL DEFAULT '0' COMMENT '每股资产净值',
    `core_growth` DECIMAL(10,2) NOT NULL DEFAULT '0' COMMENT '核心成长',
    `np_growth` DECIMAL(10,2) NOT NULL DEFAULT '0' COMMENT 'np成长',
    `status` tinyint(2) NOT NULL DEFAULT '0' COMMENT '0-有效 4-删除',
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY `idx_id` (`id`),
    UNIQUE KEY `idx_stock_report` (`stock_id`, `report_year`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT '公司财务表';