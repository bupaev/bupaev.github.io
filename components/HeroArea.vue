<template>
  <div class="hero-area hero">
    <div class="container">
      <div class="hero-body">
        <div class="columns">
          <div class="left-column column has-text-right is-three-fifths-touch">
            <div class="parallelogram-image-container is-hidden-tablet">
              <v-lazy-image
                src="../pics/portrait-1-mobile-2x.jpg"
                src-placeholder="../pics/portrait-1-mobile-placeholder.jpg"
              />
            </div>
            <h1 class="title pt-6">
              <div class="text-shape-limiter is-hidden-mobile" />
              <span class="is-size-1 has-text-right">Hi! I’m Pavel Buramensky</span>
              <p class="is-size-2 pt-4">
                I’m a front-end developer who cares about user experience and tries to make the world a better place
              </p>
            </h1>
            <p class="contacts pt-5">
              <span class="mr-5">
                <a href="mailto:mail@paulbu.com">
                  <span class="icon-text">
                    <span class="icon">
                      <MailIcon />
                    </span>
                    <span>Email</span>
                  </span>
                </a>
              </span>
              <span class="mr-5">
                <a href="https://t.me/bupaev">
                  <span class="icon-text">
                    <span class="icon">
                      <TelegramIcon />
                    </span>
                    <span>Telegram</span>
                  </span>
                </a>
              </span>
              <span>
                <a href="https://www.linkedin.com/in/pavel-buramensky/">
                  <span class="icon-text">
                    <span class="icon">
                      <LinkedinIcon />
                    </span>
                    <span>LinkedIn</span>
                  </span>
                </a>
              </span>
              <span class="is-block-tablet">
                <span class="vertical-align-hack mr-2 is-hidden-mobile">also you can</span>
                <a href="/pavel-buramensky-cv.pdf" target="_blank">
                  <span class="icon-text">
                    <span class="icon">
                      <DownloadIcon />
                    </span>
                    <span>Download my CV</span>
                  </span>
                </a>
              </span>
            </p>
          </div>
          <div class="column is-hidden-mobile">
            <div class="parallelogram-image-container">
              <v-lazy-image
                src="../pics/portrait-1-desktop.jpg"
                src-placeholder="../pics/portrait-1-desktop-placeholder.jpg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VLazyImage from 'v-lazy-image/v2/v-lazy-image.es'

import LinkedinIcon from '@/assets/icons/linkedin.svg?inline'
import TelegramIcon from '@/assets/icons/telegram.svg?inline'
import MailIcon from '@/assets/icons/mail.svg?inline'
import DownloadIcon from '@/assets/icons/download.svg?inline'

export default {
  name: 'HeroArea',
  components: { VLazyImage, DownloadIcon, MailIcon, LinkedinIcon, TelegramIcon }
}
</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all.sass";
@import "assets/scss/mixins.scss";
@import "assets/scss/variables.scss";

.hero-area {
  overflow: hidden;
  margin-bottom: 3rem;
  font-family: $accent-font;
  opacity: 1;
  background-image: repeating-linear-gradient(105deg, rgba(#000, 0.03) 0, rgba(#000, 0.03) 1px, transparent 3px, transparent 12px);

  @media (prefers-color-scheme: dark) {
    background-image: repeating-linear-gradient(105deg, rgba(#fff, 0.03) 0, rgba(#fff, 0.03) 1px, transparent 3px, transparent 12px);
  }

  .hero-body {
    @include tablet {
      padding-right: 0;
      padding-left: 10px;
    }

    @include touch {
      min-height: 500px;
      padding-top: 0;
      padding-bottom: 0;
    }

    @include mobile {
      margin-bottom: 0;
      padding-bottom: 45px;
      padding-right: 20px;
    }
  }

  .left-column {
    z-index: 1;

    @include mobile {
      // can't just use ".is-full-mobile" cause ".is-three-fifths-touch" has higher priority
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-height: 478px;

      .parallelogram-image-container {
        position: absolute;
        left: -196px;
        top: 0;
        height: 600px;
        width: 250px;
        margin-right: 0;
        margin-left: 0;
        z-index: 0;

        img {
          position: absolute;
          top: -28px;
          left: 64%;
          transform: skew(15deg) scale(1);
        }
      }
    }
  }

  a {
    position: relative;

    @include text-hover-effect();
  }

  .title {
    position: relative;
    font-weight: 600;
    font-style: italic;
    z-index: 1;

    @include desktop-only {
      margin-right: -50px;
    }

    @include mobile {
      margin-right: -50px;
      padding-left: 8%;
      // padding-top: 0 !important;
    }

    @include tablet-only {
      margin-right: -50px;
      padding-left: 20px;
    }

    @include mobile {
      margin-right: 0;

      @include text-contour(rgba(#fff, 0.5), 0.05em);
    }
  }

  .contacts {
    font-weight: 600;
    font-size: $size-4;
    font-style: italic;

    & > span {
      display: inline-block;
      padding-bottom: 15px;

      a {
        display: inline-block;
        height: 1.3em;
      }
    }

    @include touch {
      font-size: 1.3rem;
    }

    @include mobile {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;

      & > span {
        margin-right: 0 !important;

        a {
          margin-left: 1em;
        }
      }
    }
  }

  .vertical-align-hack {
    display: inline-block;
    vertical-align: top;
    margin-top: -0.25em;
  }

  .text-shape-limiter {
    float: right;
    width: 120px;
    height: 400px;
    shape-outside: polygon(100% 0%, 100% 100%, 0 100%);
    pointer-events: none;

    @include tablet-only {
      width: 135px;
      height: 450px;
    }
  }

  .parallelogram-image-container {
    position: relative;
    overflow: hidden;
    height: 472px;
    margin-left: -50px;
    margin-right: 32px;
    transform: skew(-15deg);
    // filter: drop-shadow(2px 2px 10px rgba(255, 255, 255, 0.2));

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: rgba(#fff, 0.05);
    }

    @include desktop-only {
      margin-right: -200px;
      height: 550px;
      margin-left: auto;
    }

    @include touch {
      height: 500px;
      margin-right: -80px;
      margin-left: auto;
    }

    // has to be placed after touch
    @include tablet-only {
      height: 100%;
    }

    img {
      height: 100%;
      transform: skew(15deg) scale(1.22) translateY(-32px);
      object-fit: cover;

      @include desktop-only {
        transform: skew(15deg) scale(1.3) translateY(-25px);
      }

      @include tablet-only {
        transform: skew(15deg) scale(1.3) translate(-14px, -30px);
      }

      @include mobile {
        transform: skew(15deg) scale(1.3) translate(-24px, -30px);
      }
    }
  }

  .v-lazy-image {
    filter: blur(5px) opacity(50%);
    transition: filter 0.7s;
  }

  .v-lazy-image-loaded {
    filter: blur(0) opacity(100%);
  }
}

</style>
