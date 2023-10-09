import {formatDistanceToNow} from 'date-fns'
import {CgPlayListAdd as PlaylistIcon} from 'react-icons/cg'

import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import AppContext from '../../context/AppContext'

import {
  AppContainer,
  AppResponsiveContainer,
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
} from '../../styles/CommonStyles'

import {
  GamingVideosContainer,
  GamingVideoItem,
  GamingVideoLink,
  GamingVideoThumbnail,
  ChannelProfileImage,
} from './StyledComponents'

const SavedVideosRoute = () => (
  <AppContext.Consumer>
    {value => {
      const {isDarkTheme, savedVideos} = value
      const bgColor = isDarkTheme ? '#0f0f0f' : '#f9f9f9'
      const noSavedVideos = savedVideos.length === 0

      const renderSavedVideosBanner = () => {
        const bannerIconColor = isDarkTheme ? '#ff0b37' : '#ff0000'
        return (
          <CustomBanner isDarkTheme={isDarkTheme} data-testid="banner">
            <CustomBannerLogo isDarkTheme={isDarkTheme}>
              <PlaylistIcon size={25} color={bannerIconColor} />
            </CustomBannerLogo>
            <CustomBannerTitle isDarkTheme={isDarkTheme}>
              Saved Videos
            </CustomBannerTitle>
          </CustomBanner>
        )
      }

      const renderSavedVideosView = () => (
        <GamingVideosContainer>
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
            const formattedDistance = distanceToNow
              .split(' ')
              .slice(1)
              .join(' ')

            return (
              <GamingVideoItem key={id}>
                <GamingVideoLink to={`/videos/${id}`}>
                  <GamingVideoThumbnail
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
                </GamingVideoLink>
              </GamingVideoItem>
            )
          })}
        </GamingVideosContainer>
      )

      const renderNoSavedVideosView = () => (
        <CustomViewContainer>
          <CustomViewImage
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
            alt="no saved videos"
          />
          <CustomViewTitle isDarkTheme={isDarkTheme}>
            No saved videos found
          </CustomViewTitle>
          <CustomViewDescription isDarkTheme={isDarkTheme}>
            You can save your videos while watching them
          </CustomViewDescription>
        </CustomViewContainer>
      )

      return (
        <AppContainer>
          <Navbar />
          <AppResponsiveContainer>
            <Sidebar />
            <AppContentContainer data-testid="savedVideos" bgColor={bgColor}>
              {noSavedVideos ? (
                renderNoSavedVideosView()
              ) : (
                <>
                  {renderSavedVideosBanner()}
                  {renderSavedVideosView()}
                </>
              )}
            </AppContentContainer>
          </AppResponsiveContainer>
        </AppContainer>
      )
    }}
  </AppContext.Consumer>
)

export default SavedVideosRoute
