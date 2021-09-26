<template>
  <div class="hero-area hero">
    <div class="container">
      <div class="hero-body pa-0">
        <div class="columns is-mobile">
          <div class="column is-two-thirds-mobile" style="z-index: 1;">
            <h1 class="title pt-6">
              <div class="text-shape-limiter" />
              <span class="is-size-1">Hi! I’m Pavel Buramensky</span>
              <p class="is-size-2 pt-4">
                I’m front-end developer who loves good UX-design and create things that make the world better
              </p>
            </h1>
            <p class="subtitle is-size-4 pt-5">
              <a class="mr-5" href="mailto:me@paulbu.com">
                <span class="icon-text">
                  <span class="icon pr-1">
                    <img src="../assets/icons/mail.svg">
                  </span>
                  Email
                </span>
              </a>
              <a class="mr-5" href="https://t.me/bupaev">
                <span class="icon-text">
                  <span class="icon pr-1">
                    <img src="../assets/icons/telegram.svg">
                  </span>
                  Telegram
                </span></a>
              <a href="https://www.linkedin.com/in/pavel-buramensky/">
                <span class="icon-text">
                  <span class="icon pr-1">
                    <img src="../assets/icons/linkedin.svg">
                  </span>
                  LinkedIn
                </span>
              </a>
            </p>
            <p class="subtitle is-size-4">
              or just <a href="https://paulbu.com/pavel-buramensky-cv">
                <span class="icon-text">
                  <span class="icon pr-1">
                    <img src="../assets/icons/download.svg">
                  </span>
                  Download my CV
                </span>
            </a>
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
  background-image: repeating-linear-gradient(105deg, rgba(0, 0, 255, 0.03) 0, rgba(0, 0, 255, 0.03) 1px, transparent 3px, transparent 12px);

  a {
    position: relative;
    color: #363636;

    /* transition: background 250ms ease;
    background-image: linear-gradient(105deg, transparent 0, transparent 10px, gold 10px, gold 93%, transparent 93%, transparent 100%);
    background-repeat: no-repeat;
    background-size: 100%;
    background-position-y: 1.2em; */

    &::after {
      content: "";
      position: absolute;
      left: -0.2em;
      bottom: 0;
      width: calc(100% + 0.4em);
      height: 2px;
      background: gold;
      z-index: -1;
      transition: height 250ms ease;
      transform: scaleY(1) skew(-15deg);
    }

    &:hover {
      &::after {
        height: 100%;
        // transform: scale(1);
        // background-size: 100% 100%;
      }
    }
    &:active {
      &::after {
        transform: scale(1.1) skew(-15deg);
      }
    }
  }

  .title,
  .subtitle {
    font-family: "Futura", serif;
    font-style: italic;
    font-weight: 500;
  }

  .text-shape-limiter {
    float: right;
    shape-outside: polygon(100% 0%, 100% 100%, 0 100%);
    width: 120px;
    height: 400px;
  }

  /* background-image:
    repeating-linear-gradient(90deg, transparent 0, transparent 3px, white 3px, white 12px),
    repeating-linear-gradient(180deg, rgba(0,0,0,0.1) 0, rgba(0,0,0,0.1) 3px, transparent 3px, transparent 12px);
*/
  .icon {
    // filter: drop-shadow(1px 1px 0 rgba(130, 183, 255, 0.9));
  }

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
