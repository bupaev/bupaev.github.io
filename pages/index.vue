<template>
  <div>
    <VerticalMenu :style="menuStyle" />
    <section
      id="hero-area"
      ref="heroArea"
      class="anchor-for-navigation"
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
      class="section anchor-for-navigation with-background-picture"
    >
      <Skills />
    </section>
    <section
      id="experience"
      class="section anchor-for-navigation with-background-picture"
    >
      <Experience />
    </section>
    <section
      id="education"
      class="section anchor-for-navigation with-background-picture"
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

@include mobile {
  // Hide menu under portrait cause when user scrolls up
  // JS doesn't recalculate position fast enough and draw menu over Hero area
  #hero-area {
    position: relative;
    background-color: #fff;
    z-index: 5;
  }
}

.with-background-picture {
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.05;
    background-size: 70%;
    pointer-events: none;
    z-index: -1;
  }

  &#skills::after {
    // background: no-repeat url("~/assets/icons/pen-and-wrench-detailed.svg");
  }

  &#education::after {
    // background: no-repeat url("~/assets/icons/academic-cap-detailed.svg");
  }

  &#experience::after {
    // background: no-repeat url("~/assets/icons/mountain-with-flag-detailed.svg");
  }
}
</style>
