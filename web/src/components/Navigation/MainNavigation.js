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
                {context.role === 'admin' &&
                <>
                  <li>
                    <NavLink to="/users">Používatelia</NavLink>
                  </li>
                  <li>
                    <NavLink to="/registration">Registrácia</NavLink>
                  </li>
                  <li>
                    <NavLink to="/lectures">Predmety</NavLink>
                  </li>
                  <li>
                    <NavLink to="/class">Triedy</NavLink>
                  </li>
                </>
                }
                {context.role === 'teacher' &&
                <>
                  <li>
                    <NavLink to="/profile">Môj účet</NavLink>
                  </li>
                  {context.mTeacher &&
                  <li>
                    <NavLink to="/myclass">Moja trieda</NavLink>
                  </li>
                  }

                  <li>
                    <NavLink to="/class">Triedy</NavLink>
                  </li>
                </>
                }
                {context.role === 'student' &&
                <>
                  <li>
                    <NavLink to="/profile">Môj účet</NavLink>
                  </li>
                  <li>
                    <NavLink to="/grades">Žiacka knižka</NavLink>
                  </li>
                  <li>
                    <NavLink to="/homework">Domáce úlohy</NavLink>
                  </li>
                  <li>
                    <NavLink to="/record">Poznámky</NavLink>
                  </li>
                  <li>
                    <NavLink to="/attendance">Neprítomnosti</NavLink>
                  </li>
                </>
                }
                <li>
                  <NavLink to="/people">{context.role === 'student'? 'Moji spolužiaci a učitelia':'Ľudia na škole'}</NavLink>
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