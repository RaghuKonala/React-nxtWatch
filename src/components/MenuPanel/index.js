import {withRouter} from 'react-router-dom'
import {AiFillHome as HomeIcon} from 'react-icons/ai'
import {HiFire as TrendingIcon} from 'react-icons/hi'
import {SiYoutubegaming as GamingIcon} from 'react-icons/si'
import {CgPlayListAdd as PlaylistIcon} from 'react-icons/cg'

import ThemeContext from '../../context/ThemeContext'

import {
  MenuPanelContainer,
  MenuTabItem,
  MenuTabLink,
  MenuTabTitle,
} from './StyledComponents'

const menuOptionsDetails = [
  {tabId: 'HOME', tabPath: '/', tabIcon: HomeIcon, tabText: 'Home'},
  {
    tabId: 'TRENDING',
    tabPath: '/trending',
    tabIcon: TrendingIcon,
    tabText: 'Trending',
  },
  {
    tabId: 'GAMING',
    tabPath: '/gaming',
    tabIcon: GamingIcon,
    tabText: 'Gaming',
  },
  {
    tabId: 'SAVED_VIDEOS',
    tabPath: '/saved-videos',
    tabIcon: PlaylistIcon,
    tabText: 'Saved Videos',
  },
]

const MenuPanel = props => {
  const {history} = props
  const {location} = history
  const {pathname} = location
  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const iconColor = isDarkTheme ? '#e2e8f0' : '#212121'

        return (
          <MenuPanelContainer>
            {menuOptionsDetails.map(eachTab => {
              const isActive = eachTab.tabPath === pathname
              const activeIconColor = isActive ? '#ff0000' : iconColor

              return (
                <MenuTabItem
                  key={eachTab.tabId}
                  isDarkTheme={isDarkTheme}
                  isActive={isActive}
                >
                  <MenuTabLink to={eachTab.tabPath}>
                    <eachTab.tabIcon color={activeIconColor} />
                    <MenuTabTitle isDarkTheme={isDarkTheme} isActive={isActive}>
                      {eachTab.tabText}
                    </MenuTabTitle>
                  </MenuTabLink>
                </MenuTabItem>
              )
            })}
          </MenuPanelContainer>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default withRouter(MenuPanel)
