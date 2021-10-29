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
            I've been doing front-end development for over a decade, mostly for complex web applications, like
            <a href="https://www.bandlab.com/creation-features" target="_blank">multitrack audio workstation</a> or
            <a href="https://www.holmusk.com/solutions" target="_blank">electronic health record system</a>. Besides, I really enjoy creating
            stylish web-sites, fancy CSS/SVG animations and data visualization. No matter what I do, my ultimate goal is to deliver a first-class user experience.
          </p>
          <p>
            I achieve this goal through expertise in the following areas:
          </p>
          <div class="section-with-delimiter">
            <p>
              <span class="bullet is-hidden-widescreen" /><strong>Front-end engineering</strong> as my main specialization: building scalable,
              maintainable front-end architectures, writing clean, readable code and making robust interface layouts (reasonably pixel-perfect)
              using modern JavaScript frameworks, advanced web APIs, and everything else that you can find in trendy FE tech stack.
            </p>
            <p class="mb-4">
              <span class="bullet is-hidden-widescreen" /><strong>Visual design and user experience</strong> as an important addition.
              My longstanding interest in photography and behavioral psychology gave me a good fundamental basis; ten years of creating
              visual interfaces in close cooperation with professional UI/UX designers gave me a practical knowledge.
            </p>
          </div>
          <p>
            This combination of skills and knowledge, that isn't only technical but also creative, helps me a lot in my work: it gives me the ability to
            implement complex functionality from an idea to a real product, find an optimal balance between aesthetics, efforts and performance,
            effectively communicate with design team and even carry out tasks of UX design if needed.
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
      width: calc(40% - 4em);
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
    height: 0.5em;
    padding-right: 0.8em;

    &::after {
      content: "";

      @include rhombus($text);
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
