<template>
  <v-row>
    <v-col v-for="article in articles" :key="article.slug" cols="12">
      <ArticleCard :article="article" />
    </v-col>
  </v-row>
</template>

<script>
import ArticleCard from "@/components/ArticleCard";

export default {
  components: {
    ArticleCard,
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
