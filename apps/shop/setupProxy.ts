import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function(app:any) {
  app.use(
    '/posts',
    createProxyMiddleware({
      target: 'https://jsonplaceholder.typicode.com',
      changeOrigin: true,
    })
  );
};