<template>
  <div class="articles">
    <h1>Articles</h1>

    <div v-for="(article, slug) in articlesData" :key="slug" class="articles-cards">
      <div v-if="article.data.title" class="articles-card">
        <div>
          Title: <nuxt-link :to="`/articles/${slug}`">{{ article.data.title }}</nuxt-link>
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
    asyncData({ app }) {
      const articlesData = app.$getArticles()
      return {
        articlesData
      }
    }
  }
</script>