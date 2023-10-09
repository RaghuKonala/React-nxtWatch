import MenuTab from '../MenuTab'
import AppContext from '../../context/AppContext'

import {
  SidebarContainer,
  ContactUsContainer,
  ContactUsContent,
  SocialMediaContainer,
  SocialMediaItem,
  SocialMediaIcon,
} from './StyledComponents'

const socialMediaList = [
  {
    id: 'FACEBOOK',
    name: 'facebook logo',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png',
  },
  {
    id: 'TWITTER',
    name: 'twitter logo',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png',
  },
  {
    id: 'LINKED_IN',
    name: 'linked in logo',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png',
  },
]

const Sidebar = () => (
  <AppContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const bgColor = isDarkTheme ? '#313131' : '#ffffff'
      return (
        <SidebarContainer bgColor={bgColor}>
          <MenuTab />
          <ContactUsContainer>
            <ContactUsContent isDarkTheme={isDarkTheme}>
              CONTACT US
            </ContactUsContent>
            <SocialMediaContainer>
              {socialMediaList.map(eachItem => (
                <SocialMediaItem key={eachItem.id}>
                  <SocialMediaIcon
                    alt={eachItem.name}
                    src={eachItem.imageUrl}
                  />
                </SocialMediaItem>
              ))}
            </SocialMediaContainer>
            <ContactUsContent isDarkTheme={isDarkTheme}>
              Enjoy! Now to see your channels and recommendations!
            </ContactUsContent>
          </ContactUsContainer>
        </SidebarContainer>
      )
    }}
  </AppContext.Consumer>
)

export default Sidebar
