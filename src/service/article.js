import HttpRequest from '@/utils/http-request'

const api = new HttpRequest()

export const getArticleList = params =>
    api.post('article/list', params)

export const addArticle = params =>
    api.post('article', params)