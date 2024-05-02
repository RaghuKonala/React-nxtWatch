import styled from 'styled-components'

export const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  height: 100vh;
  background-color: ${props => (props.isDarkTheme ? '#212121' : '#ffffff')};
  @media screen and (min-width: 768px) {
    align-items: center;
  }
`
export const LoginFormContainer = styled.form`
  width: 85%;
  max-width: 420px;
  border-radius: 8px;
  padding: 30px 25px;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${props => (props.isDarkTheme ? '#0f0f0f' : '#ffffff')};
  box-shadow: 0px 4px 16px 0px
    ${props => (props.isDarkTheme ? '#212121' : '#e2e8f0')};
  @media screen and (min-width: 768px) {
    margin: 0px;
    padding: 40px;
    width: 100%;
  }
`
export const AppLogo = styled.img`
  height: 26px;
  width: 130px;
  margin-bottom: 12px;
  align-self: center;
  @media screen and (min-width: 768px) {
    height: 30px;
    width: 150px;
    margin-bottom: 20px;
  }
`

export const InputAndLabelContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`

export const CustomLabel = styled.label`
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#7e858e')};
  font-size: 12px;
  font-weight: 500;
  margin: 0px;
  line-height: 1.8;
`

export const CustomInput = styled.input`
  height: 40px;
  padding: 10px 16px;
  border-radius: 3px;
  border: 1px solid ${props => (props.isDarkTheme ? '#64748b' : '#cbd5e1')};
  background: ${props => {
    if (props.isError) {
      return props.isDarkTheme ? '#f1f5f9' : '#e2e8f0'
    }
    return 'transparent'
  }};
  color: ${props => {
    if (!props.isError) {
      return props.isDarkTheme ? '#cbd5e1' : '#181818'
    }
    return '#181818'
  }};
  font-size: 15px;
  font-weight: 500;
  font-family: 'Roboto';
  outline: none;
`
export const CheckboxAndLabelContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 10px;
`

export const CustomCheckbox = styled.input`
  width: 16px;
  height: 16px;
`

export const CheckboxLabel = styled.label`
  color: ${props => (props.isDarkTheme ? '#ebebeb' : '#212121')};
  font-size: 14px;
  font-weight: 500;
  font-family: 'Roboto';
  margin-left: 6px;
  cursor: pointer;
  outline: none;
`

export const LoginButton = styled.button`
  width: 100%;
  margin-top: 30px;
  padding: 10px 24px;
  border-radius: 8px;
  background-color: #3b82f6;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  font-family: 'Roboto';
  border: none;
  outline: none;
  cursor: pointer;
`

export const ErrorMessage = styled.p`
  color: #ff0b37;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Roboto';
  margin-bottom: 0px;
`
