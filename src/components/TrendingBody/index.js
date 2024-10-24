import {Component} from 'react'
import {AiFillFire} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {TrendingContainer, TrendingNav, FireContainer} from './styledComponents'
import YoutubeContext from '../../context/YoutubeContext'
import TrendingItem from '../TrendingItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TrendingBody extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    trendingVideosList: [],
  }

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = data.videos.map(each => ({
        id: each.id,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        name: each.channel.name,
        profileImageUrl: each.channel.profile_image_url,
        viewCount: each.view_count,
        publishedAt: each.published_at,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        trendingVideosList: formattedData,
      })
    } else {
      this.seTState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderVideos = () => {
    const {trendingVideosList} = this.state
    if (trendingVideosList.length !== 0) {
      return (
        <ul className="unordered-home-list">
          {trendingVideosList.map(each => (
            <TrendingItem eachItem={each} key={each.id} />
          ))}
        </ul>
      )
    }
    return (
      <div className="no-search-con">
        <img
          className="no-search-img"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          alt="no videos"
        />
        <h1 className="no-search-heading">No Search Results Found</h1>
        <p className="no-search-para">
          Try different keywords or remove the search filter
        </p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onClickfailure = () => {
    this.getTrendingVideos()
  }

  renderVideosFailureView = () => (
    <div className="failure-con">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We are having some trouble completing your request Please try again.
      </p>
      <button
        onClick={this.onClickfailure}
        type="button"
        className="failure-button"
      >
        Retry
      </button>
    </div>
  )

  renderTredingItems = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideos()
      case apiStatusConstants.failure:
        return this.renderVideosFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <YoutubeContext.Consumer>
        {value => {
          const {isTheme} = value
          const trendingNavBg = isTheme ? '#231f20' : '#94a3b8'
          const fireContainerBg = isTheme ? ' #0f0f0f' : '#cbd5e1'
          const trendingbackground = isTheme ? '#000000' : '#ffffff'
          const textCon = isTheme ? '#ffffff' : '#000000'
          return (
            <TrendingContainer
              textCon={textCon}
              trendingbackground={trendingbackground}
            >
              <TrendingNav trendingNavBg={trendingNavBg}>
                <FireContainer fireContainerBg={fireContainerBg}>
                  <AiFillFire className="fire" />
                </FireContainer>
                <h1 className="trending-heading">Trending</h1>
              </TrendingNav>
              {this.renderTredingItems()}
            </TrendingContainer>
          )
        }}
      </YoutubeContext.Consumer>
    )
  }
}
export default TrendingBody
