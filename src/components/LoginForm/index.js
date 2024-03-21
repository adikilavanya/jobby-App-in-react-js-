import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class LoginForm extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, showSubmitError: true})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
      console.log(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, errorMsg, showSubmitError} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="bg-container">
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo-image"
          />
          <div className="input-container">
            <label htmlFor="username" className="label">
              USERNAME
            </label>
            <input
              value={username}
              type="text"
              id="username"
              placeholder="Username"
              className="value"
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <input
              id="password"
              value={password}
              type="password"
              placeholder="Password"
              className="value"
              onChange={this.onChangePassword}
            />
          </div>
          <button className="login-button" type="submit">
            Login
          </button>
          {showSubmitError && <p className="error-msg">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
