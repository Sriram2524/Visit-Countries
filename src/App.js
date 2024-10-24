import {Component} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import NotFound from './components/NotFound'
import Gaming from './components/Gaming'
import SavedBody from './components/SavedBody'
import EachVideoItemDetails from './components/EachVideoItemDetails'
import ProtectedRoute from './components/ProtectedRoute'
import YoutubeContext from './context/YoutubeContext'
import './App.css'

// Replace your code here
class App extends Component {
  state = {savedVideos: [], isTheme: false}

  themeIsClicked = () => {
    const {isTheme} = this.state
    if (isTheme) {
      this.setState({isTheme: false})
    } else {
      this.setState({isTheme: true})
    }
  }

  addSaveButton = videoItem => {
    const {savedVideos} = this.state
    this.setState({savedVideos: [...savedVideos, videoItem]})
  }

  clickremove = id => {
    const {savedVideos} = this.state
    this.setState({savedVideos: savedVideos.filter(each => each.id !== id)})
  }

  render() {
    const {savedVideos, isTheme} = this.state
    return (
      <YoutubeContext.Provider
        value={{
          savedVideos,
          isTheme,
          addSaveButton: this.addSaveButton,
          themeIsClicked: this.themeIsClicked,
          clickremove: this.clickremove,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedBody} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={EachVideoItemDetails}
          />
          <Route path="/bad-path" component={NotFound} />
          <Redirect to="bad-path" />
        </Switch>
      </YoutubeContext.Provider>
    )
  }
}

export default App
