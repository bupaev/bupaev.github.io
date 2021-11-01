<template>
  <div>
    <div
      :class="{ 'dark-mode-enabled': isDark, 'compact' : isCompact }"
      class="dark-mode-toggle is-hidden-touch"
      @click="setDarkMode(!isDark)"
    >
      <div class="slider">
        <span class="label-dark">Dark</span>
        <div class="handler">
          <img class="icon-light" src="../assets/icons/sun.svg">
          <img class="icon-dark" src="../assets/icons/moon.svg">
        </div>
        <span class="label-light">Light</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DarkModeToggle',

  data () {
    return {
      isDark: false,
      isCompact: false
    }
  },

  mounted () {
    this.setCompactState()
    window.addEventListener('scroll', this.setCompactState)

    this.setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      this.setDarkMode(e.matches)
    })
  },

  destroyed () {
    window.removeEventListener('scroll', this.setCompactState)
  },

  methods: {
    setCompactState () {
      this.isCompact = window.scrollY > 5
    },
    setDarkMode (isDark) {
      this.isDark = isDark
      document.documentElement.setAttribute('data-theme', `${isDark ? 'dark' : 'light'}`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/initial-variables";
@import "assets/scss/variables.scss";

// @TODO: Rework styles to make it more robust
// Now it's extremely fragile. E.g. depends on width of labels
.dark-mode-toggle {
  position: fixed;
  z-index: 3;
  top: 36px;
  left: 6px;
  width: 100px;
  height: 40px;
  border: solid 2px var(--text-color);
  background-color: var(--accent-color);
  border-radius: 9999px;
  cursor: pointer;
  overflow: hidden;
  transition: background-color 400ms, width 400ms;

  .slider {
    position: absolute;
    display: flex;
    height: 100%;
    width: 135px;
    left: 8px;
    align-items: center;
    justify-content: space-between;
    font-weight: 700;
    text-transform: uppercase;
    transform: translateX(-40%);
    transition: transform 400ms;
  }

  .handler {
    position: relative;
    width: 30px;
    height: 30px;

    img {
      width: 100%;
    }
  }

  .label-light {
    padding-top: 1px;
    color: $black-ter;
  }

  .label-dark {
    padding-top: 1px;
    color: $white-ter;
  }

  &.dark-mode-enabled {
    background-color: $second-color;

    .slider {
      transform: translateX(0);
    }

    .icon-dark {
      display: block;
    }

    .icon-light {
      display: none;
    }
  }

  &.compact {
    width: 40px;

    .slider {
      transform: translateX(-56px);
    }
  }
}
</style>
