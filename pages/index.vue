<template>
  <v-row>
    <v-col v-for="article in blog" :key="article.slug" cols="12">
      <v-card :to="`/blog/${article.slug}`" hover>
        <v-card-title>{{ article.title }}</v-card-title>
        <v-divider class="mx-3 my-n1"></v-divider>
        <v-card-subtitle>{{ article.createdAt | date }}</v-card-subtitle>
        <v-card-text>
          <v-chip color="primary" label>{{ article.category }}</v-chip>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const blog = await $content('blog').sortBy('createdAt', 'desc').fetch();
    return {
      blog
    }
  }
}
</script>
