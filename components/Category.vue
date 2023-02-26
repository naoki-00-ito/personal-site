<template>
  <v-chip color="primary" label class="mt-2 ml-2">
    <v-icon class="mr-1">mdi-folder</v-icon>
    {{ categoryName }}
  </v-chip>
</template>

<script>
export default {
  name: "Category",
  props: ["categoryName"],
};
</script>
