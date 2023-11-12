import {ENDPOINT} from "../config/ApiConfig";

export default class ServiceConstant {

    static LOGIN =  `${ENDPOINT}auth/login`;

    static CATEGORIA_LISTAR =  `${ENDPOINT}categoria`;
    static CATEGORIA_REGISTRAR =  `${ENDPOINT}categoria/registrar`;
    static CATEGORIA_OBTENER =  `${ENDPOINT}categoria/obtener`;
    static CATEGORIA_ACTUALIZAR =  `${ENDPOINT}categoria/actualizar`;
    static CATEGORIA_ELIMINAR =  `${ENDPOINT}categoria/eliminar`;

    static PRODUCTO_LISTAR =  `${ENDPOINT}producto`;
    static PRODUCTO_REGISTRAR =  `${ENDPOINT}producto/registrar`;
    static PRODUCTO_OBTENER =  `${ENDPOINT}producto/obtener`;
    static PRODUCTO_ACTUALIZAR =  `${ENDPOINT}producto/actualizar`;
    static PRODUCTO_ELIMINAR =  `${ENDPOINT}producto/eliminar`;

    static SUBCATEGORIA_LISTAR =  `${ENDPOINT}subcategoria`;
    static SUBCATEGORIA_REGISTRAR =  `${ENDPOINT}subcategoria/registrar`;
    static SUBCATEGORIA_OBTENER =  `${ENDPOINT}subcategoria/obtener`;
    static SUBCATEGORIA_ACTUALIZAR =  `${ENDPOINT}subcategoria/actualizar`;
    static SUBCATEGORIA_ELIMINAR =  `${ENDPOINT}subcategoria/eliminar`;

    static USUARIO_LISTAR =  `${ENDPOINT}usuario`;
    static USUARIO_REGISTRAR =  `${ENDPOINT}usuario/registrar`;
    static USUARIO_OBTENER =  `${ENDPOINT}usuario/obtener`;
    static USUARIO_ACTUALIZAR =  `${ENDPOINT}usuario/actualizar`;
    static USUARIO_ELIMINAR =  `${ENDPOINT}usuario/eliminar`;

}