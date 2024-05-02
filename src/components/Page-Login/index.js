import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import {logoLightTheme, logoDarkTheme} from '../../assets/images'
import ThemeContext from '../../context/ThemeContext'

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

class LoginPage extends Component {
  state = {
    usernameInput: '',
    passwordInput: '',
    showPassword: false,
    errorMessage: '',
  }

  onUnSuccessfulValidation = errorMessage => {
    this.setState({errorMessage})
  }

  onSuccessfulValidation = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 7, path: '/'})
    const {history} = this.props
    history.replace('/')
  }

  validateUserAndLogin = async event => {
    event.preventDefault()
    this.setState({errorMessage: ''})
    const {usernameInput, passwordInput} = this.state
    const options = {
      body: JSON.stringify({
        username: usernameInput.toLowerCase(),
        password: passwordInput,
      }),
      method: 'POST',
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
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

  updatePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  updateUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  render() {
    const {
      usernameInput,
      passwordInput,
      showPassword,
      errorMessage,
    } = this.state

    const passwordFieldType = showPassword ? 'text' : 'password'
    const showErrorMessage = errorMessage.length !== 0

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <ThemeContext.Consumer>
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
                    name="username"
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
                    name="password"
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
      </ThemeContext.Consumer>
    )
  }
}

export default LoginPage
