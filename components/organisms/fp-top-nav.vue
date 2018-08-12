<template>
  <div class="fp-top-nav">
    <div class="fp-top-nav__logo">
      <nuxt-link to="/">
        <fp-logo />
      </nuxt-link>
    </div>
    <div class="fp-top-nav__links">
      <fp-nav-links />
    </div>
  </div>
</template>
<script>
export default {
  mounted () {
    const debounce = require('lodash.debounce')

    window.addEventListener('scroll', debounce(() => {
      const position = document.documentElement.scrollTop
      const topNavElement = document.querySelector('.fp-top-nav')
      const condensed = 'fp-top-nav--condensed'
      if (position > 80) {
        if (!topNavElement.classList.contains(condensed)) {
          topNavElement.classList.add(condensed)
        }
      }
      if (position < 10) {
        if (topNavElement.classList.contains(condensed)) {
          topNavElement.classList.remove(condensed)
        }
      }
    }, 250))

  }
}
</script>
<style lang="scss">
.fp-top-nav {
  $root: &;
  min-height: 80px;
  @include wide {
    min-height: 125px;
  }
  background: $color-bg-page;
  box-shadow: $box-shadow;
  display: grid;
  align-items: center;

  padding-left: $v-spacer;
  padding-right: $v-spacer;
  @include wide {
    padding-left: $v-spacer * 5;
    padding-right: $v-spacer * 5;
  }

  transition: 0.5s all;

  &--condensed {
    min-height: 80px;
    #{$root}__logo {
      svg {
        max-height: 40px;
        @include wide {
          max-height: 60px;
        }
      }
    }
  }

  &__logo {
    grid-column: 1;
    svg {
      transition: 0.5s max-height;
      max-height: 40px;
      @include wide {
        max-height: 80px;
      }
      width: auto;
    }
  }
  &__links {
    display: none;
    @include desktop {
      display: block;
    }
    grid-column: 2;
    justify-self: right;
  }
}
</style>