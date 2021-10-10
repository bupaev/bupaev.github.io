<template>
  <span class="slash">|</span>
</template>

<script>
export default {
  name: 'Slash'
}
</script>

<style scoped lang="scss">
@import "~bulma/sass/base/_all.sass";

.slash {
  padding-left: 0.35em;
  padding-right: 0.5em;
  font-size: 1.3em;
  font-style: italic;
  line-height: 0.8em;
  vertical-align: -0.1em;
  color: rgba($text, 0.3);
}
</style>
