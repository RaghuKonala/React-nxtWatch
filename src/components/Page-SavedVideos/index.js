import {formatDistanceToNow} from 'date-fns'
import {CgPlayListAdd as PlaylistIcon} from 'react-icons/cg'
import {noSavedVideosImage} from '../../assets/images'
import ThemeContext from '../../context/ThemeContext'
import PlaylistContext from '../../context/PlaylistContext'

import {
  AppContentContainer,
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
  CustomViewContainer,
  CustomViewImage,
  CustomViewTitle,
  CustomViewDescription,
} from '../../assets/commonStyles'

import {
  SavedVideosContainer,
  SavedVideoItem,
  SavedVideoLink,
  SavedVideoThumbnail,
  ChannelProfileImage,
} from './StyledComponents'

const SavedVideosPage = () => {
  const renderSavedVideosView = (isDarkTheme, savedVideos) => (
    <SavedVideosContainer>
      {savedVideos.map(eachVideo => {
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
        const formattedDistance = distanceToNow.split(' ').slice(1).join(' ')

        return (
          <SavedVideoItem key={id}>
            <SavedVideoLink to={`/videos/${id}`}>
              <SavedVideoThumbnail src={thumbnailUrl} alt="video thumbnail" />
              <VideoDetailsContainer>
                <ChannelProfileImage src={profileImageUrl} alt="channel logo" />
                <ColumnContainer>
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
            </SavedVideoLink>
          </SavedVideoItem>
        )
      })}
    </SavedVideosContainer>
  )

  const renderNoSavedVideosView = isDarkTheme => (
    <CustomViewContainer>
      <CustomViewImage src={noSavedVideosImage} alt="no saved videos" />
      <CustomViewTitle isDarkTheme={isDarkTheme}>
        No saved videos found
      </CustomViewTitle>
      <CustomViewDescription isDarkTheme={isDarkTheme}>
        You can save your videos while watching them
      </CustomViewDescription>
    </CustomViewContainer>
  )

  const renderSavedVideosBanner = isDarkTheme => (
    <CustomBanner isDarkTheme={isDarkTheme} data-testid="banner">
      <CustomBannerLogo isDarkTheme={isDarkTheme}>
        <PlaylistIcon size={25} color={isDarkTheme ? '#ff0b37' : '#ff0000'} />
      </CustomBannerLogo>
      <CustomBannerTitle isDarkTheme={isDarkTheme}>
        Saved Videos
      </CustomBannerTitle>
    </CustomBanner>
  )

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const bgColor = isDarkTheme ? '#0f0f0f' : '#f9f9f9'

        return (
          <AppContentContainer data-testid="savedVideos" bgColor={bgColor}>
            <PlaylistContext.Consumer>
              {val => {
                const {videosPlaylist} = val
                const savedVideos = videosPlaylist.filter(each => each.isSaved)
                const noSavedVideos = savedVideos.length === 0

                return (
                  <>
                    {noSavedVideos ? (
                      renderNoSavedVideosView(isDarkTheme)
                    ) : (
                      <>
                        {renderSavedVideosBanner(isDarkTheme)}
                        {renderSavedVideosView(isDarkTheme, savedVideos)}
                      </>
                    )}
                  </>
                )
              }}
            </PlaylistContext.Consumer>
          </AppContentContainer>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default SavedVideosPage
