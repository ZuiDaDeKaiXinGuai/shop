DROP TABLE IF EXISTS `cart`;
SET character_set_client = utf8mb4;
    CREATE TABLE `cart` (
        `id` int(4) unsigned NOT NULL AUTO_INCREMENT,
        `uid` varchar(100) NULL,
        `price` int(10) NULL,
        `goods_id` varchar(255) NOT NULL,
        `sku` varchar(255) NOT NULL,
        `count` int(4) DEFAULT 1,
        `status` tinyint(4) NULL,
        `create_time` varchar(100) NULL,
        `update_time` varchar(100) NULL,
    PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

