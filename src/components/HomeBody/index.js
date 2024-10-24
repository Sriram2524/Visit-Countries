import {Component} from 'react'
import {BiSearch} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {HomeContainer} from './styledComponents'
import YoutubeContext from '../../context/YoutubeContext'
import HomeItem from '../HomeItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class HomeBody extends Component {
  state = {
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    videosList: [],
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput} = this.state
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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
        videosList: formattedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onClickfailure = () => {
    this.getVideos()
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

  renderVideos = () => {
    const {videosList} = this.state
    if (videosList.length !== 0) {
      return (
        <ul className="unordered-home-list">
          {videosList.map(each => (
            <HomeItem eachItem={each} key={each.id} />
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
          Try different key words or remove search filter
        </p>
        <button type="button" className="no-search-button">
          Retry
        </button>
      </div>
    )
  }

  renderAllItems = () => {
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

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    this.getVideos()
  }

  render() {
    const {searchInput} = this.state
    return (
      <YoutubeContext.Consumer>
        {value => {
          const {isTheme} = value
          const sideBarBgColor = isTheme ? ' #181818' : '#ffffff'
          const textColor = isTheme ? '#ffffff' : ' #181818'
          return (
            <HomeContainer
              data-testid="home"
              textColor={textColor}
              sideBarBgColor={sideBarBgColor}
            >
              <div className="search-con">
                <input
                  className="input"
                  placeholder="Search"
                  value={searchInput}
                  onChange={this.onChangeInput}
                  type="search"
                />
                <button
                  onClick={this.onClickSearch}
                  data-testid="searchButton"
                  type="button"
                  className="search-button"
                >
                  <BiSearch />
                </button>
              </div>
              {this.renderAllItems()}
            </HomeContainer>
          )
        }}
      </YoutubeContext.Consumer>
    )
  }
}
export default HomeBody
