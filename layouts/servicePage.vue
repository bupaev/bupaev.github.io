<template>
  <div class="service-page-wrapper">
    <div class="service-page-text p-5">
      <Nuxt />
    </div>
  </div>
</template>

<script>

export default {
  layout: 'empty'
}
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/mixins.sass";
@import "assets/scss/variables";

.service-page-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $accent-color;
  height: 100vh;
  overflow: hidden;

  &::before,
  &::after {
    content: "";
    top: 10px;
    width: 100%;
    height: 100px;
    position: absolute;
    background-image: repeating-linear-gradient(115deg, #000 0, #000 30px, transparent 30px, transparent 60px);
  }

  &::after {
    top: auto;
    bottom: 10px;
  }
}

.service-page-text {
  font-size: max(12vw, 2rem);
  font-family: $accent-font;
  font-weight: 600;
  line-height: 1.1;
  color: #000;

  @include desktop {
    font-size: 8vw;
  }
}
</style>
