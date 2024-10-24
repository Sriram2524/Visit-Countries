import {Link} from 'react-router-dom'
import './index.css'

const HomeItem = props => {
  const {eachItem} = props
  const {
    id,
    title,
    thumbnailUrl,
    profileImageUrl,
    name,
    viewCount,
    publishedAt,
  } = eachItem
  return (
    <li className="home-list">
      <Link className="link" to={`/videos/${id}`}>
        <img
          className="home-item-list"
          alt="video thumbnail"
          src={thumbnailUrl}
        />
        <div className="profile-title-con">
          <img
            className="profile-img"
            src={profileImageUrl}
            alt="channel logo"
          />
          <p className="title">{title}</p>
        </div>
        <p className="name">{name}</p>
        <div className="count-year-con">
          <p className="count">{viewCount} views</p>
          <p className="year">{publishedAt}</p>
        </div>
      </Link>
    </li>
  )
}
export default HomeItem
