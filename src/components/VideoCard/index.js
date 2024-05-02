import {formatDistanceToNow} from 'date-fns'

import ThemeContext from '../../context/ThemeContext'

import {
  HomeVideoLink,
  HomeVideoItem,
  HomeVideoThumbnail,
  ChannelProfileImage,
} from './StyledComponents'

import {
  FlexContainer,
  RowContainer,
  ColumnContainer,
  VideoDetailsContainer,
  CustomTitle,
  CustomInfo,
  CustomBullet,
  CustomBullet2,
} from '../../assets/commonStyles'

const VideoCard = props => {
  const {videoDetails} = props
  const {
    id,
    channel,
    publishedAt,
    thumbnailUrl,
    title,
    viewCount,
  } = videoDetails
  const {name, profileImageUrl} = channel

  const distanceToNow = formatDistanceToNow(new Date(publishedAt))
  const formattedDistance = distanceToNow.split(' ').slice(1).join(' ')

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        return (
          <HomeVideoItem>
            <HomeVideoLink to={`/videos/${id}`}>
              <HomeVideoThumbnail src={thumbnailUrl} alt="video thumbnail" />
              <VideoDetailsContainer>
                <ChannelProfileImage src={profileImageUrl} alt="channel logo" />
                <ColumnContainer style={{height: '100%'}}>
                  <CustomTitle isDarkTheme={isDarkTheme}>{title}</CustomTitle>
                  <FlexContainer>
                    <CustomInfo isDarkTheme={isDarkTheme}>{name}</CustomInfo>
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
            </HomeVideoLink>
          </HomeVideoItem>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default VideoCard
