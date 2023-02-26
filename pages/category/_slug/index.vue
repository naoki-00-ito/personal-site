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
  async asyncData({ store, $content, params }) {
    const blog = await $content('blog').where({ category: { $contains: params.slug }}).sortBy('createdAt', 'desc').fetch();
    return {
      blog
    }
  }
}
</script>
