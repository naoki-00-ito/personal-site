<template>
  <article>
    <h1>{{ article.title }}</h1>
    <time :datetime="article.createdAt">
      {{ article.createdAt | date }}
    </time>
    <div class="ml-n2 tips">
      <span
        v-for="(category, index) in article.category"
        :key="index"
        :data-category="category"
      >
        <Category :categoryName="category" />
      </span>
    </div>
    <div class="ml-n2 tips">
      <span v-for="(tag, index) in article.tags" :key="index" :data-tag="tag">
        <Tag :tagName="tag" />
      </span>
    </div>

    <div class="contents">
      <NuxtContent :document="article" />
    </div>
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

<style scoped lang="scss">
$space-base: 20px;

h1 {
  font-size: 40px;
}

time {
  display: block;
  margin-top: $space-base;
}

.tips {
  margin-top: $space-base / 2;

  & + & {
    margin-top: $space-base / 4;
  }

  span {
    pointer-events: none;
  }
}

.contents {
  margin-top: $space-base * 2;
  padding-top: $space-base * 2;
  border-top: 1px solid #444;
}
</style>
