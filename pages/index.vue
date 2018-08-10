<template>
  <div>
    <fp-logo/>
    <h1>
      Discover how I live a full life with Fibromyalgia
    </h1>
    <div>
      <fp-cta primary><nuxt-link to="/about/fibromyalgia">What is Fibromyalgia?</nuxt-link></fp-cta>
      <fp-cta><nuxt-link to="/about">About me</nuxt-link></fp-cta>
      <fp-cta><nuxt-link to="/resources">Resources</nuxt-link></fp-cta>

      <fp-cta><nuxt-link to="/articles">Articles</nuxt-link></fp-cta>
    </div>

    <h2>
      Latest articles
    </h2>

    <h2>
      Discover by topic
    </h2>

  </div>
</template>
<script>
export default {
  layout: 'landing'
}
</script>
