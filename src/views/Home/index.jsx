import React, { Component } from 'react';

// 导入ant组件
import {Carousel } from 'antd-mobile'

// 导入基地址
import { BASE_URL } from '../../util/url'
// 导入样式
import styles from './index.module.scss'

// 导入图片
import nav1 from '../../assets/images/nav-1.png'
import nav2 from '../../assets/images/nav-2.png'
import nav3 from '../../assets/images/nav-3.png'
import nav4 from '../../assets/images/nav-4.png'
class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            SwipeData: null
        }
    }
    componentDidMount() {
        console.log(111)
        this.getSwiperData()
    }
    // 渲染轮播图
    renderSwiper = () => {
        return (
            <Carousel
                autoplay={true}
                infinite={true}
            >
                {
                    this.state.SwipeData.map(item => (
                        <a
                            key={item.id}
                            href="http://www.alipay.com"
                            style={{ display: 'inline-block', width: '100%', height: 212 }}
                        >
                            <img
                                src={`${BASE_URL}${item.imgSrc}`}
                                alt={item.alt}
                                style={{ width: '100%', verticalAlign: 'top' }}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({ imgHeight: 'auto' });
                                }}
                            />
                        </a>
                    ))
                }
            </Carousel>
        )
    }
    render() {
        const {SwipeData} = this.state
        return (
            <div className={styles.root}>
                {/* 渲染轮播图 */}
                {SwipeData && this.renderSwiper()}
            </div>
        );
    }


    // 获取轮播图数据
    getSwiperData = async () => {
        const res = await this.axios.get('/home/swiper')
        if (res.data.status === 200) {
            this.setState({
                SwipeData: res.data.body
            })
        }
    }
}

export default Home;