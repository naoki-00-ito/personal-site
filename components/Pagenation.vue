<template>
  <v-pagination
    v-model="page"
    :length="length"
    @input="pageChange"
  ></v-pagination>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      length: 0,
      displayLists: [],
      pageSize: 10,
    };
  },

  mounted: function () {
    this.posts;
    this.length = Math.ceil(this.posts.length / this.pageSize);
    this.displayLists = this.posts.slice(
      this.pageSize * (this.page - 1),
      this.pageSize * this.page
    );
  },

  methods: {
    pageChange: function (pageNumber) {
      this.displayLists = this.posts.slice(
        this.pageSize * (pageNumber - 1),
        this.pageSize * pageNumber
      );
    },
  },
};
</script>
