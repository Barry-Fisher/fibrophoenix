<template>
  <div v-html="content">
  </div>
</template>

<script>

export default {
  async asyncData({ app, route }) {
    const markdown = await app.$content.getMarkdown(`about.md`)
    return {
      content: markdown.content,
      data: markdown.data
    }
  },
}
</script>