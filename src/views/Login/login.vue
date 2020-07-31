<template lang="pug">
    div.main
        .login-box
            Card
                p(slot="title") Yongx'Blog 后台管理系统
                Form(ref="formInline" :model="formInline" :rules="ruleInline" )
                    FormItem(prop="reg_count")
                        Input(type="number" v-model="formInline.reg_count" placeholder="账号")
                            Icon(type="ios-person-outline" slot="prepend")
                    FormItem(prop="password")
                        Input(type="password" v-model="formInline.password" placeholder="密码")
                            Icon(type="ios-lock-outline" slot="prepend")
                    FormItem
                        i-button(type="primary" @click="handleSubmit('formInline')") 登陆
                        i-button(@click="handleReset('formInline')"  style="margin-left: 8px") 重置
            <!--        Button(type="primary" @click="handleText") 测试-->
                .remark 超级管理员账号：18094151111 密码：123456wm
</template>


<script>
    import { getUserLogin } from '@/service/user'
    import { setToken } from '@/utils/http-request/index'
    // import { debounce } from '@/utils/tool'
    export default {
        data() {
            return {
                formInline: {
                    reg_count: '',
                    password: ''
                },
                ruleInline: {
                    reg_count: [
                        {required: true, message: '请输入注册账号', trigger: 'blur'},
                        {
                            type: 'string',
                            min: 6,
                            max: 11,
                            message: '账号长度应不小于6位，不大于11位',
                            trigger: 'blur'
                        }
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {
                            type: 'string',
                            min: 6,
                            message: '密码长度不小于6位',
                            trigger: 'blur'
                        }
                    ]
                },
                click: false
            }
        },
        methods: {
            // handleText() {
            //     console.log(2)
            // },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            handleSubmit(name) {
                if(this.click === false){
                    this.click =true
                    this.$refs[name].validate(async (valid) => {
                        if (valid) {
                            try {
                                const params = {
                                    reg_count : this.formInline.reg_count,
                                    password : this.formInline.password
                                }
                                const res = await getUserLogin(params)
                                console.log(res)
                                if(res.code !== 200 ) return this.$Message.error( res.msg ||res.data.msg );
                                setToken(res.data.token)
                                localStorage.setItem('userToken', res.data.token)
                                await this.$router.push('/')
                                this.$Message.success('登陆成功');
                            }catch (e) {
                                this.$Message.error('登陆失败!');
                            }
                        } else {
                            this.$Message.error('请正确填写账号密码!');
                        }
                    })
                    // console.log(click)
                    setTimeout(()=>{ this.click = false },1000)
                } else {
                    this.$Message.error('请勿频繁登陆!');
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    html, body {
        width: 100%;
        height: 100%;
        background: #f0f0f0;
        overflow: hidden;
    }

    .main {
        width: 100%;
        height: 100%;
        background-image: url('~@/assets/img/loginBack.jpg');
        background-size: cover;
        background-position: center;
        position: relative;

    }
    .login-box {
        position: absolute;
        right: 160px;
        top: 50%;
        transform: translateY(-60%);
        width: 400px;
        background: rgba(255, 255, 255, 0.8);
    }
    .remark {
        text-align: center;
        padding: 2px;
    }
</style>