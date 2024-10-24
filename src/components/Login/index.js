import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {LoginButton} from './styledComponents'
import './index.css'

class Login extends Component {
  state = {
    usernameInput: '',
    passwordInput: '',
    showSubmitError: false,
    errorMsg: '',
    showPassword: false,
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, showSubmitError: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {usernameInput, passwordInput} = this.state
    const userDetails = {username: usernameInput, password: passwordInput}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUserName = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onChangeShow = () => {
    const {showPassword} = this.state
    if (showPassword) {
      this.setState({showPassword: false})
    } else {
      this.setState({showPassword: true})
    }
  }

  renderUserName = () => {
    const {usernameInput} = this.state
    return (
      <div className="username-con">
        <label className="label" htmlFor="username">
          USERNAME
        </label>
        <input
          onChange={this.onChangeUserName}
          value={usernameInput}
          className="input"
          id="username"
          placeholder="UserName"
          type="text"
        />
      </div>
    )
  }

  renderPassword = () => {
    const {passwordInput, showPassword} = this.state
    return (
      <div className="username-con">
        <label className="label" htmlFor="password">
          PASSWORD
        </label>
        <input
          onChange={this.onChangePassword}
          value={passwordInput}
          className="input"
          id="password"
          placeholder="Password"
          type={showPassword ? 'text' : 'password'}
        />
      </div>
    )
  }

  renderCheckBox = () => (
    <div className="checkBoxContainer">
      <input
        type="checkbox"
        className="checkbox"
        onChange={this.onChangeShow}
        id="checkbox"
      />
      <label htmlFor="checkbox" className="label-check">
        Show Password
      </label>
    </div>
  )

  render() {
    const {errorMsg, showSubmitError} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-card">
          <img
            className="login-logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
          />
          <form className="form" onSubmit={this.onSubmitForm}>
            {this.renderUserName()}
            {this.renderPassword()}
            {this.renderCheckBox()}
            <LoginButton type="submit">Login</LoginButton>
            {showSubmitError && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
