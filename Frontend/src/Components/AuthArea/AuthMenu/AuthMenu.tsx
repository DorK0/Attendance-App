import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {
    const [user, setUser] = useState<UserModel>()

    useEffect(() => {
        setUser(store.getState().authState.user);

        const unsubscribe = store.subscribe(() => {
            setUser(store.getState().authState.user);
        });

        return () => unsubscribe();
    }, []);


    return (
        <div className="AuthMenu">

            {!user && <span>willkommen</span>}
            {user && <span>You are the best,&nbsp;{user.firstName + " " + user.lastName}!&nbsp;<NavLink to="/logout" className="btn btn-danger">Logout</NavLink></span>}
        </div>
    );
}

export default AuthMenu;
