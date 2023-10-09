import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {AiOutlineSearch, AiOutlineClose} from 'react-icons/ai'

import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import VideoCard from '../VideoCard'
import FailureView from '../FailureView'
import AppContext from '../../context/AppContext'

import {
  AppContainer,
  AppResponsiveContainer,
  AppContentContainer,
  LoaderContainer,
  CustomViewContainer,
  CustomViewImage,
  CustomViewTitle,
  CustomViewDescription,
  CustomRetryButton,
} from '../../styles/CommonStyles'

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
  noResults: 'NO_RESULTS',
  inProgress: 'IN_PROGRESS',
}

class HomeRoute extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    videosData: [],
    hideBanner: false,
  }

  componentDidMount() {
    this.getHomeVideosData()
  }

  getHomeVideosData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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
      if (fetchedData.total !== 0) {
        const {videos} = fetchedData
        const formattedData = videos.map(eachVideo => ({
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
        this.setState({apiStatus: apiStatusConstants.noResults})
      }
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  retrySearchResults = () => {
    this.setState({searchInput: ''}, this.getHomeVideosData)
  }

  updateSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  toggleBannerVisibility = () => {
    this.setState({hideBanner: true})
  }

  renderSuccessView = () => {
    const {videosData} = this.state
    return (
      <HomeVideosContainer>
        {videosData.map(eachVideo => (
          <VideoCard key={eachVideo.id} videoDetails={eachVideo} />
        ))}
      </HomeVideosContainer>
    )
  }

  renderNoSearchResultsView = () => (
    <AppContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        return (
          <CustomViewContainer>
            <CustomViewImage
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
            />
            <CustomViewTitle isDarkTheme={isDarkTheme}>
              No Search results found
            </CustomViewTitle>
            <CustomViewDescription isDarkTheme={isDarkTheme}>
              Try different key words or remove search filter
            </CustomViewDescription>
            <CustomRetryButton type="button" onClick={this.retrySearchResults}>
              Retry
            </CustomRetryButton>
          </CustomViewContainer>
        )
      }}
    </AppContext.Consumer>
  )

  renderFailureView = () => (
    <FailureView retryApiCall={this.getHomeVideosData} />
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
      case apiStatusConstants.noResults:
        return this.renderNoSearchResultsView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderSearchField = () => {
    const {searchInput} = this.state
    return (
      <SearchContainer>
        <SearchField
          type="search"
          placeholder="Search"
          value={searchInput}
          onChange={this.updateSearchInput}
        />
        <SearchButton
          type="button"
          onClick={this.getHomeVideosData}
          data-testid="searchButton"
        >
          <AiOutlineSearch size={15} />
        </SearchButton>
      </SearchContainer>
    )
  }

  renderHomeBanner = () => (
    <HomeBannerContainer data-testid="banner">
      <HomeBannerContent>
        <HomeBannerImage
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="nxt watch logo"
        />
        <BannerDescription>
          Buy Nxt Watch Premium prepaid plans with UPI
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
    const {hideBanner} = this.state
    return (
      <AppContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const bgColor = isDarkTheme ? '#181818' : '#f9f9f9'
          return (
            <AppContainer>
              <Navbar />
              <AppResponsiveContainer>
                <Sidebar />
                <AppContentContainer data-testid="home" bgColor={bgColor}>
                  {!hideBanner && this.renderHomeBanner()}
                  <HomeContentContainer>
                    {this.renderSearchField()}
                    {this.renderApiResponseView()}
                  </HomeContentContainer>
                </AppContentContainer>
              </AppResponsiveContainer>
            </AppContainer>
          )
        }}
      </AppContext.Consumer>
    )
  }
}

export default HomeRoute
