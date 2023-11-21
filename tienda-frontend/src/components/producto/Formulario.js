import React, { Fragment, useState, useEffect } from "react";
import {
  Label,
  InputGroup,
  FormGroup,
  Row,
  Col,
  Input,
  Button,
  Table,
} from "reactstrap";
import { Form, Field, ErrorMessage, Formik, FieldArray } from "formik";
import Utileria from "../../util";
import SubCategoriaService from "../../services/SubCategoriaService";
import { ta, tr } from "date-fns/locale";
import { PhotoshopPicker } from "react-color";

const Formulario = (props) => {
  let { errors, touched } = props;

  let [subcategorias, setSubcategorias] = useState([]);

  let [state, setState] = useState(false);

  const [selectedColores, setSelectedColores] = useState([]);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [currentColor, setCurrentColor] = useState("#ffffff"); // Color inicial

  const handleColorChange = (color) => {
    setCurrentColor(color.hex);
  };

  const handleColorAdd = () => {
    setSelectedColores([...selectedColores, currentColor]);
    setDisplayColorPicker(false);
  };
  const handleRemoveColor = (index) => {
    const updatedColores = [...selectedColores];
    updatedColores.splice(index, 1);
    setSelectedColores(updatedColores);
  };

  const listarSubctategorias = () => {
    SubCategoriaService.listar()
      .then(({ data }) => {
        setSubcategorias(data);
      })
      .catch((e) => {
        Utileria.errorhttp(e);
      });
  };

  let [tallasSeleccionadas, setTallasSeleccionadas] = useState([]);

  const listaTallas = [
    {
      id: 1,
      nombre: "S",
      active: true,
    },
    {
      id: 2,
      nombre: "M",
      active: true,
    },
    {
      id: 3,
      nombre: "L",
      active: true,
    },
    {
      id: 4,
      nombre: "XL",
      active: true,
    },
    {
      id: 5,
      nombre: "XXL",
      active: true,
    },
    {
      id: 6,
      nombre: "XXXL",
      active: true,
    },
  ];

  const initialValues = {
    nombre: "",
    descripcion: "",
    precio: 0,
    existencia: 0,
    categoriaId: "",
    subcategoriaId: "",
    color: "",
    tallas: [],
  };
  useEffect(() => {
    listarSubctategorias();
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
                errors.subcategoriaId,
                touched.subcategoriaId
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
                  {
                    subcategorias.map((item) => (
                      <option
                        key={item.idSubcategoria}
                        value={item.idSubcategoria}
                      >
                        {item.nombre + " / " + item.categoria.nombre}
                      </option>
                    ))
                    // subcategorias.map((item) => (
                    //     <option key={item.idSubcategoria} value={item.idSubcategoria}>
                    //         {item.nombre}
                    //     </option>
                    // ))
                  }
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
                  placeholder="Ingrese alguna descripción ..."
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
                {selectedColores.map((color, index) => (
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
                      color={currentColor}
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

        <Row>
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
                  {subcategorias.map((item) => (
                    <option
                      key={item.idSubcategoria}
                      value={item.idSubcategoria}
                    >
                      {item.nombre + " / " + item.categoria.nombre}
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
            <FormGroup switch>
              <Input
                type="switch"
                checked={state}
                onClick={() => {
                  setState(!state);
                }}
              />
              <Label check>Requiere añadir tallas ?</Label>
            </FormGroup>
            {state && (
              <Row>
                <Col>
                  <FormGroup>
                    <Label>Tallas:</Label>
                    <Table striped bordered>
                      <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>Unidades</th>
                          <th>Activo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {listaTallas.map((talla) => (
                          <tr key={talla.id}>
                            <td>{talla.nombre}</td>
                            <td>
                              <Field
                                className="form-control"
                                name={`tallas[${talla.id}].unidades`}
                                type="number"
                              />
                            </td>
                            <td>
                              <Input
                                type="switch"
                                checked={talla.active}
                                onClick={() => {
                                  talla.active = !talla.active;
                                }}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </FormGroup>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Formulario;
