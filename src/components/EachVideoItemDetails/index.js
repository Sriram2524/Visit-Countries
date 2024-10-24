import {Component} from 'react'
import Header from '../Header'
import SideBar from '../SideBar'
import VideoItemBody from '../VideoItemBody'
import './index.css'

class EachVideoItemDetails extends Component {
  render() {
    const {match} = this.props
    const {params} = match
    const {id} = params
    return (
      <>
        <Header />
        <div className="home-container">
          <SideBar />
          <div>
            <VideoItemBody id={id} />
          </div>
        </div>
      </>
    )
  }
}
export default EachVideoItemDetails
