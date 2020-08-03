export default [
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
