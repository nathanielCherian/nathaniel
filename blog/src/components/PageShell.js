import React from 'react';
import * as PageShellStyles from './pageshell.module.css';
import Navbar from './Navbar';
import Footer from './Footer';


const PageShell = (props) => {
    return (
        <div className={PageShellStyles.container}>
            <Navbar/>
                <div className={PageShellStyles.children}>
                    {props.children}
                </div>
            <Footer />
        </div>
    )
}

export default PageShell;