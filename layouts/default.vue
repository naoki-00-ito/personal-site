<template>
  <v-app>
    <!-- header -->
    <header>
      <v-app-bar app dark>
        <v-toolbar-title>{{ appName }}</v-toolbar-title>
        <v-app-bar-nav-icon
          @click="drawer = true"
          class="ml-auto"
        ></v-app-bar-nav-icon>
      </v-app-bar>

      <!-- drawer -->
      <v-navigation-drawer v-model="drawer" right fixed temporary>
        <v-list nav dense>
          <v-list-item class="px-0 d-flex justify-end">
            <v-btn icon @click="drawer = false" class="text-right">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-list-item>

          <!-- links default -->
          <v-list-item-group>
            <v-list-item :to="'/'">
              <v-list-item-icon class="mr-2">
                <v-icon class="mt-n1">mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>HOME</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
          <!-- /links default -->

          <v-divider />

          <!-- links category -->
          <v-list-item-group class="my-6">
            <v-list-item class="pointer-events-none">
              <v-list-item-icon class="mr-2">
                <v-icon small class="mt-n1">mdi-folder</v-icon>
              </v-list-item-icon>
              <v-list-item-title>カテゴリ</v-list-item-title>
            </v-list-item>
            <v-list-item
              v-for="(category, index) in $store.state.category"
              :key="'category-' + index"
              :to="'/category/' + category.slug"
              class="pl-10"
            >
              <v-list-item-title>{{ category.name }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
          <!-- /links category -->

          <v-divider />

          <!-- links tag -->
          <v-list-item-group class="my-6">
            <v-list-item class="pointer-events-none">
              <v-list-item-icon class="mr-2">
                <v-icon small class="mr-1">mdi-label</v-icon>
              </v-list-item-icon>
              <v-list-item-title>タグ</v-list-item-title>
            </v-list-item>
            <v-list-item
              v-for="(tag, index) in $store.state.tags"
              :key="'tag-' + index"
              :to="'/tag/' + tag.slug"
              class="pl-10"
            >
              <v-list-item-title>{{ tag.name }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
          <!-- /links tag -->
        </v-list>
      </v-navigation-drawer>
      <!-- /drawer -->
    </header>
    <!-- /header -->

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <!-- footer -->
    <v-footer class="mt-10">
      <v-row justify="center" no-gutters class="py-5">
        <!-- links category -->
        <v-btn
          v-for="(category, index) in $store.state.category"
          :key="'category-' + index"
          :to="'/category/' + category.slug"
          text
          rounded
        >
          {{ category.name }}
        </v-btn>
        <!-- /links category -->

        <!-- tag category -->
        <v-btn
          v-for="(tag, index) in $store.state.tags"
          :key="'tag-' + index"
          :to="'/tag/' + tag.slug"
          text
          rounded
        >
          {{ tag.name }}
        </v-btn>
        <!-- /tag category -->

        <!-- sns -->
        <v-col cols="12" class="text-center mt-10">
          <v-btn href="https://github.com/naoki-00-ito" target="_blank" icon>
            <v-icon size="30px">mdi-github</v-icon>
          </v-btn>
          <v-btn href="https://twitter.com/naoki_00_ito" target="_blank" icon>
            <v-icon size="30px">mdi-twitter</v-icon>
          </v-btn>
        </v-col>
        <!-- /sns -->

        <!-- copy -->
        <v-col cols="12" class="text-center mt-10">
          <small
            >Copyright &copy; 2023 - {{ new Date().getFullYear() }}
            <a href="https://twitter.com/naoki_00_ito" target="_blank"
              >@naoki_00_ito</a
            ></small
          >
        </v-col>
        <!-- /copy -->
      </v-row>
    </v-footer>
    <!-- /footer -->
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      appName: "Blog",
    };
  },
};
</script>

<style scoped lang="scss">
.pointer-events-none {
  pointer-events: none;
}
</style>
