<template lang="pug">
    div
        FiltersTable(
            :BreadcrumbList="BreadcrumbList"
            :filters="filters"
            :filterList="filterList"
            :TableDataList="usersList"
            :ColumnsList="usersColumns"
            :Pagination="Pagination"
            @listenHandleClickFilterSearch="HandleClickFilterSearch"
            @listenHandleChangePage="HandleChangePage"
            @listenHandleChangePageSize="HandleChangePageSize"
        )
        <!--    div.main-->
        <!--        Breadcrumb-->
        <!--            Breadcrumb-item 首页-->
        <!--            Breadcrumb-item 系统管理-->
        <!--            Breadcrumb-item 用户管理-->
        <!--        Card.card-->
        <!--            Row(:gutter="20")-->
        <!--                i-col(:span="8")-->
        <!--                    i-input(v-model="queryInfo.reg_count" clearable)-->
        <!--                        label(slot="prepend" class="seach") 账号-->
        <!--                i-col(:span="2")-->
        <!--                    i-button(icon="ios-search" @click="getUserParamList")-->
        <!--                i-col(:span="10")-->
        <!--                    i-button(type="primary" @click="addUserDialog = true") 添加用户-->
        <!--            i-table(-->
        <!--                border-->
        <!--                :content="self"-->
        <!--                :columns="usersColumms"-->
        <!--                :data="usersList"-->
        <!--                style="margin-top:30px;"-->
        <!--            )-->
        <!--            Page.pageorg(:total="total" size="small" :page-size-opts="pageOption" show-elevator show-sizer @on-change="handleChangePage" @on-page-size-change="handleChangePageSize")-->
        userAdd(
            v-bind:addUserDialog="addUserDialog"
            @upDateAddUserDialog="upDateAddUserDialog"
        )


</template>

<script>
    import FiltersTable from '@/components/filter-table/index'
    import userAdd from './components/add'
    import {getUserList} from '@/service/user'
    import {usersColumns, filterList, BreadcrumbList} from './columns'

    export default {
        data() {
            return {
                self: this,
                Pagination: {
                    page: 1,
                    pageSize: 10,
                    total: 0
                },
                filterList,
                filters: filterList.reduce((obj, item) => {
                    if (item.type !== 'button') {
                        obj[item.key] = ''
                    }
                    return obj
                }, {}),
                usersList: [],
                usersColumns,
                BreadcrumbList,
                addUserDialog: false
            }
        },
        components: {
            FiltersTable,
            userAdd
        },
        created() {
            this.loadData()
        },
        methods: {
            loadData() {
                this.getUserParamList()
            },
            async getUserParamList() {
                const params = Object.assign({}, {
                    page: this.Pagination.page,
                    pageSize: this.Pagination.pageSize
                }, this.filters)
                const {data: res} = await getUserList(params)
                this.usersList = res.list
                this.total = res.meta.count
            },
            HandleClickFilterSearch(buttonKey) {
                if (buttonKey === 'search') {
                    console.log('search')
                    this.getUserParamList()
                }
                if (buttonKey === 'add') {
                    console.log('add')
                    this.addUserDialog = true
                }
            },
            HandleChangePage(e) {
                this.Pagination.page = e
                this.getUserParamList()
            },
            HandleChangePageSize(e) {
                this.Pagination.pageSize = e
                this.getUserParamList()
            },
            upDateAddUserDialog(val) {
                this.addUserDialog = val
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