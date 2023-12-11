import React, { useState, useEffect } from "react";
import { Label, InputGroup, FormGroup, Row, Col, Form, Button } from "reactstrap";
import { Field, ErrorMessage, Formik } from "formik";
import Utileria from "../../util";
import SubCategoriaService from "../../services/SubCategoriaService";
import TallaService from "../../services/TallaService";
import TipoMedidaService from "../../services/TipoMedidaService";
import { PhotoshopPicker } from "react-color";
import DataTable from 'react-data-table-component';
import CategoriaService from "../../services/CategoriaService";
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Formulario = ({ errors, touched, setValues, values, setFieldValue }) => {
  const [subcategorias, setSubcategorias] = useState([]);
  const [tallas, setTallas] = useState([]);
  const [tiposMedida, setTiposMedida] = useState([]);
  const [medida, setMedida] = useState({ medida: "", tipoMedidaId: "", tallaId: "" });
  const [categorias, setCategorias] = useState([]);

  const [estadoFormulario, setEstadoFormulario] = useState({
    colores: [],
    medidas: [],
    imagenes: []
  });

  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [currentColor, setCurrentColor] = useState({ color: "#ffffff" });


  const listarCategorias = () => {
    CategoriaService.listar().then(({ data }) => {
      setCategorias(data);
    }).catch((e) => {
      Utileria.errorhttp(e);
    });
  };

  useEffect(() => {
    listarCategorias();
  }, []);

  const columnas = [
    {
      name: 'NO.',
      center: true,
      selector: row => row.indice,
      width: "10%"
    },
    {
      name: 'TALLA',
      center: true,
      selector: row => row.talla.nombre,
    },
    {
      name: 'TIPO DE MEDIDA',
      center: true,
      selector: row => row.tipoMedida.nombre,
    },
    {
      name: 'MEDIDA',
      center: true,
      selector: row => row.medida,
    },
    {
      name: 'ACCIONES',
      center: true,
      cell: (row, index) => (
        <Button onClick={() => eliminarMedida(row, index)} outline className="my-2 border-0 btn-transition" color="danger">
          <i className="pe-7s-trash" style={{ fontSize: 19 }} />
        </Button>
      ),
    }
  ];

  const sinResultados = (
    <div className="text-center">
      <p>Sin resultados disponibles</p>
    </div>
  );


  const eliminarMedida = (row, index) => {
    const updatedMedidas = [...estadoFormulario.medidas];
    updatedMedidas.splice(index, 1);
    setEstadoFormulario({ ...estadoFormulario, medidas: updatedMedidas });
    setValues({ ...values, medidas: updatedMedidas });
  };
  const handleColorChange = (color) => {
    setCurrentColor({ color: color.hex });
  };

  const handleColorAdd = () => {
    const updatedColores = [...estadoFormulario.colores, currentColor];
    setEstadoFormulario({ ...estadoFormulario, colores: updatedColores });
    setDisplayColorPicker(false);
    setValues({ ...values, colores: updatedColores });
  };

  const handleRemoveColor = (index) => {
    const updatedColores = estadoFormulario.colores.filter((_, i) => i !== index);
    setEstadoFormulario({ ...estadoFormulario, colores: updatedColores });
    setValues({ ...values, colores: updatedColores });
  };



  const listarSubctategorias = () => {
    SubCategoriaService.listar()
      .then(({ data }) => {
        setSubcategorias(data.map((item) => ({ ...item, nombreCompleto: `${item?.categoria?.nombre} / ${item.nombre}` })));
      })
      .catch((e) => {
        Utileria.errorhttp(e);
      });
  };

  const listarTallas = () => {
    TallaService.listar()
      .then(({ data }) => {
        setTallas(data);
      })
      .catch((e) => {
        Utileria.errorhttp(e);
      });
  };

  const listarTiposMedidas = () => {
    TipoMedidaService.listar()
      .then(({ data }) => {
        setTiposMedida(data);
      })
      .catch((e) => {
        Utileria.errorhttp(e);
      });
  };

  const agregarMedida = () => {
    const { medida: medidaValue, tallaId, tipoMedidaId } = medida;

    if (!medidaValue || !tallaId || !tipoMedidaId) {
      Utileria.catchError("Complete los campos");
    } else {
      const talla = tallas.find((item) => item.idTalla == tallaId)
      const tipoMedida = tiposMedida.find((item) => item.idTipoMedida == tipoMedidaId);

      const nuevaMedida = { medida: medidaValue, tipoMedidaId, tallaId, talla, tipoMedida };

      let updatedMedidas = [...estadoFormulario.medidas, nuevaMedida];

      setEstadoFormulario({ ...estadoFormulario, medidas: updatedMedidas });
      setValues({ ...values, medidas: updatedMedidas });
      setMedida({ medida: "", tipoMedidaId: "", tallaId: "" });
    }
  };





  const handleFileChange = (event) => {

    const maxAllowedFiles = 2;
    const countImages = estadoFormulario.imagenes?.length || 0;

    if (countImages > maxAllowedFiles) {
      Utileria.catchError(`Selecciona como máximo 3 archivos.`);

      setEstadoFormulario({ ...estadoFormulario, imagen: '' });
      setValues({ ...values, imagen: '' });
    } else {

      const file = event.currentTarget.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {

        const newImageBase64 = reader.result;
        let updatedImages = [...estadoFormulario.imagenes, newImageBase64];

        setEstadoFormulario({ ...estadoFormulario, imagenes: updatedImages, imagen: '' });
        setValues({ ...values, imagenes: updatedImages, imagen: '' });



      };
      reader.readAsDataURL(file);

    }


  };

  const handleRemoveImage = (index) => {

    const updatedImages = [...estadoFormulario.imagenes];

    updatedImages.splice(index, 1);


    setEstadoFormulario({ ...estadoFormulario, imagenes: updatedImages });
    setValues({ ...values, imagenes: updatedImages });

  };



  useEffect(() => {
    listarSubctategorias();
    listarTallas();
    listarTiposMedidas();

    values.colores && setEstadoFormulario((prevState) => ({
      ...prevState,
      colores: values.colores
    }));

    values.medidas && setEstadoFormulario((prevState) => ({
      ...prevState,
      medidas: values.medidas
    }));

    values.imagenes && setEstadoFormulario((prevState) => ({
      ...prevState,
      imagenes: values.imagenes
    }));

  }, []);



  return (
    <>
      <Form role="form">
        <Row>
          <Col>
            <FormGroup
              className={Utileria.claseInputForm(errors.nombre, touched.nombre)}
            >
              <Label htmlFor="nombre">Nombre:</Label>
              <InputGroup className="input-group-alternative">
                <Field
                  className="form-control"
                  placeholder="Nombre del producto"
                  id="nombre"
                  name="nombre"
                  type="text"
                  autoComplete="off"
                  required
                />
              </InputGroup>
              <ErrorMessage
                name="nombre"
                component={() => (
                  <small className="text-danger">{errors.nombre}</small>
                )}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup
              className={Utileria.claseInputForm(
                errors.categoriaId,
                touched.categoriaId
              )}
            >
              <Label htmlFor="categoriaId">Categoría:</Label>
              <InputGroup className="input-group-alternative">
                <Field
                  className="form-control"
                  placeholder="Ingrese..."
                  id="categoriaId"
                  name="categoriaId"
                  type="number"
                  autoComplete="off"
                  required
                  as="select"
                >
                  <option value="">Seleccione...</option>
                  {categorias.map((item) => (
                    <option
                      key={item.idCategoria}
                      value={item.idCategoria}
                    >
                      {item.nombre}
                    </option>
                  ))}
                </Field>
              </InputGroup>
              <ErrorMessage
                name="categoriaId"
                component={() => (
                  <small className="text-danger">{errors.categoriaId}</small>
                )}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup
              className={Utileria.claseInputForm(
                errors.subcategoriaId,
                touched.subcategoriaId
              )}
            >
              <Label htmlFor="subcategoriaId">Subcategoría:</Label>
              <InputGroup className="input-group-alternative">
                <Field
                  className="form-control"
                  placeholder="Ingrese..."
                  id="subcategoriaId"
                  name="subcategoriaId"
                  type="number"
                  autoComplete="off"
                  required
                  as="select"
                >
                  <option value="">Seleccione...</option>
                  {subcategorias.map((item) => (
                    <option
                      key={item.idSubcategoria}
                      value={item.idSubcategoria}
                    >
                      {`${item?.categoria?.nombre} / ${item.nombre}`}
                    </option>
                  ))}
                </Field>
              </InputGroup>
              <ErrorMessage
                name="subcategoriaId"
                component={() => (
                  <small className="text-danger">{errors.subcategoriaId}</small>
                )}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col>
            <FormGroup
              className={Utileria.claseInputForm(
                errors.descripcion,
                touched.descripcion
              )}
            >
              <Label htmlFor="nombre">Descripción:</Label>
              <InputGroup className="input-group-alternative">
                <Field
                  className="form-control"
                  placeholder="Ingrese alguna descripción"
                  id="descripcion"
                  name="descripcion"
                  type="textarea"
                  autoComplete="off"
                  required
                  as="textarea"
                />
              </InputGroup>
              <ErrorMessage
                name="descripcion"
                component={() => (
                  <small className="text-danger">{errors.descripcion}</small>
                )}
              />
            </FormGroup>
          </Col>
          <Col>
            <div>
              <label style={{ marginRight: 40 }}>Selecciona colores:</label>
              <i
                className="pe-7s-paint border-0 btn-transition"
                style={{ fontSize: 24, color: "purple", cursor: "pointer" }}
                onClick={() => setDisplayColorPicker(!displayColorPicker)}
              />
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {estadoFormulario.colores.map(({ color }, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: color,
                      width: "30px",
                      height: "30px",
                      margin: "5px",
                      border: "1px solid black",
                      display: "flex", // Usa flexbox
                      justifyContent: "center", // Centra horizontalmente
                      alignItems: "center", // Centra verticalmente
                    }}

                  >
                    <a
                      className="text-white"
                      onClick={() => handleRemoveColor(index)}
                      style={{ fontSize: 24, color: "purple", cursor: "pointer" }}
                    >
                      x
                    </a>
                  </div>
                ))}
              </div>
              <div style={{ position: "relative" }}>
                {displayColorPicker && (
                  <div style={{ position: "absolute", zIndex: "2" }}>
                    <PhotoshopPicker
                      color={currentColor.color}
                      onChange={handleColorChange}
                      onAccept={handleColorAdd}
                      onCancel={() =>
                        setDisplayColorPicker(!displayColorPicker)
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={4}>
            <Label htmlFor="tallaId">Talla:</Label>
            <InputGroup className="input-group-alternative">
              <Field
                className="form-control"
                placeholder="Ingrese..."
                id="tallaId"
                name="tallaId"
                type="number"
                autoComplete="off"
                required
                as="select"
                value={medida.tallaId}
                onChange={(e) => { setMedida({ ...medida, tallaId: e.target.value }) }}
              >
                <option value="">Seleccione...</option>
                {tallas.map((item) => (
                  <option
                    key={item.idTalla}
                    value={item.idTalla}
                  >
                    {item.nombre}
                  </option>
                ))}
              </Field>
            </InputGroup>
          </Col>
          <Col md={4}>

            <Label htmlFor="tipoMedidaId">Tipo de medida:</Label>
            <InputGroup className="input-group-alternative">
              <Field
                className="form-control"
                placeholder="Ingrese..."
                id="tipoMedidaId"
                name="tipoMedidaId"
                type="number"
                autoComplete="off"
                required
                as="select"
                value={medida.tipoMedidaId}
                onChange={(e) => { setMedida({ ...medida, tipoMedidaId: e.target.value }) }}
              >
                <option value="">Seleccione...</option>
                {tiposMedida.map((item) => (
                  <option
                    key={item.idTipoMedida}
                    value={item.idTipoMedida}
                  >
                    {item.nombre}
                  </option>
                ))}
              </Field>
            </InputGroup>

          </Col>
          <Col>

            <Label htmlFor="medida">Medida:</Label>
            <InputGroup className="input-group-alternative">
              <Field
                className="form-control"
                placeholder="Ingrese medida..."
                id="medida"
                name="medida"
                type="text"
                autoComplete="off"
                required
                value={medida.medida}
                onChange={(e) => { setMedida({ ...medida, medida: e.target.value }) }}
              />
            </InputGroup>

          </Col>
          <Col md="2" className="text-center mt-4">
            <i className="pe-7s-plus btn-outline-2x hand col-2" style={{ fontSize: '2.5em' }}
              size="lg" onClick={() => agregarMedida()} />
          </Col>
        </Row>
        <Row>
          <Col>
            <DataTable
              columns={columnas}
              data={estadoFormulario.medidas}
              subHeader
              persistTableHead
              paginationComponentOptions={{
                rowsPerPageText: 'Filas por página',
                rangeSeparatorText: 'de',
                selectAllRowsItem: true,
                selectAllRowsItemText: 'Todos'
              }}
              pagination
              dense
              noDataComponent={sinResultados}
            />

          </Col>
        </Row>
        <Row className="mt-4 justify-content-center" >
          <Col md="4" >
            <FormGroup
              className={Utileria.claseInputForm(errors.imagen, touched.imagen)}
            >
              <Label htmlFor="nombre">Imagen:</Label>
              <InputGroup className="input-group-alternative">

                <Field
                  placeholder="Seleccione imagen"
                  className="form-control"
                  autoComplete="off"
                  type="file"
                  id="imagen"
                  name="imagen"
                  accept="image/*"
                  onChange={(event) => handleFileChange(event)}
                />


              </InputGroup>
              <ErrorMessage
                name="imagen"
                component={() => (
                  <small className="text-danger">{errors.imagen}</small>
                )}
              />
            </FormGroup>
          </Col>


        </Row>
        <Row className="mt-1 justify-content-center" >
          <Col md="12" className="justify-content-center">
            <FormGroup>
              <InputGroup className="input-group-alternative">

                {values.imagenes && (
                  values.imagenes.map((imagen, index) => {
                    return <div className="mt-1  justify-content-center align-items-center" key={index} >

                      <img src={imagen} alt="Imagen cargada" className="mt-2 mr-4" style={{ height: "30vh" }} />
                      <br />
                      <a
                        className="text-black ml-6"
                        onClick={() => handleRemoveImage(index)}
                        style={{ fontSize: 24, color: "black", cursor: "pointer", marginLeft: "50%" }}
                      >
                        x
                      </a>
                    </div>
                  })

                )}


              </InputGroup>

            </FormGroup>
          </Col>
        </Row>

      </Form>
    </>
  );
};

export default Formulario;
