/*
 Navicat Premium Data Transfer

 Source Server         : MySQL Localhost
 Source Server Type    : MySQL
 Source Server Version : 80023
 Source Host           : localhost:3306
 Source Schema         : tienda

 Target Server Type    : MySQL
 Target Server Version : 80023
 File Encoding         : 65001

 Date: 06/11/2023 21:57:35
*/

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
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for carrito_producto
-- ----------------------------
DROP TABLE IF EXISTS `carrito_producto`;
CREATE TABLE `carrito_producto`  (
  `idCarritoProducto` int NOT NULL AUTO_INCREMENT,
  `fechaRegistro` datetime NOT NULL,
  `productoId` int NOT NULL,
  `carritoId` int NOT NULL,
  PRIMARY KEY (`idCarritoProducto`) USING BTREE,
  UNIQUE INDEX `carritoProductoUnique`(`carritoId`, `productoId`) USING BTREE,
  INDEX `fkCarritoCopy1Producto1Idx`(`productoId`) USING BTREE,
  INDEX `fkCarritoCopy1Carrito1Idx`(`carritoId`) USING BTREE,
  CONSTRAINT `fkCarritoCopy1Carrito1` FOREIGN KEY (`carritoId`) REFERENCES `carrito` (`idCarrito`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fkCarritoCopy1Producto1` FOREIGN KEY (`productoId`) REFERENCES `producto` (`idProducto`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

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
  UNIQUE INDEX `usuarioUnique`(`nombre`) USING BTREE,
  INDEX `fkCategoriaStatus1Idx`(`statusId`) USING BTREE,
  CONSTRAINT `fkCategoriaStatus1` FOREIGN KEY (`statusId`) REFERENCES `status` (`idStatus`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

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
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

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
  `productoId` int NOT NULL,
  `compraId` int NOT NULL,
  PRIMARY KEY (`idCompraProducto`) USING BTREE,
  UNIQUE INDEX `carritoProductoUnique`(`productoId`, `compraId`) USING BTREE,
  INDEX `fkCarritoCopy1Producto1Idx`(`productoId`) USING BTREE,
  INDEX `fkCompraProductoCompra1Idx`(`compraId`) USING BTREE,
  CONSTRAINT `fkCarritoCopy1Producto10` FOREIGN KEY (`productoId`) REFERENCES `producto` (`idProducto`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fkCompraProductoCompra1` FOREIGN KEY (`compraId`) REFERENCES `compra` (`idCompra`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

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
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

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
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

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
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for envio
-- ----------------------------
DROP TABLE IF EXISTS `envio`;
CREATE TABLE `envio`  (
  `idEnvio` int NOT NULL AUTO_INCREMENT,
  `fechaEnvio` datetime NOT NULL,
  `compraId` int NOT NULL,
  `personaResponsableId` int NOT NULL,
  PRIMARY KEY (`idEnvio`) USING BTREE,
  INDEX `fkEnvioCompra1Idx`(`compraId`) USING BTREE,
  INDEX `fkEnvioPersona1Idx`(`personaResponsableId`) USING BTREE,
  CONSTRAINT `fkEnvioCompra1` FOREIGN KEY (`compraId`) REFERENCES `compra` (`idCompra`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fkEnvioPersona1` FOREIGN KEY (`personaResponsableId`) REFERENCES `persona` (`idPersona`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for genero
-- ----------------------------
DROP TABLE IF EXISTS `genero`;
CREATE TABLE `genero`  (
  `idGenero` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`idGenero`) USING BTREE,
  UNIQUE INDEX `usuarioUnique`(`nombre`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for imagen
-- ----------------------------
DROP TABLE IF EXISTS `imagen`;
CREATE TABLE `imagen`  (
  `idImagen` int NOT NULL AUTO_INCREMENT,
  `formato` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `imagen` longblob NOT NULL,
  `productoId` int NOT NULL,
  PRIMARY KEY (`idImagen`) USING BTREE,
  INDEX `fkImagenProducto1Idx`(`productoId`) USING BTREE,
  CONSTRAINT `fkImagenProducto1` FOREIGN KEY (`productoId`) REFERENCES `producto` (`idProducto`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

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
  PRIMARY KEY (`idPago`) USING BTREE,
  INDEX `fkCarritoPersona1Idx`(`personaId`) USING BTREE,
  INDEX `fkPagoCompra1Idx`(`compraId`) USING BTREE,
  CONSTRAINT `fkCarritoPersona100` FOREIGN KEY (`personaId`) REFERENCES `persona` (`idPersona`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fkPagoCompra1` FOREIGN KEY (`compraId`) REFERENCES `compra` (`idCompra`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

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
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for producto
-- ----------------------------
DROP TABLE IF EXISTS `producto`;
CREATE TABLE `producto`  (
  `idProducto` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `descripcion` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `precio` double NOT NULL,
  `existencia` int NOT NULL,
  `color` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `statusId` int NOT NULL,
  `subcategoriaId` int NOT NULL,
  PRIMARY KEY (`idProducto`) USING BTREE,
  UNIQUE INDEX `usuario_UNIQUE`(`nombre`) USING BTREE,
  INDEX `fkProductoStatus1Idx`(`statusId`) USING BTREE,
  INDEX `fkProductoSubcategoria1Idx`(`subcategoriaId`) USING BTREE,
  CONSTRAINT `fkProductoStatus1` FOREIGN KEY (`statusId`) REFERENCES `status` (`idStatus`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fkProductoSubcategoria1` FOREIGN KEY (`subcategoriaId`) REFERENCES `subcategoria` (`idSubcategoria`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for rol
-- ----------------------------
DROP TABLE IF EXISTS `rol`;
CREATE TABLE `rol`  (
  `idRol` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`idRol`) USING BTREE,
  UNIQUE INDEX `usuario_UNIQUE`(`nombre`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for status
-- ----------------------------
DROP TABLE IF EXISTS `status`;
CREATE TABLE `status`  (
  `idStatus` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`idStatus`) USING BTREE,
  UNIQUE INDEX `usuario_UNIQUE`(`nombre`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

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
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

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
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;
