<template>
  <div class="layout-default">
    <div class="layout-default__top-nav">
      <fp-top-nav />
    </div>
    <div class="layout-default__content">
      <nuxt/>
    </div>
    <div class="layout-default__footer">
      <fp-footer />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">

.layout-default {
  background: linear-gradient($color-bg, darken($color-bg, 2));

  &__top-nav {
    position: sticky;
    top: 0;
  }

  &__content {
    max-width: $container-max-width;
    margin: $v-spacer auto 0 auto;
    padding: $v-spacer ($h-spacer*4);
    box-shadow: $box-shadow;
    background: $color-bg-page;
    min-height: 100vh;
  }

  &__footer {
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
}
</style>

