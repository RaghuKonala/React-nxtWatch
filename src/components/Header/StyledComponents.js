import styled from 'styled-components'

export const NavbarContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 12vh;
  padding: 0px 25px;
  background-color: ${props => (props.isDarkTheme ? '#313131' : '#ffffff')};
`
export const NavContentContainer = styled.div`
  width: 100%;
  max-width: 96vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const NxtWatchLogo = styled.h1`
  font-size: 24px;
  @media screen and (min-width: 768px) {
    font-size: 26px;
  }
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#313131')};
  font-weight: 600;
  font-family: 'Roboto';
`
export const NavbarOptions = styled.ul`
  padding: 0px;
  margin: 0px;
  display: flex;
  align-items: center;
`
export const NavOption = styled.li`
  list-style-type: none;
  margin-left: 30px;
`
export const NavMobileOption = styled(NavOption)`
  @media screen and (min-width: 768px) {
    display: none;
  }
`
export const NavDesktopOption = styled(NavOption)`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
  }
`

export const NavOptionButton = styled.button`
  padding: 0px;
  margin-top: 6px;
  border: none;
  outline: none;
  cursor: pointer;
  background: transparent;
`
export const NavProfile = styled.img`
  width: 24px;
  height: 24px;
`
export const LogoutButton = styled.button`
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  background: transparent;
  border: 1px solid ${props => (props.isDarkTheme ? '#ffffff' : '#3b82f6')};
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#3b82f6')};
  font-size: 14px;
  font-weight: 500;
  font-family: 'Roboto';
`
export const MenuDropdown = styled.div`
  position: absolute;
  width: 100vw;
  top: 12vh;
  box-shadow: 0px 16px 24px 2px rgba(0, 0, 0, 0.14);
  @media screen and (min-width: 768px) {
    display: none;
  }
`

export const PopupModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 30px;
  border-radius: 15px;
  background-color: ${props => (props.isDarkTheme ? '#313131' : '#ffffff')};
`

export const PopupHeader = styled.p`
  color: ${props => (props.isDarkTheme ? '#ebebeb' : '#00306e')};
  font-size: 18px;
  font-weight: 500;
  font-family: 'Roboto';
  margin: 0px;
  @media screen and (min-width: 768px) {
    font-size: 20px;
  }
`

export const PopupButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  max-width: 320px;
`

export const PopupCustomButton = styled(LogoutButton)`
  height: 40px;
  padding: 8px 14px;
  border-radius: 2px;
  border: 1px solid ${props => (props.outline ? '#7e858e' : '#3b82f6')};
  color: ${props => (props.outline ? '#7e858e' : '#ffffff')};
  background-color: ${props => (props.outline ? 'transparent' : '#3b82f6')};
  font-size: 16px;
`
