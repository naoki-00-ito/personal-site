<template>
  <div>
    <v-row>
      <v-col v-for="article in articles" :key="article.slug" cols="12">
        <ArticleCard :article="article" />
      </v-col>
    </v-row>

    <MoreButton
      url="/articles/page/1"
      :articleNum="articles.length"
      :requiredArticleNum="requiredArticleNum"
    />
  </div>
</template>

<script>
import ArticleCard from "@/components/ArticleCard";
import MoreButton from "@/components/MoreButton";

export default {
  head() {
    const baseUrl = process.env.BASE_URL;
    const ogUrl = `${baseUrl}${this.$route.path}`;
    return {
      title: process.env.APP_NAME,
      titleTemplate: "",
      meta: [
        { hid: "og:type", property: "og:type", content: "website" },
        { hid: "og:url", property: "og:url", content: ogUrl },
      ],
    };
  },
  components: {
    ArticleCard,
    MoreButton,
  },
  async asyncData({ store, $content }) {
    const requiredArticleNum = store.state.indexPerPage;
    const articles = await $content("articles")
      .sortBy("createdAt", "desc")
      .limit(requiredArticleNum)
      .fetch();
    return {
      requiredArticleNum,
      articles,
    };
  },
};
</script>
