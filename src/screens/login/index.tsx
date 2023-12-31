import { Button, Form } from "react-bootstrap";
import './login.css';
import { useEffect, useState } from "react";
import { UserService } from "../../utils/service/user-service";
import { AxiosResponse } from "axios";
import { User } from "../../utils/entity/User";
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import { getRole, getName, getId } from "../../utils/jwt";

const Login = () => {
    const navigate = useNavigate();
    const cookies = new Cookies();

    useEffect(() => {
        if (cookies.get('token') !== undefined) {
            navigate('/');
        }
    }, []);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        UserService.login(username, password)
        .then((res: AxiosResponse<User>) => {
            if (res.data.token) {
                cookies.set('token', res.data.token, { path: '/' });
                cookies.set('role', getRole(res.data.token), { path: '/' });
                cookies.set('name', getName(res.data.token), { path: '/' });
                cookies.set('id', getId(res.data.token), { path: '/' });
                navigate('/');
            }
        })
        .catch(() => {
            setError('Invalid username or password!');
        });
    }

    const handleRegisterClick = () => {
        navigate('/register');
    }

    return (
        <div className="login-card-container">
            <Form className="login-card" onSubmit={handleSubmit}>
                <h2 className="mb-3">Login</h2>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" value={username} onChange={e => {
                        setUsername(e.target.value);
                        setError('');
                    }} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" value={password} onChange={e => {
                        setPassword(e.target.value);
                        setError('');
                    }} />
                </Form.Group>

                { error.length !== 0 && <label className="error-text">{error}</label> }

                <Button variant="primary" type="submit" className="mt-1">
                    Login
                </Button>
                <Button variant="success" onClick={handleRegisterClick} className="mt-1">
                    Sign Up
                </Button>
            </Form>
        </div>
    );
}

export default Login;