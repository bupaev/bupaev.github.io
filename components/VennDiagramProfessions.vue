<template>
  <div class="venn-diagram-professions">
    <div class="wrapper">
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
        <div>Unicorn Area</div>
        <div style="font-size: 28px;">🦄🦄🦄</div>
      </div>
      <div class="me-area">
        <div class="me-pin">🤓</div>
        <div class="bubble bubble-bottom-left">Hi! It's me!</div>
<!--        <v-icon class="arrow" color="white">mdi-arrow-bottom-left</v-icon>
        <div class="text">That's me</div>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VennDiagramProfessions'
}
</script>

<style scoped lang="scss">
.venn-diagram-professions {
  $h: 300px;
  $w: $h;
  $d: 0.7s;

  padding-top: calc(#{$h} * 0.25);

  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: $h;
    width: $w;
    animation: rotation $d ease-in-out forwards;
  }

  .circle-left,
  .circle-top,
  .circle-right {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: absolute;
    height: $h;
    width: $w;
    background-color: #0ff;
    border-radius: 50%;
    mix-blend-mode: screen;
  }

  .circle-top {
    background-color: rgba(245, 87, 59, 0.6);
    animation: c2 $d ease-in-out forwards;
    align-items: flex-start;
    padding-top: 30%;
  }

  .circle-left {
    background-color: rgba(67, 182, 195, 0.6);
    animation: c1 $d ease-in-out forwards;
    justify-content: flex-start;
    padding-left: 12%;
    padding-top: 60%;
  }

  .circle-right {
    background-color: rgba(25, 75, 137, 0.6);
    animation: c3 $d ease-in-out forwards;
    justify-content: flex-end;
    padding-top: 60%;
    padding-right: 10%;
  }

  .circle-title {
    font-size: 18px;
    font-weight: bold;
    color: #fff;
  }

  .center-area {
    padding-top: 45px;
    font-size: 16px;
    text-align: center;
    line-height: 1.3;
    color: white;
    z-index: 2;
  }

  .me-area {
    position: absolute;
    display: block;
    width: 200px;
    height: 50px;
    top: 20%;
    left: 60%;
    color: white;

    .me-pin {
      position: absolute;
      font-size: 32px;
      // filter: drop-shadow(5px 5px 5px rgba(black, 0.6));
      animation: expand-bounce 0.5s ease-in-out $d both;
    }

    .arrow {
      position: absolute;
      left: 14%;
      top: -40%;
      font-size: 32px;
      animation: appearing 1s ease-in-out $d both;
    }

    .text {
      position: absolute;
      left: 28%;
      top: -40px;
      font-size: 24px;
      font-weight: 600;
      animation: expand-bounce 1s ease-in-out 2.5s both;
    }
  }

  .bubble {
    position: absolute;
    left: 14%;
    top: -92%;
    font-family: sans-serif;
    font-size: 18px;
    line-height: 24px;
    width: 120px;
    background: #fff;
    border-radius: 40px;
    padding: 10px;
    text-align: center;
    color: #000;
    transform-origin: left 150%;
    animation: expand-bounce 0.5s ease-in-out #{$d+0.3} both;
    //filter: drop-shadow(5px 5px 5px rgba(black, 0.3));
  }

  .bubble-bottom-left::before {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    border-left: 24px solid #fff;
    border-right: 12px solid transparent;
    border-top: 12px solid #fff;
    border-bottom: 20px solid transparent;
    left: 12px;
    bottom: -22px;
    transform: rotate(10deg);
  }

  @keyframes c1 {
    from {
      transform: translate(0, 0);
    }
    to {
      transform: translate(-25%, 25%);
    }
  }

  @keyframes c2 {
    from {
      transform: translate(0, 0);
    }
    to {
      transform: translate(0, -25%);
    }
  }

  @keyframes c3 {
    from {
      transform: translate(0, 0);
    }
    to {
      transform: translate(25%, 25%);
    }
  }

  @keyframes rotation {
    from {
      transform: rotate(220deg);
      opacity: 0;
    }
    to {
      transform: rotate(360deg);
      opacity: 1;
    }
  }

  @keyframes appearing {
    from {
      filter: drop-shadow(15px 15px 15px rgba(black, 0.1));
      transform: translate(-25%, -25%) scale(1.5);
      opacity: 0;
    }
    to {
      filter: drop-shadow(5px 5px 5px rgba(black, 0.6));
      transform: translate(0, 0) scale(1);
      opacity: 1;
    }
  }

  @keyframes expand-bounce {
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
