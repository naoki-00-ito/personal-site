<template>
  <v-chip color="pink" text-color="white" label class="mt-2 ml-2">
    <v-icon class="mr-1">mdi-label</v-icon>
    {{ taxonomyname }}
  </v-chip>
</template>

<script>
import taxonomys from "@/plugins/taxonomy.js";

export default {
  name: "Tag",
  props: ["tagName"],
  data() {
    return {
      taxonomyname: "",
    };
  },
  async created() {
    const taxonomy = taxonomys.tags.find((c) => c.slug === this.tagName);
    this.taxonomyname = taxonomy ? taxonomy.name : "";
  },
};
</script>
