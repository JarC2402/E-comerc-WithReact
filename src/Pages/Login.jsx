import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import AlertError from "../Components/AlertError";
import Card from "react-bootstrap/Card";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email,
      password
    };
     console.log(data);
      axios
      .post('https://e-commerce-api.academlo.tech/api/v1/users/login', data)
      .then((resp) => {
        localStorage.setItem("token", resp.data.data.token);
        console.log(localStorage.getItem("token"));
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        setAlert(true);
      });
      

  };
  return (
    <>
      <Card style={{ maxWidth: 500, margin: "3rem auto", padding: "2rem" }}>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <h1>Login</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address: jarc240218@gmail.com</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password: 323232</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card>

      <AlertError isVisible={alert} dismiss={() => setAlert(false)} />
    </>
  );
};

export default Login;