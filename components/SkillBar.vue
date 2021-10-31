<template>
  <div :class="`skill-bar mb-4 mt-1`">
    <div v-for="i in 3" :key="i" :class="['segment', { 'filled': level >= i }]" />
  </div>
</template>

<script>

export default {
  name: 'SkillBar',
  props: {
    level: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@use "sass:color";

@import "~bulma/sass/base/_all.sass";
@import "assets/scss/variables.scss";

.skill-bar {
  display: flex;
  height: 0.7em;
  width: 10em;

  .segment {
    width: 30%;
    height: 100%;
    margin-right: 3%;
    transform: skew(-15deg);
    border: 1px solid #868686;
    background-color: var(--background-color);

    @for $i from 1 through 3 {
      &.filled:nth-of-type(#{$i}) {
        background-color: color.scale($accent-color, $whiteness: 75% - $i * 25%);
      }
    }
  }
}
</style>
