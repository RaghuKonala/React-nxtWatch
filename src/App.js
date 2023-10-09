import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import TrendingRoute from './components/TrendingRoute'
import GamingRoute from './components/GamingRoute'
import SavedVideosRoute from './components/SavedVideosRoute'
import VideoDetailsRoute from './components/VideoDetailsRoute'
import NotFoundRoute from './components/NotFoundRoute'
import ProtectedRoute from './components/ProtectedRoute'
import AppContext from './context/AppContext'
import './App.css'

// Replace your code here
class App extends Component {
  state = {isDarkTheme: false, savedVideos: [], reactedVideos: []}

  updateVideoDislike = videoId => {
    const {reactedVideos} = this.state
    const isVideoExist = reactedVideos.some(each => each.id === videoId)

    if (!isVideoExist) {
      this.setState({
        reactedVideos: [
          ...reactedVideos,
          {
            id: videoId,
            isLiked: false,
            isDisliked: true,
          },
        ],
      })
    } else {
      this.setState({
        reactedVideos: reactedVideos.map(eachVideo => {
          if (eachVideo.id === videoId) {
            return {
              id: videoId,
              isLiked: false,
              isDisliked: !eachVideo.isDisliked,
            }
          }
          return eachVideo
        }),
      })
    }
  }

  updateVideoLike = videoId => {
    const {reactedVideos} = this.state
    const isVideoExist = reactedVideos.some(each => each.id === videoId)

    if (!isVideoExist) {
      this.setState({
        reactedVideos: [
          ...reactedVideos,
          {
            id: videoId,
            isLiked: true,
            isDisliked: false,
          },
        ],
      })
    } else {
      this.setState({
        reactedVideos: reactedVideos.map(eachVideo => {
          if (eachVideo.id === videoId) {
            return {
              id: videoId,
              isLiked: !eachVideo.isLiked,
              isDisked: false,
            }
          }
          return eachVideo
        }),
      })
    }
  }

  updateSavedVideos = videoDetails => {
    const {savedVideos} = this.state
    const isVideoExist = savedVideos.some(each => each.id === videoDetails.id)

    if (isVideoExist) {
      this.setState({
        savedVideos: savedVideos.filter(each => each.id !== videoDetails.id),
      })
    } else {
      this.setState(prevState => ({
        savedVideos: [...prevState.savedVideos, videoDetails],
      }))
    }
  }

  changeTheme = () => {
    this.setState(prevState => ({isDarkTheme: !prevState.isDarkTheme}))
  }

  render() {
    const {isDarkTheme, savedVideos, reactedVideos} = this.state
    return (
      <AppContext.Provider
        value={{
          isDarkTheme,
          changeTheme: this.changeTheme,
          savedVideos,
          updateSavedVideos: this.updateSavedVideos,
          reactedVideos,
          updateVideoLike: this.updateVideoLike,
          updateVideoDislike: this.updateVideoDislike,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={HomeRoute} />
          <ProtectedRoute exact path="/trending" component={TrendingRoute} />
          <ProtectedRoute exact path="/gaming" component={GamingRoute} />
          <ProtectedRoute
            exact
            path="/saved-videos"
            component={SavedVideosRoute}
          />
          <ProtectedRoute path="/videos/:id" component={VideoDetailsRoute} />
          <Route path="/not-found" component={NotFoundRoute} />
          <Redirect to="/not-found" />
        </Switch>
      </AppContext.Provider>
    )
  }
}

export default App
