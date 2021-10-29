<template>
  <div>
    <div class="pb-3">
      The page is
    </div>
    UNDER CONSTRUCTION
  </div>
</template>

<script>
export default {
  layout: 'servicePage',

  middleware ({ redirect }) {
    return redirect('/cv')
  }
}
</script>
