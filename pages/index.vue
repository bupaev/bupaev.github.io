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
          id="contacts"
          class="page-section"
          style="height: 350px;"
        >
          <h1>Contacts</h1>
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
}
</style>
