<template>
  <div class="articles">
    <h1>Articles</h1>

    <div v-for="(article, index) in allArticles" :key="index" class="articles-cards">
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
</template>

<script>
  export default {
    async asyncData({ app }) {
      const allArticles = await app.$content.getCollectionData('articles')
      return {
        allArticles
      }
    }
  }
</script>