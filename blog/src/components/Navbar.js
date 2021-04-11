import React from 'react';
import * as NavbarStyles from './navbar.module.css';

const Navbar = () => {
    return (
        <div className={NavbarStyles.navbar}>
            
            <div className={NavbarStyles.navitem}>
                <span className={NavbarStyles.homebutton}>Home</span>
            </div>

        </div>
    )
}

export default Navbar;