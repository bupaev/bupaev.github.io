<template>
  <v-row justify="center" align="center">
    <v-col cols="12" md="8">
      <VennDiagramProfessions />
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
