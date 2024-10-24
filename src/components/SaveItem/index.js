import {BiSave} from 'react-icons/bi'
import TrendingItem from '../TrendingItem'
import YoutubeContext from '../../context/YoutubeContext'
import {SaveContainer, SaveContaine, SaveNav} from './styledComponents'

import './index.css'

const SaveItem = () => (
  <YoutubeContext.Consumer>
    {value => {
      const {isTheme, savedVideos} = value

      const saveNavBg = isTheme ? '#231f20' : '#94a3b8'
      const saveContainerBg = isTheme ? ' #0f0f0f' : '#cbd5e1'
      const trendingbackground = isTheme ? '#000000' : '#ffffff'
      const textCon = isTheme ? '#ffffff' : '#000000'
      const lengthh = savedVideos.length !== 0
      return (
        <SaveContainer
          textCon={textCon}
          trendingbackground={trendingbackground}
        >
          <SaveNav saveNavBg={saveNavBg}>
            <SaveContaine saveContainerBg={saveContainerBg}>
              <BiSave className="save" />
            </SaveContaine>
            <h1 className="trending-heading">Saved Videos</h1>
          </SaveNav>
          <div className="what-render">
            {lengthh ? (
              <ul>
                {savedVideos.map(each => (
                  <TrendingItem eachItem={each} key={each.id} />
                ))}
              </ul>
            ) : (
              <div className="videosDiv1">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                  alt="no saved videos"
                  className="img10"
                />
                <h1>No saved videos found</h1>
                <p>You can save your videos while watching them</p>
                <button type="button" className="button6">
                  Retry
                </button>
              </div>
            )}
          </div>
        </SaveContainer>
      )
    }}
  </YoutubeContext.Consumer>
)
export default SaveItem
