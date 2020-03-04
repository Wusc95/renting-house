import axios from 'axios'
import {Component} from 'react'
import {BASE_URL} from './url'
axios.defaults.baseURL = BASE_URL

//挂载到Component上
Component.prototype.axios=axios;