<template>
  <div>
    <v-row>
      <v-col v-for="article in articles" :key="article.slug" cols="12">
        <ArticleCard :article="article" />
      </v-col>
    </v-row>
    <!-- pagenation -->
    <ul class="c-pagenation">
      <li class="c-pagenation__item" v-for="pg in num" :key="pg.num">
        <nuxt-link
          v-if="pg.pg"
          :to="'/articles/page/' + pg.num"
          :class="current == pg.num ? 'is-current' : ''"
          class="white--text"
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

export default {
  head() {
    const title = `記事一覧 - ${this.pageNum}ページ`;
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
  async created() {
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
