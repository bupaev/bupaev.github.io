<template>
  <footer class="footer">
    <div class="go-to-top" @click="goToTop">
      <div class="arrow" />
      <div class="px-6 is-size-5">
        Back to the Top
      </div>
      <div class="arrow" />
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',

  methods: {
    goToTop() {
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
@import "~bulma/sass/base/_all.sass";
@import "assets/scss/variables.scss";

.footer {
  position: relative;
  padding: 0;
  font-family: $accent-font;
  background-image: repeating-linear-gradient(105deg, var(--contrasty-transparent-color) 0, var(--contrasty-transparent-color) 10px, transparent 10px, transparent 13px);

  .go-to-top {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 3rem 1.5rem;
    cursor: pointer;
    user-select: none;
  }

  .arrow {
    @include arrow();

    border-color: var(--text-color);
    position: relative;
    margin-top: 15px;
    border-width: 2px !important;
    transform: rotate(135deg);
  }
}
</style>
