CREATE DATABASE  IF NOT EXISTS `creativeteams` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `creativeteams`;
-- MySQL dump 10.13  Distrib 5.6.17, for Win64 (x86_64)
--
-- Host: localhost    Database: creativeteams
-- ------------------------------------------------------
-- Server version	5.5.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `altusesres`
--

DROP TABLE IF EXISTS `altusesres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `altusesres` (
  `TeamID` int(11) NOT NULL,
  `UserID` tinyint(4) DEFAULT NULL,
  `Use` text,
  `UseNo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `altusesres`
--

LOCK TABLES `altusesres` WRITE;
/*!40000 ALTER TABLE `altusesres` DISABLE KEYS */;
/*!40000 ALTER TABLE `altusesres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `config`
--

DROP TABLE IF EXISTS `config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `config` (
  `PracAreaTimeLimit` int(11) DEFAULT NULL,
  `PicConTimeLimit` int(11) DEFAULT NULL,
  `PicCompTimeLimit` int(11) DEFAULT NULL,
  `ParLinesTimeLimit` int(11) DEFAULT NULL,
  `IdeaGenTimeLimit` int(11) DEFAULT NULL,
  `DesChalTimeLimit` int(11) DEFAULT NULL,
  `AltUsesTimeLimit` int(11) DEFAULT NULL,
  `ResultsPath` varchar(1024) DEFAULT NULL,
  `InstructionsPath` varchar(1024) DEFAULT NULL,
  `TestsOrder` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `config`
--

LOCK TABLES `config` WRITE;
/*!40000 ALTER TABLE `config` DISABLE KEYS */;
INSERT INTO `config` VALUES (20,1200,1200,600,600,1200,600,'../results','instructions/','PicCon, PicComp, ParLines, IdeaGen, DesChal, AltUses');
/*!40000 ALTER TABLE `config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deschalres`
--

DROP TABLE IF EXISTS `deschalres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `deschalres` (
  `TeamID` int(11) NOT NULL,
  `ScreenNumber` tinyint(4) DEFAULT NULL,
  `Title` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deschalres`
--

LOCK TABLES `deschalres` WRITE;
/*!40000 ALTER TABLE `deschalres` DISABLE KEYS */;
/*!40000 ALTER TABLE `deschalres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ideagenres`
--

DROP TABLE IF EXISTS `ideagenres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ideagenres` (
  `TeamID` int(11) NOT NULL,
  `UserID` tinyint(4) DEFAULT NULL,
  `Title` text,
  `Description` text,
  `IdeaNo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ideagenres`
--

LOCK TABLES `ideagenres` WRITE;
/*!40000 ALTER TABLE `ideagenres` DISABLE KEYS */;
/*!40000 ALTER TABLE `ideagenres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parlinesres`
--

DROP TABLE IF EXISTS `parlinesres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `parlinesres` (
  `TeamID` int(11) NOT NULL,
  `ScreenNumber` tinyint(4) DEFAULT NULL,
  `Title` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parlinesres`
--

LOCK TABLES `parlinesres` WRITE;
/*!40000 ALTER TABLE `parlinesres` DISABLE KEYS */;
/*!40000 ALTER TABLE `parlinesres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participation`
--

DROP TABLE IF EXISTS `participation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `participation` (
  `TeamID` int(11) NOT NULL,
  `UserID` tinyint(4) DEFAULT NULL,
  `TestID` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participation`
--

LOCK TABLES `participation` WRITE;
/*!40000 ALTER TABLE `participation` DISABLE KEYS */;
/*!40000 ALTER TABLE `participation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `piccompres`
--

DROP TABLE IF EXISTS `piccompres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `piccompres` (
  `TeamID` int(11) NOT NULL,
  `ScreenNumber` tinyint(4) NOT NULL,
  `Title` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `piccompres`
--

LOCK TABLES `piccompres` WRITE;
/*!40000 ALTER TABLE `piccompres` DISABLE KEYS */;
/*!40000 ALTER TABLE `piccompres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `picconres`
--

DROP TABLE IF EXISTS `picconres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `picconres` (
  `TeamID` int(11) NOT NULL,
  `Title` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `picconres`
--

LOCK TABLES `picconres` WRITE;
/*!40000 ALTER TABLE `picconres` DISABLE KEYS */;
/*!40000 ALTER TABLE `picconres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teamconfig`
--

DROP TABLE IF EXISTS `teamconfig`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teamconfig` (
  `TeamID` int(11) NOT NULL,
  `Time` datetime DEFAULT NULL,
  `PicConTimeLimit` int(11) NOT NULL,
  `PicCompTimeLimit` int(11) DEFAULT NULL,
  `ParLinesTimeLimit` int(11) DEFAULT NULL,
  `IdeaGenTimeLimit` int(11) DEFAULT NULL,
  `DesChalTimeLimit` int(11) DEFAULT NULL,
  `AltUsesTimeLimit` int(11) DEFAULT NULL,
  `ResultsPath` varchar(1024) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teamconfig`
--

LOCK TABLES `teamconfig` WRITE;
/*!40000 ALTER TABLE `teamconfig` DISABLE KEYS */;
/*!40000 ALTER TABLE `teamconfig` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transactions` (
  `TeamID` int(11) NOT NULL,
  `TestID` tinyint(4) DEFAULT NULL,
  `UserID` tinyint(4) DEFAULT NULL,
  `ScreenNumber` tinyint(4) DEFAULT NULL,
  `Object` tinyint(4) DEFAULT NULL,
  `Operation` tinyint(4) DEFAULT NULL,
  `OperationData` varchar(1024) DEFAULT NULL,
  `Time` bigint(8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `TeamID` int(11) NOT NULL,
  `UserID` tinyint(4) NOT NULL,
  `Name` varchar(45) DEFAULT NULL,
  `Active` tinyint(4) NOT NULL DEFAULT '0',
  `Enabled` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (7,1,'',0,1),(7,2,'',0,1),(7,3,'',0,1),(8,1,'',0,1),(8,2,'',0,1),(8,3,'',0,1),(9,1,'Iuj',0,1),(9,2,'',0,1),(9,3,'',0,1),(10,1,'',0,1),(10,2,'',0,1),(10,3,'Hhh',0,1),(6,1,'',0,1),(6,2,'',0,1),(6,3,'',0,1),(5,1,'',0,1),(5,2,'',0,1),(5,3,'',0,1),(4,1,'',0,1),(4,2,'',0,1),(4,3,'',0,1),(3,1,'',0,1),(3,2,'',0,1),(3,3,'',0,1),(11,1,'',0,1),(11,2,'',0,1),(11,3,'',0,1),(12,1,'',0,1),(12,2,'',0,1),(12,3,'',0,1),(13,1,'',0,1),(13,2,'',0,1),(13,3,'',0,1),(1,1,'',0,1),(1,2,'',0,1),(1,3,'',0,1),(14,1,'',0,1),(14,2,'',0,1),(14,3,'',0,1),(1,4,'',0,1),(100,1,'',0,1),(100,2,'',0,1),(100,3,'',0,1),(720,1,'',0,1),(720,2,'',0,1),(720,3,'',0,1),(721,1,'',0,1),(721,2,'',0,1),(721,3,'',0,1),(731,1,'',0,1),(731,2,'',0,1),(731,3,'',0,1),(719,1,'',0,1),(719,2,'',0,1),(719,3,'',0,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-03-25  8:19:26
