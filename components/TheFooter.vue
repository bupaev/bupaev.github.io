<template>
  <footer class="footer is-size-5">
    <GoToTop class="go-to-top-left" />
    <GoToTop class="go-to-top-right" />
    <div class="text">
      <span>
        Made with <a href="https://github.com/bupaev/bupaev.github.io" target="_blank">love and NuxtJS</a>
      </span>
    </div>
  </footer>
</template>

<script>
import GoToTop from '@/components/GoToTop'

export default {
  name: 'Footer',

  components: { GoToTop }
}
</script>

<style lang="scss" scoped>
@import "assets/scss/mixins.scss";

.footer {
  position: relative;
  height: 110px;
  display: flex;
  flex-flow: row nowrap;
  padding: 0;
  font-family: $accent-font;
  background-image: repeating-linear-gradient(105deg, var(--contrasty-transparent-color) 0, var(--contrasty-transparent-color) 10px, transparent 10px, transparent 13px);

  a {
    color: var(--text-color);

    @include multiline-text-hover-effect;
  }

  .text {
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
  }

  // @TODO: add prop to GoToTop component for proper right/left aligning
  .go-to-top-left {
    position: absolute;
    left: 0;
    padding-right: 30px;

    &::before {
      left: 12px;
    }
  }

  .go-to-top-right {
    position: absolute;
    right: 0;
    padding-left: 30px;

    &::before {
      right: 12px;
    }
  }
}
</style>
