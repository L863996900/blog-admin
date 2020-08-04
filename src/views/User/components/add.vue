<template lang="pug">
    Modal(
        v-model="addUserDialogClose"
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
            Button(size="small" @click="addUserDialogClose = false") 取消
            Button(type="primary" size="small" @click="HandleAddUser") 确定
</template>

<script>
    import {addUser} from '@/service/user'
    export default {
        data() {
            return {
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
            }
        },
        props: [
            'addUserDialog'
        ],
        computed:{
            addUserDialogClose: {
                get() {
                    return this.addUserDialog
                },
                set(val) {
                    this.$emit('upDateAddUserDialog',val)
                }
            }
        },
        methods:{
            async HandleAddUser() {
                this.$refs['addUserRef'].validate(async (valid) => {
                    if (valid) {
                        try {
                            const res = await addUser(this.addUserForm)
                            if (res.data.msg) {
                                this.addUserDialogClose = false
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
            upLoadSuccess(res) {
                console.log(res)
                this.addUserForm.user_picture = res.filename
                this.$Message.success('上传成功!');
            },
            upLoadError(err) {
                console.log(err)
                this.$Message.error('上传失败!');
            },
            uploadPrevent() {
                if (this.addUserForm.user_picture !== '') {
                    this.$Message.error('只能上传一张图片!');
                    return false
                }
            },
            uploadRemove() {
                this.addUserForm.user_picture = ''
            }
        }
    }
</script>

<style scoped>

</style>