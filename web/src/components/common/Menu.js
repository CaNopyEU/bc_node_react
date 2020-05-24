// Imports
import React from 'react'
import {Link} from 'react-router-dom'
import './Menu.css'
// App Imports
import {routes} from '../../setup/routes'

// Component
const Menu = () => (
  <nav className="main-navigation__items">
    <ul>
      <li><Link  to={routes.home}>Home</Link></li>
      <li><Link to={routes.about}>About</Link></li>
      <li><Link to={routes.thoughts.list}>Thoughts</Link></li>
      <li><Link to={routes.login}>Login</Link></li>
    </ul>
  </nav>
)

export default Menu