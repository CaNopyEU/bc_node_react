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
                                    <NavLink to="/users">Používatelia</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/events">Events</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/registration">Registrácia</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/people">Ľudia na škole</NavLink>
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