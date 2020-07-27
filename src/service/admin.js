import HttpRequest from '@/utils/http-request'
const api = new HttpRequest()

export const userLogin = params => {
    api.getForm('login',params)
}