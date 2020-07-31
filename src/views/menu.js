
export const menu = [
    {
        name: "首页",
        path: "/",
        icon: "ios-navigate"
    },
    // 系统管理
    {
        name: "系统管理",
        path: "user",
        icon: "ios-cog",
        children: [
            {
                icon: "md-contacts",
                name: "管理员列表",
                path: "/user"
            }
        ]
    },
    // // 分类
    // {
    //     name: "分类管理",
    //     path: "category",
    //     icon: "md-move",
    //     children: [
    //         {
    //             name: "分类列表",
    //             path: "/category",
    //             icon: "md-list"
    //         },
    //         {
    //             name: "分类创建",
    //             path: "/category/create",
    //             icon: "md-add-circle"
    //         }
    //     ]
    // },
    // 文章
    {
        name: "文章管理",
        path: "article",
        icon: "md-list-box",
        children: [
            {
                name: "文章列表",
                path: "/article",
                icon: "md-list"
            },
            {
                name: "文章创建",
                path: "/article/create",
                icon: "md-add-circle"
            }
        ]
    },
    // 留言管理
    {
        name: "留言管理",
        path: "leave",
        icon: "ios-disc",
        children: [
            {
                name: "留言列表",
                path: "/leave",
                icon: "md-list"
            }
        ]
    },
    // 评论
    {
        name: "评论管理",
        path: "comments",
        icon: "md-text",
        children: [
            {
                name: "评论列表",
                path: "/comments",
                icon: "md-list"
            }
        ]
    },
    // 回复评论
    {
        name: "回复评论管理",
        path: "reply",
        icon: "md-text",
        children: [
            {
                name: "回复评论列表",
                path: "/reply",
                icon: "md-list"
            }
        ]
    }
]