import {AiOutlineClose} from 'react-icons/ai'
import {BannerContainer} from './styledComponents'

import './index.css'

const Banner = props => {
  const {clickClose} = props
  const onClickClose = () => {
    clickClose()
  }
  return (
    <BannerContainer data-testid="banner">
      <div className="text-container">
        <img
          className="banner-logo"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="nxt watch logo"
        />
        <p className="banner-para">
          Buy Nxt Watch Premium prepaid plans with UPI
        </p>
        <button className="banner-button" type="button">
          GET IT NOW
        </button>
      </div>
      <button
        data-testid="close"
        onClick={onClickClose}
        type="button"
        className="close-button"
      >
        <AiOutlineClose />
      </button>
    </BannerContainer>
  )
}
export default Banner
