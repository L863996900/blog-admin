<template lang="pug">
    .layout(:class="{'layout-hide-text': spanLeft < 5}")
        .layout-header
            .title
                img(class="logo" src="@/assets/img/logo.png" alt="")
                span 博客后台管理系统
            Button(type="info" @click="logout") 退出
        Row.contant(type="flex")
            i-col(:span="spanLeft" class="layout-menu-left")
                    div(@click="toggleClick" class="toggle") |||
                    Menu(
                        active-key="1"
                        :accordion="true"
                        width="auto"
                        :class="menuitemClasses"
                        @on-select="goLink"
                        theme="dark"
                        v-if="menu"
                    )
                        div(v-for="(item, index) in menu" :key="index")
                            Menu-item(:name="item.path" v-if="!item.children" style="padding-left: 25px")
                                Icon(class="layout-icon" :type="item.icon")
                                span(class="layout-text") {{item.name}}
                            Submenu(:name="item.path" v-else)
                                template(slot="title")
                                    Icon(class="layout-icon" :type="item.icon")
                                    span(class="layout-text") {{item.name}}
                                Menu-item(:name="child.path" style="padding-left: 40px" v-for="(child,ind) in item.children" :key="ind")
                                    Icon(:type="child.icon" class="layout-icon")
                                    span(class="layout-text") {{child.name}}
            i-col(:span="spanRight")
                keep-alive
                    router-view
</template>
<script>
    import {menu} from "./menu";
    export default {
        data() {
            return {
                spanLeft: 5,
                spanRight: 19,
                menu
            }
        },
        computed: {
            menuitemClasses() {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        },
        methods: {
            logout() {
                window.localStorage.clear()
                this.$router.push('/login')
            },
            toggleClick() {
                if (this.spanLeft === 5) {
                    this.spanLeft = 2;
                    this.spanRight = 22;
                } else {
                    this.spanLeft = 5;
                    this.spanRight = 19;
                }
            },
            goLink(name) {
                this.$router.push({
                    path: name
                });
            }
        }
    }
</script>
<style lang="scss" scoped>
    .layout {
        border: 1px solid #d7dde4;
        position: relative;
        border-radius: 4px;
        width: 100%;
    }

    .layout-header {
        background-color: #373d41;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #fff;
        height: 60px;
        font-size: 20px;
        padding: 0 15px;
        .title {
            display: flex;
            align-items: center;

            span {
                padding: 0 10px;
            }

            .logo {
                width: 30px;
                height: 30px;
            }
        }

    }
    .contant{
        height: calc(100% - 60px);
    }
    .layout-content {
        min-height: 500px;
        overflow: hidden;
        position: relative;
        border-radius: 4px;
    }

    .layout-content-main {
        padding: 10px;
    }
    .toggle {
        width: 100%;
        position: relative;
        color: #fff;
        text-align: center;
        padding: 5px 0;
        background: #495257;
        cursor: pointer;
    }
    .layout-menu-left {
        background: #515a6e;
    }

    .layout-logo-left {
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }

    .layout-ceiling-main a {
        color: #9ba7b5;
    }

    .layout-hide-text .layout-text {
        display: none;
    }

    .ivu-col {
        transition: width .2s ease-in-out;
    }
    .layout {
        height: 100%;
        border: 0;
    }
</style>
