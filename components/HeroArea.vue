<template>
  <div class="hero-area hero is-info is-medium">
    <div class="container">
      <div class="hero-body pa-0">
        <div class="columns is-mobile">
          <div class="column is-two-thirds-mobile" style="z-index: 1;">
            <h1 class="title">
              Hi! I’m Pavel Buramensky. <br> I’m front-end developer who loves good UX-design and create things that make the world better
            </h1>
            <p class="subtitle">
              Feel free to reach me by <a href="mailto:me@paulbu.com">email</a>
              or <a href="https://t.me/bupaev">Telegram</a>
              or <a href="https://www.linkedin.com/in/pavel-buramensky/">LinkedIn</a>
            </p>
          </div>
          <div class="column">
            <div class="parallelogram-image-container">
              <img alt="" src="../assets/heroarea-portrait-2.jpeg">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeroArea'
}
</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all.sass";

.hero-area {
  opacity: 1;

  .parallelogram-image-container {
    $container-height: 500px;

    position: relative;
    height: $container-height;
    background-color: white;
    margin: 0 -100px 0 -100px;
    overflow: hidden;

    img {
      object-fit: cover;
      height: 100%;
    }

    &::after {
      content: "";
      position: absolute;
      right: 0;
      width: 0;
      height: 0;
      border-right: 0;
      border-left: $container-height/3 solid transparent;
      border-bottom: $container-height solid $info;
    }

    &::before {
      content: "";
      position: absolute;
      left: 0;
      width: 0;
      height: 0;
      border-left: 0;
      border-right: $container-height/3 solid transparent;
      border-top: $container-height solid $info;
    }
  }
}

</style>
