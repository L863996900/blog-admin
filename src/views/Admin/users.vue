<template lang="pug">
    div.main
        Breadcrumb
            Breadcrumb-item 首页
            Breadcrumb-item 系统管理
            Breadcrumb-item 用户管理
        Card.card
            Row(:gutter="20")
                i-col(:span="8")
                    i-input(v-model="queryInfo.reg_count" clearable)
                        label(slot="prepend" class="seach") 账号
                i-button(icon="ios-search" @click="getUserParamList")
                i-col(:span="8")
            i-table(
                border
                :content="self"
                :columns="userColumns"
                :data="usersList"
                style="margin-top:30px;"
                )
</template>

<script>
    import {getUserList, updateUserInfo} from '@/service/user'
    import userColumns from './list'

    export default {
        data() {
            return {
                switchShow: false,
                self: this,
                queryInfo: {
                    reg_count: null,
                    page: 1,
                    pageSize: 10
                },
                usersList: [],
                userColumns
            }
        },
        created() {
            this.loadData()
        },
        methods: {
            loadData() {
                this.getUserParamList()
            },
            async getUserParamList() {
                const {data: res} = await getUserList(this.queryInfo)
                this.usersList = res.list
            },
            async handleUpdateUserInfo() {
                const res = await updateUserInfo()
                console.log(res)
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
    }

</style>