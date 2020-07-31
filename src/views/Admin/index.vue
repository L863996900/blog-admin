<template lang="pug">
    div.main
        .title 你好啊 ，{{userInfo.username}}
</template>

<script>
    export default {
        data(){
          return {
              userInfo:{}
          }
        },
        created() {
            this.loadData()
        },
        methods:{
            async loadData(){
                const res = await this.$store.dispatch('userInfo')
                this.userInfo =  res.data
            }
        }
    }
</script>

<style lang="scss" scoped>
    .main {
        font-size: 30px;
        padding: 50px;
    }

</style>