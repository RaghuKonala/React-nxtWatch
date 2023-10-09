import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {formatDistanceToNow} from 'date-fns'
import {HiFire as TrendingIcon} from 'react-icons/hi'

import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import FailureView from '../FailureView'
import AppContext from '../../context/AppContext'

import {
  TrendingVideosContainer,
  TrendingVideoItem,
  TrendingVideoLink,
  TrendingVideoThumbnail,
  ChannelProfileImage,
} from './StyledComponents'

import {
  AppContainer,
  AppResponsiveContainer,
  AppContentContainer,
  LoaderContainer,
  FlexContainer,
  RowContainer,
  ColumnContainer,
  VideoDetailsContainer,
  CustomTitle,
  CustomInfo,
  CustomBullet,
  CustomBullet2,
  CustomBanner,
  CustomBannerLogo,
  CustomBannerTitle,
} from '../../styles/CommonStyles'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TrendingRoute extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videosData: [],
  }

  componentDidMount() {
    this.getTrendingVideosData()
  }

  getTrendingVideosData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl = `https://apis.ccbp.in/videos/trending`
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
        channel: {
          name: eachVideo.channel.name,
          profileImageUrl: eachVideo.channel.profile_image_url,
        },
        id: eachVideo.id,
        publishedAt: eachVideo.published_at,
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

  renderTrendingBanner = isDarkTheme => {
    const bannerIconColor = isDarkTheme ? '#ff0b37' : '#ff0000'
    return (
      <CustomBanner isDarkTheme={isDarkTheme} data-testid="banner">
        <CustomBannerLogo isDarkTheme={isDarkTheme}>
          <TrendingIcon size={25} color={bannerIconColor} />
        </CustomBannerLogo>
        <CustomBannerTitle isDarkTheme={isDarkTheme}>
          Trending
        </CustomBannerTitle>
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
              {this.renderTrendingBanner(isDarkTheme)}
              <TrendingVideosContainer>
                {videosData.map(eachVideo => {
                  const {
                    id,
                    channel,
                    publishedAt,
                    thumbnailUrl,
                    title,
                    viewCount,
                  } = eachVideo
                  const {name, profileImageUrl} = channel

                  const distanceToNow = formatDistanceToNow(
                    new Date(publishedAt),
                  )
                  const formattedDistance = distanceToNow
                    .split(' ')
                    .slice(1)
                    .join(' ')

                  return (
                    <TrendingVideoItem key={id}>
                      <TrendingVideoLink to={`/videos/${id}`}>
                        <TrendingVideoThumbnail
                          src={thumbnailUrl}
                          alt="video thumbnail"
                        />
                        <VideoDetailsContainer>
                          <ChannelProfileImage
                            src={profileImageUrl}
                            alt="channel logo"
                          />
                          <ColumnContainer>
                            <CustomTitle isDarkTheme={isDarkTheme}>
                              {title}
                            </CustomTitle>
                            <FlexContainer>
                              <CustomInfo isDarkTheme={isDarkTheme}>
                                {name}
                              </CustomInfo>
                              <CustomBullet2>&#8226;</CustomBullet2>
                              <RowContainer>
                                <CustomInfo isDarkTheme={isDarkTheme}>
                                  {viewCount} views
                                </CustomInfo>
                                <CustomBullet>&#8226;</CustomBullet>
                                <CustomInfo isDarkTheme={isDarkTheme}>
                                  {formattedDistance} ago
                                </CustomInfo>
                              </RowContainer>
                            </FlexContainer>
                          </ColumnContainer>
                        </VideoDetailsContainer>
                      </TrendingVideoLink>
                    </TrendingVideoItem>
                  )
                })}
              </TrendingVideosContainer>
            </>
          )
        }}
      </AppContext.Consumer>
    )
  }

  renderFailureView = () => (
    <FailureView retryApiCall={this.getTrendingVideosData} />
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
                <AppContentContainer data-testid="trending" bgColor={bgColor}>
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

export default TrendingRoute
