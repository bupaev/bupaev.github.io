<template>
  <div class="venn-diagram-professions">
    <div class="wrapper">
      <div class="circle-1"></div>
      <div class="circle-2"></div>
      <div class="circle-3"></div>
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
  $d: 1.5s;

  padding-top: calc(#{$h} * 0.25);

  .wrapper {
    height: $h;
    width: $w;
    animation: rotation $d ease-in-out forwards;
  }

  [class^='circle'] {
    background-color: #0ff;
    border-radius: 50%;
    height: $h;
    width: $w;
    mix-blend-mode: screen;
    position: absolute;
  }

  .circle-1 {
    background-color: rgba(67, 182, 195, 0.5);
    animation: c1 $d ease-in-out forwards;
  }

  .circle-2 {
    background-color: rgba(245, 87, 59, 0.5);
    animation: c2 $d ease-in-out forwards;
  }

  .circle-3 {
    background-color: rgba(25, 75, 137, 0.5);
    animation: c3 $d ease-in-out forwards;
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
      transform: rotate(0) scale(0);
    }
    to {
      transform: rotate(720deg) scale(1);
    }
  }
}
</style>
