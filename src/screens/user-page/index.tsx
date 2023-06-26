import { useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import './user-page.css';
import TableRow from "../../components/table-row";
import MyModal from "../../components/modal";
import {UserService} from "../../utils/service/user-service";
import {AxiosResponse} from "axios";
import {User} from "../../utils/entity/User";
import {useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";

const UserPage = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User>();
    const [modalType, setModalType] = useState('');
    const [usersUpdateRequired, setUsersUpdateRequired] = useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (new Cookies().get('role') === 'User'){
            UserService.getUser()
                .then((res: AxiosResponse<User>) => {
                    if (res.status === 200) {
                        setUsers([...users, res.data]);
                    }
                })
                .catch(error => console.log("You haven't access for this action"));
        } else {
            UserService.getUsers()
                .then((res: AxiosResponse<User[]>) => {
                    if (res.status === 200) {
                        setUsers(res.data);
                    }
                })
                .catch(error => console.log("You haven't access for this action"));
        }
    }, [usersUpdateRequired]);

    const viewModal = (user: User) => {
        setModalType("view");
        setSelectedUser(user);
    }

    const editModal = (user: User) => {
        setModalType("edit");
        setSelectedUser(user);
    }

    const deleteModal = (user: User) => {
        setModalType("delete");
        setSelectedUser(user);
    }

    const createModal = () => {
        setModalType("register");
        setSelectedUser(new User());
    }

    const handleUpdate = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        debugger;
        if (selectedUser){
            UserService.updateUser(selectedUser.id, selectedUser)
                .then((res: AxiosResponse<User>) => {
                    debugger;
                    if (res.data) {
                        setUsersUpdateRequired(!usersUpdateRequired);
                        setSelectedUser(undefined);

                    }
                })
                .catch(error => alert(error));
        }

    }

    const handleDelete = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        debugger;
        if (selectedUser){
            UserService.deleteUser(selectedUser.id)
                .then((res: AxiosResponse<User>) => {
                    debugger;
                    if (res.status === 204) {
                        console.log("Deleted Successfully");
                        setUsersUpdateRequired(!usersUpdateRequired);
                        setSelectedUser(undefined);

                    }
                })
                .catch(error => alert(error));
        }
    }

    const handleCreate = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        if (isPasswordInvalid()) {
            alert('Passwords Doesn\'t matching.');
            return;
        }

        if (isEmailInvalid()) {
            alert('Please provide a valid email.');
            return;
        }

        UserService.createUser(selectedUser)
            .then((res: AxiosResponse<User>) => {
                if (res.data.id) {
                    alert("User registered successfully!");
                    navigate('/login');
                }
            })
            .catch(error => alert(error));
    }

    const isPasswordInvalid = (): boolean => passwordConfirm.trim() !== selectedUser?.password?.trim();

    const isEmailInvalid = (): boolean => selectedUser?.email?.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) === null;

    return (
        <div>
            <div className="container">

                <div className="row">
                    <div className="add-new-container">
                        <ButtonGroup className="add-new" aria-label="Basic example">
                            <Button variant="success" onClick={() => createModal() } >Add New User</Button>
                        </ButtonGroup>
                    </div>
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                        </thead>
                        <tbody>{
                            users.map(user => <TableRow user={user} viewModal={viewModal} editModal={editModal} deleteModal={deleteModal}/>)
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            <MyModal
                show={selectedUser !== undefined}
                onHide={() => setSelectedUser(undefined)}
                user={selectedUser}
                setUser={setSelectedUser}
                passwordConfirm={passwordConfirm}
                setPasswordConfirm={setPasswordConfirm}
                type={modalType}
                isEmailInvalid={isEmailInvalid}
                updateFunc={handleUpdate}
                deleteFunc={handleDelete}
                createFunc={handleCreate}
            />
        </div>
    )
}
export default UserPage;