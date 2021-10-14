<template>
  <div class="hero-area hero">
    <div class="container">
      <div class="hero-body">
        <div class="columns">
          <div class="column has-text-right-tablet" style="z-index: 1;">
            <h1 class="title pt-6">
              <div class="text-shape-limiter is-hidden-mobile" />
              <span class="is-size-1 has-text-right">Hi! I’m Pavel Buramensky</span>
              <p class="is-size-2 pt-4">
                I’m a front-end developer who loves good UX and create things which make the world a better place
              </p>
            </h1>
            <p class="subtitle is-size-4 pt-5">
              <a class="mr-5" href="mailto:me@paulbu.com">
                <span class="icon-text">
                  <span class="icon">
                    <img src="../assets/icons/mail.svg">
                  </span>
                  <span>Email</span>
                </span>
              </a>
              <a class="mr-5" href="https://t.me/bupaev">
                <span class="icon-text">
                  <span class="icon">
                    <img src="../assets/icons/telegram.svg">
                  </span>
                  <span>Telegram</span>
                </span>
              </a>
              <a href="https://www.linkedin.com/in/pavel-buramensky/">
                <span class="icon-text">
                  <span class="icon">
                    <img src="../assets/icons/linkedin.svg">
                  </span>
                  <span>LinkedIn</span>
                </span>
              </a>
            </p>
            <p class="subtitle is-size-4">
              <span class="vertical-align-hack mr-2">also you can</span>
              <a href="https://paulbu.com/pavel-buramensky-cv">
                <span class="icon-text">
                  <span class="icon">
                    <img src="../assets/icons/download.svg">
                  </span>
                  <span>Download my CV</span>
                </span>
              </a>
            </p>
          </div>
          <div class="column is-hidden-mobile">
            <div class="parallelogram-image-container">
              <img alt="" src="../assets/heroarea-portrait-3.jpeg">
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
@import "assets/scss/mixins.scss";

.hero-area {
  opacity: 1;
  background-image: repeating-linear-gradient(105deg, rgba(0, 0, 255, 0.03) 0, rgba(0, 0, 255, 0.03) 1px, transparent 3px, transparent 12px);

  @include touch {
    padding-top: 0;
    padding-bottom: 0;
  }

  .hero-body {
    @include tablet {
      padding-right: 0;
      padding-left: 10px;
    }
  }

  a {
    position: relative;
    color: inherit;

    @include text-hover-effect();
  }

  .title {
    font-weight: 600;
    font-style: italic;

    @include touch {
      margin-right: -50px;
    }

    @include mobile {
      margin-right: 0;
    }
  }

  .subtitle {
    font-weight: 600;
    font-style: italic;
  }

  .vertical-align-hack {
    display: inline-block;
    margin-top: -0.1em;
    vertical-align: text-top;
  }

  .text-shape-limiter {
    float: right;
    width: 120px;
    height: 400px;
    shape-outside: polygon(100% 0%, 100% 100%, 0 100%);
  }

  .parallelogram-image-container {
    $container-height: 500px;

    position: relative;
    overflow: hidden;
    height: $container-height;
    margin-left: -50px;
    transform: skew(-15deg);
    filter: drop-shadow(2px 2px 10px rgba(255, 255, 255, 0.2));

    @include touch {
      margin-right: -80px;
      margin-left: auto;
    }

    img {
      height: 100%;
      transform: skew(15deg) scale(1.22) translateY(-32px);
      object-fit: cover;

      @include desktop-only {
        transform: skew(15deg) scale(1.3) translateY(-25px);
      }

      @include touch {
        transform: skew(15deg) scale(1.3) translate(-12px, -30px);
      }
    }
  }
}

</style>
