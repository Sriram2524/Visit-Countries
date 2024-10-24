import Header from '../Header'
import SideBar from '../SideBar'
import GamingBody from '../GamingBody'
import './index.css'

const Gaming = () => (
  <>
    <Header />
    <div className="home-container">
      <SideBar />
      <div>
        <GamingBody />
      </div>
    </div>
  </>
)
export default Gaming
