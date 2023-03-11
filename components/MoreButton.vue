<template>
  <div class="text-center mt-10" v-if="articleNum === requiredArticleNum">
    <v-btn color="primary" :to="url">もっと見る</v-btn>
  </div>
</template>

<script>
export default {
  name: "MoreButton",
  props: ["url", "articleNum", "requiredArticleNum"],
};
</script>
