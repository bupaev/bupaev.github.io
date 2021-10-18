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
            I've been doing front-end development for over a decade, mostly for complex web applications, like <a>multitrack audio workstation</a> or
            <a>electronic health record system</a>. During this time, I have accumulated significant professional experience in the following areas:
          </p>
          <div class="section-with-delimiter">
            <p>
              <span class="bullet is-hidden-widescreen" /><strong>Front-end engineering</strong> as my main specialization: building scalable, maintainable front-end architectures, writing
              clean, readable code and make robust interface layouts (reasonably pixel-perfect) using modern JavaScript frameworks, advanced web APIs, and everything else that you
              can find in trendy FE tech stack.
            </p>
            <p class="mb-4">
              <span class="bullet is-hidden-widescreen" /><strong>Visual design and user experience</strong> as an important addition. Since the beginning of my career, I have been pretty fascinated by creating
              clean, delightful, and intuitive interfaces. I believe that my innate grasp of visual language, honed by many years of practice, played a big role in this.
            </p>
          </div>
          <p>
            This combination of programming skills with an understanding of visual design helps me effectively cooperate with UX/UI designers and business analysts in seeking the
            perfect balance between efficiency, aesthetics and efforts. In some cases, I even developed good UX designs myself.
          </p>
          <p>
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
@import "assets/scss/mixins.scss";

.overview {
  // background-image: repeating-linear-gradient(105deg, rgba(0, 0, 255, 0.03) 0, rgba(0, 0, 255, 0.03) 1px, transparent 3px, transparent 12px);

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

  .bullet {
    position: relative;
    display: inline-block;
    width: 0.5em;
    padding-right: 0.8em;

    &::after {
      @include rhomb($text);
    }
  }

  @include widescreen {
    .section-with-delimiter {
      display: inline-block;
      width: 60%;
      float: left;
      margin-bottom: 0.1em;

      p:nth-child(1) {
        position: relative;
        float: left;
        width: 52%;
        padding-right: 6%;
        margin-right: 2%;

        &::after {
          content: "";
          position: absolute;
          float: left;
          top: 0;
          right: 0;
          width: 11%;
          height: 100%;
          opacity: 0.2;
          background-color: $text;
          clip-path: polygon(94% 0%, 100% 0%, 6% 100%, 0 100%);
        }
      }

      p:nth-child(2) {
        width: 46%;
        float: left;
      }
    }
  }
}
</style>
