<template lang="pug">
    div.main
        Breadcrumb
            Breadcrumb-item 首页
            Breadcrumb-item 文章管理
            Breadcrumb-item 文章列表
        Card.card
            Row(:gutter="20")
                i-col(:span="8")
                    i-input(v-model="queryInfo.title" clearable)
                        label(slot="prepend" class="seach") 文章标题
                i-col(:span="2")
                    i-button(icon="ios-search" @click="getArticleList")
                i-col(:span="10")
                    i-button(type="primary" to="/article/create") 添加文章
            i-table(
                border
                :content="self"
                :columns="articleColumns"
                :data="articleList"
                style="margin-top:30px;"
            )
            Page.pageorg(:total="total" size="small" :page-size-opts="pageOption" show-elevator show-sizer @on-change="handleChangePage" @on-page-size-change="handleChangePageSize")
</template>

<script>
    import { getArticleList } from '@/service/article'
    import articleColumns from './columns'

    export default {
        data() {
            return {
                self: this,
                queryInfo: {
                    title: '',
                    category: '',
                    page: 1,
                    pageSize: 10,
                },
                pageOption: [2,5,10],
                total: 0,
                articleList: [],
                articleColumns
            }
        },
        created() {
            this.loadData()
        },
        methods: {
            loadData() {
                this.getArticleList()
            },
            async getArticleList() {
                const {data: res} = await getArticleList(this.queryInfo)
                this.articleList = res.list
                this.total = res.meta.count
            },
            handleChangePage(e) {
                this.queryInfo.page = e
                this.getArticleList()
            },
            handleChangePageSize(e) {
                this.queryInfo.pageSize = e
                this.getArticleList()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .main {
        font-size: 30px;
        .seach {
            color: #999;
            font-size: 12px;
            padding: 0 5px;
        }

        .card {
            margin: 20px 0;
        }
        .pageorg {
            padding: 30px 0 10px;
        }
    }

</style>