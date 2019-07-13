/* status:   未付款	已付款   待发货  已发货 已收货  已取消
order_status	0	 1	     2	   3 	  4	     5   */
DROP TABLE IF EXISTS `orders`;
SET character_set_client = utf8mb4;
CREATE TABLE `orders` (
`uid` int(12) zerofill NOT NULL,
`order_id` varchar(100) NOT NULL,
`store_id` varchar(100) NOT NULL,
`total_price` double(20,2) NOT NULL,
`pay_time` varchar(100) NOT NULL default '',
`ship_time` varchar(100) NOT NULL default '',
`ship_number` varchar(100) NULL,
`ship_price` double(20,2) NOT NULL,
`invoice_title` varchar(100) NULL,
`invoice_number` varchar(100) NULL,
`receiver_name` varchar(100) NOT NULL,
`receiver_address` varchar(100) NOT NULL,
`receiver_phone` char(11) NOT NULL,
`receipt_time` varchar(100) NOT NULL default '',
`status` tinyint(1) NOT NULL default 0,
`create_time` varchar(100) NOT NULL default '',
PRIMARY KEY (`order_id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `orderitems`;
SET character_set_client = utf8mb4;
CREATE TABLE `orderitems` (
`item_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`order_id` varchar(100) NOT NULL,
`goods_id` varchar(100) NOT NULL,
`goods_sku` varchar(100) NOT NULL,
`goods_price` double(20,2) NULL,
`goods_count` tinyint(4) NULL,
`create_time` varchar(100) NOT NULL,
PRIMARY KEY (`item_id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;