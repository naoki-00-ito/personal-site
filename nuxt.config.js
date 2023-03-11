import colors from 'vuetify/es5/util/colors'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head() {
    const baseUrl = process.env.BASE_URL;
    const appName = process.env.APP_NAME;
    const pageDescription = process.env.npm_package_description;
    const ogImage = `${baseUrl}/og.png`;
    const gtmID = process.env.GTM_ID;
    const gtmHeadTag = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmID}');`
    const gtmBodyTag = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`

    return {
      titleTemplate: `%s | ${appName}`,
      htmlAttrs: {
        lang: 'ja'
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: pageDescription },
        { name: 'format-detection', content: 'telephone=no' },
        { hid: 'og:site_name', property: 'og:site_name', content: appName },
        { hid: 'og:url', property: 'og:url', content: baseUrl },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:title', property: 'og:title', content: appName },
        { hid: 'og:description', property: 'og:description', content: pageDescription },
        { hid: 'og:image', property: 'og:image', content: ogImage },
        { hid: 'og:locale', property: 'og:locale', content: 'ja_JP' },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' }
      ],

      script: [
        {
          hid: 'gtmHead',
          innerHTML: gtmHeadTag
        }
      ],
      noscript: [
        {
          hid: 'gtmBody',
          innerHTML: gtmBodyTag,
          pbody: true
        }
      ],
      __dangerouslyDisableSanitizersByTagID: {
        'gtmHead': ['innerHTML'],
        'gtmBody': ['innerHTML']
      },
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@mdi/font/css/materialdesignicons.css',
    'github-markdown-css/github-markdown.css',
    '@/assets/scss/style.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/date-filter.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    },
    icons: {
      iconfont: 'mdi',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  generate: {
    async routes() {
      const { $content } = require('@nuxt/content')
      const articles = await $content('articles').fetch()
      const articlesRoutes = articles.map(article => `/articles/${article.slug}`)
      const categories = await $content('articles').only(['category']).fetch()
      const filteredCategories = categories.filter(cat => cat.category)
      const categoriesRoutes = filteredCategories.reduce((prev, curr) => [...prev, ...curr.category.map(cat => `/category/${cat}/page/1`)], [])
      const tags = await $content('articles').only(['tags']).fetch()
      const filteredTags = tags.filter(tag => tag.tags)
      const tagsRoutes = filteredTags.reduce((prev, curr) => [...prev, ...curr.tags.map(tag => `/tag/${tag}/page/1`)], [])

      const articlesPerPage = 15 // 1ページあたりの記事数
      const categoriesPerPage = 15 // 1ページあたりのカテゴリ数
      const tagsPerPage = 15 // 1ページあたりのタグ数

      const totalArticlesPages = Math.ceil(articlesRoutes.length / articlesPerPage)
      const totalCategoriesPages = Math.ceil(categoriesRoutes.length / categoriesPerPage)
      const totalTagsPages = Math.ceil(tagsRoutes.length / tagsPerPage)

      const routes = []

      for (let i = 1; i <= totalArticlesPages; i++) {
        routes.push(`/articles/page/${i}`)
      }

      for (let i = 1; i <= totalCategoriesPages; i++) {
        for (let cat of filteredCategories[i - 1].category) {
          routes.push(`/category/${cat}/page/${i}`)
        }
      }

      for (let i = 1; i <= totalTagsPages; i++) {
        for (let tag of filteredTags[i - 1].tags) {
          routes.push(`/tag/${tag}/page/${i}`)
        }
      }

      return routes
    }
  }
}
