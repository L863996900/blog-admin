<template lang="pug">
    div.main
        Breadcrumb
            Breadcrumb-item 首页
            Breadcrumb-item 文章管理
            Breadcrumb-item 文章创建
        Card.card
            Form(ref="addArticleRef" :model="addArticleForm" label-position="left" :rules="addArticleRuleValidate" :label-width="100")
                FormItem(label="文章标题" prop="title")
                    Input(v-model="addArticleForm.title" placeholder="文章标题")
                FormItem(label="文章作者" prop="author")
                    Input(v-model="addArticleForm.author" placeholder="文章作者")
                FormItem(label="文章简介" prop="description")
                    Input(v-model="addArticleForm.description" placeholder="文章简介")
                FormItem(label="文章关键字" prop="keyword")
                    Input(v-model="addArticleForm.keyword" placeholder="文章关键字")
                FormItem(label="文章分类" v-if="categoryList.length > 0")
                    Select(v-model="addArticleForm.category_id")
                        Option(v-for="(item, index) in categoryList" :value="item.id" :key="index" ) {{item.name}}
                FormItem(label="文章封面" prop="cover")
                    Upload(
                        type="drag"
                        action="http://127.0.0.1:3000/api/v2/upload"
                        :on-success="upLoadSuccess"
                        :on-error="upLoadError"
                        :before-upload="uploadPrevent"
                        :on-remove="uploadRemove"
                        :format="['jpg','jpeg','png']"
                        )
                        div(style="padding: 20px 0")
                            Icon(type="ios-cloud-upload" size="52" style="color: #3399ff")
                            p 点击或者拖拽图片上传
                FormItem(label="文章内容" prop="content")
                    mavon-editor(
                        v-model="addArticleForm.content"
                        :ishljs="true"
                        codeStyle="dark"
                        ref=md
                    )
            Button(@click="handleReset('addArticleRef')") 重置
            Button(type="primary" @click="handleAddArticleSubmit('addArticleRef')" style="margin-left: 8px") 提交

</template>

<script>
    import {addArticle} from '@/service/article'
    export default {
        data() {
            return {
                categoryList: [],
                addArticleForm: {
                    title: '',
                    author: '',
                    category_id: null,
                    cover: '',
                    description: '',
                    keyword: '',
                    content: ''
                },
                addArticleRuleValidate: {
                    title: [
                        {required: true, message: '文章标题不能为空', trigger: 'blur'}
                    ],
                    author: [
                        {required: true, message: '文章作者不能为空', trigger: 'blur'}
                    ],
                    cover: [
                        {required: true, message: '文章封面不能为空', trigger: 'blur'}
                    ],
                    description: [
                        {required: true, message: '文章简介不能为空', trigger: 'blur'}
                    ],
                    keyword: [
                        {required: true, message: '文章关键字不能为空', trigger: 'blur'}
                    ],
                    content: [
                        {required: true, message: '文章内容不能为空', trigger: 'blur'}
                    ]
                }
            }
        },
        methods:{
            handleAddArticleSubmit(name) {
                this.$refs[name].validate(async (valid) => {
                    if (valid) {
                        try {
                            const res = await addArticle(this.addArticleForm)
                            if (res.data.msg) {
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
            handleReset(name) {
                this.$refs[name].resetFields();
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
            }
        }
    }
</script>

<style lang="scss" scoped>
    .main {
        .card {
            margin: 20px 0;
            padding: 20px 10px;
        }
    }
</style>