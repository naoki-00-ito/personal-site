<template>
  <v-chip color="primary" label class="mt-2 ml-2">
    <v-icon class="mr-1">mdi-folder</v-icon>
    {{ taxonomyname }}
  </v-chip>
</template>

<script>
import taxonomys from "@/plugins/taxonomy.js";

export default {
  name: "Category",
  props: ["categoryName"],
  data() {
    return {
      taxonomyname: "",
    };
  },
  async created() {
    const taxonomy = taxonomys.category.find(
      (c) => c.slug === this.categoryName
    );
    this.taxonomyname = taxonomy ? taxonomy.name : "";
  },
};
</script>
