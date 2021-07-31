<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <VennDiagramProfessions class="mt-16"/>
    </v-col>
  </v-row>
</template>

<script>
import VennDiagramProfessions from '@/components/VennDiagramProfessions'

export default {
  components: { VennDiagramProfessions },
  data () {
    return {}
  }
}
</script>
