import React from 'react';
import { Link } from "gatsby"
import * as NavbarStyles from './navbar.module.css';

const Navbar = () => {
    return (
        <div className={NavbarStyles.navbar}>
            <div className={NavbarStyles.navitem}>
                <span className={NavbarStyles.homebutton}><Link to="/">🏠 Home</Link></span>
            </div>
        </div>
    )
}

export default Navbar;