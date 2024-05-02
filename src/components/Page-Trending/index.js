import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {formatDistanceToNow} from 'date-fns'
import {HiFire as TrendingIcon} from 'react-icons/hi'

import FailureView from '../FailureView'
import ThemeContext from '../../context/ThemeContext'

import {
  TrendingVideosContainer,
  TrendingVideoItem,
  TrendingVideoLink,
  TrendingVideoThumbnail,
  ChannelProfileImage,
} from './StyledComponents'

import {
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
} from '../../assets/commonStyles'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TrendingPage extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    trendingVideosData: [],
  }

  componentDidMount() {
    this.getTrendingVideosData()
  }

  getTrendingVideosData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }

    const response = await fetch(
      `https://apis.ccbp.in/videos/trending`,
      options,
    )
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
        trendingVideosData: formattedData,
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

  renderSuccessView = isDarkTheme => {
    const {trendingVideosData} = this.state
    return (
      <>
        {this.renderTrendingBanner(isDarkTheme)}
        <TrendingVideosContainer>
          {trendingVideosData.map(eachVideo => {
            const {
              id,
              channel,
              publishedAt,
              thumbnailUrl,
              title,
              viewCount,
            } = eachVideo
            const {name, profileImageUrl} = channel

            const distanceToNow = formatDistanceToNow(new Date(publishedAt))
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
  }

  renderFailureView = isDarkTheme => (
    <FailureView
      darkTheme={isDarkTheme}
      providedFunction={this.getTrendingVideosData}
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
            <AppContentContainer data-testid="trending" bgColor={bgColor}>
              {renderApiResponseView()}
            </AppContentContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default TrendingPage
