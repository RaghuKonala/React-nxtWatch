import {withRouter} from 'react-router-dom'
import {AiFillHome as HomeIcon} from 'react-icons/ai'
import {HiFire as TrendingIcon} from 'react-icons/hi'
import {SiYoutubegaming as GamingIcon} from 'react-icons/si'
import {CgPlayListAdd as PlaylistIcon} from 'react-icons/cg'

import AppContext from '../../context/AppContext'

import {
  MenuPanelContainer,
  MenuTabItem,
  MenuTabLink,
  MenuTabTitle,
} from './StyledComponents'

const tabDetailsList = [
  {id: 'HOME', pathname: '/', icon: HomeIcon, displayText: 'Home'},
  {
    id: 'TRENDING',
    pathname: '/trending',
    icon: TrendingIcon,
    displayText: 'Trending',
  },
  {
    id: 'GAMING',
    pathname: '/gaming',
    icon: GamingIcon,
    displayText: 'Gaming',
  },
  {
    id: 'SAVED_VIDEOS',
    pathname: '/saved-videos',
    icon: PlaylistIcon,
    displayText: 'Saved Videos',
  },
]

const MenuTab = props => {
  const {history} = props
  const {location} = history
  const activePath = location.pathname

  return (
    <AppContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const iconColor = isDarkTheme ? '#e2e8f0' : '#212121'

        return (
          <MenuPanelContainer>
            {tabDetailsList.map(each => {
              const isActive = each.pathname === activePath
              const activeIconColor = isActive ? '#ff0000' : iconColor
              return (
                <MenuTabItem
                  key={each.id}
                  isDarkTheme={isDarkTheme}
                  isActive={isActive}
                >
                  <MenuTabLink to={each.pathname}>
                    <each.icon color={activeIconColor} />
                    <MenuTabTitle isDarkTheme={isDarkTheme} isActive={isActive}>
                      {each.displayText}
                    </MenuTabTitle>
                  </MenuTabLink>
                </MenuTabItem>
              )
            })}
          </MenuPanelContainer>
        )
      }}
    </AppContext.Consumer>
  )
}

export default withRouter(MenuTab)
