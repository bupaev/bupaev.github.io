<template>
  <div class="overview container">
    <h2 class="title is-2">
      Overview
    </h2>
    <div class="columns">
      <div class="column">
        <div class="content">
          <figure class="diagram-container">
            <VennDiagramProfessions />
          </figure>
          <p>
            I've been doing front-end development for over a decade, mostly for complex web applications, like <a>multitrack audio workstation</a> or <a>electronic
            health record system</a>. During this time, I have accumulated significant professional experience and knowledge:
          </p>
          <p style="width: 30%; float: left;">
            <span class="text-shape-limiter" style="float: right;"></span>
            <strong>My key specialisation is front-end engineering</strong>: building scalable, maintainable front-end architectures, writing
            clean, readable code and make robust interface layouts (reasonably pixel-perferct) using modern JavaScript frameworks, advanced web APIs, and everything else that you
            can find in trendy FE tech stack.
          </p>
          <p style="width: 30%; float: left;">
            <span class="text-shape-limiter"></span>
            <strong>Another major area of my interest is a visual design and user experience.</strong> Since the beginning of my career, I have been pretty fascinated by creating
            clean, delightful, and intuitive interfaces. I believe that my innate grasp of visual language, honed by many years of practice, played a big role in this.
          </p>
          <p class="is-clearfix" style="float: left;">
            This combination of programming skills with an understanding of visual design helps me effectively cooperate with UX/UI designers and business analysts in seeking the
            perfect balance between efficiency, aesthetics and efforts. In some cases, I even developed good UX designs myself.
            Practically, it means that I understand SOLID software design principles as well as Gestalt visual design principles.
            My experience allows me to implement a complex feature from wireframe to a full-featured client application.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VennDiagramProfessions from '@/components/VennDiagramProfessions'

export default {
  name: 'Overview',
  components: { VennDiagramProfessions }
}
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/mixins.sass";

.diagram-container {
  @include desktop {
    width: 33%;
    float: left;
  }

  @include tablet-only {
    float: left;
    width: 50%;
  }
}

.text-shape-limiter {
  background-color: red;
  float: left;
  width: 60px;
  height: 200px;
  shape-outside: polygon(90% 0%, 100% 0%, 10% 100%, 0 100%);
  clip-path: polygon(90% 0%, 100% 0%, 10% 100%, 0 100%);
}
</style>
