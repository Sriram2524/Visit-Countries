import {Link} from 'react-router-dom'
import './index.css'

const GamingItem = props => {
  const {eachItem} = props
  const {id, title, thumbnailUrl, viewCount} = eachItem
  return (
    <li className="home-list">
      <Link className="link" to={`/videos/${id}`}>
        <img
          className="home-item-list"
          alt="video thumbnail"
          src={thumbnailUrl}
        />
        <div className="trending-text-con">
          <p className="title">{title}</p>
          <p className="count">{viewCount} Watching Worldwide</p>
        </div>
      </Link>
    </li>
  )
}
export default GamingItem
