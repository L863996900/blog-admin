<template lang="pug">
    div.main
        .login-box
            Card
                p(slot="title") <Icon type="log-in"></Icon>欢迎登陆

</template>

<script>

    export default {
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
        width: 300px;
        background: rgba(255,255,255,0.8);
    }
</style>