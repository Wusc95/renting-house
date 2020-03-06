import React, { Component } from 'react';
// 导入数据效验包
import propTypes from 'prop-types'
import { NavBar } from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import styles from './iindex.module.scss'
class MyNavBar extends Component {
    render() {
        return (
            <NavBar
                mode="light"
                icon={<i className="iconfont icon-back" />}
                onLeftClick={() => this.props.history.goBack()}
                className={styles.navBar}
            >{this.props.title}</NavBar>
        );
    }
}
MyNavBar.propTypes = {
    title: propTypes.string.isRequired
}
export default withRouter(MyNavBar);