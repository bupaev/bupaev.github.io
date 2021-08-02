<template>
  <div class="venn-diagram-professions">
    <div ref="wrapper" :style="`font-size:${basicFontSize}px`" class="wrapper">
      <div class="circle-left">
        <span class="circle-title">Back End</span>
      </div>
      <div class="circle-top">
        <span class="circle-title">Front End</span>
      </div>
      <div class="circle-right">
        <span class="circle-title">UI/UX Design</span>
      </div>
      <div class="center-area">
        <span>Unicorn Area</span>
        <span style="font-size: 2em;">🦄🦄🦄</span>
      </div>
      <div class="me-area">
        <span class="pin">🤓</span>
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
      basicFontSize: 16
    }
  },

  mounted () {
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0].contentRect
      this.basicFontSize = cr.width / 20
    })

    ro.observe(this.$refs.wrapper)
  }

}
</script>

<style lang="scss" scoped>
.venn-diagram-professions {
  $duration: 0.7s;

  display: block;
  position: relative;
  margin: 20%;

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
    background-color: #0ff;
    mix-blend-mode: screen;
  }

  .circle-top {
    background-color: rgba(245, 87, 59, 0.6);
    align-items: flex-start;
    padding-top: 25%;
    animation: venn-up-shift $duration ease-in-out forwards;
  }

  .circle-left {
    background-color: rgba(67, 182, 195, 0.6);
    justify-content: flex-start;
    padding-left: 12%;
    padding-top: 60%;
    animation: venn-left-shift $duration ease-in-out forwards;
  }

  .circle-right {
    background-color: rgba(25, 75, 137, 0.6);
    justify-content: flex-end;
    padding-top: 60%;
    padding-right: 10%;
    animation: venn-right-shift $duration ease-in-out forwards;
  }

  .circle-title {
    font-size: 1.2em;
    font-weight: bold;
    color: #fff;

    @media (max-width: 576px) {
      font-size: 1.5em;
    }
  }

  .center-area {
    padding-top: 45px;
    text-align: center;
    font-size: 1em;
    line-height: 1.3;
    color: white;
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
    color: white;

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
    }

    .speech-bubble {
      display: block;
      position: absolute;
      padding: 0.5em 0.8em;
      top: -1.6em;
      left: 1.8em;
      border-radius: 999px;
      text-align: center;
      font-size: 1em;
      line-height: 1;
      background: #fff;
      color: #000;
      transform-origin: left 150%;
      animation: venn-expand-bounce 0.5s ease-in-out #{$duration+$pin-duration} both;
      will-change: auto;

      &::before {
        position: absolute;
        content: "";
        width: 0;
        height: 0;
        left: 0.6em;
        bottom: -0.9em;
        border-left: 1em solid #fff;
        border-right: 0.5em solid transparent;
        border-bottom: 1em solid transparent;
        transform: rotate(10deg);
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
      filter: drop-shadow(2px 2px 2px rgba(black, 0.6));
    }
    50% {
      transform: scale(1.25);
      filter: drop-shadow(6px 6px 6px rgba(black, 0.1));
    }
    100% {
      transform: scale(1);
      filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.3));
    }
  }
}
</style>
