<template>
  <div class="construction-wrapper">
    <div class="construction-text p-5">
      <div class="pb-3">
        The page is
      </div>
      UNDER CONSTRUCTION
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
@import "~bulma/sass/utilities/mixins.sass";
@import "assets/scss/variables";

.construction-wrapper {
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

.construction-text {
  font-size: 12vw;
  font-family: $accent-font;
  font-weight: 600;
  line-height: 1.1;
  color: #000;

  @include desktop {
    font-size: 8vw;
  }
}

footer.footer {
  display: none;
}
</style>
