import React from 'react';
import * as FooterStyles from './footer.module.css';


const Footer = () => {
    return (
        <footer className={FooterStyles.footer}>
            <p>© 2021 <a href="https://nathanielc.com/" className="underline">Nathaniel Cherian</a></p>
        </footer>
    )
}

export default Footer;