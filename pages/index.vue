<template>
  <div class="construction-wrapper">
    <div class="construction-text p-5">
      UNDER CONSTRUCTION
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
@import "assets/scss/variables";

.construction-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $accent-color;
  height: 100vh;

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
  color: #000;
}

footer.footer {
  display: none;
}
</style>
