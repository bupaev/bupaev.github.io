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
          <img class="icon-light" src="./icons/sun.svg">
          <img class="icon-dark" src="./icons/moon.svg">
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
    const savedSchemeValue = this.getCookie('color-scheme')

    if (savedSchemeValue === undefined) {
      this.setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches)
    } else {
      this.setDarkMode(savedSchemeValue === 'dark')
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (this.getCookie('color-scheme')) {
        return
      }

      this.setDarkMode(e.matches)
    })

    this.setCompactState()
    window.addEventListener('scroll', this.setCompactState)
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
      const theme = isDark ? 'dark' : 'light'
      document.documentElement.setAttribute('data-color-scheme', theme)

      // remember user's choice for next six hours
      document.cookie = `color-scheme=${theme}; max-age=21600`
    },

    getCookie (name) {
      const matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'))
      return matches ? matches[1] : undefined
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/initial-variables";
@import "assets/scss/variables";

// @TODO: Rework styles to make it more robust
// Now it's extremely fragile. E.g. depends on width of labels
.dark-mode-toggle {
  position: fixed;
  z-index: 3;
  top: 36px;
  left: 6px;
  width: 100px;
  height: 40px;
  border: 2px solid var(--accent-color);
  border-radius: 9999px;
  cursor: pointer;
  overflow: hidden;
  transition: background-color 400ms, width 400ms;

  .slider {
    position: absolute;
    display: flex;
    height: 100%;
    width: 135px;
    left: 7px;
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

  .label-light,
  .label-dark {
    padding-top: 1px;
    color: var(--accent-color);
  }

  &.dark-mode-enabled {
    // border: 2px solid $white-ter;
    box-shadow: 0 0 8px -2px rgb(255 255 255 / 50%);
    width: 96px;

    .slider {
      transform: translateX(0);
    }

    .icon-dark {
      display: block;
      filter: none; // disable global invert
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
