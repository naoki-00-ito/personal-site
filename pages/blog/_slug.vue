<template>
  <article>
    <h1>{{ article.title }}</h1>
    <time :datetime="article.createdAt">
      {{ article.createdAt | date }}
    </time>
    <div class="mt-n2 ml-n2">
      <span v-for="(category, index) in article.category" :key="index" :data-category="category">
        <Category :categoryName="category" />
      </span>
    </div>
    <NuxtContent :document="article" />
  </article>
</template>

<script>
export default {
  async asyncData ({ $content, params }) {
    const article = await $content('blog', params.slug).fetch()
    return {
      article
    }
  }
}
</script>