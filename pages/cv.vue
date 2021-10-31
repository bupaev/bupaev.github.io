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
      class="section anchor-for-navigation with-background"
    >
      <Skills />
    </section>
    <section
      id="experience"
      class="section anchor-for-navigation with-background"
    >
      <Experience />
    </section>
    <section
      id="education"
      class="section anchor-for-navigation with-background"
    >
      <Education />
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
@import "assets/scss/variables.scss";

.section {
  position: relative;
}

#education {
  padding-bottom: 100px;
}

.with-background {
  position: relative;

  & > .container {
    z-index: 1;
  }

  &::after {
    content: "";
    position: absolute;
    display: block;
    top: 0;
    right: 0;
    width: 100%;
    height: calc(100% - 15px);
    max-height: 100%;
    background-size: 50%;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: 95% 90%;
    opacity: 0.02;

    @media (prefers-color-scheme: dark) {
      filter: invert(1);
    }

    @include from($big-screen) {
      background-size: 750px;
    }

    @include tablet-only {
      background-size: 65%;
    }

    @include mobile {
      background-size: 500px;
      background-position: right -150px bottom 15%;
    }

    @include until($small-mobile) {
      background-position: right -230px bottom 15%;
    }
  }

  &#skills::after {
    background-image: url("assets/icons/pen-and-wrench-detailed.svg");
  }

  &#experience::after {
    background-image: url("assets/icons/mountain-with-flag-detailed.svg");
  }

  &#education::after {
    background-image: url("assets/icons/academic-cap-detailed.svg");
    height: 100%;

    @include from($big-screen) {
      background-size: 720px;
      background-position-x: 92%;
    }
  }
}
</style>
