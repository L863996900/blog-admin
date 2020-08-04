import {updateUserInfo} from '@/service/user'
import {Message} from "view-design";

export const BreadcrumbList = ['首页', '系统管理', '用户管理']

export const filterList = [
    {
        label: '账号',
        key: 'reg_count',
        type: 'input-label',
        config: {
            content: '账号',
            pend: 'prepend',
            style: {
                color: '#999',
                fontSize: '12px',
                padding: '0 5px'
            }
        },
        span: 8
    }, {
        label: '搜索',
        key: 'search',
        type: 'button',
        icon: 'ios-search',
        span: 2
    }, {
        label: '添加用户',
        key: 'add',
        type: 'button',
        config: {
            type: 'primary'
        },
        span: 2
    }
]

export const usersColumns = [
    {
        type: 'index',
        width: 60,
        align: 'center'
    },
    {
        title: '用户名',
        key: 'username',
        render: (h, params) => {
            return h('div', [
                h('span', params.row.username)
            ])
        }
    },
    {
        title: '注册账号',
        key: 'reg_count'
    },
    {
        title: '邮箱',
        key: 'email'
    },
    {
        title: '头像',
        align: 'center',
        key: 'user_picture',
        width: 180,
        render: (h, params) => {
            return h('div', [
                h('img', {
                    domProps: {
                        'src': params.row.user_picture
                    },
                    style: {
                        display: 'block',
                        width: '60px',
                        height: '60px',
                        margin: '10px auto',
                        textAlign: 'center',
                        borderRadius: '3px',
                    },
                })
            ])
        }
    },
    {
        title: '是否超级管理员',
        width: 150,
        align: 'center',
        key: 'level',
        render: (h, params) => {
            return h('div', [
                h('i-switch', {
                    props: {
                        size: 'large',
                        value: params.row.level === 0
                    },
                    on: {
                        'on-change': async (value) => {//触发事件是on-change,用双引号括起来，
                            //参数value是回调值，并没有使用到
                            const param = {
                                id: params.row.id,
                                reg_count: params.row.reg_count,
                                username: params.row.username,
                                email: params.row.email,
                                user_picture: params.row.user_picture,
                                level: value ? 0 : 1
                            }
                            const res = await updateUserInfo(param)
                            Message.info(res.msg)
                        }
                    }
                })
            ])
        }
    },
    {
        title: '创建时间',
        key: 'created_at'
    },
    {
        title: '操作',
        key: 'action',
        width: 150,
        align: 'center',
        render: (h, params) => {
            return h('div', [
                h('i-button', {
                    attrs: {
                        type: 'primary',
                        size: 'small',
                    },
                    on: {
                        click: () => {
                            console.log(params)
                        }
                    },
                    style: {
                        marginRight: '8px'
                    }
                }, '编辑'),
                h('i-button', {
                    attrs: {
                        type: 'error',
                        size: 'small',
                    },
                    on: {
                        click: () => {
                            console.log(params)
                        }
                    }
                }, '删除')
            ])
        }
    }
]
