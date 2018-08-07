<template>
  <button :class="classes()">
    <slot></slot>
  </button>
</template>

<script>
export default {
  methods: {
    classes() {
      const classes = ['fb-cta'];
      this.primary && classes.push('fb-cta--primary')
      return classes
    }
  },
  props: {
    primary: {
      default: false,
      type: Boolean,
    }
  }
}
</script>

<style lang="scss">
.fb-cta {
  border: 1px solid $color-grey;
  font-family: unquote($cursive-font);
  font-size: 1rem;
  padding: 0;
  margin: $v-spacer $h-spacer;
  box-shadow: $box-shadow;
  a {
    transition: all 0.5s;
    background: $color-bg;
    text-decoration: none;
    padding: $h-spacer $v-spacer;
    display: inline-block;
    color: $color-grey;
    &:hover {
      background: darken($color-bg, 7);
      box-shadow: -1px -1px 10px darken($color-bg, 10) inset;
    }
  }
  &--primary {
    border: 1px solid $color-primary;
    a {
      background: $color-primary;
      color: white;
      &:hover {
        background: darken($color-primary, 7);
        box-shadow: -1px -1px 10px darken($color-primary, 10) inset;
      }
    }
  }
}
</style>
