import MenuPanel from '../MenuPanel'
import ThemeContext from '../../context/ThemeContext'

import {facebookLogo, twitterLogo, linkedinLogo} from '../../assets/images'

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
    imageUrl: facebookLogo,
  },
  {
    id: 'TWITTER',
    name: 'twitter logo',
    imageUrl: twitterLogo,
  },
  {
    id: 'LINKED_IN',
    name: 'linked in logo',
    imageUrl: linkedinLogo,
  },
]

const Sidebar = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const bgColor = isDarkTheme ? '#313131' : '#ffffff'
      return (
        <SidebarContainer bgColor={bgColor}>
          <MenuPanel />
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
  </ThemeContext.Consumer>
)

export default Sidebar
