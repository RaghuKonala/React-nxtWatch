import styled from 'styled-components'

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 12vh;
  padding: 0px 25px;
  background-color: ${props => (props.isDarkTheme ? '#313131' : '#ffffff')};
`
const NavContentContainer = styled.div`
  width: 100%;
  max-width: 95vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const WebsiteLogo = styled.img`
  height: 25px;
  width: 100px;
  @media screen and (min-width: 768px) {
    height: 25px;
    width: 120px;
  }
`

const MobileItemsList = styled.ul`
  padding: 0px;
  margin: 0px;
  display: flex;
  align-items: center;
  @media screen and (min-width: 768px) {
    display: none;
  }
`

const DesktopItemsContainer = styled.div`
  display: none;
  @media screen and (min-width: 768px) {
    display: flex;
    align-items: center;
  }
`
const DesktopItemsList = styled.ul`
  padding: 0px;
  margin: 0px;
  display: flex;
  align-items: center;
  margin-right: 30px;
`
const NavListItem = styled.li`
  list-style-type: none;
  margin-left: 30px;
  width: 24px;
  height: 24px;
`
const NavItemButton = styled.button`
  padding: 0px;
  border: none;
  outline: none;
  cursor: pointer;
  background: transparent;
`
const ProfileImage = styled.img`
  width: 24px;
  height: 24px;
`
const LogoutButton = styled.button`
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
const MenuDropdown = styled.div`
  position: absolute;
  width: 100vw;
  top: 10vh;
  box-shadow: 0px 16px 24px 2px rgba(0, 0, 0, 0.14);
  @media screen and (min-width: 768px) {
    display: none;
  }
`

const PopupModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.14);
  background-color: ${props => (props.isDarkTheme ? '#313131' : '#ffffff')};
  width: 100%;
  height: 170px;
  padding: 35px;
  border-radius: 15px;
  @media screen and (min-width: 768px) {
    height: 180px;
    padding: 40px;
  }
`

const PopupHeader = styled.p`
  color: ${props => (props.isDarkTheme ? '#ebebeb' : '#00306e')};
  font-size: 18px;
  font-weight: 500;
  font-family: 'Roboto';
  margin: 0px;
  @media screen and (min-width: 768px) {
    font-size: 20px;
  }
`

const PopupButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  max-width: 320px;
`

const PopupCustomButton = styled(LogoutButton)`
  height: 40px;
  padding: 8px 14px;
  border-radius: 2px;
  border: 1px solid ${props => (props.outline ? '#7e858e' : '#3b82f6')};
  color: ${props => (props.outline ? '#7e858e' : '#ffffff')};
  background-color: ${props => (props.outline ? 'transparent' : '#3b82f6')};
  font-size: 16px;
`

export {
  NavbarContainer,
  NavContentContainer,
  WebsiteLogo,
  MobileItemsList,
  DesktopItemsContainer,
  DesktopItemsList,
  NavListItem,
  NavItemButton,
  ProfileImage,
  LogoutButton,
  MenuDropdown,
  PopupModalContainer,
  PopupHeader,
  PopupButtonsContainer,
  PopupCustomButton,
}
