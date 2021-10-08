<template>
  <div>
    <VerticalMenu />
    <section
      id="hero-area"
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
    <section id="experience" class="section anchor-for-navigation with-background-picture">
      <Experience />
    </section>
    <section
      id="education"
      class="section anchor-for-navigation with-background-picture"
    >
      <div class="container">
        <h2 class="title is-2">
          Education
        </h2>
        <div class="content">
          <p dir="ltr">
            <strong>Doctor of Philosophy (postgraduate student), Computer science (unfinished)</strong>
          </p>
          <p dir="ltr">
            Omsk State Technical University, 2013 - 2015.
          </p>
          <p dir="ltr">
            <strong>Master of Science, Computer science</strong>
          </p>
          <p dir="ltr">
            Omsk State Technical University, July 2011 - GPA 4.9/5.0
          </p>
          <p dir="ltr">
            <strong>Bachelor of Science, Computer science</strong>
          </p>
          <p dir="ltr">
            Omsk State Technical University, July 2009 - GPA 4.6/5.0
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import VerticalMenu from '@/components/VerticalMenu'
import HeroArea from '@/components/HeroArea'
import Overview from '@/components/Overview'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'

export default {
  components: { VerticalMenu, HeroArea, Overview, Skills, Experience },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.title {
  // font-family: "Futura", serif;
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
