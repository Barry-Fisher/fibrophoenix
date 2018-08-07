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
  max-width: $container-max-width;
  margin: 0 auto;
  padding: ($v-spacer*2) ($h-spacer*4);
  box-shadow: $box-shadow;
  background: $color-bg-page;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
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

