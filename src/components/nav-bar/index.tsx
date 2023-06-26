import Nav from 'react-bootstrap/Nav';
import Cookies from "universal-cookie";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import {BsPersonCircle} from "react-icons/bs";
import './nav-bar.css';

const NavBar = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();

    const clearCookies = () => {
        cookies.remove('token');
        cookies.remove('role');
        navigate('/login');
    }

    return (
        <>
            {cookies.get('token') !== undefined &&
            <Nav
                variant="pills"
                activeKey="/home"
                onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
            >
                <div className="user-profile">
                    <BsPersonCircle className="avatar" />
                    <span className="username">{`${cookies.get('name')} (${cookies.get('role')})`}</span>
                </div>

                <Button
                    onClick={() => clearCookies()}
                    variant="secondary"
                    style={{
                        marginRight:'20px',
                    }}>
                    Log Out</Button>{' '}
            </Nav>
            }
        </>
    )
}
export default NavBar;