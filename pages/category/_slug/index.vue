<template>
  <div>
    <h1>カテゴリ「{{ taxonomyname }}」</h1>

    <v-row class="mt-4">
      <v-col v-for="article in articles" :key="article.slug" cols="12">
        <ArticleCard :article="article" />
      </v-col>
    </v-row>

    <div class="text-center mt-10">
      <v-btn color="primary" :to="'/category/' + $route.params.slug + '/page/1'"
        >もっと見る</v-btn
      >
    </div>
  </div>
</template>

<script>
import ArticleCard from "@/components/ArticleCard";
const taxonomys = require("@/taxonomy.js");

export default {
  head() {
    return {
      title: `「${this.taxonomyname}」の記事一覧`,
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
  },
  async asyncData({ store, $content, params }) {
    const articles = await $content("articles")
      .where({ category: { $contains: params.slug } })
      .sortBy("createdAt", "desc")
      .skip(0)
      .limit(store.state.indexPerPage)
      .fetch();
    return {
      articles,
    };
  },
};
</script>
