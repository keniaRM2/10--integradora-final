-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: 192.168.100.73    Database: shop
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carrito`
--

USE shop;

DROP TABLE IF EXISTS `carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrito` (
  `idCarrito` int NOT NULL AUTO_INCREMENT,
  `fechaActualizacion` datetime NOT NULL,
  `total` double NOT NULL,
  `personaId` int NOT NULL,
  PRIMARY KEY (`idCarrito`) USING BTREE,
  UNIQUE KEY `personaId_UNIQUE` (`personaId`) USING BTREE,
  KEY `fkCarritoPersona1Idx` (`personaId`) USING BTREE,
  CONSTRAINT `fkCarritoPersona1` FOREIGN KEY (`personaId`) REFERENCES `persona` (`idPersona`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito`
--

LOCK TABLES `carrito` WRITE;
/*!40000 ALTER TABLE `carrito` DISABLE KEYS */;
INSERT INTO `carrito` VALUES (1,'2023-12-03 17:00:00',400,2);
/*!40000 ALTER TABLE `carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carrito_producto`
--

DROP TABLE IF EXISTS `carrito_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrito_producto` (
  `idCarritoProducto` int NOT NULL AUTO_INCREMENT,
  `fechaRegistro` datetime NOT NULL,
  `carritoId` int NOT NULL,
  `stockId` int NOT NULL,
  PRIMARY KEY (`idCarritoProducto`) USING BTREE,
  KEY `fkCarritoCopy1Carrito1Idx` (`carritoId`) USING BTREE,
  KEY `fk_carrito_producto_stock1_idx` (`stockId`) USING BTREE,
  CONSTRAINT `fk_carrito_producto_stock1` FOREIGN KEY (`stockId`) REFERENCES `stock` (`idStock`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fkCarritoCopy1Carrito1` FOREIGN KEY (`carritoId`) REFERENCES `carrito` (`idCarrito`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito_producto`
--

LOCK TABLES `carrito_producto` WRITE;
/*!40000 ALTER TABLE `carrito_producto` DISABLE KEYS */;
INSERT INTO `carrito_producto` VALUES (7,'2023-12-03 00:00:00',1,1),(8,'2023-12-03 00:00:00',1,2);
/*!40000 ALTER TABLE `carrito_producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `idCategoria` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `descripcion` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `statusId` int NOT NULL,
  PRIMARY KEY (`idCategoria`) USING BTREE,
  UNIQUE KEY `categoriaUnique` (`nombre`) USING BTREE,
  KEY `fkCategoriaStatus1Idx` (`statusId`) USING BTREE,
  CONSTRAINT `fkCategoriaStatus1` FOREIGN KEY (`statusId`) REFERENCES `status` (`idStatus`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (8,'Mujer','Mujer',3),(9,'Hombre','Hombre',3),(10,'Niña','Niña',3),(11,'Niño','Niño',3),(12,'Bebé','Bebé',3),(13,'Mascota','Mascota',3),(14,'Peluches','Peluches',3);
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `color`
--

DROP TABLE IF EXISTS `color`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `color` (
  `idColor` int NOT NULL AUTO_INCREMENT,
  `color` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `productoId` int NOT NULL,
  PRIMARY KEY (`idColor`) USING BTREE,
  KEY `fk_colorProducto_producto1_idx` (`productoId`) USING BTREE,
  CONSTRAINT `fk_colorProducto_producto1` FOREIGN KEY (`productoId`) REFERENCES `producto` (`idProducto`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `color`
--

LOCK TABLES `color` WRITE;
/*!40000 ALTER TABLE `color` DISABLE KEYS */;
INSERT INTO `color` VALUES (11,'#c93434',6),(12,'#bd5353',6),(13,'#51769f',6),(14,'#b62222',8),(15,'#2e3fe9',8),(16,'#b244a5',8),(17,'#5c4f4f',9),(18,'#d91e1e',9),(19,'#326f7d',9),(20,'#4e3c3c',10),(21,'#faf4f4',10),(22,'#aa3f3f',10);
/*!40000 ALTER TABLE `color` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compra`
--

DROP TABLE IF EXISTS `compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compra` (
  `idCompra` int NOT NULL AUTO_INCREMENT,
  `fechaCompra` datetime NOT NULL,
  `total` double NOT NULL,
  `montoPagado` double NOT NULL,
  `personaId` int NOT NULL,
  `statusId` int NOT NULL,
  PRIMARY KEY (`idCompra`) USING BTREE,
  KEY `fkCarritoPersona1Idx` (`personaId`) USING BTREE,
  KEY `fkCompraStatus1Idx` (`statusId`) USING BTREE,
  CONSTRAINT `fkCarritoPersona10` FOREIGN KEY (`personaId`) REFERENCES `persona` (`idPersona`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fkCompraStatus1` FOREIGN KEY (`statusId`) REFERENCES `status` (`idStatus`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compra`
--

LOCK TABLES `compra` WRITE;
/*!40000 ALTER TABLE `compra` DISABLE KEYS */;
INSERT INTO `compra` VALUES (1,'2023-12-09 21:57:11',0,0,1,5),(2,'2023-12-09 21:59:41',600,0,1,5);
/*!40000 ALTER TABLE `compra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compra_producto`
--

DROP TABLE IF EXISTS `compra_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compra_producto` (
  `idCompraProducto` int NOT NULL AUTO_INCREMENT,
  `cantidad` int NOT NULL,
  `precio` double NOT NULL,
  `total` double NOT NULL,
  `comentario` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `compraId` int NOT NULL,
  `stockId` int NOT NULL,
  PRIMARY KEY (`idCompraProducto`) USING BTREE,
  KEY `fkCompraProductoCompra1Idx` (`compraId`) USING BTREE,
  KEY `fk_compra_producto_stock1_idx` (`stockId`) USING BTREE,
  CONSTRAINT `fk_compra_producto_stock1` FOREIGN KEY (`stockId`) REFERENCES `stock` (`idStock`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fkCompraProductoCompra1` FOREIGN KEY (`compraId`) REFERENCES `compra` (`idCompra`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compra_producto`
--

LOCK TABLES `compra_producto` WRITE;
/*!40000 ALTER TABLE `compra_producto` DISABLE KEYS */;
INSERT INTO `compra_producto` VALUES (1,1,200,200,NULL,2,1),(2,2,200,400,NULL,2,3);
/*!40000 ALTER TABLE `compra_producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comprobante`
--

DROP TABLE IF EXISTS `comprobante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comprobante` (
  `idComprobante` int NOT NULL AUTO_INCREMENT,
  `formato` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `imagen` longblob NOT NULL,
  `pagoId` int NOT NULL,
  PRIMARY KEY (`idComprobante`) USING BTREE,
  UNIQUE KEY `comprobanteCompraUnique` (`pagoId`) USING BTREE,
  KEY `fkComprobantePago1Idx` (`pagoId`) USING BTREE,
  CONSTRAINT `fkComprobantePago1` FOREIGN KEY (`pagoId`) REFERENCES `pago` (`idPago`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comprobante`
--

LOCK TABLES `comprobante` WRITE;
/*!40000 ALTER TABLE `comprobante` DISABLE KEYS */;
/*!40000 ALTER TABLE `comprobante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacto`
--

DROP TABLE IF EXISTS `contacto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacto` (
  `idContacto` int NOT NULL AUTO_INCREMENT,
  `correoElectronico` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `telefonoPrincipal` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `telefonoSecundario` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `personaId` int NOT NULL,
  PRIMARY KEY (`idContacto`) USING BTREE,
  UNIQUE KEY `personaIdPersonaUnique` (`personaId`) USING BTREE,
  KEY `fkContactoPersona1Idx` (`personaId`) USING BTREE,
  CONSTRAINT `fkContactoPersona1` FOREIGN KEY (`personaId`) REFERENCES `persona` (`idPersona`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacto`
--

LOCK TABLES `contacto` WRITE;
/*!40000 ALTER TABLE `contacto` DISABLE KEYS */;
INSERT INTO `contacto` VALUES (1,'kenia@gmail.com','7771234567','7771478596',1),(2,'cliente@gmail.com','7771234567','7771478596',2);
/*!40000 ALTER TABLE `contacto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `direccion`
--

DROP TABLE IF EXISTS `direccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `direccion` (
  `idDireccion` int NOT NULL AUTO_INCREMENT,
  `numeroInterior` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `numeroExterior` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `calle` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `colonia` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `municipio` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `entidadFederativa` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `personaId` int NOT NULL,
  PRIMARY KEY (`idDireccion`) USING BTREE,
  UNIQUE KEY `personaId` (`personaId`) USING BTREE,
  CONSTRAINT `fkDireccionPersona1` FOREIGN KEY (`personaId`) REFERENCES `persona` (`idPersona`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `direccion`
--

LOCK TABLES `direccion` WRITE;
/*!40000 ALTER TABLE `direccion` DISABLE KEYS */;
INSERT INTO `direccion` VALUES (1,'123','456','Av. Principal','Centro','Cuernavaca','Morelos',1),(2,'123','456','Av. Principal','Centro','Cuernavaca','Morelos',2);
/*!40000 ALTER TABLE `direccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `envio`
--

DROP TABLE IF EXISTS `envio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `envio` (
  `idEnvio` int NOT NULL AUTO_INCREMENT,
  `fechaEnvio` datetime NOT NULL,
  `fechaEntrega` datetime DEFAULT NULL,
  `compraId` int NOT NULL,
  `personaResponsableId` int NOT NULL,
  `statusId` int NOT NULL,
  PRIMARY KEY (`idEnvio`) USING BTREE,
  KEY `fkEnvioCompra1Idx` (`compraId`) USING BTREE,
  KEY `fkEnvioPersona1Idx` (`personaResponsableId`) USING BTREE,
  KEY `fk_envio_status1_idx` (`statusId`) USING BTREE,
  CONSTRAINT `fk_envio_status1` FOREIGN KEY (`statusId`) REFERENCES `status` (`idStatus`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fkEnvioCompra1` FOREIGN KEY (`compraId`) REFERENCES `compra` (`idCompra`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fkEnvioPersona1` FOREIGN KEY (`personaResponsableId`) REFERENCES `persona` (`idPersona`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `envio`
--

LOCK TABLES `envio` WRITE;
/*!40000 ALTER TABLE `envio` DISABLE KEYS */;
/*!40000 ALTER TABLE `envio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genero`
--

DROP TABLE IF EXISTS `genero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genero` (
  `idGenero` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`idGenero`) USING BTREE,
  UNIQUE KEY `usuarioUnique` (`nombre`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genero`
--

LOCK TABLES `genero` WRITE;
/*!40000 ALTER TABLE `genero` DISABLE KEYS */;
INSERT INTO `genero` VALUES (4,'Femenino'),(3,'Masculino');
/*!40000 ALTER TABLE `genero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medida`
--

DROP TABLE IF EXISTS `medida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medida` (
  `idMedida` int NOT NULL AUTO_INCREMENT,
  `medida` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `tipoMedidaId` int NOT NULL,
  `tallaId` int NOT NULL,
  `productoId` int NOT NULL,
  PRIMARY KEY (`idMedida`) USING BTREE,
  KEY `fk_medida_tipoMedida1_idx` (`tipoMedidaId`) USING BTREE,
  KEY `fk_medida_talla1_idx` (`tallaId`) USING BTREE,
  KEY `fk_medida_producto1_idx` (`productoId`) USING BTREE,
  CONSTRAINT `fk_medida_producto1` FOREIGN KEY (`productoId`) REFERENCES `producto` (`idProducto`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_medida_talla1` FOREIGN KEY (`tallaId`) REFERENCES `talla` (`idTalla`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_medida_tipoMedida1` FOREIGN KEY (`tipoMedidaId`) REFERENCES `tipomedida` (`idTipoMedida`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medida`
--

LOCK TABLES `medida` WRITE;
/*!40000 ALTER TABLE `medida` DISABLE KEYS */;
INSERT INTO `medida` VALUES (10,'10',20,16,6),(11,'50',18,13,6),(12,'10',20,15,8),(13,'5cm',19,13,8),(14,'10 cm',11,10,9),(15,'20cm',13,10,9),(16,'30cm',18,12,10),(17,'10cm',19,12,10);
/*!40000 ALTER TABLE `medida` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pago`
--

DROP TABLE IF EXISTS `pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pago` (
  `idPago` int NOT NULL AUTO_INCREMENT,
  `fechaPago` datetime NOT NULL,
  `monto` double NOT NULL,
  `personaId` int NOT NULL,
  `compraId` int NOT NULL,
  `clave` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idPago`) USING BTREE,
  KEY `fkCarritoPersona1Idx` (`personaId`) USING BTREE,
  KEY `fkPagoCompra1Idx` (`compraId`) USING BTREE,
  CONSTRAINT `fkCarritoPersona100` FOREIGN KEY (`personaId`) REFERENCES `persona` (`idPersona`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fkPagoCompra1` FOREIGN KEY (`compraId`) REFERENCES `compra` (`idCompra`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pago`
--

LOCK TABLES `pago` WRITE;
/*!40000 ALTER TABLE `pago` DISABLE KEYS */;
INSERT INTO `pago` VALUES (1,'2023-12-09 12:00:00',600,1,2,'XXX');
/*!40000 ALTER TABLE `pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persona`
--

DROP TABLE IF EXISTS `persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `persona` (
  `idPersona` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `primerApellido` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `segundoApellido` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `fechaNacimiento` date NOT NULL,
  `generoId` int NOT NULL,
  PRIMARY KEY (`idPersona`) USING BTREE,
  KEY `fkPersonaGenero1Idx` (`generoId`) USING BTREE,
  CONSTRAINT `fkPersonaGenero1` FOREIGN KEY (`generoId`) REFERENCES `genero` (`idGenero`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persona`
--

LOCK TABLES `persona` WRITE;
/*!40000 ALTER TABLE `persona` DISABLE KEYS */;
INSERT INTO `persona` VALUES (1,'Kenia','Reyes','Molina','1996-03-27',4),(2,'Andrea','Reyes','Molina','1996-03-27',4);
/*!40000 ALTER TABLE `persona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `idProducto` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `descripcion` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `statusId` int NOT NULL,
  `subcategoriaId` int NOT NULL,
  PRIMARY KEY (`idProducto`) USING BTREE,
  UNIQUE KEY `producto_UNIQUE` (`nombre`) USING BTREE,
  KEY `fkProductoStatus1Idx` (`statusId`) USING BTREE,
  KEY `fkProductoSubcategoria1Idx` (`subcategoriaId`) USING BTREE,
  CONSTRAINT `fkProductoStatus1` FOREIGN KEY (`statusId`) REFERENCES `status` (`idStatus`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fkProductoSubcategoria1` FOREIGN KEY (`subcategoriaId`) REFERENCES `subcategoria` (`idSubcategoria`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (6,'Playera','sddsdsds',3,22),(7,'xx','xx',3,27),(8,'xxxx','xxxx',3,27),(9,'Playera navideña','Playera negra',3,16),(10,'Vestido navideño','Vestido navideño',3,15);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `idRol` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`idRol`) USING BTREE,
  UNIQUE KEY `usuario_UNIQUE` (`nombre`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (3,'Administrador'),(4,'Cliente');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `idStatus` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`idStatus`) USING BTREE,
  UNIQUE KEY `status_UNIQUE` (`nombre`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (6,'Aceptado'),(3,'Activo'),(9,'En camino'),(5,'En proceso'),(10,'Entregado'),(4,'Inactivo'),(8,'Pendiente'),(7,'Rechazado');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock`
--

DROP TABLE IF EXISTS `stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock` (
  `idStock` int NOT NULL AUTO_INCREMENT,
  `precio` double NOT NULL,
  `existencia` int NOT NULL,
  `productoId` int NOT NULL,
  `tallaId` int DEFAULT NULL,
  `colorId` int DEFAULT NULL,
  PRIMARY KEY (`idStock`) USING BTREE,
  KEY `fk_existencia_producto1_idx` (`productoId`) USING BTREE,
  KEY `fk_existencia_talla1_idx` (`tallaId`) USING BTREE,
  KEY `fk_existencia_color1_idx` (`colorId`) USING BTREE,
  CONSTRAINT `fk_existencia_color1` FOREIGN KEY (`colorId`) REFERENCES `color` (`idColor`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_existencia_producto1` FOREIGN KEY (`productoId`) REFERENCES `producto` (`idProducto`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_existencia_talla1` FOREIGN KEY (`tallaId`) REFERENCES `talla` (`idTalla`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock`
--

LOCK TABLES `stock` WRITE;
/*!40000 ALTER TABLE `stock` DISABLE KEYS */;
INSERT INTO `stock` VALUES (1,200,10,9,10,17),(2,200,10,10,12,22),(3,200,20,10,12,21),(4,200,10,9,10,19);
/*!40000 ALTER TABLE `stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategoria`
--

DROP TABLE IF EXISTS `subcategoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcategoria` (
  `idSubcategoria` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `categoriaId` int NOT NULL,
  PRIMARY KEY (`idSubcategoria`) USING BTREE,
  UNIQUE KEY `subcategoriaUnique` (`nombre`,`categoriaId`) USING BTREE,
  KEY `fkSubcategoriaCategoria1Idx` (`categoriaId`) USING BTREE,
  CONSTRAINT `fkSubcategoriaCategoria1` FOREIGN KEY (`categoriaId`) REFERENCES `categoria` (`idCategoria`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategoria`
--

LOCK TABLES `subcategoria` WRITE;
/*!40000 ALTER TABLE `subcategoria` DISABLE KEYS */;
INSERT INTO `subcategoria` VALUES (22,'Accesosios',8),(16,'Blusas',8),(23,'Calcetines',9),(24,'Calcetines',10),(25,'Calcetines',11),(26,'Calcetines',12),(27,'Calcetines',13),(28,'Calcetines',14),(20,'Cardigan',8),(17,'Crops',8),(19,'Short',8),(21,'Swearters',8),(18,'Trajes de baño',8),(15,'Vestidos',8);
/*!40000 ALTER TABLE `subcategoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `talla`
--

DROP TABLE IF EXISTS `talla`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `talla` (
  `idTalla` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`idTalla`) USING BTREE,
  UNIQUE KEY `nombre` (`nombre`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `talla`
--

LOCK TABLES `talla` WRITE;
/*!40000 ALTER TABLE `talla` DISABLE KEYS */;
INSERT INTO `talla` VALUES (12,'L (Grande)'),(11,'M (Mediano)'),(16,'No aplica'),(10,'S (Pequeño)'),(15,'Unitalla'),(13,'XL (Extra Grande)'),(9,'XS (Extra Pequeño)'),(14,'XXL (Extra Extra Grande)');
/*!40000 ALTER TABLE `talla` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipomedida`
--

DROP TABLE IF EXISTS `tipomedida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipomedida` (
  `idTipoMedida` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`idTipoMedida`) USING BTREE,
  UNIQUE KEY `nombre` (`nombre`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipomedida`
--

LOCK TABLES `tipomedida` WRITE;
/*!40000 ALTER TABLE `tipomedida` DISABLE KEYS */;
INSERT INTO `tipomedida` VALUES (15,'Contorno bíceps'),(18,'Contorno caderas'),(16,'Contorno cintura'),(20,'Entrepierna'),(17,'Hombro'),(11,'Largo'),(12,'Largo de la manga'),(19,'Muslo'),(13,'Pecho'),(14,'Puño');
/*!40000 ALTER TABLE `tipomedida` ENABLE KEYS */;
UNLOCK TABLES;


-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: 192.168.100.73    Database: shop
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `imagen`
--

DROP TABLE IF EXISTS `imagen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagen` (
  `idImagen` int NOT NULL AUTO_INCREMENT,
  `formato` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `imagen` longblob NOT NULL,
  `productoId` int DEFAULT NULL,
  `subcategoriaId` int DEFAULT NULL,
  `categoriaId` int DEFAULT NULL,
  PRIMARY KEY (`idImagen`) USING BTREE,
  KEY `fkImagenProducto1Idx` (`productoId`) USING BTREE,
  KEY `fk_imagen_subcategoria1_idx` (`subcategoriaId`) USING BTREE,
  KEY `fk_imagen_categoria1_idx` (`categoriaId`) USING BTREE,
  CONSTRAINT `fk_imagen_categoria1` FOREIGN KEY (`categoriaId`) REFERENCES `categoria` (`idCategoria`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_imagen_subcategoria1` FOREIGN KEY (`subcategoriaId`) REFERENCES `subcategoria` (`idSubcategoria`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fkImagenProducto1` FOREIGN KEY (`productoId`) REFERENCES `producto` (`idProducto`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-10 14:44:22

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `contrasena` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `fechaRegistro` datetime NOT NULL,
  `rolId` int NOT NULL,
  `statusId` int NOT NULL,
  `personaId` int DEFAULT NULL,
  PRIMARY KEY (`idUsuario`) USING BTREE,
  UNIQUE KEY `usuarioUnique` (`usuario`) USING BTREE,
  UNIQUE KEY `personaIdUnique` (`personaId`) USING BTREE,
  KEY `fkUsuarioRolIdx` (`rolId`) USING BTREE,
  KEY `fkUsuarioStatus1Idx` (`statusId`) USING BTREE,
  KEY `fkUsuarioPersona1Idx` (`personaId`) USING BTREE,
  CONSTRAINT `fkUsuarioPersona1` FOREIGN KEY (`personaId`) REFERENCES `persona` (`idPersona`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fkUsuarioRol` FOREIGN KEY (`rolId`) REFERENCES `rol` (`idRol`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fkUsuarioStatus1` FOREIGN KEY (`statusId`) REFERENCES `status` (`idStatus`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (2,'admin@gmail.com','$2a$05$pGCLLKlxGvMie/De2rHsqud4Nl3AkWI7xHCjFDr9IYaAPQHdNfPbG','2023-12-03 05:39:02',3,3,1),(3,'cliente@gmail.com','$2a$05$47TNfrQEVFwfXqB5HGxll.F8/x1BEhe3QQdEqFwBdYcM9dxJxog8W','2023-12-03 23:30:09',4,3,2);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-10 14:43:53
