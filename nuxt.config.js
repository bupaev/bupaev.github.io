export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'Pavel Buramensky',
    title: 'Pavel Buramensky',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Creative front-end developer who cares about user experience and tries to make the world a better place'
      },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'robots', content: 'all' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'My personal page' },
      { property: 'og:url', content: 'https://paulbu.com' },
      { property: 'og:title', content: 'Hi! I\'m Pavel Buramensky and that\'s my page' },
      {
        property: 'og:description',
        content: 'I\'m front-end perfectionist who cares about user experience and tries to make the world a better place'
      },
      { property: 'og:image', content: 'https://paulbu.com/pics/portrait-1-og.jpg' },
      { property: 'og:image:width', content: '968' },
      { property: 'og:image:height', content: '504' },
      { property: 'og:locale', content: 'en' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/main.scss',
    '@/assets/fonts/index.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  generate: {
    fallback: '404.html'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true
    // https://github.com/nuxt/nuxt.js/tree/dev/packages/babel-preset-app#options
    // Sadly this config leads to Nuxt build error, so just use --modern flag for generate
    /* babel: {
      presets ({ envName }) {
        const envTargets = {
          client: { browsers: ['last 2 versions'] },
          server: { node: 'current' }
        }
        return [
          [
            '@nuxt/babel-preset-app',
            {
              targets: envTargets[envName]
            }
          ]
        ]
      }
    } */
  }
}
