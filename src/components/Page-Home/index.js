import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {AiOutlineSearch, AiOutlineClose} from 'react-icons/ai'

import VideoCard from '../VideoCard'
import FailureView from '../FailureView'
import ThemeContext from '../../context/ThemeContext'
import {noSearchResultsImage} from '../../assets/images'

import {
  AppContentContainer,
  LoaderContainer,
  CustomViewContainer,
  CustomViewImage,
  CustomViewTitle,
  CustomViewDescription,
  CustomViewRetryButton,
} from '../../assets/commonStyles'
import {
  HomeBannerContainer,
  HomeBannerContent,
  HomeBannerImage,
  BannerDescription,
  BannerGetItButton,
  BannerCloseButton,
  HomeContentContainer,
  SearchContainer,
  SearchField,
  SearchButton,
  HomeVideosContainer,
} from './StyledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class HomePage extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    homeVideosData: [],
    hideBanner: false,
  }

  componentDidMount() {
    this.getHomeVideosData()
  }

  getHomeVideosData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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
        homeVideosData: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  resetSearchResults = () => {
    this.setState({searchInput: ''}, this.getHomeVideosData)
  }

  updateSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  toggleBannerVisibility = () => {
    this.setState({hideBanner: true})
  }

  renderSuccessView = isDarkTheme => {
    const {homeVideosData} = this.state
    const noVideos = homeVideosData.length === 0
    if (noVideos) {
      return (
        <CustomViewContainer>
          <CustomViewImage alt="no videos" src={noSearchResultsImage} />
          <CustomViewTitle isDarkTheme={isDarkTheme}>
            No Search results found
          </CustomViewTitle>
          <CustomViewDescription isDarkTheme={isDarkTheme}>
            Try different key words or remove search filter
          </CustomViewDescription>
          <CustomViewRetryButton
            type="button"
            onClick={this.resetSearchResults}
          >
            Retry
          </CustomViewRetryButton>
        </CustomViewContainer>
      )
    }
    return (
      <HomeVideosContainer>
        {homeVideosData.map(eachVideo => (
          <VideoCard key={eachVideo.id} videoDetails={eachVideo} />
        ))}
      </HomeVideosContainer>
    )
  }

  renderFailureView = isDarkTheme => (
    <FailureView
      darkTheme={isDarkTheme}
      providedFunction={this.getHomeVideosData}
    />
  )

  renderLoadingView = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
    </LoaderContainer>
  )

  renderSearchField = () => {
    const {searchInput} = this.state
    return (
      <SearchContainer
        onSubmit={event => {
          event.preventDefault()
          this.getHomeVideosData()
        }}
      >
        <SearchField
          type="search"
          placeholder="Search"
          value={searchInput}
          name="searchbar"
          onChange={this.updateSearchInput}
        />
        <SearchButton type="submit" data-testid="searchButton">
          <AiOutlineSearch size={15} />
        </SearchButton>
      </SearchContainer>
    )
  }

  renderHomeBanner = () => (
    <HomeBannerContainer data-testid="banner">
      <HomeBannerContent>
        <HomeBannerImage>iWATCH</HomeBannerImage>
        <BannerDescription>
          Buy iWATCH Premium prepaid plans with UPI
        </BannerDescription>
        <BannerGetItButton>GET IT NOW</BannerGetItButton>
      </HomeBannerContent>
      <BannerCloseButton
        type="button"
        data-testid="close"
        onClick={this.toggleBannerVisibility}
      >
        <AiOutlineClose size={16} />
      </BannerCloseButton>
    </HomeBannerContainer>
  )

  render() {
    const {hideBanner, apiStatus} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const bgColor = isDarkTheme ? '#181818' : '#f9f9f9'

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
            <AppContentContainer data-testid="home" bgColor={bgColor}>
              {!hideBanner && this.renderHomeBanner()}
              <HomeContentContainer>
                {this.renderSearchField()}
                {renderApiResponseView()}
              </HomeContentContainer>
            </AppContentContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default HomePage
