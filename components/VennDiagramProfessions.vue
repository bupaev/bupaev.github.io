<template>
  <div :style="fontSizeCss" class="venn-diagram-professions">
    <div ref="wrapper" class="wrapper">
      <div class="circle-left">
        <span class="circle-title">Back End</span>
      </div>
      <div class="circle-top">
        <span class="circle-title" style="font-size: 1.45em;">Front End</span>
      </div>
      <div class="circle-right">
        <span class="circle-title">UI/UX Design</span>
      </div>
      <div class="center-area">
        <span class="circle-title">Unicorn<br>Area</span>
      </div>
      <div class="me-area">
        <span class="pin"><img src="../assets/icons/head-with-glasses-bg-gold.svg" width="40px"></span>
        <span class="speech-bubble">Hi! It's me!</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VennDiagramProfessions',
  data () {
    return {
      basicFontSize: null
    }
  },

  computed: {
    fontSizeCss () {
      return this.basicFontSize ? `font-size:${this.basicFontSize}px` : ''
    }
  },

  mounted () {
    const resizeObserver = new ResizeObserver((entries) => {
      const cr = entries[0].contentRect
      this.basicFontSize = cr.width / 20
    })

    resizeObserver.observe(this.$refs.wrapper)
  }
}
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/_all.sass";
@import "assets/scss/variables.scss";
@import "assets/scss/mixins.scss";

.venn-diagram-professions {
  $duration: 0.7s;

  display: block;
  position: relative;
  margin: 20%;
  font-size: 13.3px;

  @include until($small-mobile) {
    margin-left: 10%;
    margin-right: 10%;
    margin-bottom: 25%;
    font-size: 10px;
  }

  &::after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  .wrapper {
    position: absolute;
    display: flex;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    justify-content: center;
    align-items: center;
    animation: venn-rotation $duration ease-in-out forwards;
    transition: font-size 1s linear;
  }

  .circle-left,
  .circle-top,
  .circle-right {
    display: flex;
    position: absolute;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: flex-start;
    border-radius: 50%;
    border: 2px var(--graphics-color) solid;
  }

  .circle-top {
    background-image: repeating-linear-gradient(90deg, var(--graphics-color) 0, var(--graphics-color) 1px, transparent 1px, transparent 20px);
    align-items: flex-start;
    padding-top: 25%;
    animation: venn-up-shift $duration ease-in-out forwards;
  }

  .circle-left {
    background-image: repeating-linear-gradient(135deg, var(--graphics-color) 0, var(--graphics-color) 1px, transparent 1px, transparent 20px);
    justify-content: flex-start;
    padding-left: 12%;
    padding-top: 60%;
    animation: venn-left-shift $duration ease-in-out forwards;
  }

  .circle-right {
    background-image: repeating-linear-gradient(45deg, var(--graphics-color) 0, var(--graphics-color) 1px, transparent 1px, transparent 20px);
    justify-content: flex-end;
    padding-top: 60%;
    padding-right: 10%;
    animation: venn-right-shift $duration ease-in-out forwards;
  }

  .circle-title {
    font-size: 1.2em;
    font-weight: 700;
    color: var(--text-color);

    @include text-contour(var(--background-color));

    @media (max-width: 576px) {
      font-size: 1.5em;
    }
  }

  .center-area {
    padding-top: 45px;
    text-align: center;
    font-size: 1em;
    line-height: 1.3;
    color: var(--background-color);
    z-index: 2;

    span {
      display: block;
    }
  }

  .me-area {
    position: absolute;
    width: 9em;
    height: 5em;
    top: 20%;
    left: 55%;
    font-size: 1em;
    color: var(--background-color);

    @media (max-width: 576px) {
      font-size: 1.5em;
    }

    $pin-duration: 1s;

    .pin {
      display: block;
      position: absolute;
      font-size: 2em;
      animation: venn-expand-bounce $pin-duration ease-in-out $duration both;
      will-change: auto;

      img {
        filter: none;
      }
    }

    .speech-bubble {
      display: block;
      position: absolute;
      padding: 0.5em 0.5em;
      top: -1.6em;
      left: 2em;
      border-radius: 9999px;
      text-align: center;
      font-size: 1em;
      line-height: 1;
      background: var(--background-color);
      color: var(--text-color);
      transform-origin: left 150%;
      animation: venn-expand-bounce 0.5s ease-in-out #{$duration+$pin-duration} both;
      will-change: auto;
      border: 0.12em solid var(--graphics-color);
      box-shadow: 0 0 0 3px var(--background-color);

      &::after {
        position: absolute;
        content: url("data:image/svg+xml; utf8, <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 353 267\"> <path fill=\"white\" stroke=\"black\" stroke-width=\"18\" stroke-miterlimit=\"10\" d=\"M119-1 35 222 349-1\"/> <path fill=\"none\" stroke=\"white\" stroke-width=\"20\" stroke-miterlimit=\"10\" d=\"M94 13-4 273 353 20\"/> </svg>");
        left: 0.6em;
        bottom: -1em;
        width: 1.5em;
        height: 1em;
        // filter: invert(0.85);
      }
    }
  }

  @keyframes venn-left-shift {
    from {
      transform: translate(0, 0);
    }
    to {
      transform: translate(-25%, 25%);
    }
  }

  @keyframes venn-up-shift {
    from {
      transform: translate(0, 0);
    }
    to {
      transform: translate(0, -25%);
    }
  }

  @keyframes venn-right-shift {
    from {
      transform: translate(0, 0);
    }
    to {
      transform: translate(25%, 25%);
    }
  }

  @keyframes venn-rotation {
    from {
      transform: rotate(220deg);
      opacity: 0;
    }
    to {
      transform: rotate(360deg);
      opacity: 1;
    }
  }

  @keyframes venn-expand-bounce {
    0% {
      transform: scale(0);
      // filter: drop-shadow(2px 2px 2px rgba(black, 0.6));
    }
    50% {
      transform: scale(1.25);
      // filter: drop-shadow(6px 6px 6px rgba(black, 0.1));
    }
    100% {
      transform: scale(1);
      // filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.3));
    }
  }
}
</style>
