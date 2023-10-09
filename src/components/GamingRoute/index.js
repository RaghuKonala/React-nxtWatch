import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {SiYoutubegaming as GamingIcon} from 'react-icons/si'

import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import FailureView from '../FailureView'
import AppContext from '../../context/AppContext'

import {
  AppContainer,
  AppResponsiveContainer,
  AppContentContainer,
  LoaderContainer,
  ColumnContainer,
  CustomTitle,
  CustomInfo,
  CustomBanner,
  CustomBannerLogo,
  CustomBannerTitle,
} from '../../styles/CommonStyles'

import {
  GamingVideosContainer,
  GamingVideoItem,
  GamingVideoLink,
  GamingVideoThumbnail,
} from './StyledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GamingRoute extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videosData: [],
  }

  componentDidMount() {
    this.getGamingVideosData()
  }

  getGamingVideosData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const apiUrl = `https://apis.ccbp.in/videos/gaming`
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()
      const formattedData = fetchedData.videos.map(eachVideo => ({
        id: eachVideo.id,
        thumbnailUrl: eachVideo.thumbnail_url,
        title: eachVideo.title,
        viewCount: eachVideo.view_count,
      }))
      this.setState({
        videosData: formattedData,
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

  renderSuccessView = () => {
    const {videosData} = this.state
    return (
      <AppContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          return (
            <>
              {this.renderGamingBanner(isDarkTheme)}
              <GamingVideosContainer>
                {videosData.map(eachVideo => {
                  const {id, thumbnailUrl, title, viewCount} = eachVideo
                  return (
                    <GamingVideoItem key={id}>
                      <GamingVideoLink to={`/videos/${id}`}>
                        <GamingVideoThumbnail
                          src={thumbnailUrl}
                          alt="video thumbnail"
                        />
                        <ColumnContainer>
                          <CustomTitle isDarkTheme={isDarkTheme}>
                            {title}
                          </CustomTitle>
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
        }}
      </AppContext.Consumer>
    )
  }

  renderFailureView = () => (
    <FailureView retryApiCall={this.getGamingVideosData} />
  )

  renderLoadingView = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
    </LoaderContainer>
  )

  renderApiResponseView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <AppContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const bgColor = isDarkTheme ? '#0f0f0f' : '#f9f9f9'
          return (
            <AppContainer>
              <Navbar />
              <AppResponsiveContainer>
                <Sidebar />
                <AppContentContainer data-testid="gaming" bgColor={bgColor}>
                  {this.renderApiResponseView()}
                </AppContentContainer>
              </AppResponsiveContainer>
            </AppContainer>
          )
        }}
      </AppContext.Consumer>
    )
  }
}

export default GamingRoute
