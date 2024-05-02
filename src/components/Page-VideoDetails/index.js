import {Component} from 'react'
import ReactPlayer from 'react-player'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'

import FailureView from '../FailureView'
import ThemeContext from '../../context/ThemeContext'
import PlaylistContext from '../../context/PlaylistContext'

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

import {
  AppContentContainer,
  LoaderContainer,
  ColumnContainer,
  RowContainer,
  VideoDetailsContainer,
  CustomBullet,
} from '../../assets/commonStyles'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoDetailsPage extends Component {
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
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
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

  renderSuccessView = isDarkTheme => {
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
      <PlaylistContext.Consumer>
        {value => {
          const {
            videosPlaylist,
            addVideoToPlaylist,
            updateLikedReaction,
            updateDislikedReaction,
          } = value

          const isVideoExist = videosPlaylist.find(each => each.id === id)
          const isVideoDisliked =
            isVideoExist === undefined ? false : isVideoExist.isDisliked
          const isVideoLiked =
            isVideoExist === undefined ? false : isVideoExist.isLiked
          const isVideoSaved =
            isVideoExist === undefined ? false : isVideoExist.isSaved

          const onClickDislike = () => updateDislikedReaction(videoDetails)
          const onClickLike = () => updateLikedReaction(videoDetails)
          const onClickSave = () => addVideoToPlaylist(videoDetails)

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
                      onClick={onClickSave}
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
      </PlaylistContext.Consumer>
    )
  }

  renderFailureView = isDarkTheme => (
    <FailureView
      darkTheme={isDarkTheme}
      providedFunction={this.getVideoItemDetails}
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
            <AppContentContainer
              data-testid="videoItemDetails"
              bgColor={bgColor}
            >
              {renderApiResponseView()}
            </AppContentContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default VideoDetailsPage
