import {Component} from 'react'
import ReactPlayer from 'react-player'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'

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
  RowContainer,
  VideoDetailsContainer,
  CustomBullet,
} from '../../styles/CommonStyles'

import {
  VideoItemDetailsContainer,
  VideoPlayerContainer,
  ViewsButtonsContainer,
  CustomButtonsContainer,
  CustomButton,
  ThematicBreak,
  ChannelProfileImage,
  VideoTitle,
  VideoInfo,
  ChannelTitle,
  ChannelSubscribers,
  VideoDescription,
  LikeIcon,
  DislikeIcon,
  SaveIcon,
} from './StyledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoDetailsRoute extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videoDetails: {},
  }

  componentDidMount() {
    this.getVideoItemDetails()
  }

  getVideoItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const apiUrl = `https://apis.ccbp.in/videos/${params.id}`
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
      const videoDetails = fetchedData.video_details
      const formattedData = {
        channel: {
          name: videoDetails.channel.name,
          profileImageUrl: videoDetails.channel.profile_image_url,
          subscriberCount: videoDetails.channel.subscriber_count,
        },
        description: videoDetails.description,
        id: videoDetails.id,
        publishedAt: videoDetails.published_at,
        thumbnailUrl: videoDetails.thumbnail_url,
        title: videoDetails.title,
        videoUrl: videoDetails.video_url,
        viewCount: videoDetails.view_count,
      }
      this.setState({
        videoDetails: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {videoDetails} = this.state
    const {
      id,
      channel,
      description,
      publishedAt,
      title,
      viewCount,
      videoUrl,
    } = videoDetails
    const {name, profileImageUrl, subscriberCount} = channel

    const distanceToNow = formatDistanceToNow(new Date(publishedAt))
    const formattedDistance = distanceToNow.split(' ').slice(1).join(' ')

    return (
      <AppContext.Consumer>
        {value => {
          const {
            isDarkTheme,
            savedVideos,
            updateSavedVideos,
            reactedVideos,
            updateVideoLike,
            updateVideoDislike,
          } = value

          const isVideoDisliked = reactedVideos.some(each =>
            each.id === id ? each.isDisliked : false,
          )
          const isVideoLiked = reactedVideos.some(each =>
            each.id === id ? each.isLiked : false,
          )
          const isVideoSaved = savedVideos.some(each => each.id === id)

          const onClickDislike = () => updateVideoDislike(id)
          const onClickLike = () => updateVideoLike(id)
          const onClickAdd = () => updateSavedVideos(videoDetails)

          return (
            <VideoItemDetailsContainer>
              <VideoPlayerContainer>
                <ReactPlayer
                  url={videoUrl}
                  controls
                  height="100%"
                  width="100%"
                />
              </VideoPlayerContainer>
              <ColumnContainer>
                <VideoTitle isDarkTheme={isDarkTheme}>{title}</VideoTitle>
                <ViewsButtonsContainer>
                  <RowContainer>
                    <VideoInfo>{viewCount} views</VideoInfo>
                    <CustomBullet>&#8226;</CustomBullet>
                    <VideoInfo>{formattedDistance} ago</VideoInfo>
                  </RowContainer>
                  <CustomButtonsContainer>
                    <CustomButton
                      type="button"
                      onClick={onClickLike}
                      isActive={isVideoLiked}
                    >
                      <LikeIcon />
                      Like
                    </CustomButton>
                    <CustomButton
                      type="button"
                      onClick={onClickDislike}
                      isActive={isVideoDisliked}
                    >
                      <DislikeIcon />
                      Dislike
                    </CustomButton>
                    <CustomButton
                      type="button"
                      onClick={onClickAdd}
                      isActive={isVideoSaved}
                    >
                      <SaveIcon />
                      {isVideoSaved ? 'Saved' : 'Save'}
                    </CustomButton>
                  </CustomButtonsContainer>
                </ViewsButtonsContainer>
                <ThematicBreak />
                <VideoDetailsContainer>
                  <ChannelProfileImage
                    src={profileImageUrl}
                    alt="channel logo"
                  />
                  <ColumnContainer>
                    <ChannelTitle isDarkTheme={isDarkTheme}>
                      {name}
                    </ChannelTitle>
                    <ChannelSubscribers>
                      {subscriberCount} subscribers
                    </ChannelSubscribers>
                  </ColumnContainer>
                </VideoDetailsContainer>
                <VideoDescription>{description}</VideoDescription>
              </ColumnContainer>
            </VideoItemDetailsContainer>
          )
        }}
      </AppContext.Consumer>
    )
  }

  renderFailureView = () => (
    <FailureView retryApiCall={this.getVideoItemDetails} />
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
                <AppContentContainer
                  data-testid="videoItemDetails"
                  bgColor={bgColor}
                >
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

export default VideoDetailsRoute
