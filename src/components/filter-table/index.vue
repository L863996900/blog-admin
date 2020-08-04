<template lang="pug">
    div.main
        Breadcrumb(v-if="BreadcrumbList")
            Breadcrumb-item(v-for="item in BreadcrumbList") {{item}}
        Card.card
            Row(:gutter="20")
                template(v-if="filterList.length")
                    template(v-for="item in filterList")
                        template(v-if="item.type === 'input'")
                            i-col(:span="item.span")
                                i-input(v-model.trim="filters[item.key]" clearable)
                        template(v-if="item.type === 'input-label'")
                            i-col(:span="item.span")
                                i-input(v-model.trim="filters[item.key]" clearable)
                                    label(:slot="item.config.pend" :style="item.config.style") {{item.config.content}}
                        template(v-if="item.type === 'button'")
                            i-col(:span="item.span")
                                template(v-if="item.icon")
                                    i-button(:icon="item.icon" @click="handleClickFilterSearch(item.key)")
                                template(v-else-if="item.path")
                                    i-button(:type="item.config.type" :to="item.path") {{item.label}}
                                template(v-else)
                                    i-button(:type="item.config.type " @click="handleClickFilterSearch(item.key)") {{item.label}}
            i-table(
                border
                :content="self"
                :columns="ColumnsList"
                :data="TableDataList"
                style="margin-top:30px;"
            )
            Page.pageorg(:total="Pagination.total" size="small" :page-size-opts="[2,5,10,20]" show-elevator show-sizer @on-change="handleChangePage" @on-page-size-change="handleChangePageSize")

</template>

<script>
    export default {
        data() {
            return {
                self: this
            }
        },
        props: {
            BreadcrumbList: {},
            filters: {},
            filterList: {},
            TableDataList: {},
            ColumnsList: {},
            Pagination: {}
        },
        methods: {
            handleClickFilterSearch(buttonKey) {
                if (buttonKey === 'search') {
                    this.$emit('listenHandleClickFilterSearch', buttonKey)
                }
            },
            handleChangePage(val) {
                this.$emit('listenHandleChangePage', val)
            },
            handleChangePageSize(val) {
                this.$emit('listenHandleChangePageSize', val)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .main {
        font-size: 30px;

        .card {
            margin: 20px 0;
        }

        .pageorg {
            padding: 30px 0 10px;
        }
    }
</style>