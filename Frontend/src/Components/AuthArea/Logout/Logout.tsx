import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import { error } from "console";

function Logout(): JSX.Element {

    const navigate = useNavigate();


    useEffect(() => {
        authService.logout();
        notifyService.success("Hope to see you Soon 👋🏽");
        navigate("/login");
    }, [])

    return null;
}

export default Logout;
