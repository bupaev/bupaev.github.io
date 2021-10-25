<template>
  <div>
    <div v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </div>
    <div v-else>
      {{ otherError }}
    </div>
    <NuxtLink class="back-to-home" to="/cv">
      ◁ back to home page
    </NuxtLink>
  </div>
</template>

<script>
export default {
  layout: 'servicePage',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style lang="scss" scoped>

.back-to-home {
  position: relative;
  font-size: max(3vw, 20px);
  font-weight: 400;
  line-height: 1;
  color: #000;
  text-shadow: 2px 2px 2px rgba(#000, 0.2);

  &:hover {
    text-shadow: none;
  }
}
</style>
