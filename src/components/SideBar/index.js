import {Link} from 'react-router-dom'
import {AiFillHome, AiOutlineSave, AiFillFire} from 'react-icons/ai'

import {SiYoutubegaming} from 'react-icons/si'
import YoutubeContext from '../../context/YoutubeContext'
import {SideBarContainer} from './styledComponents'
import './index.css'

const SideBar = () => (
  <YoutubeContext.Consumer>
    {value => {
      const {isTheme} = value
      const sideBarBgColor = isTheme ? '#212121' : '#ffffff'
      const textColor = isTheme ? '#ffffff' : '#212121'
      return (
        <SideBarContainer textColor={textColor} sideBarBgColor={sideBarBgColor}>
          <ul className="unordered-class">
            <li className="list">
              <Link to="/">
                <AiFillHome className="icons" />
                <p className="home">Home</p>
              </Link>
            </li>
            <li className="list">
              <Link to="/trending">
                <AiFillFire className="icons" />
                <p className="home">Trending</p>
              </Link>
            </li>
            <li className="list">
              <Link to="/gaming">
                <SiYoutubegaming className="icons" />
                <p className="home">Gaming</p>
              </Link>
            </li>
            <li className="list">
              <Link to="/saved-videos">
                <AiOutlineSave className="icons" />
                <p className="home">Saved videos</p>
              </Link>
            </li>
          </ul>
          <div className="footer-con">
            <p className="contact">CONTACT US</p>
            <div className="icons-con">
              <img
                className="fb"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
              />
              <img
                className="fb"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
              />
              <img
                className="fb"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
              />
            </div>
            <p className="dec">
              Enjoy! Now to see your channels and recommendations!
            </p>
          </div>
        </SideBarContainer>
      )
    }}
  </YoutubeContext.Consumer>
)
export default SideBar
