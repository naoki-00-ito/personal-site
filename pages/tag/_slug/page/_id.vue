<template>
  <div>
    <h1>カテゴリ「{{ taxonomyname }}」- {{ this.pageNum }}ページ</h1>

    <v-row class="mt-4">
      <v-col v-for="article in articles" :key="article.slug" cols="12">
        <ArticleCard :article="article" />
      </v-col>
    </v-row>
    <!-- pagenation -->
    <ul class="c-pagenation">
      <li class="c-pagenation__item" v-for="pg in num" :key="pg.num">
        <nuxt-link
          v-if="pg.pg"
          :to="'/tag/' + $route.params.slug + '/page/' + pg.num"
          :class="current == pg.num ? 'is-current' : ''"
        >
          {{ pg.num }}
        </nuxt-link>
        <span v-else>
          {{ pg.num }}
        </span>
      </li>
    </ul>
    <!-- /pagenation -->
  </div>
</template>

<script>
import ArticleCard from "@/components/ArticleCard";
const taxonomys = require("@/taxonomy.js");

export default {
  head() {
    const title = `「${this.taxonomyname}」の記事一覧 - ${this.pageNum}ページ`;
    return {
      title: title,
      meta: [
        {
          hid: "og:title",
          property: "og:title",
          content: `${title} | ${process.env.APP_NAME}`,
        },
      ],
    };
  },
  components: {
    ArticleCard,
  },
  data() {
    return {
      taxonomyname: "",
    };
  },
  async created() {
    const slug = this.$route.params.slug;
    const taxonomy = taxonomys.category.find((c) => c.slug === slug);
    this.taxonomyname = taxonomy ? taxonomy.name : "";
    this.pageNum = this.$route.params.id;
  },
  validate({ redirect, params }) {
    if (/[0-9]+/.test(params.id)) return true;
    return redirect("/articles");
  },
  async asyncData({ store, $content, params }) {
    const count = await $content("articles").fetch();
    const current = params.id;
    if (current > Math.ceil(count.length / store.state.indexPerPage))
      redirect("/articles");

    const from = store.state.indexPerPage * (params.id - 1);
    const to = store.state.indexPerPage * params.id;

    const articles = await $content("articles")
      .where({ category: { $contains: params.slug } })
      .sortBy("createdAt", "desc")
      .skip(from)
      .limit(to)
      .fetch();

    return {
      articles,
      current,
      count: count.length,
    };
  },
  computed: {
    num() {
      let tmp = [];
      const max = Math.ceil(this.count / this.$store.state.indexPerPage);
      for (let n = 1; n <= max; n++) {
        if (n == 1 || n == max) {
          tmp.push({ pg: true, num: n });
        } else if (this.current - 2 <= n && n <= this.current + 2) {
          tmp.push({ pg: true, num: n });
        } else if (this.current - 2 - 1 == n || n == this.current + 2 + 1) {
          tmp.push({ pg: false, num: "..." });
        }
      }
      return tmp;
    },
  },
};
</script>
