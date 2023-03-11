<template>
  <article>
    <h1>{{ article.title }}</h1>
    <time :datetime="article.createdAt">
      {{ article.createdAt | date }}
    </time>
    <div class="ml-n2">
      <span
        v-for="(category, index) in article.category"
        :key="index"
        :data-category="category"
      >
        <Category :categoryName="category" />
      </span>
    </div>
    <div class="ml-n2">
      <span v-for="(tag, index) in article.tags" :key="index" :data-tag="tag">
        <Tag :tagName="tag" />
      </span>
    </div>

    <NuxtContent :document="article" />
  </article>
</template>

<script>
export default {
  head() {
    const title = this.article.title;
    const description = this.article.description;
    return {
      title: title,
      meta: [
        { hid: "description", name: "description", content: description },
        {
          hid: "og:title",
          property: "og:title",
          content: `${title} | ${process.env.APP_NAME}`,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: description,
        },
      ],
    };
  },
  async asyncData({ $content, params }) {
    const article = await $content("articles", params.slug).fetch();
    return {
      article,
    };
  },
};
</script>
