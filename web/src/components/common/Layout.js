// Imports
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

// App Imports
import {menuShow, menuHide, messageHide} from './api/actions'
import Menu from './Menu'
import './Layout.css'

// Component
const Layout = ({ children }) => {
  // state
  const { menuIsVisible, message } = useSelector(state => state.common)
  const dispatch = useDispatch()

  return (
    <div>
      {/* Header */}
      <header className="main-navigation">
        {/* Menu */}
        { menuIsVisible && <Menu /> }

        {/* Header visible toggle button */}
        {
          menuIsVisible
            ? <button className="button1" onClick={() => dispatch(menuHide())}>Hide Menu</button>
            : <button className="button1" onClick={() => dispatch(menuShow())}>Show Menu</button>
        }
      </header>

      <hr/>

      {/* Messages */}
      {
        message.open &&
        <div>
          {
            message.text.map((text, i) => (
              <p key={i}>
                <mark>{text}</mark>
              </p>
            ))
          }

          <button onClick={() => dispatch(messageHide())}>Hide Messages</button>

          <hr/>
        </div>
      }

      {/* Page content */}
      <section>
        { children }
      </section>
    </div>
  )
}


export default Layout