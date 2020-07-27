import axios from 'axios'


let token = {
    Authorization:localStorage.getItem('userToken') || ''
}


export const setToken = (userToken = '') => {
    token.Authorization = userToken
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
                return Promise.reject({
                    msg: e.msg || '网络开小差了，请稍后重试'
                });
            })
        this.$http.interceptors.response.use(response => {
                return response
        },e => {
            if( e.status === 500 ){
                this.$message.error(e.msg || '服务器错误，请重试！')
            } else {
                this.$message.error(e.msg || '登陆失败！')
            }
        })
    }
    post(url,params={},config={}){
        return this.$http.post(url,params,config)
    }
    postForm(url, params = {}) {
        return this.$http({
            url,
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: JSON.stringify(params)
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
    get(url,params={},config={}){
        return this.$http.get(url,{
            params,
            ...config
        })
    }
    getForm(url,params={}){
        return this.$http({
            params,
            url,
            method: 'get',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }
    del(url,params={}){
        return this.$http.delete(url,params)
    }
}