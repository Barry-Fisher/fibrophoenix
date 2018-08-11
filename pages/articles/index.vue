<template>
  <div class="articles">
    <h2>All Articles</h2>

    <div v-for="(article, index) in allArticles" :key="`all-articles-${index}`" class="articles-cards">
      <div v-if="article.data.title" class="articles-card">
        <div>
          Title: <nuxt-link :to="article.path">{{ article.data.title }}</nuxt-link>
        </div>
        <div>
          Summary: {{ article.data.summary }}
        </div>
      </div>
    </div>

    <h2>By tag</h2>

    <div v-for="(tag, tagIndex) in allTags" :key="`tag-${tagIndex}`" class="articles-cards">
      <h3>{{ tag }}</h3>
      <div v-for="(article, articleIndex) in allArticles" :key="`tag-${tagIndex}-article-${articleIndex}`" class="articles-cards" v-if="Array.isArray(article.data.tags) && article.data.tags.includes(tag)">
        <div v-if="article.data.title" class="articles-card">
          <div>
            Title: <nuxt-link :to="article.path">{{ article.data.title }}</nuxt-link>
          </div>
          <div>
            Summary: {{ article.data.summary }}
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  async asyncData({ app }) {
    const allArticles = await app.$content.getCollectionData('articles')
    const articleDataProperties = app.$content.extractCollectionDataProperties(allArticles, ['tags'])
    return {
      allArticles,
      allTags: articleDataProperties.tags
    }
  },
  head () {
    return {
      title: 'All articles',
      meta: [
        { hid: 'description', name: 'description', content: 'All Fibromyagia articles including: ' + this.allTags.join(', ') }
      ]
    }
  }
}
</script>