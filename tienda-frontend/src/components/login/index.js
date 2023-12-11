import React, { useState, Fragment } from 'react';
import { Card, CardBody, Form, FormGroup, Label, Input, Button, Col, Row } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import Utileria from '../../util';
import routeConstant from '../../router/routeConstant';
import LoginService from '../../services/LoginService';
import { useAuth } from '../../Layout/AppMain/AuthContext';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    const parametros = { usuario: username, contrasena: password }

    LoginService.login(parametros).then(({ data }) => {

      localStorage.setItem('info', JSON.stringify(data))
      localStorage.setItem('tkn', data.token)


      login();

      history.push(routeConstant.PRODUCTO);

    }).catch((e) => {
      Utileria.errorhttp(e);
    }).finally(() => {
    });
  };

  return (
    <Fragment>
      <div className="bg-login" style={{ background: 'linear-gradient(to left, #D5C8FF, #ffcc99)' }}>
        <Fragment>

          <Row >
            <Col lg={{ size: 1 }}  >
              <img src={require('../../assets/utils/images/logo_background.png')}  alt="" style={{ marginTop: 2 }} />
            </Col>

            <Col lg={{ size: 4, offset:6}} className="mt-5">

              <Card style={{ backgroundColor: 'white' }}>
                <CardBody>

                  <h2 className="text-center mb-3">Iniciar sesión</h2>
                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label for="username">Usuario: * </Label>
                      <Input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoComplete='off'
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label for="password">Contraseña: *</Label>
                      <Input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete='off'
                      />
                    </FormGroup>
                    <Button className="mb-2 mt-4 me-2" style={{ justifyContent: 'center', alignSelf: 'center', backgroundColor: 'black' }} block>
                      <small > Ingresar </small>
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>


          </Row>
        </Fragment>
      </div>
    </Fragment>
  );
};

export default Login;
