import Header from '../Header'
import Sidebar from '../Sidebar'
import ThemeContext from '../../context/ThemeContext'

import {notFoundLightTheme, notFoundDarkTheme} from '../../assets/images'
import {NotFoundContentContainer, NotFoundDescription} from './StyledComponents'

import {
  AppContainer,
  AppResponsiveContainer,
  CustomViewImage,
  CustomViewTitle,
} from '../../assets/commonStyles'

const NotFoundPage = () => (
  <AppContainer>
    <Header />
    <AppResponsiveContainer>
      <Sidebar />
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const bgColor = isDarkTheme ? '#181818' : '#f9f9f9'
          const notFoundImageUrl = isDarkTheme
            ? notFoundDarkTheme
            : notFoundLightTheme

          return (
            <NotFoundContentContainer bgColor={bgColor}>
              <CustomViewImage src={notFoundImageUrl} alt="not found" />
              <CustomViewTitle isDarkTheme={isDarkTheme}>
                Page Not Found
              </CustomViewTitle>
              <NotFoundDescription isDarkTheme={isDarkTheme}>
                We are sorry, the page you requested could not be found.
              </NotFoundDescription>
            </NotFoundContentContainer>
          )
        }}
      </ThemeContext.Consumer>
    </AppResponsiveContainer>
  </AppContainer>
)

export default NotFoundPage
