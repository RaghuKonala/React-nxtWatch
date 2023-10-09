import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import AppContext from '../../context/AppContext'

import {
  AppContainer,
  AppResponsiveContainer,
  CustomViewImage,
  CustomViewTitle,
} from '../../styles/CommonStyles'

import {NotFoundContentContainer, NotFoundDescription} from './StyledComponents'

const lightTheme =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
const darkTheme =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'

const NotFoundRoute = () => (
  <AppContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const bgColor = isDarkTheme ? '#181818' : '#f9f9f9'
      const notFoundImageUrl = isDarkTheme ? darkTheme : lightTheme

      return (
        <AppContainer>
          <Navbar />
          <AppResponsiveContainer>
            <Sidebar />
            <NotFoundContentContainer bgColor={bgColor}>
              <CustomViewImage src={notFoundImageUrl} alt="not found" />
              <CustomViewTitle isDarkTheme={isDarkTheme}>
                Page Not Found
              </CustomViewTitle>
              <NotFoundDescription isDarkTheme={isDarkTheme}>
                We are sorry, the page you requested could not be found.
              </NotFoundDescription>
            </NotFoundContentContainer>
          </AppResponsiveContainer>
        </AppContainer>
      )
    }}
  </AppContext.Consumer>
)

export default NotFoundRoute
