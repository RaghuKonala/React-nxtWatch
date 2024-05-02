import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const MenuPanelContainer = styled.ul`
  padding-left: 0px;
  margin: 0px;
  border: 0px;
  display: flex;
  flex-direction: column;
`

export const MenuTabItem = styled.li`
  height: 45px;
  cursor: pointer;
  list-style-type: none;
  background-color: ${props => {
    if (props.isActive) {
      return props.isDarkTheme ? '#424242' : '#f1f5f9'
    }
    return props.isDarkTheme ? '#313131' : '#ffffff'
  }};
  &:hover {
    background-color: ${props => {
      if (props.isActive) {
        return props.isDarkTheme ? '#424242' : '#f1f5f9'
      }
      return props.isDarkTheme ? '#383838' : '#f8fafc'
    }};
  }
`
export const MenuTabLink = styled(Link)`
  text-decoration: none;
  height: 45px;
  display: flex;
  align-items: center;
  padding: 12px 24px;
`
export const MenuTabTitle = styled.p`
  font-size: 14px;
  font-family: 'Roboto';
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#212121')};
  font-weight: ${props => (props.isActive ? 'bold' : 500)};
  margin: 0px;
  margin-left: 20px;
  @media screen and (min-width: 768px) {
    font-size: 16px;
  }
`
