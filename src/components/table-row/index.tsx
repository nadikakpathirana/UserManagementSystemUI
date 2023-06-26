import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Cookies from 'universal-cookie';
import './table-row.css'

const TableRow = (props: any) => {
    const cookies = new Cookies();
    return (
        <tr className="tr">
            <td>{props.user.id}</td>
            <td>{props.user.fName}</td>
            <td>{props.user.lName}</td>
            <td>{props.user.email}</td>
            <td>{props.user.role}</td>
            <td className="centred-items">
                <ButtonGroup aria-label="Basic example">
                    <Button variant="primary" onClick={() => props.viewModal(props.user)}>View</Button>
                    {cookies.get('role') === 'User' ? <Button variant="primary" onClick={() => props.editModal(props.user)}>Change</Button> : <Button variant="primary" onClick={() => props.editModal(props.user)}>Edit</Button>}
                    {cookies.get('role') === 'Admin' && <Button variant="primary" onClick={() => props.deleteModal(props.user)}>Delete</Button>}
                </ButtonGroup>
            </td>
        </tr>
    )
}

export default TableRow;
