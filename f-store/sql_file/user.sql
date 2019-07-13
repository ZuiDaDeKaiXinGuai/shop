
DROP TABLE IF EXISTS `buyer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `buyer` (
    `uid` int(12) unsigned zerofill NOT NULL AUTO_INCREMENT,
   `buyer_name` VARCHAR(100) NOT NULL,
   `buyer_pwd` VARCHAR(100) NOT NULL,
   `nickname` VARCHAR(100),
   `portrait` VARCHAR(100),
   `gender` VARCHAR(10),
   `phone_number` char(11),
   `create_date` VARCHAR(100) NOT NULL,
   `store_collect` VARCHAR(255) default '',
   `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0，1',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `seller`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `seller` (
   `sid` varchar(50) NOT NULL,
   `seller_name` VARCHAR(100) NOT NULL unique,
   `seller_pwd` VARCHAR(100) NOT NULL,
   `portrait` VARCHAR(100),
   `gender` VARCHAR(10),
   `phone_number` VARCHAR(11) unique,
   `create_date` DATETIME,
   `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0，1',
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;