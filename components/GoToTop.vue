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

<style lang="scss" scoped>
@import "assets/scss/mixins";

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

  .arrow {
    @include arrow();

    position: relative;
    top: auto;
    margin-top: 3px;
    border-color: var(--contrasty-color);
    border-width: 2px !important;
    transform: rotate(135deg);
    transition: border-color 400ms;
  }

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

  &:hover {
    .arrow {
      border-color: #000;
    }

    &::before {
      bottom: 20%;
    }
  }

  &:active {
    .arrow {
      border-color: var(--contrasty-color);
      transition: border-color 100ms;
    }

    &::before {
      bottom: 200%;
    }
  }
}
</style>
