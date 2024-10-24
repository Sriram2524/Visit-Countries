import {Link, withRouter} from 'react-router-dom'
import {BiSun} from 'react-icons/bi'
import {BsMoon} from 'react-icons/bs'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillHome, AiOutlineSave, AiFillFire} from 'react-icons/ai'

import {SiYoutubegaming} from 'react-icons/si'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {HeaderContainer} from './styledComponents'
import YoutubeContext from '../../context/YoutubeContext'
import './index.css'

const Header = props => (
  <YoutubeContext.Consumer>
    {value => {
      const {isTheme, themeIsClicked} = value
      const bgColor = isTheme ? '#212121' : '#ffffff'
      const HeaderLogo = isTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

      const onClickTheme = () => {
        themeIsClicked()
      }

      const onClickConfirm = () => {
        Cookies.remove('jwt_token')
        const {history} = props
        history.replace('/login')
      }

      return (
        <HeaderContainer bgColor={bgColor}>
          <Link className='link' to='/'>
            <img className='header-logo' alt='website logo' src={HeaderLogo} />
          </Link>
          <div className='right-container'>
            <button
              data-testid='theme'
              onClick={onClickTheme}
              type='button'
              className='theme-button'
            >
              {isTheme ? (
                <BiSun className='bi-sun' />
              ) : (
                <BsMoon className='bi-moon' />
              )}
            </button>
            <img
              className='profile'
              src='https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png'
              alt='profile'
            />

            <div className='mobile-view-container'>
              <Popup
                className='pop'
                modal
                trigger={
                  <GiHamburgerMenu
                    size='28'
                    color={isTheme ? 'white' : 'black'}
                  />
                }
              >
                {close => (
                  <div className='mobile-close-view'>
                    <ul className='unordered-class'>
                      <li className='list'>
                        <Link onClick={() => close()} to='/'>
                          <AiFillHome className='icons' />
                          <p className='home'>Home</p>
                        </Link>
                      </li>
                      <li className='list'>
                        <Link onClick={() => close()} to='/trending'>
                          <AiFillFire className='icons' />
                          <p className='home'>Trending</p>
                        </Link>
                      </li>
                      <li className='list'>
                        <Link onClick={() => close()} to='/gaming'>
                          <SiYoutubegaming className='icons' />
                          <p className='home'>Gaming</p>
                        </Link>
                      </li>
                      <li className='list'>
                        <Link onClick={() => close()} to='/saved-videos'>
                          <AiOutlineSave className='icons' />
                          <p className='home'>Saved videos</p>
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </Popup>
            </div>

            <div className='popup-button-container'>
              <Popup
                className='pop'
                modal
                trigger={
                  <button type='button' className='button1'>
                    Logout
                  </button>
                }
              >
                {close => (
                  <div className='popup-container'>
                    <p className='pop-des'>Are you sure, you want to logout</p>
                    <div className='button-con'>
                      <button
                        onClick={() => close()}
                        className='cancel'
                        type='button'
                      >
                        Cancel
                      </button>
                      <button
                        onClick={onClickConfirm}
                        className='logout'
                        type='button'
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
            </div>
          </div>
        </HeaderContainer>
      )
    }}
  </YoutubeContext.Consumer>
)
export default withRouter(Header)
