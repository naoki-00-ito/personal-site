<template>
  <v-app>

    <!-- header -->
    <header>
      <v-app-bar
        app
        dark
      >
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        <v-toolbar-title>{{ appName }}</v-toolbar-title>
      </v-app-bar>

      <!-- drawer -->
      <v-navigation-drawer
        v-model="drawer"
        fixed
        temporary
      >
        <v-list
          nav
          dense
        >

          <!-- links default -->
          <v-list-item-group>
            <v-list-item :to="'/'">
              <v-list-item-title>HOME</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
          <!-- /links default -->

          <!-- links category -->
          <p class="text-subtitle-1 mt-5 mb-2">カテゴリ</p>
          <v-list-item-group>
            <v-list-item v-for="(category, index) in $store.state.category" :key="'category-'+index" :to="'/category/'+category.slug">
              <v-list-item-title>{{ category.name }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
          <!-- /links category -->

          <!-- links tag -->
          <p class="text-subtitle-1 mt-5 mb-2">タグ</p>
          <v-list-item-group>
            <v-list-item v-for="(tag, index) in $store.state.tags" :key="'tag-'+index" :to="'/tag/'+tag.slug">
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
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      appName: 'nuxt-blog',
    }
  }
}
</script>
