<template>
  <div class="container-master">
    <div class="container-content">
      <nuxt/>
    </div>
    <div class="container-footer">
      <Footer />
    </div>
  </div>
</template>

<script>
import Footer from '../components/Footer.vue'
export default {
  components: {
    Footer
  },
}
</script>
<style lang="scss">

.container-master {
  background: $color-bg;
}
.container-content {
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.container-footer {
  min-height: 50px;
  color: white;
  border-bottom: 5px solid $color-primary-accent;
  background-color: $color-primary;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-shadow: 0 0 5px #999;
}

</style>

