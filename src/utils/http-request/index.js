import axios from 'axios'
import {Message} from "view-design";


let token = {
    Authorization: localStorage.getItem('userToken') || ''
}


export const setToken = (Token = '') => {
    token.Authorization = Token
}

export default class baseRequest {
    constructor(baseURL) {
        baseURL = baseURL || 'http://localhost:3000/api/v2/'
        this.$http = axios.create({
            timeout: 30000,
            baseURL
        })
        this.$http.interceptors.request.use(async config => {
                if (token.Authorization) { //判断token是否存在
                    config.headers.Authorization = token.Authorization;  //将token设置成请求头
                }
                return config;

            },
            e => {
                // console.log(e)
                return Promise.reject({
                    msg: e.msg || '网络开小差了，请稍后重试'
                });
            })
        this.$http.interceptors.response.use(response => {
            if (response.data.code !== 200) {
                return Message.error(response.data.msg || '请求错误！')
            }
            return response.data
        }, e => {
            const err = e.response
            let msg = err.data.msg || '网络错误'
            msg.map(item => {
                Message.error(
                    {
                        content: item,
                        duration: 5
                    }
                )
            })
            // console.log(e)
            // this.$Message.error(e.msg || '服务器错误，请重试！')
        })
    }

    post(url, params = {}) {
        return this.$http({
            url,
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(params)
            // data: params
        })
    }

    postForm(url, params = {}) {
        return this.$http({
            url,
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: JSON.stringify(params)
            // data: params
        })
    }

    postMul(url, params) {
        let formData = new FormData()
        Object.keys(params).forEach(key => {
            formData.append(key, params[key])
        })
        return this.$http({
            url,
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        })
    }

    get(url, params = {}, config = {}) {
        return this.$http.get(url, {
            params,
            ...config
        })
    }

    getForm(url, params = {}) {
        return this.$http({
            params,
            url,
            method: 'get',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }
    put(url,params={}){
        return this.$http.put(url,params)
    }
    del(url, params = {}) {
        return this.$http.delete(url, params)
    }
}