import React, { Component } from 'react';

// 导入头部组件
import NavBar from '../../components/MyNavBar'
// 导入高阶组件
import { withRouter } from 'react-router-dom'
class CityList extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        // 获取城市数据
        this.getCityData();
    }
    render() {
        return (
            <div>
                <NavBar title={'城市列表'}/>
            </div>
        );
    }

    // --------------------------定义方法--------------------------

    // 获取城市数据
    getCityData = async ()=>{
         const res = await this.axios.get('/area/city?level=1')
         if(res.data.status === 200){
             this.dealCityData(res.data.body)
         }
    }
    // 处理城市数据
    dealCityData = (CityList)=>{
        console.log(CityList)
    }


}

export default withRouter(CityList) ;