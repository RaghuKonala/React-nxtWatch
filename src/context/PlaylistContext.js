import React from 'react'

const PlaylistContext = React.createContext({
  videosPlaylist: [],
  addVideoToPlaylist: () => {},
  updateLikedReaction: () => {},
  updateDislikedReaction: () => {},
})

export default PlaylistContext
