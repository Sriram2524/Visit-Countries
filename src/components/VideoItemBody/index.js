import {Component} from 'react'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import Cookies from 'js-cookie'

import {BiLike, BiDislike, BiSave} from 'react-icons/bi'
import YoutubeContext from '../../context/YoutubeContext'
import {TrendingContainer, Btn} from './styledComponents'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemBody extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    eachVideo: [],
    like: false,
    unlike: false,
    save: false,
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {id} = this.props
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = {
        id: data.video_details.id,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        thumbnailUrl: data.video_details.thumbnail_url,
        name: data.video_details.channel.name,
        profileImgUrl: data.video_details.channel.profile_image_url,
        subscriberCount: data.video_details.channel.subscriber_count,
        viewCount: data.video_details.view_count,
        publishedAt: data.video_details.published_at,
        description: data.video_details.description,
      }
      this.setState({
        apiStatus: apiStatusConstants.success,
        eachVideo: formattedData,
      })
    } else {
      this.seTState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClicklike = () => {
    this.setState({like: true, unlike: false})
  }

  onClickunlike = () => {
    this.setState({unlike: true, like: false})
  }

  renderVideos = () => (
    <YoutubeContext.Consumer>
      {value => {
        const {eachVideo, like, unlike, save} = this.state
        const {
          title,
          videoUrl,
          id,
          name,
          viewCount,
          publishedAt,
          profileImgUrl,
          subscriberCount,

          description,
        } = eachVideo
        const {isTheme, addSaveButton, savedVideos, clickremove} = value
        const isVideoSaved = savedVideos.some(each => each.id === eachVideo.id)
        console.log(isVideoSaved)
        const onClicksave = () => {
          addSaveButton(eachVideo)
          if (save) {
            this.setState({save: false})
          } else {
            this.setState({save: true})
          }
        }
        const onClickremove = () => {
          clickremove(id)
        }
        const trendingbackground = isTheme ? '#000000' : '#ffffff'
        const textCon = isTheme ? '#ffffff' : '#000000'
        const saveB = save ? ' button1' : 'button2'
        return (
          <TrendingContainer
            textCon={textCon}
            trendingbackground={trendingbackground}
          >
            <ReactPlayer className='video' url={videoUrl} />
            <p className='title'>{title}</p>
            <div className='view-like-con'>
              <div className='view-con'>
                <p className='views'>{viewCount} views .</p>
                <p className='year'>{publishedAt}</p>
              </div>
              <div className='likes-con'>
                <Btn active={like} onClick={this.onClicklike} type='button'>
                  <BiLike color={like ? '#2563eb' : '#64748b'} /> Like
                </Btn>
                <Btn active={unlike} onClick={this.onClickunlike} type='button'>
                  <BiDislike color={unlike ? '#2563eb' : '#64748b'} /> Dislike
                </Btn>
                {isVideoSaved ? (
                  <button
                    onClick={onClickremove}
                    type='button'
                    className={saveB}
                  >
                    <BiSave /> saved
                  </button>
                ) : (
                  <button onClick={onClicksave} type='button' className={saveB}>
                    <BiSave /> save
                  </button>
                )}
              </div>
            </div>
            <hr className='horizontal-line' />
            <div className='profile-sub-con'>
              <img className='profile' src={profileImgUrl} alt='channel logo' />
              <div className='sub-con'>
                <p className='name'>{name}</p>
                <p className='sub'>{subscriberCount} subscribers</p>
              </div>
            </div>
            <p className='description'>{description}</p>
          </TrendingContainer>
        )
      }}
    </YoutubeContext.Consumer>
  )

  renderLoadingView = () => (
    <div className='products-loader-container' data-testid='loader'>
      <Loader type='ThreeDots' color='#0b69ff' height='50' width='50' />
    </div>
  )

  onClickfailure = () => {
    this.getTrendingVideos()
  }

  renderVideosFailureView = () => (
    <div className='failure-con'>
      <img
        src='https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        alt='failure-view'
        className='failure-img'
      />
      <h1 className='failure-heading'>Oops! Something Went Wrong</h1>
      <p className='failure-para'>
        We are having some trouble completing your request Please try again.
      </p>
      <button
        onClick={this.onClickfailure}
        type='button'
        className='failure-button'
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
    return <>{this.renderTredingItems()}</>
  }
}
export default VideoItemBody
