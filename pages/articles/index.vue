<template>
  <div>
    <v-row>
      <v-col v-for="article in articles" :key="article.slug" cols="12">
        <ArticleCard :article="article" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ArticleCard from "@/components/ArticleCard";

export default {
  head() {
    return {
      title: "nuxt-blog",
      titleTemplate: "",
    };
  },
  data() {
    return {
      page: 1,
    };
  },
  components: {
    ArticleCard,
  },
  async asyncData({ $content }) {
    const articles = await $content("articles")
      .sortBy("createdAt", "desc")
      .skip(0)
      .limit(15)
      .fetch();
    return {
      articles,
    };
  },
};
</script>
