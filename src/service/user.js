import HttpRequest from '@/utils/http-request'

const api = new HttpRequest()

export const getUserLogin = params =>
    api.post('user/login', params)

export const getUserInfo = () =>
    api.get('user')

export const getUserList = params =>
    api.post('user/list', params)

export const updateUserInfo = params =>
    api.post('user/update', params)
