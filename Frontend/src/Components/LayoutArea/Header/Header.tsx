import { useEffect, useState } from "react";
import "./Header.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import store from "../../../Redux/Store";
import UserModel from "../../../Models/UserModel";
import { NavLink } from "react-router-dom";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import authService from "../../../Services/AuthService";

export function Header(): JSX.Element {

    const [user, setUser] = useState<UserModel>()
    useEffect(() => {
        setUser(store.getState().authState.user)
        const unsubscribe = store.subscribe(() => {
            setUser(store.getState().authState.user)
        })
        return unsubscribe;
    }, [])


    return (
        <div className="Header">
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary bg-dark">
                <Container>
                    <Navbar.Brand>🇩🇪Time Attendance</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            {user &&
                                <>
                                    <NavLink to="/clock"><Nav>Clock⏰</Nav></NavLink>&nbsp;&nbsp;
                                    <NavLink to="/my-attendance"><Nav>My Attendance📅</Nav></NavLink>&nbsp;&nbsp;
                                    {authService.isAdmin() && <NavLink to="/employees-attendance"><Nav>Employees Attendance📊</Nav></NavLink>}
                                </>
                            }
                        </Nav>
                        <Nav>
                            <AuthMenu />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}
