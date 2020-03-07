import React, { Component } from 'react';

// 导入头部组件
import NavBar from '../../components/MyNavBar'
// 导入获取定位城市的方法
import { getCurrentCity, setLocationCity } from '../../util/city'
// 导入样式
import styles from './index.module.scss'
// 导入长列表组件
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import List from 'react-virtualized/dist/commonjs/List';
import { Toast } from 'antd-mobile';

// 标题的高度
const TITLEHEIGHT = 36;
// 每一行的高度
const ROWHEIGHT = 50;
// 有房源的城市
const HASRESOURCECITYS = ["北京", "上海", "广州", "深圳"];
class CityList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cityObjList: null,//城市列表
            cityIndexList: null,//城市索引
            selectIndex: 0, // 当前选中的索引
            selectCity: "深圳"
        }
        this.myref = React.createRef();
    }
    componentDidMount() {
        // 获取城市数据
        this.getCityData();
    }

    render() {
        let { cityObjList, cityIndexList, selectIndex } = this.state
        return (
            <div className={styles.citylist}>
                <NavBar title={'城市选择'} />
                {/* 渲染列表 */}
                {
                    cityObjList && (
                        <AutoSizer>
                            {
                                ({ height, width }) => {
                                    console.log(height, width)
                                    return (
                                        <List
                                            height={height}
                                            rowCount={cityIndexList.length}
                                            rowHeight={this.calcRowHeight}
                                            rowRenderer={this._rowRenderer}
                                            width={width}
                                            onRowsRendered={this.onRowsRendered}
                                            scrollToAlignment={'start'}
                                            ref={this.myref}
                                        />
                                    )
                                }
                            }
                        </AutoSizer>
                    )
                }
                {/* 渲染右边索引 */}
                <div className={styles.cityIndex}>
                    {
                        cityIndexList && cityIndexList.map((item, index) => {
                            return (
                                <div key={item} className={styles.cityIndexItem}>
                                    <span onClick={() => this.clickIndexList(index)} className={index === selectIndex ? styles.indexActive : ""}>
                                        {item === 'hot' ? '热' : item.toUpperCase()}
                                    </span>
                                </div>

                            )
                        })
                    }
                </div>

            </div>
        );
    }
    // --------------------------定义方法--------------------------
    // 获取城市数据
    getCityData = async () => {
        const res = await this.axios.get('/area/city?level=1')
        if (res.data.status === 200) {
            this.dealCityData(res.data.body)
        }
    }
    // 处理城市数据
    dealCityData = async (CityList) => {
        let leftData = {}
        let rightData = []
        CityList.forEach(city => {
            const letter = city.short.substr(0, 1)
            if (leftData[letter]) {
                leftData[letter].push(city)
            } else {
                leftData[letter] = [city]
            }
        });
        rightData = Object.keys(leftData).sort()

        // 获取热门城市
        const res = await this.axios.get('/area/hot')
        if (res.data.status === 200) {
            leftData.hot = res.data.body
            rightData.unshift('hot')
        }

        // 获取定位城市
        const currentCity = await getCurrentCity();
        leftData['#'] = [currentCity]
        rightData.unshift('#')
        // 赋值给模型
        this.setState({
            cityObjList: leftData,
            cityIndexList: rightData
        })
    }
    // 列表渲染方法
    _rowRenderer = ({ index, key, style }) => {
        const letter = this.state.cityIndexList[index]
        const list = this.state.cityObjList[letter]
        return (
            <div key={key} className={styles.city} style={style}>
                {/* 渲染标题 */}
                <div className={styles.title}>{this.formatTitle(letter)}</div>
                {
                    // 渲染列表城市
                    list.map(item => {
                        return (
                            <div className={styles.name} key={item.value} onClick={() => { this.clictItem(item) }}>
                                {item.label}
                            </div>
                        )
                    })
                }

            </div>
        );
    };
    // 处理标题
    formatTitle = (letter) => {
        switch (letter) {
            case '#':
                return '定位城市'
                break;
            case 'hot':
                return '热门城市'
                break;

            default:
                return letter.toUpperCase()
                break;
        }
    }
    // 动态计算每一行的高度
    calcRowHeight = ({ index }) => {
        const letter = this.state.cityIndexList[index];
        const list = this.state.cityObjList[letter];
        return TITLEHEIGHT + list.length * ROWHEIGHT;
    };
    // 改变选中的索引
    clickIndexList = (index) => {
        this.myref.current.scrollToRow(index)
    }
    // 监听列表的滚动事件
    onRowsRendered = ({ startIndex }) => {
        if (this.state.selectIndex !== startIndex) {
            this.setState({
                selectIndex: startIndex
            })
        }
    }
    // 点击每一项
    clictItem = ({ label, value }) => {
        if (HASRESOURCECITYS.includes(label)) {
            // 传递的名字包含在北上广深
            // 保存到本地
            setLocationCity({ label, value })
            // 返回到首页
            this.props.history.goBack();
        } else {
            Toast.info('该城市暂无房源哦~', 1)
        }
    }
}
export default CityList;