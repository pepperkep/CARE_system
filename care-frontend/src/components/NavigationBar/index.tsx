/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from "react";
import { Redirect } from 'react-router-dom';
import { NavLinkList } from "./NavLinkList";
import { useLocation } from 'react-router-dom';
import { INavigationBar } from './NavigationBar';

import '@rmwc/ripple/styles';
import "./NavigationBar.css";

export const NavigationBar: React.FC<INavigationBar.IProps> = ({ className }) => {
    const [redirect, setRedirect] = useState<boolean>(false);

    const titleClass = "title";

    const handleClickTitle = () => {
        setRedirect(true);

        setTimeout(() => {
            setRedirect(false);
        }, 0.1);
    }

    return (
        <React.Fragment>
            <nav className='navbar'>
                <div className={titleClass}>
                    <h1 onClick={handleClickTitle} style={{ cursor: "pointer" }}>Case Accountability Reporting Engine</h1>
                </div>

                {redirect && <Redirect to='home' />}

                <div className="navigation-component">
                    <NavLinkList className="nav-items" />
                </div>
            </nav>
        </React.Fragment>
    );
}