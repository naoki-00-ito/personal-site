<template>
  <div>
    <v-row>
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
