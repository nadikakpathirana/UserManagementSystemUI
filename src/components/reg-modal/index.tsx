import { Form } from "react-bootstrap";
import './reg-modal.css';

const RegModal = (props: any) => {
    const isEmailInvalid = (): boolean => props.user?.email?.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) === null;
    return (
        <div className="register-card-container" style={{height: "unset"}}>
            <Form className="register-card" onSubmit={props.createUser}>
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
                                    // value={props.user.username}
                                    onChange={e => props.setUser({ ...props.user, username: e.target.value })} />
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
                                    // value={props.user.email}
                                    onChange={e => props.setUser({ ...props.user, email: e.target.value })} />
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
                                    // value={props.user.fName}
                                    onChange={e => props.setUser({ ...props.user, fName: e.target.value })} />
                            </Form.Group>
                        </td>
                        <td>
                            <Form.Group className="mb-3" controlId="lName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Enter Last Name"
                                    // value={props.user.lName}
                                    onChange={e => props.setUser({ ...props.user, lName: e.target.value })} />
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
                                    // value={props.user.password}
                                    onChange={e => props.setUser({ ...props.user, password: e.target.value })} />
                            </Form.Group>
                        </td>
                        <td>
                            <Form.Group className="mb-3" controlId="confirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    required
                                    className={props.isPasswordInvalid ? 'border-2 border-danger' : ''}
                                    type="password"
                                    placeholder="Enter Password"
                                    // value={props.passwordConfirm}
                                    onChange={e => props.setPasswordConfirm(e.target.value)} />
                            </Form.Group>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </Form>
        </div>
    );
}

export default RegModal;