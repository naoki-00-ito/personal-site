<template>
  <v-chip color="pink" text-color="white" label class="mt-2 ml-2">
    <v-icon class="mr-1">mdi-label</v-icon>
    {{ tagName }}
  </v-chip>
</template>

<script>
export default {
  name: "Tag",
  props: ["tagName"],
};
</script>
