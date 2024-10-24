import {Link} from 'react-router-dom'
import './index.css'

const TrendingItem = props => {
  const {eachItem} = props
  const {id, title, thumbnailUrl, name, viewCount, publishedAt} = eachItem
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
          <p className="name">{name}</p>
          <div className="count-year-con">
            <p className="count">{viewCount} views</p>
            <p className="year">{publishedAt}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}
export default TrendingItem
