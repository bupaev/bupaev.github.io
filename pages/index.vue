<template>
  <div>
    <VerticalMenu />
    <v-row align="center" justify="center">
      <v-col cols="12" md="8" class="pt-0">
        <section
          id="hero-area"
          class="page-section"
          style="height: 600px;"
        >
          <h1>Hero area</h1>
        </section>
        <section
          id="synopsis"
          class="page-section"
          style="height: 2450px;"
        >
          <h1>Synopsis</h1>
          <VennDiagramProfessions />
        </section>
        <section
          id="skills"
          class="page-section"
          style="height: 1100px;"
        >
          <h1>Skills summary</h1>
        </section>
        <section id="experience" class="page-section">
          <h1>Experience</h1>
        </section>
        <section
          id="education"
          class="page-section"
          style="height: 350px;"
        >
          <h1>Education</h1>
        </section>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import VennDiagramProfessions from '@/components/VennDiagramProfessions'
import VerticalMenu from '@/components/VerticalMenu'

export default {
  components: { VerticalMenu, VennDiagramProfessions },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.page-section {
  height: 800px;
  border: 1px dodgerblue dotted;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.03;
    background-size: 70%;
  }

  &#skills::after {
    background: no-repeat url("~/assets/icons/tools-complex.svg");
  }

  &#education::after {
    background: no-repeat url("~/assets/icons/academic-cap-complex.svg");
  }

  &#experience::after {
    background: no-repeat url("~/assets/icons/moiuntain-icon-complex-4x-bw-ed.svg");
  }
}
</style>
