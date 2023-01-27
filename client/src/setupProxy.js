const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/boards",
        createProxyMiddleware({
            target: "http://ec2-43-201-14-234.ap-northeast-2.compute.amazonaws.com:8080/",
            changeOrigin: true,
        })
    );
    app.use(
        "/comments",
        createProxyMiddleware({
            target: "http://ec2-43-201-14-234.ap-northeast-2.compute.amazonaws.com:8080/",
            changeOrigin: true,
        })
    );
    app.use(
        "/members/login",
        createProxyMiddleware({
            target: "http://ec2-43-201-14-234.ap-northeast-2.compute.amazonaws.com:8080/",
            changeOrigin: true,
        })
    );
    app.use(
        "/mypage/:id/*",
        createProxyMiddleware({
            target: "http://ec2-43-201-14-234.ap-northeast-2.compute.amazonaws.com:8080/",
            changeOrigin: true,
        })
    );
};
