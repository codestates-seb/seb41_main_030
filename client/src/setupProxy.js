const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/boards",
        createProxyMiddleware({
            target: "http://ec2-3-36-53-155.ap-northeast-2.compute.amazonaws.com:8080/",
            changeOrigin: true
        })
    );
    app.use(
        "/comments",
        createProxyMiddleware({
            target: "http://ec2-3-36-53-155.ap-northeast-2.compute.amazonaws.com:8080/",
            changeOrigin: true
        })
    );
    app.use(
        "/members",
        createProxyMiddleware({
            target: "http://ec2-3-36-53-155.ap-northeast-2.compute.amazonaws.com:8080/",
            changeOrigin: true
        })
    );
};
