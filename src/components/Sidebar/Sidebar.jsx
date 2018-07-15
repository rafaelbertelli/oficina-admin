import React, { Component } from "react"
import { NavLink, Redirect } from "react-router-dom"
import { auth } from '../../firebase/base'

import HeaderLinks from "../Header/HeaderLinks.jsx";

import imagine from "assets/img/sidebar-3.jpg";
import logo from "assets/img/reactlogo.png";

import dashboardRoutes from "routes/dashboard.jsx";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      isAuthing: true,
      isLoggedIn: false,
    }
  }
  
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  
  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }

  navigateTo = (prop) => {
    if (!!prop.isLogin) {
      prop.name = 'Logout'
      prop.path = '/logout'
      prop.isLogout = true
    }

    return (
      <NavLink to={prop.path} className="nav-link" activeClassName="active">
        <i className={prop.icon} />
        <p>{prop.name}</p>
      </NavLink>
    )
  }

  componentDidMount() {
    this.updateDimensions()
    window.addEventListener("resize", this.updateDimensions.bind(this))

    auth.onAuthStateChanged(user => {
      this.setState({
        isAuthing: false,
        isLoggedIn: !!user,
      })
    })
  }

  render() {
    const sidebarBackground = {
      backgroundImage: "url(" + imagine + ")"
    }

    if (this.state.isAuthing) {
      return <p>Aguarder</p>
    }

    if (!this.state.isLoggedIn) {
      console.log('redirecionando')
      return <Redirect to='/login' />
    }

    return (
      <div
        id="sidebar"
        className="sidebar"
        data-color="black"
        data-image={imagine}
      >
        <div className="sidebar-background" style={sidebarBackground} />
        <div className="logo">
          <a
            href="https://www.creative-tim.com"
            className="simple-text logo-mini"
          >
            <div className="logo-img">
              <img src={logo} alt="logo_image" />
            </div>
          </a>
          <a
            href="https://www.creative-tim.com"
            className="simple-text logo-normal"
          >
            Creative Tim
          </a>
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            {this.state.width <= 991 ? <HeaderLinks /> : null}
            {dashboardRoutes.map((prop, key) => {
              if (!prop.redirect) {
                return (
                  <li
                    className={
                      prop.bottom
                        ? "active active-pro"
                        : this.activeRoute(prop.path)
                    }
                    key={key}
                  >
                    { this.navigateTo(prop) }
                  </li>
                )
              }
              return null;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
