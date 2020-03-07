// 导入axios
import { axios } from '../util/http'
// 从本地取
const getLocationCity = () => {
    return window.localStorage.getItem('my_city')
}
// 缓存到本地
const setLocationCity = (city) => {
    window.localStorage.setItem('my_city',JSON.stringify(city))
}
const getCurrentCity = () => {
    let city = getLocationCity();
    if (city) {
        // 如果缓存中存在，直接返回数据
        return Promise.resolve(JSON.parse(city))
    } else {
        // 缓存中不存在
        return new Promise((resolve, reject) => {
            // 1.从百度地图中获取定位城市
            var myCity = new window.BMap.LocalCity();
            myCity.get(async result => {
                var cityName = result.name;
                // 2.向后台发送请求，获取城市的value 值
                let res = await axios.get('/area/info?name=' + cityName);
                // 3. 缓存到本地
                setLocationCity(res.data.body)
                // 4. 通过promise返回结果
                resolve(res.data.body)  
            });
        })
    }
};
export { getCurrentCity,setLocationCity };