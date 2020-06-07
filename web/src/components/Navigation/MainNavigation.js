import React from "react";
import {NavLink} from 'react-router-dom';

import AuthContext from '../../context/auth-context';
import './MainNavigation.css';

const mainNavigation = props => (
    <AuthContext.Consumer>
        {(context) => {
            return (
                <header className="main-navigation">
                    <div className="main-navigation__logo">
                        <h1>Informačný systém</h1>
                    </div>
                    <nav className="main-navigation__items">
                        <ul>
                            {!context.token && (
                                <li>
                                    <NavLink to="/auth">Prihlásenie</NavLink>
                                </li>
                            )}
                            {context.token &&
                            <>
                                <li>
                                    <NavLink to="/profile">Môj účet</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/users">Events</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/registration">Žiacka knižka</NavLink>
                                </li>
                                {/*<li>
                                    <NavLink to="/lectures">Predmety</NavLink>
                                </li>*/}
                                <li>
                                    <NavLink to="/lecturess">Domáce úlohy</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/lectures">Poznámky</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/lectduress">Neprítomnosti</NavLink>
                                </li>
                                {/*<li>
                                    <NavLink to="/class">Triedy</NavLink>
                                </li>*/}
                                <li>
                                    <NavLink to="/people">Moji spolužiaci a učitelia</NavLink>
                                </li>
                                <li>
                                    <button onClick={context.logout}>Odhlásiť</button>
                                </li>
                            </>
                            }
                        </ul>
                    </nav>
                </header>
            )
        }}

    </AuthContext.Consumer>
);

export default mainNavigation;