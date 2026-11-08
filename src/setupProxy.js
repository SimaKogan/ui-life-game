const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/proxy',
    createProxyMiddleware({
      target: 'https://server-life-game.onrender.com/api',
      changeOrigin: true,
    })
  );
};
