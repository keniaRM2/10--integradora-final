import React, { Fragment, useState, useEffect } from 'react';
import { Label, InputGroup, FormGroup, Row, Col } from "reactstrap";
import { Form, Field, ErrorMessage } from "formik";
import Utileria from "../../util";
import SubCategoriaService from '../../services/SubCategoriaService'

const Formulario = (props) => {

    let { errors, touched } = props;

    let [subcategorias, setSubcategorias] = useState([]);

    const listarSubctategorias = () => {

        SubCategoriaService.listar().then(({ data }) => {
            setSubcategorias(data);
        }).catch((e) => {
            Utileria.errorhttp(e);
        })
    };


    useEffect(() => {
        listarSubctategorias();
    }, []);

    return (
        <>

            <Form role="form">

                <Row>
                    <Col>
                        <FormGroup className={Utileria.claseInputForm(errors.nombre, touched.nombre)}>
                            <Label htmlFor="nombre">Nombre:</Label>
                            <InputGroup className="input-group-alternative">
                                <Field
                                    className="form-control"
                                    placeholder="Ingrese..."
                                    id="nombre"
                                    name="nombre"
                                    type="text"
                                    autoComplete="off"
                                    required
                                />
                            </InputGroup>
                            <ErrorMessage
                                name="nombre"
                                component={() => <small className="text-danger">{errors.nombre}</small>}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup className={Utileria.claseInputForm(errors.descripcion, touched.descripcion)}>
                            <Label htmlFor="nombre">Descripción:</Label>
                            <InputGroup className="input-group-alternative">
                                <Field
                                    className="form-control"
                                    placeholder="Ingrese..."
                                    id="descripcion"
                                    name="descripcion"
                                    type="text"
                                    autoComplete="off"
                                    required
                                />

                            </InputGroup>
                            <ErrorMessage
                                name="descripcion"
                                component={() => <small className="text-danger">{errors.descripcion}</small>}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup className={Utileria.claseInputForm(errors.color, touched.color)}>
                            <Label htmlFor="nombre">Color:</Label>
                            <InputGroup className="input-group-alternative">
                                <Field
                                    className="form-control"
                                    placeholder="Ingrese..."
                                    id="color"
                                    name="color"
                                    type="color"
                                    autoComplete="off"
                                    required
                                />

                            </InputGroup>
                            <ErrorMessage
                                name="color"
                                component={() => <small className="text-danger">{errors.color}</small>}
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <FormGroup className={Utileria.claseInputForm(errors.precio, touched.precio)}>
                            <Label htmlFor="precio">Precio:</Label>
                            <InputGroup className="input-group-alternative">
                                <Field
                                    className="form-control"
                                    placeholder="Ingrese..."
                                    id="precio"
                                    name="precio"
                                    type="number"
                                    autoComplete="off"
                                    required
                                />
                            </InputGroup>
                            <ErrorMessage
                                name="precio"
                                component={() => <small className="text-danger">{errors.precio}</small>}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup className={Utileria.claseInputForm(errors.existencia, touched.existencia)}>
                            <Label htmlFor="existencia">Existencia:</Label>
                            <InputGroup className="input-group-alternative">
                                <Field
                                    className="form-control"
                                    placeholder="Ingrese..."
                                    id="existencia"
                                    name="existencia"
                                    type="number"
                                    autoComplete="off"
                                    required
                                />
                            </InputGroup>
                            <ErrorMessage
                                name="existencia"
                                component={() => <small className="text-danger">{errors.existencia}</small>}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup className={Utileria.claseInputForm(errors.subcategoriaId, touched.subcategoriaId)}>
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

                                    {
                                        subcategorias.map((item) => (
                                            <option key={item.idSubcategoria} value={item.idSubcategoria}>
                                                {item.nombre + " / "+item.categoria.nombre}
                                            </option>
                                        ))
                                    }

                                </Field>
                            </InputGroup>
                            <ErrorMessage
                                name="subcategoriaId"
                                component={() => <small className="text-danger">{errors.subcategoriaId}</small>}
                            />
                        </FormGroup>
                    </Col>
                </Row>

            </Form>

        </>
    );
};

export default Formulario;
