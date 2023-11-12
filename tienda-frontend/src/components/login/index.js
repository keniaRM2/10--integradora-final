import React, { useState } from 'react';
import { Card, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
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

    const parametros = {usuario: username, contrasena: password}

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
    <div className="d-flex justify-content-center align-items-center  bg-login">
      <Card  style={{
                        width: "29rem",
                        height: "24rem",
                        backgroundColor: "rgb(255 255 255 / 89%)"
                    }}>
        <CardBody>
          <h2 className="text-center">SHOP</h2>
          <h4 className="text-center mb-3">Iniciar sesión</h4>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="username">Usuario</Label>
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
              <Label for="password">Contraseña</Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete='off'

              />
            </FormGroup>
            <Button className="mb-2 mt-4 me-2" color="dark" block>
              Ingresar
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
