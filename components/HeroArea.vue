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
  background-image: radial-gradient(rgba(0, 0, 0, 0.1) 2px, $info 2px);
  background-size: 20px 20px;

  .parallelogram-image-container {
    $container-height: 500px;

    position: relative;
    height: $container-height;
    background-color: white;
    margin: 0 -50px 0 -50px;
    overflow: hidden;
    transform: skew(-15deg);
    filter: drop-shadow(2px 2px 10px rgba(255, 255, 255, 0.2));

    img {
      object-fit: cover;
      height: 100%;
      transform: skew(15deg) scale(1.2);
    }
  }
}

</style>
