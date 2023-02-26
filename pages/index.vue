<template>
  <v-row>
    <v-col v-for="article in blog" :key="article.slug" cols="12">
      <ArticleCard :article="article" />
    </v-col>
  </v-row>
</template>

<script>
import ArticleCard from "@/components/ArticleCard"

export default {
  components: {
    ArticleCard,
  },
  async asyncData({ $content }) {
    const blog = await $content('blog').sortBy('createdAt', 'desc').fetch();
    return {
      blog
    }
  }
}
</script>
