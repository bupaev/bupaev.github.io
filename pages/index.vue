<template>
  <div>
    <VerticalMenu />
    <v-row justify="center" align="center">
      <v-col cols="12" md="8">
        <section id="hero-area" class="page-section">
          <h1>Hero area</h1>
        </section>
        <section id="synopsis" class="page-section">
          <h1>Synopsis</h1>
          <VennDiagramProfessions />
        </section>
        <section id="skills" class="page-section">
          <h1>Skills summary</h1>
        </section>
        <section id="experience" class="page-section">
          <h1>Additional Skills</h1>
        </section>
        <section id="contacts" class="page-section">
          <h1>Chronology</h1>
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
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  .page-section {
    height: 800px;
    border: 1px dodgerblue dotted;
  }
</style>
