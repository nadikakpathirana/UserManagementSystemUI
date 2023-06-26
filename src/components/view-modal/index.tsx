import {Form} from "react-bootstrap";
import Cookies  from "universal-cookie";

const ViewModal = (props: any) => {
    const cookies = new Cookies();
    return (
        <>
            {["edit", "view"].includes(props.type) &&
                <div className="register-card-container" style={{height: "unset"}}>
                    <Form className="register-card">
                        <table>
                            <tbody>
                            <tr>
                                <td>
                                    <Form.Group className="mb-3" controlId="fName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Enter First Name"
                                            value={props.user.fName}
                                            disabled={props.type === 'view'}
                                            onChange={e => props.setUser({ ...props.user, fName: e.target.value })}/>
                                    </Form.Group>
                                </td>
                                <td>
                                    <Form.Group className="mb-3" controlId="lName">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Enter Last Name"
                                            value={props.user.lName}
                                            disabled={props.type === 'view'}
                                            onChange={e => props.setUser({ ...props.user, lName: e.target.value })}/>
                                    </Form.Group>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Form.Group className="mb-3" controlId="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            required
                                            type="email"
                                            placeholder="Email"
                                            value={props.user.email}
                                            disabled={props.type === 'view'}
                                            onChange={e => props.setUser({ ...props.user, email: e.target.value })}/>
                                    </Form.Group>
                                </td>
                                <td>
                                    <Form.Group className="mb-3" controlId="role">
                                        <Form.Label>Select Role</Form.Label>
                                        <Form.Select
                                            disabled={cookies.get('role') !== "Admin"}
                                            value={props.user.role}
                                            onChange={e => props.setUser({ ...props.user, role: e.target.value })}>
                                            <option value="User">User</option>
                                            <option value="Staff">Staff</option>
                                            <option value="Admin">Admin</option>
                                        </Form.Select>
                                    </Form.Group>
                                </td>

                            </tr>
                            </tbody>
                        </table>
                    </Form>
                </div>
            }
            {props.type === "delete" &&
                "Are you sure to Delete this user?"
            }

        </>

    )
}

export default ViewModal;

