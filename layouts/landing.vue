<template>
  <div class="layout-landing">
    <div class="layout-landing__content">
      <nuxt/>
    </div>
    <div class="layout-landing__footer">
      <fp-footer />
    </div>
  </div>
</template>

<script>
export default {
}
</script>
<style lang="scss">

.layout-landing {
  background: $color-bg;

  &__content {
    max-width: 1200px;
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
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

