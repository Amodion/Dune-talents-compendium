// Filename - "./components/index.js

import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/" activeStyle>
                        Таланты
                    </NavLink>
                    <NavLink to="/add_talent" activeStyle>
                        Добавить талант
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;