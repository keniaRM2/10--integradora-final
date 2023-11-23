/*
 Navicat Premium Data Transfer

 Source Server         : MySQL Localhost
 Source Server Type    : MySQL
 Source Server Version : 80023
 Source Host           : localhost:3306
 Source Schema         : shop

 Target Server Type    : MySQL
 Target Server Version : 80023
 File Encoding         : 65001

 Date: 23/11/2023 09:53:36
*/

CREATE DATABASE shop;

USE shop;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for carrito
-- ----------------------------
DROP TABLE IF EXISTS `carrito`;
CREATE TABLE `carrito`  (
  `idCarrito` int NOT NULL AUTO_INCREMENT,
  `fechaActualizacion` datetime NOT NULL,
  `total` double NOT NULL,
  `personaId` int NOT NULL,
  PRIMARY KEY (`idCarrito`) USING BTREE,
  UNIQUE INDEX `personaId_UNIQUE`(`personaId`) USING BTREE,
  INDEX `fkCarritoPersona1Idx`(`personaId`) USING BTREE,
  CONSTRAINT `fkCarritoPersona1` FOREIGN KEY (`personaId`) REFERENCES `persona` (`idPersona`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for carrito_producto
-- ----------------------------
DROP TABLE IF EXISTS `carrito_producto`;
CREATE TABLE `carrito_producto`  (
  `idCarritoProducto` int NOT NULL AUTO_INCREMENT,
  `fechaRegistro` datetime NOT NULL,
  `carritoId` int NOT NULL,
  `stockId` int NOT NULL,
  PRIMARY KEY (`idCarritoProducto`) USING BTREE,
  UNIQUE INDEX `carritoProductoUnique`(`carritoId`) USING BTREE,
  INDEX `fkCarritoCopy1Carrito1Idx`(`carritoId`) USING BTREE,
  INDEX `fk_carrito_producto_stock1_idx`(`stockId`) USING BTREE,
  CONSTRAINT `fk_carrito_producto_stock1` FOREIGN KEY (`stockId`) REFERENCES `stock` (`idStock`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fkCarritoCopy1Carrito1` FOREIGN KEY (`carritoId`) REFERENCES `carrito` (`idCarrito`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for categoria
-- ----------------------------
DROP TABLE IF EXISTS `categoria`;
CREATE TABLE `categoria`  (
  `idCategoria` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `descripcion` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `statusId` int NOT NULL,
  PRIMARY KEY (`idCategoria`) USING BTREE,
  UNIQUE INDEX `categoriaUnique`(`nombre`) USING BTREE,
  INDEX `fkCategoriaStatus1Idx`(`statusId`) USING BTREE,
  CONSTRAINT `fkCategoriaStatus1` FOREIGN KEY (`statusId`) REFERENCES `status` (`idStatus`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for color
-- ----------------------------
DROP TABLE IF EXISTS `color`;
CREATE TABLE `color`  (
  `idColor` int NOT NULL AUTO_INCREMENT,
  `color` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `productoId` int NOT NULL,
  PRIMARY KEY (`idColor`) USING BTREE,
  INDEX `fk_colorProducto_producto1_idx`(`productoId`) USING BTREE,
  CONSTRAINT `fk_colorProducto_producto1` FOREIGN KEY (`productoId`) REFERENCES `producto` (`idProducto`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for compra
-- ----------------------------
DROP TABLE IF EXISTS `compra`;
CREATE TABLE `compra`  (
  `idCompra` int NOT NULL AUTO_INCREMENT,
  `fechaCompra` datetime NOT NULL,
  `total` double NOT NULL,
  `montoPagado` double NOT NULL,
  `personaId` int NOT NULL,
  `statusId` int NOT NULL,
  PRIMARY KEY (`idCompra`) USING BTREE,
  INDEX `fkCarritoPersona1Idx`(`personaId`) USING BTREE,
  INDEX `fkCompraStatus1Idx`(`statusId`) USING BTREE,
  CONSTRAINT `fkCarritoPersona10` FOREIGN KEY (`personaId`) REFERENCES `persona` (`idPersona`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fkCompraStatus1` FOREIGN KEY (`statusId`) REFERENCES `status` (`idStatus`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for compra_producto
-- ----------------------------
DROP TABLE IF EXISTS `compra_producto`;
CREATE TABLE `compra_producto`  (
  `idCompraProducto` int NOT NULL AUTO_INCREMENT,
  `cantidad` int NOT NULL,
  `precio` double NOT NULL,
  `total` double NOT NULL,
  `comentario` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `compraId` int NOT NULL,
  `stockId` int NOT NULL,
  PRIMARY KEY (`idCompraProducto`) USING BTREE,
  INDEX `fkCompraProductoCompra1Idx`(`compraId`) USING BTREE,
  INDEX `fk_compra_producto_stock1_idx`(`stockId`) USING BTREE,
  CONSTRAINT `fk_compra_producto_stock1` FOREIGN KEY (`stockId`) REFERENCES `stock` (`idStock`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fkCompraProductoCompra1` FOREIGN KEY (`compraId`) REFERENCES `compra` (`idCompra`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for comprobante
-- ----------------------------
DROP TABLE IF EXISTS `comprobante`;
CREATE TABLE `comprobante`  (
  `idComprobante` int NOT NULL AUTO_INCREMENT,
  `formato` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `imagen` longblob NOT NULL,
  `pagoId` int NOT NULL,
  PRIMARY KEY (`idComprobante`) USING BTREE,
  UNIQUE INDEX `comprobanteCompraUnique`(`pagoId`) USING BTREE,
  INDEX `fkComprobantePago1Idx`(`pagoId`) USING BTREE,
  CONSTRAINT `fkComprobantePago1` FOREIGN KEY (`pagoId`) REFERENCES `pago` (`idPago`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for contacto
-- ----------------------------
DROP TABLE IF EXISTS `contacto`;
CREATE TABLE `contacto`  (
  `idContacto` int NOT NULL AUTO_INCREMENT,
  `correoElectronico` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `telefonoPrincipal` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `telefonoSecundario` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `personaId` int NOT NULL,
  PRIMARY KEY (`idContacto`) USING BTREE,
  UNIQUE INDEX `personaIdPersonaUnique`(`personaId`) USING BTREE,
  INDEX `fkContactoPersona1Idx`(`personaId`) USING BTREE,
  CONSTRAINT `fkContactoPersona1` FOREIGN KEY (`personaId`) REFERENCES `persona` (`idPersona`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for direccion
-- ----------------------------
DROP TABLE IF EXISTS `direccion`;
CREATE TABLE `direccion`  (
  `idDireccion` int NOT NULL AUTO_INCREMENT,
  `numeroInterior` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `numeroExterior` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `calle` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `colonia` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `municipio` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `entidadFederativa` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `personaId` int NOT NULL,
  PRIMARY KEY (`idDireccion`) USING BTREE,
  UNIQUE INDEX `personaId`(`personaId`) USING BTREE,
  CONSTRAINT `fkDireccionPersona1` FOREIGN KEY (`personaId`) REFERENCES `persona` (`idPersona`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for envio
-- ----------------------------
DROP TABLE IF EXISTS `envio`;
CREATE TABLE `envio`  (
  `idEnvio` int NOT NULL AUTO_INCREMENT,
  `fechaEnvio` datetime NOT NULL,
  `fechaEntrega` datetime NULL DEFAULT NULL,
  `compraId` int NOT NULL,
  `personaResponsableId` int NOT NULL,
  `statusId` int NOT NULL,
  PRIMARY KEY (`idEnvio`) USING BTREE,
  INDEX `fkEnvioCompra1Idx`(`compraId`) USING BTREE,
  INDEX `fkEnvioPersona1Idx`(`personaResponsableId`) USING BTREE,
  INDEX `fk_envio_status1_idx`(`statusId`) USING BTREE,
  CONSTRAINT `fk_envio_status1` FOREIGN KEY (`statusId`) REFERENCES `status` (`idStatus`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fkEnvioCompra1` FOREIGN KEY (`compraId`) REFERENCES `compra` (`idCompra`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fkEnvioPersona1` FOREIGN KEY (`personaResponsableId`) REFERENCES `persona` (`idPersona`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for genero
-- ----------------------------
DROP TABLE IF EXISTS `genero`;
CREATE TABLE `genero`  (
  `idGenero` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`idGenero`) USING BTREE,
  UNIQUE INDEX `usuarioUnique`(`nombre`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for imagen
-- ----------------------------
DROP TABLE IF EXISTS `imagen`;
CREATE TABLE `imagen`  (
  `idImagen` int NOT NULL AUTO_INCREMENT,
  `formato` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `imagen` longblob NOT NULL,
  `productoId` int NULL DEFAULT NULL,
  `subcategoriaId` int NULL DEFAULT NULL,
  `categoriaId` int NULL DEFAULT NULL,
  PRIMARY KEY (`idImagen`) USING BTREE,
  INDEX `fkImagenProducto1Idx`(`productoId`) USING BTREE,
  INDEX `fk_imagen_subcategoria1_idx`(`subcategoriaId`) USING BTREE,
  INDEX `fk_imagen_categoria1_idx`(`categoriaId`) USING BTREE,
  CONSTRAINT `fk_imagen_categoria1` FOREIGN KEY (`categoriaId`) REFERENCES `categoria` (`idCategoria`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_imagen_subcategoria1` FOREIGN KEY (`subcategoriaId`) REFERENCES `subcategoria` (`idSubcategoria`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fkImagenProducto1` FOREIGN KEY (`productoId`) REFERENCES `producto` (`idProducto`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for medida
-- ----------------------------
DROP TABLE IF EXISTS `medida`;
CREATE TABLE `medida`  (
  `idMedida` int NOT NULL AUTO_INCREMENT,
  `medida` varchar(25) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `tipoMedidaId` int NOT NULL,
  `tallaId` int NOT NULL,
  `productoId` int NOT NULL,
  PRIMARY KEY (`idMedida`) USING BTREE,
  INDEX `fk_medida_tipoMedida1_idx`(`tipoMedidaId`) USING BTREE,
  INDEX `fk_medida_talla1_idx`(`tallaId`) USING BTREE,
  INDEX `fk_medida_producto1_idx`(`productoId`) USING BTREE,
  CONSTRAINT `fk_medida_producto1` FOREIGN KEY (`productoId`) REFERENCES `producto` (`idProducto`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_medida_talla1` FOREIGN KEY (`tallaId`) REFERENCES `talla` (`idTalla`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_medida_tipoMedida1` FOREIGN KEY (`tipoMedidaId`) REFERENCES `tipomedida` (`idTipoMedida`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for pago
-- ----------------------------
DROP TABLE IF EXISTS `pago`;
CREATE TABLE `pago`  (
  `idPago` int NOT NULL AUTO_INCREMENT,
  `fechaPago` datetime NOT NULL,
  `monto` double NOT NULL,
  `personaId` int NOT NULL,
  `compraId` int NOT NULL,
  `clave` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`idPago`) USING BTREE,
  INDEX `fkCarritoPersona1Idx`(`personaId`) USING BTREE,
  INDEX `fkPagoCompra1Idx`(`compraId`) USING BTREE,
  CONSTRAINT `fkCarritoPersona100` FOREIGN KEY (`personaId`) REFERENCES `persona` (`idPersona`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fkPagoCompra1` FOREIGN KEY (`compraId`) REFERENCES `compra` (`idCompra`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for persona
-- ----------------------------
DROP TABLE IF EXISTS `persona`;
CREATE TABLE `persona`  (
  `idPersona` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `primerApellido` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `segundoApellido` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `fechaNacimiento` date NOT NULL,
  `generoId` int NOT NULL,
  PRIMARY KEY (`idPersona`) USING BTREE,
  INDEX `fkPersonaGenero1Idx`(`generoId`) USING BTREE,
  CONSTRAINT `fkPersonaGenero1` FOREIGN KEY (`generoId`) REFERENCES `genero` (`idGenero`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for producto
-- ----------------------------
DROP TABLE IF EXISTS `producto`;
CREATE TABLE `producto`  (
  `idProducto` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `descripcion` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `statusId` int NOT NULL,
  `subcategoriaId` int NOT NULL,
  PRIMARY KEY (`idProducto`) USING BTREE,
  UNIQUE INDEX `producto_UNIQUE`(`nombre`) USING BTREE,
  INDEX `fkProductoStatus1Idx`(`statusId`) USING BTREE,
  INDEX `fkProductoSubcategoria1Idx`(`subcategoriaId`) USING BTREE,
  CONSTRAINT `fkProductoStatus1` FOREIGN KEY (`statusId`) REFERENCES `status` (`idStatus`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fkProductoSubcategoria1` FOREIGN KEY (`subcategoriaId`) REFERENCES `subcategoria` (`idSubcategoria`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for rol
-- ----------------------------
DROP TABLE IF EXISTS `rol`;
CREATE TABLE `rol`  (
  `idRol` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`idRol`) USING BTREE,
  UNIQUE INDEX `usuario_UNIQUE`(`nombre`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for status
-- ----------------------------
DROP TABLE IF EXISTS `status`;
CREATE TABLE `status`  (
  `idStatus` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`idStatus`) USING BTREE,
  UNIQUE INDEX `status_UNIQUE`(`nombre`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for stock
-- ----------------------------
DROP TABLE IF EXISTS `stock`;
CREATE TABLE `stock`  (
  `idStock` int NOT NULL AUTO_INCREMENT,
  `precio` double NOT NULL,
  `existencia` int NOT NULL,
  `productoId` int NOT NULL,
  `tallaId` int NULL DEFAULT NULL,
  `colorId` int NULL DEFAULT NULL,
  PRIMARY KEY (`idStock`) USING BTREE,
  INDEX `fk_existencia_producto1_idx`(`productoId`) USING BTREE,
  INDEX `fk_existencia_talla1_idx`(`tallaId`) USING BTREE,
  INDEX `fk_existencia_color1_idx`(`colorId`) USING BTREE,
  CONSTRAINT `fk_existencia_color1` FOREIGN KEY (`colorId`) REFERENCES `color` (`idColor`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_existencia_producto1` FOREIGN KEY (`productoId`) REFERENCES `producto` (`idProducto`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_existencia_talla1` FOREIGN KEY (`tallaId`) REFERENCES `talla` (`idTalla`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for subcategoria
-- ----------------------------
DROP TABLE IF EXISTS `subcategoria`;
CREATE TABLE `subcategoria`  (
  `idSubcategoria` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `categoriaId` int NOT NULL,
  PRIMARY KEY (`idSubcategoria`) USING BTREE,
  UNIQUE INDEX `subcategoriaUnique`(`nombre`, `categoriaId`) USING BTREE,
  INDEX `fkSubcategoriaCategoria1Idx`(`categoriaId`) USING BTREE,
  CONSTRAINT `fkSubcategoriaCategoria1` FOREIGN KEY (`categoriaId`) REFERENCES `categoria` (`idCategoria`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for talla
-- ----------------------------
DROP TABLE IF EXISTS `talla`;
CREATE TABLE `talla`  (
  `idTalla` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(25) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`idTalla`) USING BTREE,
  UNIQUE INDEX `nombre`(`nombre`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for tipomedida
-- ----------------------------
DROP TABLE IF EXISTS `tipomedida`;
CREATE TABLE `tipomedida`  (
  `idTipoMedida` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(25) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`idTipoMedida`) USING BTREE,
  UNIQUE INDEX `nombre`(`nombre`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for usuario
-- ----------------------------
DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario`  (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `contrasena` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `fechaRegistro` datetime NOT NULL,
  `rolId` int NOT NULL,
  `statusId` int NOT NULL,
  `personaId` int NULL DEFAULT NULL,
  PRIMARY KEY (`idUsuario`) USING BTREE,
  UNIQUE INDEX `usuarioUnique`(`usuario`) USING BTREE,
  UNIQUE INDEX `personaIdUnique`(`personaId`) USING BTREE,
  INDEX `fkUsuarioRolIdx`(`rolId`) USING BTREE,
  INDEX `fkUsuarioStatus1Idx`(`statusId`) USING BTREE,
  INDEX `fkUsuarioPersona1Idx`(`personaId`) USING BTREE,
  CONSTRAINT `fkUsuarioPersona1` FOREIGN KEY (`personaId`) REFERENCES `persona` (`idPersona`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fkUsuarioRol` FOREIGN KEY (`rolId`) REFERENCES `rol` (`idRol`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fkUsuarioStatus1` FOREIGN KEY (`statusId`) REFERENCES `status` (`idStatus`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;
