import Header from '../Header'
import SideBar from '../SideBar'
import TrendingBody from '../TrendingBody'
import './index.css'

const Trending = () => (
  <>
    <Header />
    <div className="home-container">
      <SideBar />
      <div>
        <TrendingBody />
      </div>
    </div>
  </>
)
export default Trending
