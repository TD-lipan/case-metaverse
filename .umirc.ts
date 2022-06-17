import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  fastRefresh: {},
  chainWebpack: (config) => {
    config.module
      .rule('mp4')
      .test(/\.(mp4|zip)(\?.*)?$/)
      .use('file-loader')
      .loader(require.resolve('file-loader'))
      .options({
        name: 'static/[name].[hash:8].[ext]',
        esModule: false,
      });
  },
});
