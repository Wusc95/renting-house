import React, { Component } from 'react'

// 导入路由
import { Link, Route, Switch, Redirect } from 'react-router-dom'
// 导入样式
import styles from './index.module.scss'
// 导入组件
import Home from '../Home'
import My from '../My'
import News from '../News'
import HoustList from '../HoustList'

// 导入ant组件
import { TabBar } from 'antd-mobile'
export default class Layout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedPath: props.location.pathname
        }
    }
    // tabs数组
    TABS = [
        {
            title: "首页",
            icon: "icon-index",
            path: "/layout/home"
        },
        {
            title: "找房",
            icon: "icon-findHouse",
            path: "/layout/houselist"
        },
        {
            title: "资讯",
            icon: "icon-info",
            path: "/layout/news"
        },
        {
            title: "我的",
            icon: "icon-my",
            path: "/layout/my"
        }
    ];
    // 渲染tabBar
    renderContent() {
        return (
            <TabBar
                tintColor="#21B97A"
                noRenderContent={true}
            >
                {
                    this.TABS.map((item, index) => {
                        return <TabBar.Item
                            title={item.title}
                            key={item.path}
                            icon={<i className={`iconfont ${item.icon}`} />}
                            selectedIcon={<i className={`iconfont ${item.icon}`} />}
                            selected={this.state.selectedPath === item.path}
                            onPress={() => {
                                this.setState({
                                    selectedPath: item.path,
                                });
                                if (this.state.selectedPath !== item.path) {
                                    this.props.history.push(item.path)
                                }
                            }}
                        >
                        </TabBar.Item>
                    })
                }
            </TabBar>
        )
    }
    render() {
        return (
            <div className={styles.layout}>
                {/* 内容 */}
                <div className='contain'>
                    <Switch>
                        <Route path='/layout/home' component={Home} />
                        <Route path='/layout/my' component={My} />
                        <Route path='/layout/news' component={News} />
                        <Route path='/layout/houselist' component={HoustList} />
                        <Redirect exact from='/layout' to='/layout/home' />
                    </Switch>
                </div>
                {/* tabBar */}
                {/* <div className='tabBar'>
                    <Link to='/layout/home' >首页</Link>
                    <Link to='/layout/houstlist' >找房</Link>
                    <Link to='/layout/news' >资讯</Link>
                    <Link to='/layout/my' >我的</Link>
                </div> */}
                {/* tabBar */}
                <div className={styles.tabBar}>
                    {this.renderContent()}
                </div>
            </div>
        )
    }
}
