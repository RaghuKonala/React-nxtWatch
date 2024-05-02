import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './components/Page-Login'

import HomePage from './components/Page-Home'
import TrendingPage from './components/Page-Trending'
import GamingPage from './components/Page-Gaming'
import SavedVideosPage from './components/Page-SavedVideos'
import VideoDetailsPage from './components/Page-VideoDetails'
import NotFoundPage from './components/Page-NotFound'

import ThemeContext from './context/ThemeContext'
import PlaylistContext from './context/PlaylistContext'
import './App.css'

class App extends Component {
  state = {
    isDarkTheme: false,
    videosPlaylist: [],
  }

  updateDislikedReaction = videoDetails => {
    const {videosPlaylist} = this.state
    const isVideoExist = videosPlaylist.some(
      each => each.id === videoDetails.id,
    )
    if (isVideoExist) {
      this.setState({
        videosPlaylist: videosPlaylist.map(eachVideo => {
          if (eachVideo.id === videoDetails.id) {
            return {
              ...eachVideo,
              isLiked: false,
              isDisliked: !eachVideo.isDisliked,
            }
          }
          return eachVideo
        }),
      })
    } else {
      this.setState(prevState => ({
        videosPlaylist: [
          ...prevState.videosPlaylist,
          {
            ...videoDetails,
            isSaved: false,
            isLiked: false,
            isDisliked: true,
          },
        ],
      }))
    }
  }

  updateLikedReaction = videoDetails => {
    const {videosPlaylist} = this.state
    const isVideoExist = videosPlaylist.some(
      each => each.id === videoDetails.id,
    )
    if (isVideoExist) {
      this.setState({
        videosPlaylist: videosPlaylist.map(eachVideo => {
          if (eachVideo.id === videoDetails.id) {
            return {
              ...eachVideo,
              isLiked: !eachVideo.isLiked,
              isDisliked: false,
            }
          }
          return eachVideo
        }),
      })
    } else {
      this.setState(prevState => ({
        videosPlaylist: [
          ...prevState.videosPlaylist,
          {
            ...videoDetails,
            isSaved: false,
            isLiked: true,
            isDisliked: false,
          },
        ],
      }))
    }
  }

  addVideoToPlaylist = videoDetails => {
    const {videosPlaylist} = this.state
    const isVideoExist = videosPlaylist.some(
      each => each.id === videoDetails.id,
    )
    if (isVideoExist) {
      this.setState({
        videosPlaylist: videosPlaylist.map(eachVideo => {
          if (eachVideo.id === videoDetails.id) {
            return {...eachVideo, isSaved: !eachVideo.isSaved}
          }
          return eachVideo
        }),
      })
    } else {
      this.setState(prevState => ({
        videosPlaylist: [
          ...prevState.videosPlaylist,
          {
            ...videoDetails,
            isSaved: true,
            isLiked: false,
            isDisliked: false,
          },
        ],
      }))
    }
  }

  changeTheme = () => {
    this.setState(prevState => ({isDarkTheme: !prevState.isDarkTheme}))
  }

  render() {
    const {isDarkTheme, videosPlaylist} = this.state
    return (
      <ThemeContext.Provider
        value={{
          isDarkTheme,
          changeTheme: this.changeTheme,
        }}
      >
        <PlaylistContext.Provider
          value={{
            videosPlaylist,
            addVideoToPlaylist: this.addVideoToPlaylist,
            updateLikedReaction: this.updateLikedReaction,
            updateDislikedReaction: this.updateDislikedReaction,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <ProtectedRoute exact path="/" component={HomePage} />
            <ProtectedRoute exact path="/trending" component={TrendingPage} />
            <ProtectedRoute exact path="/gaming" component={GamingPage} />
            <ProtectedRoute
              exact
              path="/saved-videos"
              component={SavedVideosPage}
            />
            <ProtectedRoute path="/videos/:id" component={VideoDetailsPage} />
            <Route path="/not-found" component={NotFoundPage} />
            <Redirect to="/not-found" />
          </Switch>
        </PlaylistContext.Provider>
      </ThemeContext.Provider>
    )
  }
}

export default App
