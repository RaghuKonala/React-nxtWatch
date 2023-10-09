import React from 'react'

const AppContext = React.createContext({
  isDarkTheme: false,
  changeTheme: () => {},
  savedVideos: [],
  updateSavedVideos: () => {},
  reactedVideos: [],
  updateVideoLike: () => {},
  updateVideoDislike: () => {},
})

export default AppContext
