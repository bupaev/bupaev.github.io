<template>
  <div class="go-to-top" @click="goToTop">
    <div class="arrow" />
    <div class="arrow" />
    <div class="arrow" />
  </div>
</template>
<script>
export default {
  name: 'GoToTop',

  methods: {
    goToTop () {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "~bulma/sass/utilities/mixins.sass";

.go-to-top {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 100%;
  cursor: pointer;
  user-select: none;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    width: 27px;
    bottom: -100%;
    background-color: var(--accent-color);
    clip-path: polygon(50% 0, 100% 15%, 100% 100%, 50% 85%, 0 100%, 0 15%);
    height: 70px;
    transition: bottom 250ms;
  }

  &:hover::before {
    bottom: 20%;
  }

  &:active::before {
    bottom: 200%;
  }
}

.arrow {
  @include arrow();

  position: relative;
  top: auto;
  margin-top: 3px;
  border-color: var(--text-color);
  border-width: 2px !important;
  transform: rotate(135deg);
}
</style>
