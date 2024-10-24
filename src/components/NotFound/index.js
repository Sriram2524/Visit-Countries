import YoutubeContext from '../../context/YoutubeContext'
import {NotFounContainer} from './styledComponents'
import './index.css'

const NotFound = () => (
  <YoutubeContext.Consumer>
    {value => {
      const {isTheme} = value
      const notFoundImg = isTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
      const textColor = isTheme ? '#ffffff' : ' #0f0f0f'
      const bgColor = isTheme ? ' #0f0f0f' : '#ffffff'
      return (
        <NotFounContainer textColor={textColor} bgColor={bgColor}>
          <img className="not-found-img" alt="not found" src={notFoundImg} />
          <h1 className="heading">Page Not Found</h1>
          <p className="para">
            we are sorry, the page you requested could not be found.
          </p>
        </NotFounContainer>
      )
    }}
  </YoutubeContext.Consumer>
)
export default NotFound
