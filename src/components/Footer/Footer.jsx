import React from 'react';
import { FooterMenus } from '.';

const Footer = () => {
    return (
        <footer>
            <ul className="l-footer">
                <a className="u-text__link-none" href="https://torahack.web.app/terms/" target="_blank" rel="noreferrer noopener">
                    <li>利用規約</li>
                </a>
                <a className="u-text__link-none" href="https://torahack.web.app/privacy/" target="_blank" rel="noreferrer noopener">
                    <li>プライバシーポリシー</li>
                </a>
                <a className="u-text__link-none">
                    <li>Copyright &copy; 2021 Rai</li>
                </a>
            </ul>
        </footer>
    );
};

export default Footer;