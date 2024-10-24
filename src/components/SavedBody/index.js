import Header from '../Header'
import SideBar from '../SideBar'
import SaveItem from '../SaveItem'
import './index.css'

const SaveBody = () => (
  <>
    <Header />
    <div className="home-container">
      <SideBar />
      <div>
        <SaveItem />
      </div>
    </div>
  </>
)
export default SaveBody
