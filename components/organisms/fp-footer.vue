<template>
  <div class="fp-footer">
    <div class="fp-footer__copyright">&copy; 2018 Fibro Phoenix. All rights reserved.</div>
    <div class="fp-footer__links">
      <nuxt-link to="/privacy">Privacy &amp; Cookies</nuxt-link>
    </div>

  </div>
</template>

<style lang="scss">
.fp-footer {
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
  flex: 100%;
  padding: $v-spacer ($h-spacer*4);
  max-width: $container-max-width;
  &__links {
    a {
      color: white;
    }
  }
}

</style>