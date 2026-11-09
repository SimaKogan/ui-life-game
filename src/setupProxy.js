const { createProxyMiddleware } = require('http-proxy-middleware');

const target = process.env.API_TARGET || 'http://localhost:5001/api';

module.exports = function (app) {
  app.use(
    '/proxy',
    createProxyMiddleware({
      target,
      changeOrigin: true,
    })
  );
};
