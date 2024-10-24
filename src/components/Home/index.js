import {Component} from 'react'
import Header from '../Header'
import SideBar from '../SideBar'
import HomeBody from '../HomeBody'
import Banner from '../Banner'
import './index.css'

class Home extends Component {
  state = {isPremiumShow: true}

  clickClose = () => {
    this.setState({isPremiumShow: false})
  }

  render() {
    const {isPremiumShow} = this.state
    return (
      <>
        <Header />
        <div className="home-container">
          <SideBar />
          <div className="right-container">
            {isPremiumShow ? <Banner clickClose={this.clickClose} /> : null}
            <HomeBody />
          </div>
        </div>
      </>
    )
  }
}
export default Home
