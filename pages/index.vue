<template>
  <ul>
    <li v-for="article in blog" :key="article.slug">
      <nuxt-link :to="`/blog/${article.slug}`">
        <time :datetime="article.createdAt">
          {{ article.createdAt | date }}
        </time>
        <p>{{ article.title }}</p>
      </nuxt-link>
    </li>
  </ul>
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
