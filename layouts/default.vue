<template>
  <div>
    <section class="main-content">
      <Nuxt />
    </section>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer'

export default {
  components: { Footer }
}
</script>
