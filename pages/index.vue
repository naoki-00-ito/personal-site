<template>
  <v-row>
    <v-col v-for="article in blog" :key="article.slug" cols="12">
      <v-card :to="`/blog/${article.slug}`" hover>
        <v-card-title>{{ article.title }}</v-card-title>
        <v-card-subtitle>{{ article.createdAt | date }}</v-card-subtitle>
        <v-divider class="mx-3 my-n1"></v-divider>
        <v-card-text class="pb-0">
          <div class="mt-n2 ml-n2">
            <v-chip v-for="(category, index) in article.category" :key="index" color="primary" label class="mt-2 ml-2">
              <v-icon class="mr-1">mdi-folder</v-icon>
              {{ category }}
            </v-chip>
          </div>
        </v-card-text>
        <v-card-text>
          <div class="mt-n2 ml-n2">
            <v-chip v-for="(tag, index) in article.tags" :key="index" color="pink" label text-color="white" class="mt-2 ml-2">
              <v-icon class="mr-1">mdi-label</v-icon>
              {{ tag }}
            </v-chip>
          </div>
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
