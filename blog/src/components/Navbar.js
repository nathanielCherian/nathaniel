import React, {useState} from 'react';
import { Link } from "gatsby"
import * as NavbarStyles from './navbar.module.css';
import ToggleButton from './ToggleButton';

const Navbar = () => {

    var colorPref;
    if(typeof window !== 'undefined' && window.localStorage){
        colorPref = (localStorage.getItem('isDarkMode') || "false") === "true";
    }

    const [selected, setSelected] = useState( colorPref );

    if(typeof window !== 'undefined' && window.localStorage){
        if(selected){
            document.documentElement.style.setProperty('--bgColor','black');
            document.documentElement.style.setProperty('--textColor','white');
            document.documentElement.style.setProperty('--borderColor','rgba(255, 255, 255, 0.54)');
        }else{
            document.documentElement.style.setProperty('--bgColor','white');
            document.documentElement.style.setProperty('--textColor','black');
            document.documentElement.style.setProperty('--borderColor','rgba(0, 0, 0, 0.54)');
        }
    }


    const changeColor = () => {
        if(typeof window !== 'undefined' && window.localStorage){
            localStorage.setItem('isDarkMode', !selected);
        }else{
            return;
        }
        setSelected(!selected);
    }


    return (
        <div className={NavbarStyles.navbar}>
            <div className={NavbarStyles.navitem}>
                <span className={NavbarStyles.homebutton}><Link to="/">🏠 Home</Link></span>
            </div>
            <div className={NavbarStyles.navitem + " " + NavbarStyles.right}>
                <ToggleButton selected={selected} toggleSelected={() => changeColor()}/>
            </div>
        </div>
    )

    

    return <></>;
    
}

export default Navbar;