<template>
  <div>
    <app-logo/>
    <h1>
      Discover how I live a full life with Fibromyalgia
    </h1>
    <div class="links">
      <fp-cta primary><nuxt-link to="/about/fibromyalgia">What is Fibromyalgia?</nuxt-link></fp-cta>
      <fp-cta><nuxt-link to="/about">About me</nuxt-link></fp-cta>
      <fp-cta><nuxt-link to="/resources">Resources</nuxt-link></fp-cta>
    </div>

    <h2>
      Latest articles
    </h2>
    <div class="latest-articles">
      <!-- <el-row :gutter="20">
        <el-col :span="8" v-for="delta in 6" :key="`latest-article-${delta}`">
          <el-card class="article-card">
            <div>
              {{'This is article ' + delta }}
            </div>
          </el-card>
        </el-col>
      </el-row>-->
    </div>
    <h2 class="subtitle">
      Discover by topic
    </h2>
    <p>...</p>
  </div>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'

export default {
  components: {
    AppLogo
  }
}
</script>

<style lang="scss">
.links {
  padding: 30px 0;
}
.article-card {
  margin-bottom: 20px;
}
</style>

