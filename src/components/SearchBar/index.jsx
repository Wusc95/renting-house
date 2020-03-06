import React, { Component } from 'react';
// 导入数据校验包
import propTypes from 'prop-types'
// 导入样式
import styles from './index.module.scss'
// 导入ant组件
import { Flex } from 'antd-mobile'

// 导入高阶组件
import { withRouter, Link } from 'react-router-dom'
class SearchBar extends Component {
    render() {
        return (
            <Flex className={styles.searchBar}>
                <Flex className={styles.searchLeft}>
                    <div className={styles.location} onClick={()=>{this.props.history.push('/citylist')}}>
                        {/* 声明式导航 */}
                        {/* <Link to="/citylist"> */}
                            <span>{this.props.cityName}</span>
                            <i className="iconfont icon-arrow" />
                        {/* </Link> */}

                    </div>
                    <div className={styles.searchForm}>
                        <i className="iconfont icon-search" />
                        <span>请输入小区或地址</span>
                    </div>
                </Flex>
                <i className="iconfont icon-map" />
            </Flex>
        );
    }
}
SearchBar.propTypes = {
    cityName: propTypes.string.isRequired
}

export default withRouter(SearchBar) ;