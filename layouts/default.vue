<template>
  <div>
    <section class="main-content">
      <Nuxt />
    </section>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/TheFooter'

export default {
  components: { Footer }
}
</script>
