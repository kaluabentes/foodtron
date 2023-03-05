-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: aws-sa-east-1.connect.psdb.cloud    Database: comet
-- ------------------------------------------------------
-- Server version	8.0.23-PlanetScale

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '3c504def-80ae-11ed-8045-e651dbccf1d3:1-460,
5084926a-7e85-11ed-bce8-e28faf840a68:1-342,
bec56fe2-ae59-11ed-8cba-7aacd5ceb1b0:1-644,
dbc9f7dc-983e-11ed-a0c2-a22bffc62d9b:1-642';

--
-- Table structure for table `Account`
--

DROP TABLE IF EXISTS `Account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Account` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `provider` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `providerAccountId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `refresh_token` text COLLATE utf8mb4_unicode_ci,
  `access_token` text COLLATE utf8mb4_unicode_ci,
  `expires_at` int DEFAULT NULL,
  `token_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scope` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_token` text COLLATE utf8mb4_unicode_ci,
  `session_state` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Account_provider_providerAccountId_key` (`provider`,`providerAccountId`),
  KEY `Account_userId_idx` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Account`
--

LOCK TABLES `Account` WRITE;
/*!40000 ALTER TABLE `Account` DISABLE KEYS */;
/*!40000 ALTER TABLE `Account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Category`
--

DROP TABLE IF EXISTS `Category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Category` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `storeId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Category_storeId_idx` (`storeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Category`
--

LOCK TABLES `Category` WRITE;
/*!40000 ALTER TABLE `Category` DISABLE KEYS */;
INSERT INTO `Category` VALUES ('cleqkvs66000xihb2r3gys5z1','Hamburguers','cleqia6480000ihb2rkfajda9'),('cleqkvx25000zihb2ltcu37zj','Bebidas','cleqia6480000ihb2rkfajda9');
/*!40000 ALTER TABLE `Category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Option`
--

DROP TABLE IF EXISTS `Option`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Option` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(65,30) DEFAULT NULL,
  `optionGroupId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Option_optionGroupId_idx` (`optionGroupId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Option`
--

LOCK TABLES `Option` WRITE;
/*!40000 ALTER TABLE `Option` DISABLE KEYS */;
INSERT INTO `Option` VALUES ('cleql3d0y0012ihb2gb1wb7uz','Barbecue',4.500000000000000000000000000000,'cleql3d0y0011ihb298bjie3w'),('cleql3d0y0013ihb2cebamvv3','Chipotle',4.500000000000000000000000000000,'cleql3d0y0011ihb298bjie3w'),('cleql3d0y0014ihb2oag9vf60','Mostarda e mel',4.500000000000000000000000000000,'cleql3d0y0011ihb298bjie3w'),('cleql3vh00019ihb21dxug2lc','Coca-cola',4.500000000000000000000000000000,'cleql3vh00018ihb2r6n640ep'),('cleql3vh0001aihb27jlgtpue','Fanta',4.500000000000000000000000000000,'cleql3vh00018ihb2r6n640ep');
/*!40000 ALTER TABLE `Option` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OptionGroup`
--

DROP TABLE IF EXISTS `OptionGroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OptionGroup` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `required` tinyint(1) NOT NULL,
  `maxOption` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `maxOptionRequired` tinyint(1) NOT NULL DEFAULT '0',
  `storeId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `OptionGroup_storeId_idx` (`storeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OptionGroup`
--

LOCK TABLES `OptionGroup` WRITE;
/*!40000 ALTER TABLE `OptionGroup` DISABLE KEYS */;
INSERT INTO `OptionGroup` VALUES ('cleql3d0y0011ihb298bjie3w','Molhos',1,'5',1,'cleqia6480000ihb2rkfajda9'),('cleql3vh00018ihb2r6n640ep','Bebidas',0,'1',0,'cleqia6480000ihb2rkfajda9');
/*!40000 ALTER TABLE `OptionGroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Order`
--

DROP TABLE IF EXISTS `Order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Order` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tax` decimal(65,30) NOT NULL,
  `paymentMethod` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `change` decimal(65,30) DEFAULT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `storeId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Order_storeId_idx` (`storeId`),
  KEY `Order_userId_idx` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Order`
--

LOCK TABLES `Order` WRITE;
/*!40000 ALTER TABLE `Order` DISABLE KEYS */;
INSERT INTO `Order` VALUES ('cles85iei00rjihap4p6lg2lu',20.000000000000000000000000000000,'Dinheiro',100.000000000000000000000000000000,'Rua Abel Botelho, 273, Flores','cancelled','Kaluã Bentes','92981467183','2023-03-03 07:39:05.707','2023-03-04 03:09:39.796','cleqia6480000ihb2rkfajda9',NULL),('cles8f7er00shihapqwmx4l3g',20.000000000000000000000000000000,'Dinheiro',100.000000000000000000000000000000,'Rua Abel Botelho, 273, Flores','cancelled','Kaluã Bentes','92981467183','2023-03-03 07:46:38.019','2023-03-04 03:00:42.253','cleqia6480000ihb2rkfajda9',NULL),('cles8x9os00tfihapjrzniwb4',20.000000000000000000000000000000,'Dinheiro',100.000000000000000000000000000000,'Rua Abel Botelho, 273, Flores','cancelled','Kaluã Bentes','92981467183','2023-03-03 08:00:40.781','2023-03-04 03:09:06.398','cleqia6480000ihb2rkfajda9',NULL),('cles917vc00ucihapzlt77tsi',20.000000000000000000000000000000,'Dinheiro',100.000000000000000000000000000000,'Rua Abel Botelho, 273, Flores','done','Kaluã Bentes','92981467183','2023-03-03 08:03:45.049','2023-03-04 01:32:24.708','cleqia6480000ihb2rkfajda9',NULL),('clet738zl0000ih3v40bhgfy0',20.000000000000000000000000000000,'Dinheiro',100.000000000000000000000000000000,'Rua Abel Botelho, 273, Flores','done','Kaluã Bentes','92981467183','2023-03-03 23:57:06.753','2023-03-04 01:16:26.633','cleqia6480000ihb2rkfajda9',NULL),('clet75til000xih3vcghphcn0',20.000000000000000000000000000000,'Dinheiro',100.000000000000000000000000000000,'Rua Abel Botelho, 273, Flores','done','Kaluã Bentes','92981467183','2023-03-03 23:59:06.669','2023-03-04 02:46:45.288','cleqia6480000ihb2rkfajda9',NULL),('clet773yt001vih3vkds0ipz6',20.000000000000000000000000000000,'Dinheiro',100.000000000000000000000000000000,'Rua Abel Botelho, 273, Flores','done','Kaluã Bentes','92981467183','2023-03-04 00:00:06.870','2023-03-04 01:16:21.571','cleqia6480000ihb2rkfajda9',NULL),('clete3ozh002tih3vorsvclk4',20.000000000000000000000000000000,'Dinheiro',100.000000000000000000000000000000,'Rua Abel Botelho, 273, Flores','done','Kaluã Bentes','92981467183','2023-03-04 03:13:24.797','2023-03-04 03:15:09.529','cleqia6480000ihb2rkfajda9',NULL),('cletejqeq003qih3vuhba06b7',20.000000000000000000000000000000,'Dinheiro',100.000000000000000000000000000000,'Rua Abel Botelho, 273, Flores','pending','Kaluã Bentes','92981467183','2023-03-04 03:25:53.138','2023-03-04 03:25:53.138','cleqia6480000ihb2rkfajda9',NULL);
/*!40000 ALTER TABLE `Order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OrderProduct`
--

DROP TABLE IF EXISTS `OrderProduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OrderProduct` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(65,30) NOT NULL,
  `quantity` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `observation` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `orderId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `OrderProduct_orderId_idx` (`orderId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrderProduct`
--

LOCK TABLES `OrderProduct` WRITE;
/*!40000 ALTER TABLE `OrderProduct` DISABLE KEYS */;
INSERT INTO `OrderProduct` VALUES ('cles85iei00rkihapi836ocki','X-Egg',29.500000000000000000000000000000,'1','https://res.cloudinary.com/optimus-media/image/upload/v1677730012/far8t1chhlmyk9jst941.jpg','','cles85iei00rjihap4p6lg2lu'),('cles85iej00rpihapl8wn8apc','X-Bacon',29.500000000000000000000000000000,'1','https://res.cloudinary.com/optimus-media/image/upload/v1677730034/q2cbmp1iurjfyxiypv72.jpg','','cles85iei00rjihap4p6lg2lu'),('cles85iej00ruihapgwr8oi3z','Coca-cola',4.500000000000000000000000000000,'1','https://res.cloudinary.com/optimus-media/image/upload/v1677730084/uakvuusgsqn6nv3hv1st.jpg','','cles85iei00rjihap4p6lg2lu'),('cles85iej00rvihap9b7oy7xr','Fanta',4.500000000000000000000000000000,'1','https://res.cloudinary.com/optimus-media/image/upload/v1677730109/benrfuqiciitpda21xsk.jpg','','cles85iei00rjihap4p6lg2lu'),('cles8f7er00siihap1q8h6j7p','X-Egg',29.500000000000000000000000000000,'1','https://res.cloudinary.com/optimus-media/image/upload/v1677730012/far8t1chhlmyk9jst941.jpg','','cles8f7er00shihapqwmx4l3g'),('cles8f7er00snihapabq85j5u','X-Bacon',29.500000000000000000000000000000,'1','https://res.cloudinary.com/optimus-media/image/upload/v1677730034/q2cbmp1iurjfyxiypv72.jpg','','cles8f7er00shihapqwmx4l3g'),('cles8f7er00ssihap7e9mzjgo','Coca-cola',4.500000000000000000000000000000,'1','https://res.cloudinary.com/optimus-media/image/upload/v1677730084/uakvuusgsqn6nv3hv1st.jpg','','cles8f7er00shihapqwmx4l3g'),('cles8f7er00stihap5etfkjt5','Fanta',4.500000000000000000000000000000,'1','https://res.cloudinary.com/optimus-media/image/upload/v1677730109/benrfuqiciitpda21xsk.jpg','','cles8f7er00shihapqwmx4l3g'),('cles8x9os00tgihaps8uhlwlv','X-Egg',29.500000000000000000000000000000,'1','https://res.cloudinary.com/optimus-media/image/upload/v1677730012/far8t1chhlmyk9jst941.jpg','','cles8x9os00tfihapjrzniwb4'),('cles8x9os00tlihaplb7xtxio','X-Bacon',29.500000000000000000000000000000,'1','https://res.cloudinary.com/optimus-media/image/upload/v1677730034/q2cbmp1iurjfyxiypv72.jpg','','cles8x9os00tfihapjrzniwb4'),('cles8x9os00tqihapy7jkdp9w','Coca-cola',4.500000000000000000000000000000,'1','https://res.cloudinary.com/optimus-media/image/upload/v1677730084/uakvuusgsqn6nv3hv1st.jpg','','cles8x9os00tfihapjrzniwb4'),('cles8x9os00trihapwuk517on','Fanta',4.500000000000000000000000000000,'1','https://res.cloudinary.com/optimus-media/image/upload/v1677730109/benrfuqiciitpda21xsk.jpg','','cles8x9os00tfihapjrzniwb4'),('cles917vd00udihaptc5if4e5','X-Egg',29.500000000000000000000000000000,'1','https://res.cloudinary.com/optimus-media/image/upload/v1677730012/far8t1chhlmyk9jst941.jpg','','cles917vc00ucihapzlt77tsi'),('cles917vd00uiihapgiedklyf','X-Bacon',29.500000000000000000000000000000,'1','https://res.cloudinary.com/optimus-media/image/upload/v1677730034/q2cbmp1iurjfyxiypv72.jpg','','cles917vc00ucihapzlt77tsi'),('cles917vd00unihapdcvav10c','Coca-cola',4.500000000000000000000000000000,'1','https://res.cloudinary.com/optimus-media/image/upload/v1677730084/uakvuusgsqn6nv3hv1st.jpg','','cles917vc00ucihapzlt77tsi'),('cles917vd00uoihapwxsbr0p5','Fanta',4.500000000000000000000000000000,'1','https://res.cloudinary.com/optimus-media/image/upload/v1677730109/benrfuqiciitpda21xsk.jpg','','cles917vc00ucihapzlt77tsi'),('clet738zl0001ih3vwjrjjgci','X-Egg',29.500000000000000000000000000000,'1','https://res.cloudinary.com/optimus-media/image/upload/v1677730012/far8t1chhlmyk9jst941.jpg','','clet738zl0000ih3v40bhgfy0'),('clet738zl0006ih3vlatwaiwj','X-Bacon',29.500000000000000000000000000000,'1','https://res.cloudinary.com/optimus-media/image/upload/v1677730034/q2cbmp1iurjfyxiypv72.jpg','','clet738zl0000ih3v40bhgfy0'),('clet738zl000bih3v8tuzerlw','Coca-cola',4.500000000000000000000000000000,'1','https://res.cloudinary.com/optimus-media/image/upload/v1677730084/uakvuusgsqn6nv3hv1st.jpg','','clet738zl0000ih3v40bhgfy0'),('clet738zl000cih3v0v1691fv','Fanta',4.500000000000000000000000000000,'1','https://res.cloudinary.com/optimus-media/image/upload/v1677730109/benrfuqiciitpda21xsk.jpg','','clet738zl0000ih3v40bhgfy0'),('clet75til000yih3vsgmo1qjc','X-Egg',29.500000000000000000000000000000,'1','https://res.cloudinary.com/optimus-media/image/upload/v1677730012/far8t1chhlmyk9jst941.jpg','','clet75til000xih3vcghphcn0'),('clet75til0013ih3v7bi4i7m4','X-Bacon',29.500000000000000000000000000000,'1','https://res.cloudinary.com/optimus-media/image/upload/v1677730034/q2cbmp1iurjfyxiypv72.jpg','','clet75til000xih3vcghphcn0'),('clet75til0018ih3vj432q6wr','Coca-cola',4.500000000000000000000000000000,'1','https://res.cloudinary.com/optimus-media/image/upload/v1677730084/uakvuusgsqn6nv3hv1st.jpg','','clet75til000xih3vcghphcn0'),('clet75til0019ih3vy1g7k3gq','Fanta',4.500000000000000000000000000000,'1','https://res.cloudinary.com/optimus-media/image/upload/v1677730109/benrfuqiciitpda21xsk.jpg','','clet75til000xih3vcghphcn0'),('clet773yt001wih3v8kakcmtb','X-Egg',29.500000000000000000000000000000,'1','https://res.cloudinary.com/optimus-media/image/upload/v1677730012/far8t1chhlmyk9jst941.jpg','','clet773yt001vih3vkds0ipz6'),('clet773yt0021ih3vlw4oa5bq','X-Bacon',29.500000000000000000000000000000,'1','https://res.cloudinary.com/optimus-media/image/upload/v1677730034/q2cbmp1iurjfyxiypv72.jpg','','clet773yt001vih3vkds0ipz6'),('clet773yu0026ih3vw57vwx3x','Coca-cola',4.500000000000000000000000000000,'1','https://res.cloudinary.com/optimus-media/image/upload/v1677730084/uakvuusgsqn6nv3hv1st.jpg','','clet773yt001vih3vkds0ipz6'),('clet773yu0027ih3voy6h95jd','Fanta',4.500000000000000000000000000000,'1','https://res.cloudinary.com/optimus-media/image/upload/v1677730109/benrfuqiciitpda21xsk.jpg','','clet773yt001vih3vkds0ipz6'),('clete3ozh002uih3vu51vkkj0','X-Egg',29.500000000000000000000000000000,'1','https://res.cloudinary.com/optimus-media/image/upload/v1677730012/far8t1chhlmyk9jst941.jpg','','clete3ozh002tih3vorsvclk4'),('clete3ozh002zih3vf6bf1gyf','X-Bacon',29.500000000000000000000000000000,'1','https://res.cloudinary.com/optimus-media/image/upload/v1677730034/q2cbmp1iurjfyxiypv72.jpg','','clete3ozh002tih3vorsvclk4'),('clete3ozh0034ih3vhh1q4hny','Coca-cola',4.500000000000000000000000000000,'1','https://res.cloudinary.com/optimus-media/image/upload/v1677730084/uakvuusgsqn6nv3hv1st.jpg','','clete3ozh002tih3vorsvclk4'),('clete3ozh0035ih3vw7l4p533','Fanta',4.500000000000000000000000000000,'1','https://res.cloudinary.com/optimus-media/image/upload/v1677730109/benrfuqiciitpda21xsk.jpg','','clete3ozh002tih3vorsvclk4'),('cletejqeq003rih3v31err8qd','X-Egg',29.500000000000000000000000000000,'1','https://res.cloudinary.com/optimus-media/image/upload/v1677730012/far8t1chhlmyk9jst941.jpg','','cletejqeq003qih3vuhba06b7'),('cletejqeq003wih3v6zba8r3r','X-Bacon',29.500000000000000000000000000000,'1','https://res.cloudinary.com/optimus-media/image/upload/v1677730034/q2cbmp1iurjfyxiypv72.jpg','','cletejqeq003qih3vuhba06b7'),('cletejqeq0041ih3vpik1gqtk','Coca-cola',4.500000000000000000000000000000,'1','https://res.cloudinary.com/optimus-media/image/upload/v1677730084/uakvuusgsqn6nv3hv1st.jpg','','cletejqeq003qih3vuhba06b7'),('cletejqeq0042ih3vzjxn81as','Fanta',4.500000000000000000000000000000,'1','https://res.cloudinary.com/optimus-media/image/upload/v1677730109/benrfuqiciitpda21xsk.jpg','','cletejqeq003qih3vuhba06b7');
/*!40000 ALTER TABLE `OrderProduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OrderProductOption`
--

DROP TABLE IF EXISTS `OrderProductOption`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OrderProductOption` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(65,30) DEFAULT NULL,
  `orderProductId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `OrderProductOption_orderProductId_idx` (`orderProductId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrderProductOption`
--

LOCK TABLES `OrderProductOption` WRITE;
/*!40000 ALTER TABLE `OrderProductOption` DISABLE KEYS */;
INSERT INTO `OrderProductOption` VALUES ('cles85iei00rlihapk3rgkb8k','Barbecue',3,4.500000000000000000000000000000,'cles85iei00rkihapi836ocki'),('cles85iei00rmihapgycj9y7f','Chipotle',2,4.500000000000000000000000000000,'cles85iei00rkihapi836ocki'),('cles85iej00rqihap7otccs4n','Coca-cola',1,4.500000000000000000000000000000,'cles85iej00rpihapl8wn8apc'),('cles85iej00rrihapykvemde0','Barbecue',5,4.500000000000000000000000000000,'cles85iej00rpihapl8wn8apc'),('cles85iej00rwihapqeunjm4j','Barbecue',5,4.500000000000000000000000000000,'cles85iej00rvihap9b7oy7xr'),('cles85iej00rxihapndlm53e5','Coca-cola',1,4.500000000000000000000000000000,'cles85iej00rvihap9b7oy7xr'),('cles8f7er00sjihapq3mcoo4j','Barbecue',3,4.500000000000000000000000000000,'cles8f7er00siihap1q8h6j7p'),('cles8f7er00skihap3z7j2wde','Chipotle',2,4.500000000000000000000000000000,'cles8f7er00siihap1q8h6j7p'),('cles8f7er00soihap7ps58haw','Coca-cola',1,4.500000000000000000000000000000,'cles8f7er00snihapabq85j5u'),('cles8f7er00spihapci3jvh5o','Barbecue',5,4.500000000000000000000000000000,'cles8f7er00snihapabq85j5u'),('cles8f7er00suihapg5slwc4e','Barbecue',5,4.500000000000000000000000000000,'cles8f7er00stihap5etfkjt5'),('cles8f7er00svihap6q8yt4b0','Coca-cola',1,4.500000000000000000000000000000,'cles8f7er00stihap5etfkjt5'),('cles8x9os00thihapdgs9lsku','Barbecue',3,4.500000000000000000000000000000,'cles8x9os00tgihaps8uhlwlv'),('cles8x9os00tiihap77m7tvn9','Chipotle',2,4.500000000000000000000000000000,'cles8x9os00tgihaps8uhlwlv'),('cles8x9os00tmihap852xxxzu','Coca-cola',1,4.500000000000000000000000000000,'cles8x9os00tlihaplb7xtxio'),('cles8x9os00tnihapo9b8qcme','Barbecue',5,4.500000000000000000000000000000,'cles8x9os00tlihaplb7xtxio'),('cles8x9os00tsihap4h7w15ef','Barbecue',5,4.500000000000000000000000000000,'cles8x9os00trihapwuk517on'),('cles8x9os00ttihapx27aj9in','Coca-cola',1,4.500000000000000000000000000000,'cles8x9os00trihapwuk517on'),('cles917vd00ueihapknwl0jwt','Barbecue',3,4.500000000000000000000000000000,'cles917vd00udihaptc5if4e5'),('cles917vd00ufihapqm8lcx56','Chipotle',2,4.500000000000000000000000000000,'cles917vd00udihaptc5if4e5'),('cles917vd00ujihapfbd210ez','Coca-cola',1,4.500000000000000000000000000000,'cles917vd00uiihapgiedklyf'),('cles917vd00ukihapxqdzlgis','Barbecue',5,4.500000000000000000000000000000,'cles917vd00uiihapgiedklyf'),('cles917vd00upihapmzni44xh','Barbecue',5,4.500000000000000000000000000000,'cles917vd00uoihapwxsbr0p5'),('cles917vd00uqihapjsy3fsv8','Coca-cola',1,4.500000000000000000000000000000,'cles917vd00uoihapwxsbr0p5'),('clet738zl0002ih3vde3gxr6y','Barbecue',3,4.500000000000000000000000000000,'clet738zl0001ih3vwjrjjgci'),('clet738zl0003ih3vep5brzvn','Chipotle',2,4.500000000000000000000000000000,'clet738zl0001ih3vwjrjjgci'),('clet738zl0007ih3vrhefr7x9','Coca-cola',1,4.500000000000000000000000000000,'clet738zl0006ih3vlatwaiwj'),('clet738zl0008ih3vnv8crofb','Barbecue',5,4.500000000000000000000000000000,'clet738zl0006ih3vlatwaiwj'),('clet738zl000dih3v3gpryyng','Barbecue',5,4.500000000000000000000000000000,'clet738zl000cih3v0v1691fv'),('clet738zl000eih3vpc1tjeri','Coca-cola',1,4.500000000000000000000000000000,'clet738zl000cih3v0v1691fv'),('clet75til000zih3vrmbhdg5y','Barbecue',3,4.500000000000000000000000000000,'clet75til000yih3vsgmo1qjc'),('clet75til0010ih3vo72oy2ab','Chipotle',2,4.500000000000000000000000000000,'clet75til000yih3vsgmo1qjc'),('clet75til0014ih3vsi497b1e','Coca-cola',1,4.500000000000000000000000000000,'clet75til0013ih3v7bi4i7m4'),('clet75til0015ih3v38l904nf','Barbecue',5,4.500000000000000000000000000000,'clet75til0013ih3v7bi4i7m4'),('clet75til001aih3v9xbmbrj6','Barbecue',5,4.500000000000000000000000000000,'clet75til0019ih3vy1g7k3gq'),('clet75til001bih3vh7o15a8j','Coca-cola',1,4.500000000000000000000000000000,'clet75til0019ih3vy1g7k3gq'),('clet773yt001xih3v0qx85ne0','Barbecue',3,4.500000000000000000000000000000,'clet773yt001wih3v8kakcmtb'),('clet773yt001yih3vn2v6iaad','Chipotle',2,4.500000000000000000000000000000,'clet773yt001wih3v8kakcmtb'),('clet773yt0022ih3v2dw4s9je','Coca-cola',1,4.500000000000000000000000000000,'clet773yt0021ih3vlw4oa5bq'),('clet773yt0023ih3vgtlw9dwc','Barbecue',5,4.500000000000000000000000000000,'clet773yt0021ih3vlw4oa5bq'),('clet773yu0028ih3vqubchrky','Barbecue',5,4.500000000000000000000000000000,'clet773yu0027ih3voy6h95jd'),('clet773yu0029ih3vzc9km4wk','Coca-cola',1,4.500000000000000000000000000000,'clet773yu0027ih3voy6h95jd'),('clete3ozh002vih3v58gs5qfa','Barbecue',3,4.500000000000000000000000000000,'clete3ozh002uih3vu51vkkj0'),('clete3ozh002wih3v6o1j9k5o','Chipotle',2,4.500000000000000000000000000000,'clete3ozh002uih3vu51vkkj0'),('clete3ozh0030ih3vp7374nt8','Coca-cola',1,4.500000000000000000000000000000,'clete3ozh002zih3vf6bf1gyf'),('clete3ozh0031ih3v3enyaocd','Barbecue',5,4.500000000000000000000000000000,'clete3ozh002zih3vf6bf1gyf'),('clete3ozh0036ih3vo7p94s7u','Barbecue',5,4.500000000000000000000000000000,'clete3ozh0035ih3vw7l4p533'),('clete3ozh0037ih3vmi5e7byf','Coca-cola',1,4.500000000000000000000000000000,'clete3ozh0035ih3vw7l4p533'),('cletejqeq003sih3vb8j0n6nj','Barbecue',3,4.500000000000000000000000000000,'cletejqeq003rih3v31err8qd'),('cletejqeq003tih3vkba1aykj','Chipotle',2,4.500000000000000000000000000000,'cletejqeq003rih3v31err8qd'),('cletejqeq003xih3vytm4ltrt','Coca-cola',1,4.500000000000000000000000000000,'cletejqeq003wih3v6zba8r3r'),('cletejqeq003yih3vyjz2ftd6','Barbecue',5,4.500000000000000000000000000000,'cletejqeq003wih3v6zba8r3r'),('cletejqeq0043ih3vus6mbvmw','Barbecue',5,4.500000000000000000000000000000,'cletejqeq0042ih3vzjxn81as'),('cletejqeq0044ih3v3d99yyz3','Coca-cola',1,4.500000000000000000000000000000,'cletejqeq0042ih3vzjxn81as');
/*!40000 ALTER TABLE `OrderProductOption` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Product`
--

DROP TABLE IF EXISTS `Product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Product` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(65,30) NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `storeId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoryId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Product_storeId_idx` (`storeId`),
  KEY `Product_categoryId_idx` (`categoryId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Product`
--

LOCK TABLES `Product` WRITE;
/*!40000 ALTER TABLE `Product` DISABLE KEYS */;
INSERT INTO `Product` VALUES ('cleql4vmj001dihb2vykkmqyj','X-Egg','Hamburguer de carne bovina, pão australiano, bacon, queijo cheddar, salada e molho especial',29.500000000000000000000000000000,'https://res.cloudinary.com/optimus-media/image/upload/v1677730012/far8t1chhlmyk9jst941.jpg','cleqia6480000ihb2rkfajda9','cleqkvs66000xihb2r3gys5z1'),('cleql5cvo001iihb2xkrev1h5','X-Bacon','Hamburguer de carne bovina, pão australiano, bacon, queijo cheddar, salada e molho especial',29.500000000000000000000000000000,'https://res.cloudinary.com/optimus-media/image/upload/v1677730034/q2cbmp1iurjfyxiypv72.jpg','cleqia6480000ihb2rkfajda9','cleqkvs66000xihb2r3gys5z1'),('cleql5w95001nihb2ulmw3t9n','X-Calabresa','Hamburguer de carne bovina, pão australiano, bacon, queijo cheddar, salada e molho especial',29.500000000000000000000000000000,'https://res.cloudinary.com/optimus-media/image/upload/v1677730060/e76ajwotkj7hxtwpqgbr.jpg','cleqia6480000ihb2rkfajda9','cleqkvs66000xihb2r3gys5z1'),('cleql6fqw001sihb2qhlsyio7','Coca-cola','',4.500000000000000000000000000000,'https://res.cloudinary.com/optimus-media/image/upload/v1677730084/uakvuusgsqn6nv3hv1st.jpg','cleqia6480000ihb2rkfajda9','cleqkvx25000zihb2ltcu37zj'),('cleql6xov001tihb2pbursh33','Fanta','',4.500000000000000000000000000000,'https://res.cloudinary.com/optimus-media/image/upload/v1677730109/benrfuqiciitpda21xsk.jpg','cleqia6480000ihb2rkfajda9','cleqkvx25000zihb2ltcu37zj');
/*!40000 ALTER TABLE `Product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProductOptionGroup`
--

DROP TABLE IF EXISTS `ProductOptionGroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductOptionGroup` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `optionGroupId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ProductOptionGroup_optionGroupId_idx` (`optionGroupId`),
  KEY `ProductOptionGroup_productId_idx` (`productId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductOptionGroup`
--

LOCK TABLES `ProductOptionGroup` WRITE;
/*!40000 ALTER TABLE `ProductOptionGroup` DISABLE KEYS */;
INSERT INTO `ProductOptionGroup` VALUES ('cleql4vmj001fihb2y6h8ei3e','cleql4vmj001dihb2vykkmqyj','cleql3d0y0011ihb298bjie3w'),('cleql4vmj001gihb2nlnemswh','cleql4vmj001dihb2vykkmqyj','cleql3vh00018ihb2r6n640ep'),('cleql5cvo001kihb24c5lqymy','cleql5cvo001iihb2xkrev1h5','cleql3vh00018ihb2r6n640ep'),('cleql5cvo001lihb25uijndd2','cleql5cvo001iihb2xkrev1h5','cleql3d0y0011ihb298bjie3w'),('cleql5w95001pihb26kevfgzs','cleql5w95001nihb2ulmw3t9n','cleql3d0y0011ihb298bjie3w'),('cleql5w95001qihb23bphppqz','cleql5w95001nihb2ulmw3t9n','cleql3vh00018ihb2r6n640ep'),('cleql6xov001vihb26tdzc0y2','cleql6xov001tihb2pbursh33','cleql3d0y0011ihb298bjie3w'),('cleql6xov001wihb2seemgxiq','cleql6xov001tihb2pbursh33','cleql3vh00018ihb2r6n640ep');
/*!40000 ALTER TABLE `ProductOptionGroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Session`
--

DROP TABLE IF EXISTS `Session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Session` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sessionToken` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Session_sessionToken_key` (`sessionToken`),
  KEY `Session_userId_idx` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Session`
--

LOCK TABLES `Session` WRITE;
/*!40000 ALTER TABLE `Session` DISABLE KEYS */;
INSERT INTO `Session` VALUES ('cleqi0qt10010ihiia80jeks1','8d8a64f5-219f-4738-9ca1-970b8593a671','cleqi0qj6000yihii68cyd10p','2023-04-03 02:40:05.637');
/*!40000 ALTER TABLE `Session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Store`
--

DROP TABLE IF EXISTS `Store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Store` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cover` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `whatsapp` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `facebook` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `instagram` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subdomain` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customDomain` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `minimumOrderPrice` decimal(65,30) DEFAULT NULL,
  `isOpen` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `Store_subdomain_key` (`subdomain`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Store`
--

LOCK TABLES `Store` WRITE;
/*!40000 ALTER TABLE `Store` DISABLE KEYS */;
INSERT INTO `Store` VALUES ('cleqia6480000ihb2rkfajda9','Good Food',NULL,'http://res.cloudinary.com/optimus-media/image/upload/v1677725214/a6kkjcb8lg5ignakrg1m.jpg','https://res.cloudinary.com/optimus-media/image/upload/v1677725209/drezvjc8apqqmi41mocq.jpg',NULL,NULL,NULL,NULL,'goodfood',NULL,NULL,1);
/*!40000 ALTER TABLE `Store` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `StoreDeliveryLocation`
--

DROP TABLE IF EXISTS `StoreDeliveryLocation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `StoreDeliveryLocation` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `neighborhood` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tax` decimal(65,30) NOT NULL,
  `estimatedTime` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `storeId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `StoreDeliveryLocation_storeId_idx` (`storeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `StoreDeliveryLocation`
--

LOCK TABLES `StoreDeliveryLocation` WRITE;
/*!40000 ALTER TABLE `StoreDeliveryLocation` DISABLE KEYS */;
INSERT INTO `StoreDeliveryLocation` VALUES ('cleqk7kp6000uihb259r6g6ga','Flores',20.000000000000000000000000000000,'34','cleqia6480000ihb2rkfajda9'),('cleqk7uco000wihb242z1eg46','São José',10.500000000000000000000000000000,'34','cleqia6480000ihb2rkfajda9');
/*!40000 ALTER TABLE `StoreDeliveryLocation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `StorePaymentMethod`
--

DROP TABLE IF EXISTS `StorePaymentMethod`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `StorePaymentMethod` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `storeId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `StorePaymentMethod_storeId_idx` (`storeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `StorePaymentMethod`
--

LOCK TABLES `StorePaymentMethod` WRITE;
/*!40000 ALTER TABLE `StorePaymentMethod` DISABLE KEYS */;
/*!40000 ALTER TABLE `StorePaymentMethod` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `StoreSchedule`
--

DROP TABLE IF EXISTS `StoreSchedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `StoreSchedule` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `weekDay` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `end` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isScheduledClosing` tinyint(1) NOT NULL,
  `isEnabled` tinyint(1) NOT NULL,
  `storeId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `StoreSchedule_storeId_idx` (`storeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `StoreSchedule`
--

LOCK TABLES `StoreSchedule` WRITE;
/*!40000 ALTER TABLE `StoreSchedule` DISABLE KEYS */;
INSERT INTO `StoreSchedule` VALUES ('cleqia6480001ihb2nmrpf64h','0','08:00','23:00',0,1,'cleqia6480000ihb2rkfajda9'),('cleqia6480002ihb276k6f51o','1','08:00','23:00',0,1,'cleqia6480000ihb2rkfajda9'),('cleqia6480003ihb2usxmc63r','2','08:00','23:00',0,1,'cleqia6480000ihb2rkfajda9'),('cleqia6480004ihb2qnrtm9gr','3','08:00','23:00',0,1,'cleqia6480000ihb2rkfajda9'),('cleqia6480005ihb2103zbt52','4','08:00','23:00',1,1,'cleqia6480000ihb2rkfajda9'),('cleqia6480006ihb20kn6xmmu','5','08:00','23:00',0,1,'cleqia6480000ihb2rkfajda9'),('cleqia6480007ihb2yy8p9h8k','6','08:00','23:00',0,0,'cleqia6480000ihb2rkfajda9');
/*!40000 ALTER TABLE `StoreSchedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `whatsapp` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'user',
  `onBoardingStep` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `emailVerified` datetime(3) DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `storeId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`),
  KEY `User_storeId_idx` (`storeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('cleqi0qj6000yihii68cyd10p','Kaluã Bentes','kaluanbentes@gmail.com',NULL,'admin',NULL,'2023-03-02 02:39:46.768',NULL,'cleqia6480000ihb2rkfajda9');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `VerificationToken`
--

DROP TABLE IF EXISTS `VerificationToken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `VerificationToken` (
  `identifier` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires` datetime(3) NOT NULL,
  UNIQUE KEY `VerificationToken_token_key` (`token`),
  UNIQUE KEY `VerificationToken_identifier_token_key` (`identifier`,`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VerificationToken`
--

LOCK TABLES `VerificationToken` WRITE;
/*!40000 ALTER TABLE `VerificationToken` DISABLE KEYS */;
/*!40000 ALTER TABLE `VerificationToken` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-03 23:45:02
