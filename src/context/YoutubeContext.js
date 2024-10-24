import React from 'react'

const YoutubeContext = React.createContext({
  savedVideos: [],
  isTheme: false,
  themeIsClicked: () => {},
  addSaveButton: () => {},
  clickremove: () => {},
})
export default YoutubeContext
