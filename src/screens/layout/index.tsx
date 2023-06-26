import { Outlet } from "react-router-dom";
import NavBar from "../../components/nav-bar";
import React, {useEffect} from "react";
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";

const Layout = () => {
    const cookie = new Cookies();
    const navigate = useNavigate()

    useEffect(() => {
        if (cookie.get('token') === undefined){
            navigate('/login');
        }
    }, []);

    return (
      <div>
        <NavBar />
        <Outlet />
      </div>
    )
}

export default Layout;