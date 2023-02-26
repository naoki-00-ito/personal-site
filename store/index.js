import taxonomy from '@/taxonomy';

export const state = () => ({
  category: [
    ...taxonomy.category
  ],
  tags: [
    ...taxonomy.tags
  ],
  indexPerPage: 15,
})

export const mutations = {
  setIndexPerPage(state, count) {
    state.indexPerPage = count
  }
}

export const getters = {
  getTagNameBySlug(state) {
    return (slug) => {
      const idx = state.tags.findIndex(tag => {
        return tag.slug === slug;
      })
      return (idx > -1) ? state.tags[idx].name : undefined;
    }
  },
  getCategoryNameBySlug(state) {
    return (slug) => {
      const idx = state.category.findIndex(tag => {
        return tag.slug === slug;
      })
      return (idx > -1) ? state.category[idx].name : undefined;
    }
  }
}

