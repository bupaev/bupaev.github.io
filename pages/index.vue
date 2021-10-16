<template>
  <div>
    <VerticalMenu :style="menuStyle" />
    <section
      id="hero-area"
      ref="heroArea"
      class="anchor-for-navigation"
      style="position: sticky !important;"
    >
      <HeroArea />
    </section>
    <section
      id="overview"
      class="section anchor-for-navigation is-primary"
    >
      <Overview />
    </section>
    <section
      id="skills"
      class="section anchor-for-navigation"
    >
      <Skills />
      <div class="sticky-pic-container" />
    </section>
    <section
      id="experience"
      class="section anchor-for-navigation"
    >
      <Experience />
      <div class="sticky-pic-container" />
    </section>
    <section
      id="education"
      class="section anchor-for-navigation"
    >
      <Education />
      <div class="sticky-pic-container" />
    </section>
  </div>
</template>

<script>
import VerticalMenu from '@/components/VerticalMenu'
import HeroArea from '@/components/HeroArea'
import Overview from '@/components/Overview'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Education from '~/components/Education'

export default {
  components: { VerticalMenu, HeroArea, Overview, Skills, Experience, Education },
  data () {
    return {
      heroAreaHeight: 0,
      menuStyle: ''
    }
  },

  mounted () {
    // On mobile screen we scroll then fix vertical menu.
    // Sadly position sticky isn't suitable for VerticalMenu in this case so make it in old-fashioned way.
    this.heroAreaHeight = this.$refs.heroArea.clientHeight
    if (window.innerWidth <= 768) { this.onScroll() }
    this.onResize()

    window.addEventListener('resize', this.onResize)
  },

  destroyed () {
    window.removeEventListener('scroll', this.onScroll)
    window.removeEventListener('resize', this.onResize)
  },

  methods: {
    // We have to manage Menu position only for mobile screens (less 768px)
    onResize () {
      this.heroAreaHeight = this.$refs.heroArea.clientHeight
      this.onScroll()

      if (window.innerWidth <= 768) {
        window.addEventListener('scroll', this.onScroll)
      } else {
        window.removeEventListener('scroll', this.onScroll)
        this.menuStyle = ''
      }
    },

    onScroll () {
      this.menuStyle = window.scrollY < this.heroAreaHeight
        ? `top: ${this.heroAreaHeight}px; position: absolute`
        : ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/_all.sass";

// Hide menu under portrait cause when user scrolls up
// JS doesn't recalculate position fast enough and draw menu over Hero area
@include mobile {
  #hero-area {
    position: relative;
    background-color: #fff;
    z-index: 2;
  }
}

.section {
  position: relative;
}

.sticky-pic-container {
  position: absolute;
  top: 50px;
  right: 0;
  height: calc(100% - 50px);
  width: 100%;
  z-index: -1;
  // outline: 1px dashed red;

  &::before {
    position: sticky;
    display: block;
    content: "";
    top: 38vh;
    left: 48vw;
    height: 60vh;
    width: 50vw;
    max-height: 100%;
    opacity: 0.02;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: 100% 0;
    // outline: 4px dotted black;

    @include touch {
      left: 35vw;
      width: 65vw;
      background-size: cover;
      background-position: 0 0;
    }
  }

  #skills &::before {
    background-image: url("~/assets/icons/pen-and-wrench-detailed.svg");
  }

  #experience &::before {
    background-image: url("~/assets/icons/mountain-with-flag-detailed.svg");
  }

  #education &::before {
    background-image: url("~/assets/icons/academic-cap-detailed.svg");

    // We can't just use overflow: hidden here cause it breaks position sticky
    @include widescreen {
      background-size: 700px;
    }
  }
}
</style>
