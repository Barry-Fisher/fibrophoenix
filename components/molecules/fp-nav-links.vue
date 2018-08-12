<template>
  <div class="fp-nav-links">
    <nuxt-link to="/about/fibromyalgia">What is Fibromyalgia</nuxt-link>
    <nuxt-link to="/about">About</nuxt-link>
    <nuxt-link to="/articles" class="articles">Articles</nuxt-link>
    <nuxt-link to="/resources">Resources</nuxt-link>
  </div>
</template>

<style lang="scss">
.fp-nav-links {
  a {
    margin: 0 $h-spacer;
    text-decoration: none;
    color: $color-grey;
    &.nuxt-link-exact-active,
    &.articles.nuxt-link-active {
      color: $color-primary;
      position: relative;
      &:before {
        font-size: 3rem;
        content: '·';
        margin: -5px auto 0 auto;
        width: 100%;
        position: absolute;
        display: inline-block;
        text-align: center;
      }
    }
  }
}
</style>