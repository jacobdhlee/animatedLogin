import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import App from './App';
import Login from './Login';
import Signup from './Signup';
import Main from './Main';

const Routers = () => {
  return (
    <Router>
      <Scene key="app" component={App} title="MainContainer" hideNavBar={true} />
      <Scene key="login" component={Login} title="login" hideNavBar={true}/>
      <Scene key="signup" component={Signup} title="signup" hideNavBar={true}/>
      <Scene key = "main" >
        <Scene key="mainTabs" component={Main} title="" />
      </Scene>
    </Router>
  )
}

export default Routers