import React, { Component } from 'react'

// 导入路由
import {HashRouter,Switch,Route,Redirect} from 'react-router-dom'
// 引入字体图标库
import './assets/fonts/iconfont.css'
// 导入组件
import Layout from './views/Layout'
import Login from './views/Login'
import NotFound from './views/NotFound'
export default class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
            <Route path='/layout' component={Layout} />
            <Route path='/login' component={Login} />

            <Redirect exact path='/' to='/layout' />
            <Route component={NotFound} />

        </Switch>
      </HashRouter>
    )
  }
}
