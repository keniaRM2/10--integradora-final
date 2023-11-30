const constantes = {
    ROL_CLIENTE: "Cliente",
    ROL_ADMINISTRADOR: "Administrador",
    ESTATUS_ACTIVO: "Activo",
    ESTATUS_INACTIVO: "Inactivo",
    GENERO_MASCULINO: "Masculino",
    GENERO_FEMENINO: "Femenino",
    TALLAS: ["XS (Extra Pequeño)", "S (Pequeño)", "M (Mediano)",
        "L (Grande)", "XL (Extra Grande)", "XXL (Extra Extra Grande)", "Unitalla", "No aplica"],
    TIPOS_MEDIDAS: ["Largo", "Largo de la manga", "Pecho", "Puño", "Contorno bíceps",
        "Contorno cintura", "Hombro", "Contorno caderas", "Muslo", "Entrepierna"]
}

constantes.ROLES = [constantes.ROL_ADMINISTRADOR, constantes.ROL_CLIENTE];
constantes.ESTATUS = [constantes.ESTATUS_ACTIVO, constantes.ESTATUS_INACTIVO];
constantes.GENEROS = [constantes.GENERO_MASCULINO, constantes.GENERO_FEMENINO];
constantes.CATEGORIAS = [{
    nombre: "Mujer",
    subcategorias: [
        "Vestidos", "Blusas", "Crops",
        "Trajes de baño", "Short",
        "Cardigan", "Swearters", "Accesosios"
    ]
},
{
    nombre: "Hombre",
    subcategorias: [
        "Calcetines"
    ]
},
{
    nombre: "Niña",
    subcategorias: [
        "Calcetines"
    ]
},
{
    nombre: "Niño",
    subcategorias: [
        "Calcetines"
    ]
},
{
    nombre: "Bebé",
    subcategorias: [
        "Calcetines"
    ]
},
{
    nombre: "Mascota",
    subcategorias: [
        "Calcetines"
    ]
},
{
    nombre: "Peluches",
    subcategorias: [
        "Calcetines"
    ]
}
];




module.exports = constantes;