<template>
  <div>
    <div v-html="content"></div>
  </div>
</template>

<script>
export default {
  mounted () {
    if (this.prefetched) {
      this.content = this.prefetched
      return
    }

    this.$axios.$get(`/api/content${this.path}.md`).then(content => {
      this.content = content
    })
  },
  data() {
    return {
      content: ''
    }
  },
  props: {
    path: {
      type: String,
      required: true
    },
    prefetched: {
      type: String,
      required: false
    }
  }
}
</script>