<template>
  <div class="is-clipped">
    <section class="main-content">
      <Nuxt />
    </section>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <span>© {{ new Date().getFullYear() }} by Pavel Buramensky (unexpectedly!) </span>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fixed: false
    }
  }
}
</script>
