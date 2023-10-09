import {withRouter, Link} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'

import {FaMoon as DarkThemeIcon} from 'react-icons/fa'
import {FiLogOut as LogoutIcon} from 'react-icons/fi'
import {GiHamburgerMenu as MenuIcon} from 'react-icons/gi'
import {HiOutlineSun as LightThemeIcon} from 'react-icons/hi'

import MenuTab from '../MenuTab'
import AppContext from '../../context/AppContext'

import {
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
} from './StyledComponents'

import './index.css'

const logoLightTheme =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

const logoDarkTheme =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

class Navbar extends Component {
  state = {isOpen: false}

  logoutUser = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  toggleDropdown = () => {
    this.setState(prevState => ({isOpen: !prevState.isOpen}))
  }

  render() {
    const {isOpen} = this.state
    return (
      <AppContext.Consumer>
        {value => {
          const {isDarkTheme, changeTheme} = value
          const onClickTheme = () => changeTheme()
          const websiteLogo = isDarkTheme ? logoDarkTheme : logoLightTheme
          const iconColor = isDarkTheme ? '#ffffff' : '#000000'
          const iconProps = {size: 24, color: iconColor}
          const themeIcon = isDarkTheme ? (
            <LightThemeIcon {...iconProps} />
          ) : (
            <DarkThemeIcon {...iconProps} />
          )

          const renderDesktopPopup = () => (
            <Popup
              modal
              trigger={<LogoutButton type="button">Logout</LogoutButton>}
              className="popup-content"
            >
              {close => (
                <PopupModalContainer isDarkTheme={isDarkTheme}>
                  <PopupHeader isDarkTheme={isDarkTheme}>
                    Are you sure, you want to logout?
                  </PopupHeader>
                  <PopupButtonsContainer>
                    <PopupCustomButton
                      type="button"
                      isDarkTheme={isDarkTheme}
                      onClick={() => close()}
                      outline
                    >
                      Cancel
                    </PopupCustomButton>
                    <PopupCustomButton
                      type="button"
                      isDarkTheme={isDarkTheme}
                      onClick={this.logoutUser}
                    >
                      Confirm
                    </PopupCustomButton>
                  </PopupButtonsContainer>
                </PopupModalContainer>
              )}
            </Popup>
          )

          const renderMobilePopup = () => (
            <Popup
              modal
              trigger={
                <NavItemButton type="button">
                  <LogoutIcon {...iconProps} />
                </NavItemButton>
              }
              className="popup-content"
            >
              {close => (
                <PopupModalContainer isDarkTheme={isDarkTheme}>
                  <PopupHeader isDarkTheme={isDarkTheme}>
                    Are you sure, you want to logout?
                  </PopupHeader>
                  <PopupButtonsContainer>
                    <PopupCustomButton
                      type="button"
                      isDarkTheme={isDarkTheme}
                      onClick={() => close()}
                      outline
                    >
                      Cancel
                    </PopupCustomButton>
                    <PopupCustomButton
                      type="button"
                      isDarkTheme={isDarkTheme}
                      onClick={this.logoutUser}
                    >
                      Confirm
                    </PopupCustomButton>
                  </PopupButtonsContainer>
                </PopupModalContainer>
              )}
            </Popup>
          )

          return (
            <>
              <NavbarContainer isDarkTheme={isDarkTheme}>
                <NavContentContainer>
                  <Link to="/">
                    <WebsiteLogo alt="website logo" src={websiteLogo} />
                  </Link>
                  <MobileItemsList>
                    <NavListItem>
                      <NavItemButton
                        type="button"
                        onClick={onClickTheme}
                        data-testid="theme"
                      >
                        {themeIcon}
                      </NavItemButton>
                    </NavListItem>
                    <NavListItem>
                      <NavItemButton
                        type="button"
                        onClick={this.toggleDropdown}
                      >
                        <MenuIcon {...iconProps} />
                      </NavItemButton>
                    </NavListItem>
                    <NavListItem>{renderMobilePopup()}</NavListItem>
                  </MobileItemsList>
                  <DesktopItemsContainer>
                    <DesktopItemsList>
                      <NavListItem>
                        <NavItemButton
                          type="button"
                          onClick={onClickTheme}
                          data-testid="theme"
                        >
                          {themeIcon}
                        </NavItemButton>
                      </NavListItem>
                      <NavListItem>
                        <NavItemButton type="button">
                          <ProfileImage
                            alt="profile"
                            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                          />
                        </NavItemButton>
                      </NavListItem>
                    </DesktopItemsList>
                    {renderDesktopPopup()}
                  </DesktopItemsContainer>
                </NavContentContainer>
              </NavbarContainer>
              {isOpen && (
                <MenuDropdown>
                  <MenuTab />
                </MenuDropdown>
              )}
            </>
          )
        }}
      </AppContext.Consumer>
    )
  }
}

export default withRouter(Navbar)
