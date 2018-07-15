import React, { Component } from 'react'
import { auth } from '../../firebase/base'
import { Redirect } from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props)


    this.state = {
      isLoading: true,

    }
  }

  componentDidMount() {
    const isLogout = this.props.match.path === '/logout'

    if (isLogout) {
      return (
        auth.signOut()
          .then(function() {
            <Redirect to='/dashboard' />
            
          })
          .catch(function(error) {
            // An error happened
          })
      )
    }

    this.setState({ isLoading: false })
  }

  render() {
    if (this.state.isLoading) {
      return <h1>...</h1>
    }

    return (
      <h1>Login</h1>
    )
  }
}

export default Login
