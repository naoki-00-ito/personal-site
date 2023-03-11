<template>
  <div>
    <h1>カテゴリ「{{ taxonomyname }}」</h1>

    <v-row class="mt-4">
      <v-col v-for="article in articles" :key="article.slug" cols="12">
        <ArticleCard :article="article" />
      </v-col>
    </v-row>

    <MoreButton
      :url="nextUrl"
      :articleNum="articles.length"
      :requiredArticleNum="requiredArticleNum"
    />
  </div>
</template>

<script>
import ArticleCard from "@/components/ArticleCard";
import MoreButton from "@/components/MoreButton";
import taxonomys from "@/plugins/taxonomy.js";

export default {
  head() {
    const title = `「${this.taxonomyname}」の記事一覧`;
    const baseUrl = process.env.BASE_URL;
    const ogUrl = `${baseUrl}${this.$route.path}`;
    return {
      title: title,
      meta: [
        {
          hid: "og:title",
          property: "og:title",
          content: `${title} | ${process.env.APP_NAME}`,
        },
        { hid: "og:url", property: "og:url", content: ogUrl },
      ],
    };
  },
  components: {
    ArticleCard,
    MoreButton,
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
  async asyncData({ store, $content, params, route }) {
    const nextUrl = `/category/${route.params.slug}/page/1`;
    const requiredArticleNum = store.state.indexPerPage;
    const articles = await $content("articles")
      .where({ category: { $contains: params.slug } })
      .sortBy("createdAt", "desc")
      .skip(0)
      .limit(requiredArticleNum)
      .fetch();
    return {
      nextUrl,
      requiredArticleNum,
      articles,
    };
  },
};
</script>
