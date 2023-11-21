-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema shop
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema shop
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `shop` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ;
USE `shop` ;

-- -----------------------------------------------------
-- Table `shop`.`genero`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`genero` (
  `idGenero` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) CHARACTER SET 'utf8' NOT NULL,
  PRIMARY KEY USING BTREE (`idGenero`),
  UNIQUE INDEX `usuarioUnique` USING BTREE (`nombre`) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci
ROW_FORMAT = DYNAMIC;


-- -----------------------------------------------------
-- Table `shop`.`persona`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`persona` (
  `idPersona` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) CHARACTER SET 'utf8' NOT NULL,
  `primerApellido` VARCHAR(100) CHARACTER SET 'utf8' NOT NULL,
  `segundoApellido` VARCHAR(100) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  `fechaNacimiento` DATE NOT NULL,
  `generoId` INT(11) NOT NULL,
  PRIMARY KEY USING BTREE (`idPersona`),
  INDEX `fkPersonaGenero1Idx` USING BTREE (`generoId`) VISIBLE,
  CONSTRAINT `fkPersonaGenero1`
    FOREIGN KEY (`generoId`)
    REFERENCES `shop`.`genero` (`idGenero`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci
ROW_FORMAT = DYNAMIC;


-- -----------------------------------------------------
-- Table `shop`.`carrito`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`carrito` (
  `idCarrito` INT(11) NOT NULL AUTO_INCREMENT,
  `fechaActualizacion` DATETIME NOT NULL,
  `total` DOUBLE NOT NULL,
  `personaId` INT(11) NOT NULL,
  PRIMARY KEY USING BTREE (`idCarrito`),
  UNIQUE INDEX `personaId_UNIQUE` USING BTREE (`personaId`) VISIBLE,
  INDEX `fkCarritoPersona1Idx` USING BTREE (`personaId`) VISIBLE,
  CONSTRAINT `fkCarritoPersona1`
    FOREIGN KEY (`personaId`)
    REFERENCES `shop`.`persona` (`idPersona`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci
ROW_FORMAT = DYNAMIC;


-- -----------------------------------------------------
-- Table `shop`.`status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`status` (
  `idStatus` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) CHARACTER SET 'utf8' NOT NULL,
  PRIMARY KEY USING BTREE (`idStatus`),
  UNIQUE INDEX `status_UNIQUE` USING BTREE (`nombre`) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci
ROW_FORMAT = DYNAMIC;


-- -----------------------------------------------------
-- Table `shop`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`categoria` (
  `idCategoria` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) CHARACTER SET 'utf8' NOT NULL,
  `descripcion` TEXT CHARACTER SET 'utf8' NOT NULL,
  `statusId` INT(11) NOT NULL,
  PRIMARY KEY USING BTREE (`idCategoria`),
  UNIQUE INDEX `categoriaUnique` USING BTREE (`nombre`) VISIBLE,
  INDEX `fkCategoriaStatus1Idx` USING BTREE (`statusId`) VISIBLE,
  CONSTRAINT `fkCategoriaStatus1`
    FOREIGN KEY (`statusId`)
    REFERENCES `shop`.`status` (`idStatus`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci
ROW_FORMAT = DYNAMIC;


-- -----------------------------------------------------
-- Table `shop`.`subcategoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`subcategoria` (
  `idSubcategoria` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) CHARACTER SET 'utf8' NOT NULL,
  `categoriaId` INT(11) NOT NULL,
  PRIMARY KEY USING BTREE (`idSubcategoria`),
  UNIQUE INDEX `subcategoriaUnique` USING BTREE (`nombre`, `categoriaId`) VISIBLE,
  INDEX `fkSubcategoriaCategoria1Idx` USING BTREE (`categoriaId`) VISIBLE,
  CONSTRAINT `fkSubcategoriaCategoria1`
    FOREIGN KEY (`categoriaId`)
    REFERENCES `shop`.`categoria` (`idCategoria`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci
ROW_FORMAT = DYNAMIC;


-- -----------------------------------------------------
-- Table `shop`.`producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`producto` (
  `idProducto` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) CHARACTER SET 'utf8' NOT NULL,
  `descripcion` TEXT CHARACTER SET 'utf8' NOT NULL,
  `statusId` INT(11) NOT NULL,
  `subcategoriaId` INT(11) NOT NULL,
  PRIMARY KEY USING BTREE (`idProducto`),
  UNIQUE INDEX `producto_UNIQUE` USING BTREE (`nombre`) VISIBLE,
  INDEX `fkProductoStatus1Idx` USING BTREE (`statusId`) VISIBLE,
  INDEX `fkProductoSubcategoria1Idx` USING BTREE (`subcategoriaId`) VISIBLE,
  CONSTRAINT `fkProductoStatus1`
    FOREIGN KEY (`statusId`)
    REFERENCES `shop`.`status` (`idStatus`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fkProductoSubcategoria1`
    FOREIGN KEY (`subcategoriaId`)
    REFERENCES `shop`.`subcategoria` (`idSubcategoria`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci
ROW_FORMAT = DYNAMIC;


-- -----------------------------------------------------
-- Table `shop`.`color`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`color` (
  `idColor` INT(11) NOT NULL,
  `color` VARCHAR(45) NOT NULL,
  `productoId` INT(11) NOT NULL,
  PRIMARY KEY (`idColor`),
  INDEX `fk_colorProducto_producto1_idx` (`productoId` ASC) VISIBLE,
  CONSTRAINT `fk_colorProducto_producto1`
    FOREIGN KEY (`productoId`)
    REFERENCES `shop`.`producto` (`idProducto`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `shop`.`talla`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`talla` (
  `idTalla` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(25) NOT NULL,
  PRIMARY KEY (`idTalla`),
  UNIQUE INDEX `nombre` (`nombre` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `shop`.`stock`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`stock` (
  `idStock` INT(11) NOT NULL AUTO_INCREMENT,
  `precio` DOUBLE NOT NULL,
  `existencia` INT(11) NOT NULL,
  `productoid` INT(11) NOT NULL,
  `tallaId` INT(11) NULL DEFAULT NULL,
  `colorId` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idStock`),
  INDEX `fk_existencia_producto1_idx` (`productoid` ASC) VISIBLE,
  INDEX `fk_existencia_talla1_idx` (`tallaId` ASC) VISIBLE,
  INDEX `fk_existencia_color1_idx` (`colorId` ASC) VISIBLE,
  CONSTRAINT `fk_existencia_color1`
    FOREIGN KEY (`colorId`)
    REFERENCES `shop`.`color` (`idColor`),
  CONSTRAINT `fk_existencia_producto1`
    FOREIGN KEY (`productoid`)
    REFERENCES `shop`.`producto` (`idProducto`),
  CONSTRAINT `fk_existencia_talla1`
    FOREIGN KEY (`tallaId`)
    REFERENCES `shop`.`talla` (`idTalla`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `shop`.`carrito_producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`carrito_producto` (
  `idCarritoProducto` INT(11) NOT NULL AUTO_INCREMENT,
  `fechaRegistro` DATETIME NOT NULL,
  `carritoId` INT(11) NOT NULL,
  `stockId` INT(11) NOT NULL,
  PRIMARY KEY USING BTREE (`idCarritoProducto`),
  UNIQUE INDEX `carritoProductoUnique` USING BTREE (`carritoId`) VISIBLE,
  INDEX `fkCarritoCopy1Carrito1Idx` USING BTREE (`carritoId`) VISIBLE,
  INDEX `fk_carrito_producto_stock1_idx` (`stockId` ASC) VISIBLE,
  CONSTRAINT `fkCarritoCopy1Carrito1`
    FOREIGN KEY (`carritoId`)
    REFERENCES `shop`.`carrito` (`idCarrito`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_carrito_producto_stock1`
    FOREIGN KEY (`stockId`)
    REFERENCES `shop`.`stock` (`idStock`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci
ROW_FORMAT = DYNAMIC;


-- -----------------------------------------------------
-- Table `shop`.`compra`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`compra` (
  `idCompra` INT(11) NOT NULL AUTO_INCREMENT,
  `fechaCompra` DATETIME NOT NULL,
  `total` DOUBLE NOT NULL,
  `montoPagado` DOUBLE NOT NULL,
  `personaId` INT(11) NOT NULL,
  `statusId` INT(11) NOT NULL,
  PRIMARY KEY USING BTREE (`idCompra`),
  INDEX `fkCarritoPersona1Idx` USING BTREE (`personaId`) VISIBLE,
  INDEX `fkCompraStatus1Idx` USING BTREE (`statusId`) VISIBLE,
  CONSTRAINT `fkCarritoPersona10`
    FOREIGN KEY (`personaId`)
    REFERENCES `shop`.`persona` (`idPersona`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fkCompraStatus1`
    FOREIGN KEY (`statusId`)
    REFERENCES `shop`.`status` (`idStatus`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci
ROW_FORMAT = DYNAMIC;


-- -----------------------------------------------------
-- Table `shop`.`compra_producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`compra_producto` (
  `idCompraProducto` INT(11) NOT NULL AUTO_INCREMENT,
  `cantidad` INT(11) NOT NULL,
  `precio` DOUBLE NOT NULL,
  `total` DOUBLE NOT NULL,
  `comentario` VARCHAR(255) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  `compraId` INT(11) NOT NULL,
  `stockId` INT(11) NOT NULL,
  PRIMARY KEY USING BTREE (`idCompraProducto`),
  INDEX `fkCompraProductoCompra1Idx` USING BTREE (`compraId`) VISIBLE,
  INDEX `fk_compra_producto_stock1_idx` (`stockId` ASC) VISIBLE,
  CONSTRAINT `fkCompraProductoCompra1`
    FOREIGN KEY (`compraId`)
    REFERENCES `shop`.`compra` (`idCompra`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_compra_producto_stock1`
    FOREIGN KEY (`stockId`)
    REFERENCES `shop`.`stock` (`idStock`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci
ROW_FORMAT = DYNAMIC;


-- -----------------------------------------------------
-- Table `shop`.`pago`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`pago` (
  `idPago` INT(11) NOT NULL AUTO_INCREMENT,
  `fechaPago` DATETIME NOT NULL,
  `monto` DOUBLE NOT NULL,
  `personaId` INT(11) NOT NULL,
  `compraId` INT(11) NOT NULL,
  PRIMARY KEY USING BTREE (`idPago`),
  INDEX `fkCarritoPersona1Idx` USING BTREE (`personaId`) VISIBLE,
  INDEX `fkPagoCompra1Idx` USING BTREE (`compraId`) VISIBLE,
  CONSTRAINT `fkCarritoPersona100`
    FOREIGN KEY (`personaId`)
    REFERENCES `shop`.`persona` (`idPersona`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fkPagoCompra1`
    FOREIGN KEY (`compraId`)
    REFERENCES `shop`.`compra` (`idCompra`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci
ROW_FORMAT = DYNAMIC;


-- -----------------------------------------------------
-- Table `shop`.`comprobante`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`comprobante` (
  `idComprobante` INT(11) NOT NULL AUTO_INCREMENT,
  `formato` VARCHAR(5) CHARACTER SET 'utf8' NOT NULL,
  `imagen` LONGBLOB NOT NULL,
  `pagoId` INT(11) NOT NULL,
  PRIMARY KEY USING BTREE (`idComprobante`),
  UNIQUE INDEX `comprobanteCompraUnique` USING BTREE (`pagoId`) VISIBLE,
  INDEX `fkComprobantePago1Idx` USING BTREE (`pagoId`) VISIBLE,
  CONSTRAINT `fkComprobantePago1`
    FOREIGN KEY (`pagoId`)
    REFERENCES `shop`.`pago` (`idPago`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci
ROW_FORMAT = DYNAMIC;


-- -----------------------------------------------------
-- Table `shop`.`contacto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`contacto` (
  `idContacto` INT(11) NOT NULL AUTO_INCREMENT,
  `correoElectronico` VARCHAR(100) CHARACTER SET 'utf8' NOT NULL,
  `telefonoPrincipal` VARCHAR(15) CHARACTER SET 'utf8' NOT NULL,
  `telefonoSecundario` VARCHAR(15) CHARACTER SET 'utf8' NOT NULL,
  `personaId` INT(11) NOT NULL,
  PRIMARY KEY USING BTREE (`idContacto`),
  UNIQUE INDEX `personaIdPersonaUnique` USING BTREE (`personaId`) VISIBLE,
  INDEX `fkContactoPersona1Idx` USING BTREE (`personaId`) VISIBLE,
  CONSTRAINT `fkContactoPersona1`
    FOREIGN KEY (`personaId`)
    REFERENCES `shop`.`persona` (`idPersona`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci
ROW_FORMAT = DYNAMIC;


-- -----------------------------------------------------
-- Table `shop`.`direccion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`direccion` (
  `idDireccion` INT(11) NOT NULL AUTO_INCREMENT,
  `numeroInterior` VARCHAR(5) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  `numeroExterior` VARCHAR(5) CHARACTER SET 'utf8' NOT NULL,
  `calle` VARCHAR(100) CHARACTER SET 'utf8' NOT NULL,
  `colonia` VARCHAR(100) CHARACTER SET 'utf8' NOT NULL,
  `municipio` VARCHAR(100) CHARACTER SET 'utf8' NOT NULL,
  `entidadFederativa` VARCHAR(100) CHARACTER SET 'utf8' NOT NULL,
  `personaId` INT(11) NOT NULL,
  PRIMARY KEY USING BTREE (`idDireccion`),
  UNIQUE INDEX `personaId` USING BTREE (`personaId`) VISIBLE,
  CONSTRAINT `fkDireccionPersona1`
    FOREIGN KEY (`personaId`)
    REFERENCES `shop`.`persona` (`idPersona`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci
ROW_FORMAT = DYNAMIC;


-- -----------------------------------------------------
-- Table `shop`.`envio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`envio` (
  `idEnvio` INT(11) NOT NULL AUTO_INCREMENT,
  `fechaEnvio` DATETIME NOT NULL,
  `fechaEntrega` DATETIME NULL,
  `compraId` INT(11) NOT NULL,
  `personaResponsableId` INT(11) NOT NULL,
  `statusId` INT(11) NOT NULL,
  PRIMARY KEY USING BTREE (`idEnvio`),
  INDEX `fkEnvioCompra1Idx` USING BTREE (`compraId`) VISIBLE,
  INDEX `fkEnvioPersona1Idx` USING BTREE (`personaResponsableId`) VISIBLE,
  INDEX `fk_envio_status1_idx` (`statusId` ASC) VISIBLE,
  CONSTRAINT `fkEnvioCompra1`
    FOREIGN KEY (`compraId`)
    REFERENCES `shop`.`compra` (`idCompra`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fkEnvioPersona1`
    FOREIGN KEY (`personaResponsableId`)
    REFERENCES `shop`.`persona` (`idPersona`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_envio_status1`
    FOREIGN KEY (`statusId`)
    REFERENCES `shop`.`status` (`idStatus`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci
ROW_FORMAT = DYNAMIC;


-- -----------------------------------------------------
-- Table `shop`.`imagen`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`imagen` (
  `idImagen` INT(11) NOT NULL AUTO_INCREMENT,
  `formato` VARCHAR(5) CHARACTER SET 'utf8' NOT NULL,
  `imagen` LONGBLOB NOT NULL,
  `productoId` INT(11) NULL,
  `subcategoriaId` INT(11) NULL,
  `categoriaId` INT(11) NULL,
  PRIMARY KEY USING BTREE (`idImagen`),
  INDEX `fkImagenProducto1Idx` USING BTREE (`productoId`) VISIBLE,
  INDEX `fk_imagen_subcategoria1_idx` (`subcategoriaId` ASC) VISIBLE,
  INDEX `fk_imagen_categoria1_idx` (`categoriaId` ASC) VISIBLE,
  CONSTRAINT `fkImagenProducto1`
    FOREIGN KEY (`productoId`)
    REFERENCES `shop`.`producto` (`idProducto`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_imagen_subcategoria1`
    FOREIGN KEY (`subcategoriaId`)
    REFERENCES `shop`.`subcategoria` (`idSubcategoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_imagen_categoria1`
    FOREIGN KEY (`categoriaId`)
    REFERENCES `shop`.`categoria` (`idCategoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci
ROW_FORMAT = DYNAMIC;


-- -----------------------------------------------------
-- Table `shop`.`tipomedida`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`tipomedida` (
  `idTipoMedida` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(25) NOT NULL,
  PRIMARY KEY (`idTipoMedida`),
  UNIQUE INDEX `nombre` (`nombre` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `shop`.`medida`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`medida` (
  `idMedida` INT(11) NOT NULL AUTO_INCREMENT,
  `medida` VARCHAR(25) NOT NULL,
  `tipoMedidaId` INT(11) NOT NULL,
  `tallaId` INT(11) NOT NULL,
  `productoId` INT(11) NOT NULL,
  PRIMARY KEY (`idMedida`),
  INDEX `fk_medida_tipoMedida1_idx` (`tipoMedidaId` ASC) VISIBLE,
  INDEX `fk_medida_talla1_idx` (`tallaId` ASC) VISIBLE,
  INDEX `fk_medida_producto1_idx` (`productoId` ASC) VISIBLE,
  CONSTRAINT `fk_medida_producto1`
    FOREIGN KEY (`productoId`)
    REFERENCES `shop`.`producto` (`idProducto`),
  CONSTRAINT `fk_medida_talla1`
    FOREIGN KEY (`tallaId`)
    REFERENCES `shop`.`talla` (`idTalla`),
  CONSTRAINT `fk_medida_tipoMedida1`
    FOREIGN KEY (`tipoMedidaId`)
    REFERENCES `shop`.`tipomedida` (`idTipoMedida`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `shop`.`rol`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`rol` (
  `idRol` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) CHARACTER SET 'utf8' NOT NULL,
  PRIMARY KEY USING BTREE (`idRol`),
  UNIQUE INDEX `usuario_UNIQUE` USING BTREE (`nombre`) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci
ROW_FORMAT = DYNAMIC;


-- -----------------------------------------------------
-- Table `shop`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`usuario` (
  `idUsuario` INT(11) NOT NULL AUTO_INCREMENT,
  `usuario` VARCHAR(100) CHARACTER SET 'utf8' NOT NULL,
  `contrasena` VARCHAR(100) CHARACTER SET 'utf8' NOT NULL,
  `fechaRegistro` DATETIME NOT NULL,
  `rolId` INT(11) NOT NULL,
  `statusId` INT(11) NOT NULL,
  `personaId` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY USING BTREE (`idUsuario`),
  UNIQUE INDEX `usuarioUnique` USING BTREE (`usuario`) VISIBLE,
  UNIQUE INDEX `personaIdUnique` USING BTREE (`personaId`) VISIBLE,
  INDEX `fkUsuarioRolIdx` USING BTREE (`rolId`) VISIBLE,
  INDEX `fkUsuarioStatus1Idx` USING BTREE (`statusId`) VISIBLE,
  INDEX `fkUsuarioPersona1Idx` USING BTREE (`personaId`) VISIBLE,
  CONSTRAINT `fkUsuarioPersona1`
    FOREIGN KEY (`personaId`)
    REFERENCES `shop`.`persona` (`idPersona`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fkUsuarioRol`
    FOREIGN KEY (`rolId`)
    REFERENCES `shop`.`rol` (`idRol`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fkUsuarioStatus1`
    FOREIGN KEY (`statusId`)
    REFERENCES `shop`.`status` (`idStatus`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci
ROW_FORMAT = DYNAMIC;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
