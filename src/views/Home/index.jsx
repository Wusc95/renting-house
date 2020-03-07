import React, { Component } from 'react';

// 导入ant组件
import { Carousel, Flex, Grid } from 'antd-mobile'

// 导入基地址
import { BASE_URL } from '../../util/url'
// 导入样式
import styles from './index.module.scss'
// 导入路由
import { Link } from 'react-router-dom'
// 导入图片
import nav1 from '../../assets/images/nav-1.png'
import nav2 from '../../assets/images/nav-2.png'
import nav3 from '../../assets/images/nav-3.png'
import nav4 from '../../assets/images/nav-4.png'

// 导入获取当前城市的方法
import {getCurrentCity} from  '../../util/city'
// 导入封装组件searchBar
import SearchBar from '../../components/SearchBar'
class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // 轮播图数据
            SwipeData: null,
            // 租房小组数据
            HouseGroup: null,
            // 资讯数据
            NewsData: null,
            // 当前城市
            currentCity : '深圳'
        }
    }
    async componentDidMount() {
        //获取当前城市
        const city = await getCurrentCity();
        this.setState({
            currentCity:city.label
        })
        this.getSwiperData()
        this.getHouseGroups()
        this.getNewsData()
    }
    // 定义的实例属性
    navs = [
        { icon: nav1, text: '整租', path: '/layout/houselist' },
        { icon: nav2, text: '合租', path: '/layout/houselist' },
        { icon: nav3, text: '地图找房', path: '/map' },
        { icon: nav4, text: '去出租', path: '/rent/add' }
    ]
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
    // 渲染导航菜单
    renderNav = () => {
        return (
            <Flex className={styles.nav}>
                {
                    this.navs.map(item => {
                        return (
                            <Flex.Item key={item.text}>
                                <Link to={item.path}>
                                    <img src={item.icon} alt='导航菜单'/>
                                    <p>{item.text}</p>
                                </Link>
                            </Flex.Item>
                        )
                    })
                }
            </Flex>
        )
    }
    // 渲染租房小组
    renderGroups = () => {
        return (
            <div className={styles.renderGroups}>
                <Flex justify="between" className={styles.title}>
                    <Flex.Item style={{ fontSize: 18, fontWeight: 'bold' }}><h3>租房小组</h3></Flex.Item>
                    <Flex.Item style={{ fontSize: 12 }} align='end'><Link to='/layout/houselist' >更多</Link></Flex.Item>
                </Flex>
                <Grid data={this.state.HouseGroup}
                    columnNum={2}
                    square={false}
                    hasLine={false}
                    renderItem={item => (
                        <div className={styles.navItem}>
                            <div className={styles.left}>
                                <p>{item.title}</p>
                                <p>{item.desc}</p>
                            </div>
                            <div className={styles.right}>
                                <img src={`${BASE_URL}${item.imgSrc}`} style={{ width: '50px', height: '50px' }} alt="" />
                            </div>
                            {/* <Flex justify="around">
                                <Flex.Item>
                                    <div>
                                        <p>{item.title}</p>
                                        <p>{item.desc}</p>
                                    </div>
                                </Flex.Item>
                                <Flex.Item align='end'>
                                    <img src={`${BASE_URL}${item.imgSrc}`} style={{ width: '75px', height: '75px' }} alt="" />
                                </Flex.Item>
                            </Flex> */}

                        </div>
                    )}
                />
            </div>
        )
    }
    // 渲染咨询信息
    renderNews = () => {
        return (
            <div className={styles.news}>
                <h3>最新咨询</h3>
                {
                    this.state.NewsData.map(item => (
                        <div key={item.id}>
                            <div className={styles.newsItem}>
                                <div className={styles.left}>
                                    <img src={`${BASE_URL}${item.imgSrc}`} alt="" />
                                </div>
                                <div className={styles.right}>
                                    <div>
                                        <h4>{item.title}</h4>
                                    </div>
                                    <div className={styles.from}>
                                        <span>{item.from}</span>
                                        <span>{item.date}</span>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>


                    )
                    )
                }
            </div>
        )
    }
    render() {
        const { SwipeData, HouseGroup, NewsData } = this.state
        return (
            <div className={styles.root}>
                {/* 搜索框组件 */}
                <SearchBar cityName={this.state.currentCity}/>
                {/* 渲染轮播图 */}
                {SwipeData && this.renderSwiper()}
                {/* 渲染导航菜单 */}
                {this.renderNav()}
                {/* 渲染租房小组 */}
                {HouseGroup && this.renderGroups()}
                {/* 渲染咨询信息 */}
                {NewsData && this.renderNews()}
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

    // 获取租房小组数据
    getHouseGroups = async () => {
        const res = await this.axios.get("/home/groups")
        if (res.data.status === 200) {
            this.setState({
                HouseGroup: res.data.body
            })
        }
    }

    // 获取资讯信息
    getNewsData = async () => {
        const res = await this.axios.get('/home/news')
        if (res.data.status === 200) {
            this.setState({
                NewsData: res.data.body
            })
        }
    }
}
export default Home;