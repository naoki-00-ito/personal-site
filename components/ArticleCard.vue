<template>
  <v-card :to="`/articles/${article.slug}`" hover>
    <v-card-title>{{ article.title }}</v-card-title>
    <v-card-subtitle>{{ article.createdAt | date }}</v-card-subtitle>
    <v-divider class="mx-3 my-n1"></v-divider>
    <v-card-text class="pb-0">
      <div class="mt-n2 ml-n2">
        <span
          v-for="(category, index) in article.category"
          :key="index"
          :data-category="category"
        >
          <Category :categoryName="category" />
        </span>
      </div>
    </v-card-text>
    <v-card-text>
      <div class="mt-n2 ml-n2">
        <span v-for="(tag, index) in article.tags" :key="index" :data-tag="tag">
          <Tag :tagName="tag" />
        </span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import Category from "@/components/Category";
import Tag from "@/components/Tag";

export default {
  name: "ArticleCard",
  props: ["article"],

  components: {
    Category,
    Tag,
  },
};
</script>
