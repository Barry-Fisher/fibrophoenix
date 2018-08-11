<template>
  <div v-html="content">
  </div>
</template>

<script>

export default {
  async asyncData({ app, route }) {
    const markdown = await app.$content.getMarkdown(`${route.path}.md`)
    return {
      content: markdown.content,
      data: markdown.data
    }
  },
}
</script>