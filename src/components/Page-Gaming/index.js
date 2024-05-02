import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {SiYoutubegaming as GamingIcon} from 'react-icons/si'

import FailureView from '../FailureView'
import ThemeContext from '../../context/ThemeContext'

import {
  GamingVideosContainer,
  GamingVideoItem,
  GamingVideoLink,
  GamingVideoThumbnail,
} from './StyledComponents'

import {
  AppContentContainer,
  LoaderContainer,
  ColumnContainer,
  CustomTitle,
  CustomInfo,
  CustomBanner,
  CustomBannerLogo,
  CustomBannerTitle,
} from '../../assets/commonStyles'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GamingPage extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    gamingVideosData: [],
  }

  componentDidMount() {
    this.getGamingVideosData()
  }

  getGamingVideosData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(`https://apis.ccbp.in/videos/gaming`, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const formattedData = fetchedData.videos.map(eachVideo => ({
        id: eachVideo.id,
        thumbnailUrl: eachVideo.thumbnail_url,
        title: eachVideo.title,
        viewCount: eachVideo.view_count,
      }))
      this.setState({
        gamingVideosData: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderGamingBanner = isDarkTheme => {
    const bannerIconColor = isDarkTheme ? '#ff0b37' : '#ff0000'
    return (
      <CustomBanner isDarkTheme={isDarkTheme} data-testid="banner">
        <CustomBannerLogo isDarkTheme={isDarkTheme}>
          <GamingIcon size={25} color={bannerIconColor} />
        </CustomBannerLogo>
        <CustomBannerTitle isDarkTheme={isDarkTheme}>Gaming</CustomBannerTitle>
      </CustomBanner>
    )
  }

  renderSuccessView = isDarkTheme => {
    const {gamingVideosData} = this.state
    return (
      <>
        {this.renderGamingBanner(isDarkTheme)}
        <GamingVideosContainer>
          {gamingVideosData.map(eachVideo => {
            const {id, thumbnailUrl, title, viewCount} = eachVideo
            return (
              <GamingVideoItem key={id}>
                <GamingVideoLink to={`/videos/${id}`}>
                  <GamingVideoThumbnail
                    src={thumbnailUrl}
                    alt="video thumbnail"
                  />
                  <ColumnContainer>
                    <CustomTitle isDarkTheme={isDarkTheme}>{title}</CustomTitle>
                    <CustomInfo isDarkTheme={isDarkTheme}>
                      {viewCount} Watching Worldwide
                    </CustomInfo>
                  </ColumnContainer>
                </GamingVideoLink>
              </GamingVideoItem>
            )
          })}
        </GamingVideosContainer>
      </>
    )
  }

  renderFailureView = isDarkTheme => (
    <FailureView
      darkTheme={isDarkTheme}
      providedFunction={this.getGamingVideosData}
    />
  )

  renderLoadingView = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
    </LoaderContainer>
  )

  render() {
    const {apiStatus} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const bgColor = isDarkTheme ? '#0f0f0f' : '#f9f9f9'

          const renderApiResponseView = () => {
            switch (apiStatus) {
              case apiStatusConstants.success:
                return this.renderSuccessView(isDarkTheme)
              case apiStatusConstants.failure:
                return this.renderFailureView(isDarkTheme)
              case apiStatusConstants.inProgress:
                return this.renderLoadingView()
              default:
                return null
            }
          }
          return (
            <AppContentContainer data-testid="gaming" bgColor={bgColor}>
              {renderApiResponseView()}
            </AppContentContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default GamingPage
