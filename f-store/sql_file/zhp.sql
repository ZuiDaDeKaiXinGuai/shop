-- MySQL dump 10.13  Distrib 8.0.15, for osx10.14 (x86_64)
--
-- Host: localhost    Database: zhp
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `goods`
--

DROP TABLE IF EXISTS `goods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8 ;
CREATE TABLE `goods` (
  `serial_number` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `goods_id` varchar(255) NOT NULL DEFAULT '',
  `store_id` varchar(255) NOT NULL DEFAULT '',
  `goods_name` varchar(255) NOT NULL DEFAULT '',
  `cat` varchar(255) DEFAULT NULL,
  `cat_id` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `price` int(11) NOT NULL DEFAULT '0',
  `market_price` int(11) DEFAULT NULL,
  `cost_price` int(11) NOT NULL DEFAULT '0',
  `code_bar` varchar(255) DEFAULT NULL,
  `sold_count` int(11) DEFAULT 0,
  `image` varchar(255) DEFAULT NULL,
  `cart_image` varchar(255) DEFAULT NULL,
  `type` int(11) DEFAULT '0',
  `sku` varchar(255) DEFAULT NULL,
  `detail` varchar(255) DEFAULT NULL,
  `create_time` varchar(255) DEFAULT NULL,
  `update_time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`goods_id`),
  KEY `serial_number` (`serial_number`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goods`
--

LOCK TABLES `goods` WRITE;
/*!40000 ALTER TABLE `goods` DISABLE KEYS */;
INSERT INTO `goods` VALUES (0000000001,'qhm2xf-lkn8ic-5s5gmq-r0amps','1e01685654c1cb5672e896c58f011dbf','菠菜','蔬菜','8217c3fdb19242d7fd86f558d1872b48',1,20,40,12,'123',0,'asdfgh','zxc',0,'','又名波斯菜、赤根菜、鹦鹉菜等，属藜科菠菜属，一年生草本植物。植物高可达1米，根圆锥状，带红色，较少为白色，叶戟形至卵形，鲜绿色，全缘或','1555654263172',NULL),(0000000002,'tekfxi-klgld-k8o8cl-h10lmk','500b78c66434db93f3e186bdecbb42c3','菠菜','蔬菜','8217c3fdb19242d7fd86f558d1872b48',1,20,40,12,'123',0,'asdfgh','zxc',0,'','又名波斯菜、赤根菜、鹦鹉菜等，属藜科菠菜属，一年生草本植物。植物高可达1米，根圆锥状，带红色，较少为白色，叶戟形至卵形，鲜绿色，全缘或','1555654317490',NULL),(0000000003,'rmqubm-7x7fb-ifdmdm-9970xq','1e01685654c1cb5672e896c58f011dbf','T恤','服装','8217c3fdb19242d7fd86f558d1872b48',1,20,40,12,'123',0,'asdfgh','zxc',0,'','又名波斯菜、赤根菜、鹦鹉菜等，属藜科菠菜属，一年生草本植物。植物高可达1米，根圆锥状，带红色，较少为白色，叶戟形至卵形，鲜绿色，全缘或','1555664998854',NULL),(0000000004,'qx17fc-zkd16g-flpwjt-59ymr','1e01685654c1cb5672e896c58f011dbf','西服','服装','8217c3fdb19242d7fd86f558d1872b48',1,20,40,12,'123',0,'asdfgh','zxc',0,'','又名波斯菜、赤根菜、鹦鹉菜等，属藜科菠菜属，一年生草本植物。植物高可达1米，根圆锥状，带红色，较少为白色，叶戟形至卵形，鲜绿色，全缘或','1555665012112',NULL),(0000000005,'ddp9la-a9dm-beybx-6k6f2k','1e01685654c1cb5672e896c58f011dbf','西服','服装','8217c3fdb19242d7fd86f558d1872b48',0,20,40,12,'123',0,'asdfgh','zxc',0,'','利郎男装','1555665027203',NULL),(0000000006,'cqa8yl-9eaxpm-ey3n7b-sunxtr','b677754d0282970d81e285ef6297100d','菠菜','蔬菜','8217c3fdb19242d7fd86f558d1872b48',1,20,40,12,'123',0,'asdfgh','zxc',0,'','又名波斯菜、赤根菜、鹦鹉菜等，属藜科菠菜属，一年生草本植物。植物高可达1米，根圆锥状，带红色，较少为白色，叶戟形至卵形，鲜绿色，全缘或','1555674781550',NULL),(0000000007,'7ef62a-76u78x-wsbb6m-ttm7gr','b677754d0282970d81e285ef6297100d','白菜','蔬菜','8217c3fdb19242d7fd86f558d1872b48',1,20,40,12,'123',0,'asdfgh','zxc',0,'','又名波斯菜、赤根菜、鹦鹉菜等，属藜科菠菜属，一年生草本植物。植物高可达1米，根圆锥状，带红色，较少为白色，叶戟形至卵形，鲜绿色，全缘或','1555674795820',NULL),(0000000008,'h6p1wm-jyu14-5u4g1q-41zgii','b677754d0282970d81e285ef6297100d','油麦菜','蔬菜','8217c3fdb19242d7fd86f558d1872b48',1,20,40,12,'123',0,'asdfgh','zxc',0,'','又名波斯菜、赤根菜、鹦鹉菜等，属藜科菠菜属，一年生草本植物。植物高可达1米，根圆锥状，带红色，较少为白色，叶戟形至卵形，鲜绿色，全缘或','1555674801121',NULL),(0000000009,'g2bwz8-h2uytq-7xnzg-ln25b','b677754d0282970d81e285ef6297100d','胡萝卜','蔬菜','8217c3fdb19242d7fd86f558d1872b48',1,20,40,12,'123',0,'asdfgh','zxc',0,'','又名波斯菜、赤根菜、鹦鹉菜等，属藜科菠菜属，一年生草本植物。植物高可达1米，根圆锥状，带红色，较少为白色，叶戟形至卵形，鲜绿色，全缘或','1555674807753',NULL);
/*!40000 ALTER TABLE `goods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `indexstyle`
--

DROP TABLE IF EXISTS `indexstyle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8 ;
CREATE TABLE `indexstyle` (
  `indexstyle_id` int(11) NOT NULL AUTO_INCREMENT,
  `indexstyle_text` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`indexstyle_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `indexstyle`
--

LOCK TABLES `indexstyle` WRITE;
/*!40000 ALTER TABLE `indexstyle` DISABLE KEYS */;
INSERT INTO `indexstyle` VALUES (1,'单列图文'),(2,'双列图文');
/*!40000 ALTER TABLE `indexstyle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shop_catagory`
--

DROP TABLE IF EXISTS `shop_catagory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8 ;
CREATE TABLE `shop_catagory` (
  `cat_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cat_name` varchar(255) DEFAULT NULL,
  `sub_cat_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`cat_id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shop_catagory`
--

LOCK TABLES `shop_catagory` WRITE;
/*!40000 ALTER TABLE `shop_catagory` DISABLE KEYS */;
INSERT INTO `shop_catagory` VALUES (1,'美食','中餐,火锅,烧烤,其他美食,汤/粥/煲/砂锅/炖菜,快餐,休闲食品,小吃,【休闲茶饮】,烘焙糕点'),(2,'休闲娱乐','棋牌休闲,中医养生,足疗按摩,洗浴/桑拿会所,网吧网咖,游乐游艺,图书馆,密室,桌面游戏,真人CS'),(3,'超市便利店','超市,个人护理,便利店'),(4,'美发/美容/美甲','美甲/手护,SPA/美容/美体,美容美发,美容美甲,美发美甲,美发'),(5,'【K歌】','【KTV】'),(6,'运动健身','篮球场,卡丁赛车,舞蹈,网球场,乒乓球馆,游泳馆,羽毛球馆,桌球馆,瑜伽,足球场,武术场馆,溜冰场,保龄球馆,壁球场,排球场,高尔夫球场,体育场馆,健身中心'),(7,'结婚','婚庆公司,婚礼策划,婚纱礼服'),(8,'宠物','宠物店,宠物医院'),(9,'摄影','婚纱摄影,儿童摄影,孕妇摄影,艺术写真,跟拍,证件照'),(10,'亲子','亲子游乐,亲子游泳,科普场馆,亲子DIY,早教中心,幼儿外语,幼儿才艺'),(11,'洗衣','洗衣家纺,洗鞋,奢侈品养护'),(12,'购物','书店,本地购物,烟酒（只开酒）,当地特色/保健品,服装饰品'),(13,'生活服务','家具家装,通讯,其他,鲜花'),(14,'教育培训','职业技术培训'),(15,'商圈综合体','机场,火车站,购物中心,百货'),(16,'航旅','景区,客栈,汽车站,酒店,旅行社');
/*!40000 ALTER TABLE `shop_catagory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sku_cat`
--

DROP TABLE IF EXISTS `sku_cat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8 ;
CREATE TABLE `sku_cat` (
  `cat_code` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cat_id` varchar(255) DEFAULT NULL,
  `cat_name` varchar(255) NOT NULL DEFAULT '',
  `sku_json_tpl` varchar(255) DEFAULT NULL,
  `store_id` varchar(255) NOT NULL DEFAULT '',
  `create_time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`cat_code`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sku_cat`
--

LOCK TABLES `sku_cat` WRITE;
/*!40000 ALTER TABLE `sku_cat` DISABLE KEYS */;
/*!40000 ALTER TABLE `sku_cat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store`
--

DROP TABLE IF EXISTS `store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8 ;
CREATE TABLE IF NOT EXISTS `store` (
  `store_id` varchar(255) NOT NULL DEFAULT '',
  `uid` varchar(255) DEFAULT NULL,
  `store_name` varchar(255) DEFAULT NULL,
  `brand_name` varchar(255) DEFAULT NULL,
  `idcard_number` varchar(255) DEFAULT NULL,
  `catagory` varchar(255) DEFAULT NULL,
  `sub_catagory` varchar(255) DEFAULT NULL,
  `business_time` varchar(255) DEFAULT NULL,
  `indexstyle_id` int(255) DEFAULT NULL,
  `delivery_fee` int(255) DEFAULT 0,
  `logo` varchar(255) DEFAULT NULL,
  `contact_number` varchar(255) DEFAULT NULL,
  `main_image` varchar(255) DEFAULT NULL,
  `banner` varchar(255) DEFAULT NULL,
  `create_time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`store_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store`
--

LOCK TABLES `store` WRITE;
/*!40000 ALTER TABLE `store` DISABLE KEYS */;
INSERT INTO `store` VALUES ('b677754d0282970d81e285ef6297100d','asdascxv123asd','五谷粥坊','谷苗稻香','ec57e5bd7f7a14b6b57cc6e88d5aaa39a652d607641622b003442a46716f7d92','服装','童装,女装,鞋','周一-周五 09:00-20:00,周六-周日 10:00-22:00',1,20,NULL,'13612344321,021-12336754','1T8Pp00AT7eo9NoAJkMR3AAAACMAAQEC',NULL,NULL),('500b78c66434db93f3e186bdecbb42c3','asdascxv123asd','蘑菇房',NULL,'ec57e5bd7f7a14b6b57cc6e88d5aaa39a652d607641622b003442a46716f7d92','服装','童装,女装,鞋',NULL,NULL,0,NULL,NULL,NULL,NULL,NULL),('7fd2189e7e33562e060f58e0b88035cf','asdascxv123asd','蘑菇房',NULL,'ec57e5bd7f7a14b6b57cc6e88d5aaa39a652d607641622b003442a46716f7d92','服装','童装,女装,鞋',NULL,1,0,NULL,NULL,NULL,NULL,NULL),('e4064050723fae33f71fe5b2de432c3b','asdascxv123asd','蘑菇房',NULL,'ec57e5bd7f7a14b6b57cc6e88d5aaa39a652d607641622b003442a46716f7d92','服装','童装,女装,鞋',NULL,1,0,NULL,NULL,NULL,NULL,'1555724808065');
/*!40000 ALTER TABLE `store` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-04-21 16:11:31
