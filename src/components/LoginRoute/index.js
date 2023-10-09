import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import AppContext from '../../context/AppContext'

import {
  LoginPageContainer,
  LoginFormContainer,
  AppLogo,
  InputAndLabelContainer,
  CustomLabel,
  CustomInput,
  CheckboxAndLabelContainer,
  CustomCheckbox,
  CheckboxLabel,
  LoginButton,
  ErrorMessage,
} from './StyledComponents'

const logoLightTheme =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
const logoDarkTheme =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

class LoginRoute extends Component {
  state = {
    usernameInput: '',
    passwordInput: '',
    showPassword: false,
    errorMessage: '',
    showErrorMessage: false,
  }

  onSuccessfulValidation = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 7, path: '/'})
    history.replace('/')
  }

  onUnSuccessfulValidation = errorMessage => {
    this.setState({errorMessage, showErrorMessage: true})
  }

  validateUserAndLogin = async event => {
    event.preventDefault()
    const {usernameInput, passwordInput} = this.state
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify({
        username: usernameInput.toLowerCase(),
        password: passwordInput,
      }),
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    if (response.ok) {
      this.onSuccessfulValidation(fetchedData.jwt_token)
    } else {
      this.onUnSuccessfulValidation(fetchedData.error_msg)
    }
  }

  togglePasswordVisibility = event => {
    this.setState({showPassword: event.target.checked})
  }

  updatePassword = event => this.setState({passwordInput: event.target.value})

  updateUsername = event => this.setState({usernameInput: event.target.value})

  render() {
    const {
      usernameInput,
      passwordInput,
      showPassword,
      errorMessage,
      showErrorMessage,
    } = this.state
    const passwordFieldType = showPassword ? 'text' : 'password'

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <AppContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const websiteLogo = isDarkTheme ? logoDarkTheme : logoLightTheme

          return (
            <LoginPageContainer isDarkTheme={isDarkTheme}>
              <LoginFormContainer
                onSubmit={this.validateUserAndLogin}
                isDarkTheme={isDarkTheme}
              >
                <AppLogo src={websiteLogo} alt="website logo" />
                <InputAndLabelContainer>
                  <CustomLabel isDarkTheme={isDarkTheme} htmlFor="username">
                    USERNAME
                  </CustomLabel>
                  <CustomInput
                    isError={showErrorMessage}
                    isDarkTheme={isDarkTheme}
                    type="text"
                    id="username"
                    placeholder="Username"
                    value={usernameInput}
                    onChange={this.updateUsername}
                  />
                </InputAndLabelContainer>
                <InputAndLabelContainer>
                  <CustomLabel isDarkTheme={isDarkTheme} htmlFor="password">
                    PASSWORD
                  </CustomLabel>
                  <CustomInput
                    isDarkTheme={isDarkTheme}
                    type={passwordFieldType}
                    id="password"
                    placeholder="Password"
                    value={passwordInput}
                    onChange={this.updatePassword}
                  />
                </InputAndLabelContainer>
                <CheckboxAndLabelContainer>
                  <CustomCheckbox
                    type="checkbox"
                    id="checkbox"
                    onChange={this.togglePasswordVisibility}
                  />
                  <CheckboxLabel isDarkTheme={isDarkTheme} htmlFor="checkbox">
                    Show Password
                  </CheckboxLabel>
                </CheckboxAndLabelContainer>
                <LoginButton type="submit">Login</LoginButton>
                {showErrorMessage && (
                  <ErrorMessage>*{errorMessage}</ErrorMessage>
                )}
              </LoginFormContainer>
            </LoginPageContainer>
          )
        }}
      </AppContext.Consumer>
    )
  }
}

export default LoginRoute
