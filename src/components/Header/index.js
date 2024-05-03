import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import {FiLogOut as LogoutIcon} from 'react-icons/fi'
import {FaMoon as DarkThemeIcon} from 'react-icons/fa'
import {GiHamburgerMenu as MenuIcon} from 'react-icons/gi'
import {HiOutlineSun as LightThemeIcon} from 'react-icons/hi'

import {profileImage} from '../../assets/images'
import ThemeContext from '../../context/ThemeContext'
import MenuPanel from '../MenuPanel'
import './index.css'

import {
  NavbarContainer,
  NavContentContainer,
  NxtWatchLogo,
  NavbarOptions,
  NavOption,
  NavMobileOption,
  NavDesktopOption,
  NavOptionButton,
  NavProfile,
  LogoutButton,
  MenuDropdown,
  PopupModalContainer,
  PopupHeader,
  PopupButtonsContainer,
  PopupCustomButton,
} from './StyledComponents'

class Header extends Component {
  state = {isOpen: false}

  logoutUser = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  toggleDropdown = () => {
    this.setState(prevState => ({isOpen: !prevState.isOpen}))
  }

  renderLogoutPopup = (triggerButton, isDarkTheme) => (
    <Popup modal trigger={triggerButton} className="popup-content">
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

  render() {
    const {isOpen} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme, changeTheme} = value
          const iconProps = {
            size: 24,
            color: isDarkTheme ? '#ffffff' : '#000000',
          }
          const themeIcon = isDarkTheme ? (
            <LightThemeIcon {...iconProps} />
          ) : (
            <DarkThemeIcon {...iconProps} />
          )
          const mobileLogoutButton = (
            <NavOptionButton type="button">
              <LogoutIcon {...iconProps} />
            </NavOptionButton>
          )
          const desktopLogoutButton = (
            <LogoutButton type="button">Logout</LogoutButton>
          )

          return (
            <>
              <NavbarContainer isDarkTheme={isDarkTheme}>
                <NavContentContainer>
                  <Link to="/" className="app-title">
                    <NxtWatchLogo isDarkTheme={isDarkTheme}>
                      iWATCH
                    </NxtWatchLogo>
                  </Link>
                  <NavbarOptions>
                    <NavOption>
                      <NavOptionButton
                        type="button"
                        data-testid="theme"
                        onClick={() => changeTheme()}
                      >
                        {themeIcon}
                      </NavOptionButton>
                    </NavOption>
                    <NavMobileOption>
                      <NavOptionButton
                        type="button"
                        onClick={this.toggleDropdown}
                      >
                        <MenuIcon {...iconProps} />
                      </NavOptionButton>
                    </NavMobileOption>
                    <NavMobileOption>
                      {this.renderLogoutPopup(mobileLogoutButton, isDarkTheme)}
                    </NavMobileOption>
                    <NavDesktopOption>
                      <NavOptionButton type="button">
                        <NavProfile alt="profile" src={profileImage} />
                      </NavOptionButton>
                    </NavDesktopOption>
                    <NavDesktopOption>
                      {this.renderLogoutPopup(desktopLogoutButton, isDarkTheme)}
                    </NavDesktopOption>
                  </NavbarOptions>
                </NavContentContainer>
              </NavbarContainer>
              {isOpen && (
                <MenuDropdown>
                  <MenuPanel />
                </MenuDropdown>
              )}
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default withRouter(Header)
