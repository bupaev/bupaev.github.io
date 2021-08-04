<template>
  <nav class="vertical-menu">
    <scrollactive>
      <a
        v-for="item in items"
        :key="item.id"
        class="item scrollactive-item"
        :href="`#${item.id}`"
      >
        <div class="item-icon">
          <v-icon color="#ff321c">
            {{ item.icon }}
          </v-icon>
        </div>
        <div class="item-text">
          {{ item.title }}
        </div>
      </a>
    </scrollactive>
  </nav>
</template>

<script>
export default {
  name: 'VerticalMenu',
  data () {
    return {
      items: [
        { title: 'Hello!', id: 'hero-area', icon: 'mdi-human-greeting' },
        { title: 'Synopsis', id: 'synopsis', icon: 'mdi-account-box' },
        { title: 'Skills', id: 'skills', icon: 'mdi-hammer-wrench' },
        { title: 'Experience', id: 'experience', icon: 'mdi-history' },
        { title: 'Contacts', id: 'contacts', icon: 'mdi-card-account-mail-outline' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.vertical-menu {
  position: fixed;
  top: 10vh;
  left: 10px;

  .item {
    display: flex;
    margin-bottom: 1em;
    cursor: pointer;
    color: #ff321c;
    text-decoration: none;

    &.is-active {
      background: #8dc0ff;
    }

    .item-icon {
      margin-right: 0.7em;
    }
  }
}
</style>
