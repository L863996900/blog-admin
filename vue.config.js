module.exports = {
    devServer: {
        port: 8888,
        open: true
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "~@/assets/css/global.scss";`
            }
        }
    }
}