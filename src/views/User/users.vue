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
                i-col(:span="2")
                    i-button(icon="ios-search" @click="getUserParamList")
                i-col(:span="10")
                    i-button(type="primary" @click="addUserDialog = true") 添加用户
            i-table(
                border
                :content="self"
                :columns="userColumns"
                :data="usersList"
                style="margin-top:30px;"
            )
            Page.pageorg(:total="total" size="small" :page-size-opts="pageOption" show-elevator show-sizer @on-change="handleChangePage" @on-page-size-change="handleChangePageSize")
        Modal(
            v-model="addUserDialog"
            title="添加用户"
        )
            Form(ref="addUserRef" :model="addUserForm" :rules="addUserFormRuleValidate" :label-width="120")
                FormItem(label="注册账号" prop="reg_count")
                    Input(v-model="addUserForm.reg_count" )
                FormItem(label="用户名" prop="username")
                    Input(v-model="addUserForm.username")
                FormItem(label="邮箱" prop="email")
                    Input(v-model="addUserForm.email")
                FormItem(label="密码" prop="password1")
                    Input(type="password" v-model="addUserForm.password1" )
                FormItem(label="再次输入密码" prop="password2")
                    Input(type="password" v-model="addUserForm.password2" )
                FormItem(label="上传头像" prop="user_picture")
                    Upload(
                        action="http://127.0.0.1:3000/api/v2/upload"
                        :on-success="upLoadSuccess"
                        :on-error="upLoadError"
                        :before-upload="uploadPrevent"
                        :on-remove="uploadRemove"
                        :format="['jpg','jpeg','png']"
                    )
                        Button(icon="ios-cloud-upload-outline") 点击上传头像
            div(slot="footer")
                Button(size="small" @click="addUserDialog = false") 取消
                Button(type="primary" size="small" @click="HandleAddUser") 确定


</template>

<script>
    import {getUserList, updateUserInfo, addUser} from '@/service/user'
    import userColumns from './columns'

    export default {
        data() {
            return {
                self: this,
                queryInfo: {
                    reg_count: null,
                    page: 1,
                    pageSize: 10,
                },
                pageOption: [2, 5, 10],
                total: 0,
                addUserForm: {
                    reg_count: '',
                    username: '',
                    password1: '',
                    password2: '',
                    email: '',
                    user_picture: ''
                },
                addUserFormRuleValidate: {
                    reg_count: [
                        {required: true, message: '注册账号不能为空', trigger: 'blur'}
                    ],
                    username: [
                        {required: true, message: '用户名不能为空', trigger: 'blur'}
                    ],
                    password1: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ],
                    password2: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '邮箱不能为空', trigger: 'blur'}
                    ],
                    user_picture: [
                        {required: true, message: '用户头像不能为空', trigger: 'blur'}
                    ],
                },
                usersList: [],
                userColumns,
                addUserDialog: false
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
                this.total = res.meta.count
            },
            async HandleAddUser() {
                this.$refs['addUserRef'].validate(async (valid) => {
                    if (valid) {
                        try {
                            const res = await addUser(this.addUserForm)
                            if (res.data.msg) {
                                this.addUserDialog = false
                                this.$refs['addUserRef'].resetFields();
                                this.getUserParamList()
                                return this.$Message.success('添加成功!')
                            }
                            this.$Message.error(res.data.err_msg);
                        } catch (e) {
                            console.log(e)
                        }
                    } else {
                        this.$Message.error('请完善表单信息!');
                    }
                })
            },
            async handleUpdateUserInfo() {
                const res = await updateUserInfo()
                console.log(res)
            },
            upLoadSuccess(res) {
                console.log(res)
                this.addUserForm.user_picture = res.filename
                this.$Message.success('上传成功!');
            },
            upLoadError(err) {
                console.log(err)
                this.$Message.error('上传失败!');
            },
            uploadPrevent(){
                if(this.addUserForm.user_picture !== ''){
                    this.$Message.error('只能上传一张图片!');
                    return false
                }
            },
            uploadRemove() {
                this.addUserForm.user_picture = ''
            },
            handleChangePage(e) {
                this.queryInfo.page = e
                this.getUserParamList()
            },
            handleChangePageSize(e) {
                this.queryInfo.pageSize = e
                this.getUserParamList()
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