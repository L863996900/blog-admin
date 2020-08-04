export const BreadcrumbList = ['首页','文章管理','文章列表']

export const filterList = [
    {
        label: '文章标题',
        key: 'title',
        type: 'input-label',
        config: {
            content: '文章标题',
            pend: 'prepend',
            style: {
                color: '#999',
                fontSize: '12px',
                padding: '0 5px'
            }
        },
        span: 6
    },{
        label: '关键词',
        key: 'keyword',
        type: 'input-label',
        config: {
            content: '关键词',
            pend: 'prepend',
            style: {
                color: '#999',
                fontSize: '12px',
                padding: '0 5px'
            }
        },
        span: 6
    },{
        label: '搜索',
        key: 'search',
        type: 'button',
        icon: 'ios-search',
        span: 2
    },{
        label: '添加文章',
        key: 'jump',
        type: 'button',
        path: '/article/create',
        config: {
            type: 'primary'
        },
        span: 2
    }
]


export const articleColumns =  [
    {
        type: 'index',
        width: 60,
        align: 'center'
    },
    {
        title: '文章标题',
        key: 'title',
    },
    {
        title: '文章作者',
        key: 'author'
    },
    {
        title: '关键词',
        key: 'keyword',
    },
    {
        title: '描述',
        key: 'description',
    },
    {
        title: '分类',
        key: 'category',
    },
    {
        title: '文章封面',
        align: 'center',
        key: 'cover',
        width: 180,
        render: (h, params) => {
            return h('div', [
                h('img', {
                    domProps: {
                        'src': params.row.cover
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
