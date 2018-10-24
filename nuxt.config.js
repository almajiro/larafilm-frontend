module.exports = {
  env: {
    backendUrl: process.env.BACKEND_URL || 'http://localhost:8080'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Larafilm',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'The Frontend of LaraFilm' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: {
    color: 'blue',
    height: '5px'
  },
  plugins: [
    { src: '~/plugins/videoplayer.js' },
    { src: '~/plugins/utils.js'},
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

      config.module.rules
        .filter(rule => rule.loader === 'babel-loader')
        .map(rule => {
          rule.options.babelrc = true;
        });

      config.module.noParse = [/videojs-contrib-hls/]
    },
    babel: {
      presets: ['es2015', 'stage-3']
    },
    vendor: ['vue-carousel-3d', 'vue-carousel', 'vue-awesome-swiper', 'vue-video-player', 'video.js', 'babel-polyfill']
  },
  mode: 'spa',
  modules: [
    'bootstrap-vue/nuxt'
  ],
  css: [
    '@fortawesome/fontawesome-free-webfonts',
    '@fortawesome/fontawesome-free-webfonts/css/fa-brands.css',
    '@fortawesome/fontawesome-free-webfonts/css/fa-regular.css',
    '@fortawesome/fontawesome-free-webfonts/css/fa-solid.css',
    '@/assets/css/materialicon.css',
    '@/assets/css/main.scss',
    'swiper/dist/css/swiper.css',
    'video.js/dist/video-js.css'
  ]
}

