import React, { Component, Fragment } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import DrawerLayout from './DrawerLayout'
import Texts from '../Data/Texts'
import MyTheme from './MyTheme'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { ListOfStations } from './DrawerListContents'
import { createHashHistory } from 'history'
import { Router, Route } from "react-router";
import Station from './Station'
import FullMap from './FullMap';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTime: this.getCurrentTime()
    }
    setInterval(this.refreshTime, 1000);
  }

  getCurrentTime = () => {
    var d = new Date(); // for now
    var h = d.getHours(); // => 9
    var m = d.getMinutes(); // =>  30
    var s = d.getSeconds(); // => 51
    return `${h}:${m}:${s}`
  }



  refreshTime = () => {
    this.setState({
      currentTime: this.getCurrentTime()
    })
  }

  render() {

    return (
      <Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={MyTheme}>
          <DrawerLayout
            menuContent={ListOfStations}
            title={Texts.HeaderTitle}
            mainContents={
              <Fragment>

                <Router history={createHashHistory()}>

                  <div>
                    <Route exact path="/" render={(props) => <FullMap {...props} currentTime={this.state.currentTime} />} />
                    <Route path='/station/:ID' render={(props) => <Station {...props} currentTime={this.state.currentTime} />} />
                    <Route path='/map' render={(props) => <FullMap {...props} currentTime={this.state.currentTime} />} />                    
                  </div>

                </Router>
              </Fragment>
            }
          />
        </MuiThemeProvider>
      </Fragment>

    );
  }
}

export default App;
