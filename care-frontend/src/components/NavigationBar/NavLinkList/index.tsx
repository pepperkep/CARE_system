import React, { FunctionComponent, useState } from 'react';
import { NavLink } from "../NavLink"
import { useLocation } from 'react-router-dom';
import { INavLinkList } from './NavLinkList';

export const NavLinkList: FunctionComponent<INavLinkList.IProps> = ({ className }) => {
    const [currentPageState, setCurrentPageState] = useState(0);

    const navLinkClickHandler = (index: number) => {
        setCurrentPageState(index);
    }

    return (
        <React.Fragment>
            <ul className={className}>
                <NavLink
                    className={currentPageState === 1 ? "nav-item-selected" : ""}
                    onClick={() => navLinkClickHandler(1)}
                    text='Home'
                    to="/"
                />
                <NavLink
                    className={currentPageState === 2 ? "nav-item-selected" : ""}
                    onClick={() => navLinkClickHandler(2)}
                    text='Group'
                    to="/group"
                />
                <NavLink
                    className={currentPageState === 3 ? "nav-item-selected" : ""}
                    onClick={() => navLinkClickHandler(3)}
                    text='Reports'
                    to="/reports"
                />
                <NavLink
                    className={currentPageState === 4 ? "nav-item-selected" : ""}
                    onClick={() => navLinkClickHandler(4)}
                    text='FAQ'
                    to="/faq"
                />
                <NavLink
                    className={currentPageState === 5 ? "nav-item-selected" : ""}
                    onClick={() => navLinkClickHandler(5)}
                    text='Account'
                    to="/account"
                />
            </ul>
        </React.Fragment>
    );
}