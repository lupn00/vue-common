module.exports = {
    devServer: {
        host: '0.0.0.0', // 主机名字
        port: 8081, // 端口号，如果端口正在使用将获取一个空闲端口
        proxy: { // 如需跨域请求多个域名，在此对象进行扩展即可
            '/api': {
                // target: 'http://10.10.0.142:8082',
                target: 'http://106.12.40.234:8082',
                ws: true,
                changeOrigin: true, // 是否跨域
                pathRewrite: {  // 需要rewrite的
                    '^/api': '/api' // 如果原接口没有 /api/ 则值为空
                }
            },
        }
    }
};
