import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ViewModal from "../view-modal";
import RegModal from "../reg-modal";

const MyModal = (props: any) => {
    return (
        <>
            {props.user && <Modal
                {...props}
                centered>
                <Modal.Header closeButton>
                    {props.type === 'view' && <Modal.Title id="contained-modal-title-vcenter">View User Data</Modal.Title>}
                    {props.type === 'edit' && <Modal.Title id="contained-modal-title-vcenter">Edit User Data</Modal.Title>}
                    {props.type === 'delete' && <Modal.Title id="contained-modal-title-vcenter">Delete User</Modal.Title>}
                    {props.type === 'register' && <Modal.Title id="contained-modal-title-vcenter">Register User</Modal.Title>}
                </Modal.Header>
                <Modal.Body>
                    {["edit", "view", "delete"].includes(props.type) && <ViewModal user={props.user} setUser={props.setUser} type={props.type}/>}
                    {props.type === "register" && <RegModal user={props.user} setUser={props.setUser} setPasswordConfirm={props.setPasswordConfirm} isEmailInvalid={props.isEmailInvalid}/>}
                </Modal.Body>
                <Modal.Footer>
                    {["edit"].includes(props.type) && <Button onClick={props.updateFunc}>Save</Button>}
                    {["register"].includes(props.type) && <Button onClick={props.createFunc}>Save</Button>}
                    {["edit", "view"].includes(props.type) && <Button onClick={props.onHide}>Close</Button>}
                    {props.type === "delete" && <Button onClick={props.deleteFunc}>Delete</Button>}
                    {["delete", "register"].includes(props.type) && <Button onClick={props.onHide}>Cancel</Button>}
                </Modal.Footer>
            </Modal>}
        </>
    );
}

export default MyModal;