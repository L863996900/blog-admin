<template lang="pug">
    div
        FiltersTable(
            :BreadcrumbList="BreadcrumbList"
            :filters="filters"
            :filterList="filterList"
            :TableDataList="articleList"
            :ColumnsList="articleColumns"
            :Pagination="Pagination"
            @listenHandleClickFilterSearch="HandleClickFilterSearch"
            @listenHandleChangePage="HandleChangePage"
            @listenHandleChangePageSize="HandleChangePageSize"
        )
</template>

<script>
    import FiltersTable from '@/components/filter-table/index'
    import {getArticleList} from '@/service/article'
    import {articleColumns, BreadcrumbList, filterList} from './columns'

    export default {
        data() {
            return {
                Pagination: {
                    page: 1,
                    pageSize: 10,
                    total: 0
                },
                articleList: [],
                filterList,
                filters: filterList.reduce((obj, item) => {
                    if (item.type !== 'button') {
                        obj[item.key] = ''
                    }
                    return obj
                }, {}),
                articleColumns,
                BreadcrumbList
            }
        },
        components: {
            FiltersTable
        },
        created() {
            this.loadData()
        },
        methods: {
            loadData() {
                this.getArticleList()
            },
            async getArticleList() {
                const params = Object.assign({}, {
                    page: this.Pagination.page,
                    pageSize: this.Pagination.pageSize
                }, this.filters)
                const {data: res} = await getArticleList(params)
                this.articleList = res.list
                this.total = res.meta.count
            },
            HandleClickFilterSearch(buttonKey) {
                if (buttonKey === 'search') {
                    this.getArticleList()
                }
            },
            HandleChangePage(e) {
                this.Pagination.page = e
                this.getArticleList()
            },
            HandleChangePageSize(e) {
                this.Pagination.pageSize = e
                this.getArticleList()
            }
        }
    }
</script>

<style lang="scss" scoped>
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


</style>