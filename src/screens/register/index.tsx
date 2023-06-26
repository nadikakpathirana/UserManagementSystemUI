import { Button, Form } from "react-bootstrap";
import './register.css';
import { useState, useEffect } from "react";
import { User } from "../../utils/entity/User";
import { UserService } from "../../utils/service/user-service";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';

const Register = () => {
    const navigate = useNavigate();
    const cookies = new Cookies();

    useEffect(() => {
        if (cookies.get('token') !== undefined) {
            navigate('/');
        }
    }, []);

    const [user, setUser] = useState(new User());
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        if (isPasswordInvalid() || isEmailInvalid()) {
            alert('Please fill the form');
            return;
        }

        UserService.createUser(user)
            .then((res: AxiosResponse<User>) => {
                if (res.data.id) {
                    alert("User registered successfully!");
                    navigate('/login');
                }
            })
            .catch(error => alert(error));
    }

    const goToLogin = () => {
        navigate('/login');
    }

    const isPasswordInvalid = (): boolean => passwordConfirm.trim() !== user.password?.trim();

    const isEmailInvalid = (): boolean => user.email?.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) === null;

    return (
        <div className="register-card-container">
            <Form className="register-card" onSubmit={handleSubmit}>
                <h2 className="mb-3">Register</h2>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter Username"
                                        value={user.username}
                                        onChange={e => setUser({ ...user, username: e.target.value })} />
                                </Form.Group>
                            </td>
                            <td>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        required
                                        type="email"
                                        className={isEmailInvalid() ? 'border-2 border-danger' : ''}
                                        placeholder="Email"
                                        value={user.email}
                                        onChange={e => setUser({ ...user, email: e.target.value })} />
                                </Form.Group>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Group className="mb-3" controlId="fName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter First Name"
                                        value={user.fName}
                                        onChange={e => setUser({ ...user, fName: e.target.value })} />
                                </Form.Group>
                            </td>
                            <td>
                                <Form.Group className="mb-3" controlId="lName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter Last Name"
                                        value={user.lName}
                                        onChange={e => setUser({ ...user, lName: e.target.value })} />
                                </Form.Group>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        required
                                        type="password"
                                        placeholder="Enter Password"
                                        value={user.password}
                                        onChange={e => setUser({ ...user, password: e.target.value })} />
                                </Form.Group>
                            </td>
                            <td>
                                <Form.Group className="mb-3" controlId="confirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        required
                                        className={isPasswordInvalid() ? 'border-2 border-danger' : ''}
                                        type="password"
                                        placeholder="Enter Password"
                                        value={passwordConfirm}
                                        onChange={e => setPasswordConfirm(e.target.value)} />
                                </Form.Group>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Button variant="primary" type="submit" className="mt-1">
                    Register
                </Button>
                <Button variant="success" onClick={goToLogin} className="mt-1">
                    Sign In
                </Button>
            </Form>
        </div>
    );
}

export default Register;