<template>
  <div>
    <div
      :class="['dark-mode-toggle', 'is-hidden-touch', { 'dark-mode-enabled': mode === 'dark' }]"
      @click="toggleMode"
    >
      <div class="slider">
        <span class="mode-label dark">Dark</span>
        <div class="handler">
          <img class="sun-icon" src="../assets/icons/sun.svg">
          <img class="moon-icon" src="../assets/icons/moon.svg">
        </div>
        <span class="mode-label light">Light</span>
      </div>
    </div>
    <label class="theme-switch is-hidden" for="checkbox">
      <input id="checkbox" v-model="checked" type="checkbox">
      <div class="slider round" />
    </label>
  </div>
</template>

<script>
export default {
  name: 'DarkModeToggle',

  data () {
    return {
      mode: 'light',
      checked: true
    }
  },

  watch: {
    checked (value) {
      console.log('DEBUG: value:', value)
      if (value) {
        document.documentElement.setAttribute('data-theme', 'dark')
      } else {
        document.documentElement.setAttribute('data-theme', 'light')
      }
    }
  },

  mounted () {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      const darkModeOn = e.matches
      this.mode = darkModeOn
    })
  },

  methods: {
    toggleMode () {
      if (this.mode === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light')
        this.mode = 'light'
      } else {
        document.documentElement.setAttribute('data-theme', 'dark')
        this.mode = 'dark'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/initial-variables";

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
  transition: background-color 400ms;

  .slider {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    width: 140%;
    left: 8px;
    transform: translateX(-40%);
    transition: transform 400ms;
  }

  .handler {
    width: 30px;
    height: 30px;
  }

  .sun-icon {
    width: 30px;
  }

  .moon-icon {
    width: 28px;
    display: none;
  }

  .mode-label {
    text-transform: uppercase;
    position: relative;
    font-size: 1em;
    font-weight: 700;
    padding-top: 1px;
    color: var(--text-color);

    &.light {
      color: $black-ter;
    }

    &.dark {
      color: $white-ter;
    }
  }

  &.dark-mode-enabled {
    background-color: #193b5e;

    .slider {
      transform: translateX(0);
    }

    .moon-icon {
      display: block;
    }

    .sun-icon {
      display: none;
    }
  }
}

/* .theme-switch {
  display: inline-block;
  height: 34px;
  position: relative;
  width: 60px;

  .theme-switch input {
    display: none;
  }

  .slider {
    background-color: var(--accent-color);
    bottom: 0;
    cursor: pointer;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: 0.4s;
  }

  .slider::before {
    background-color: #fff;
    bottom: 4px;
    content: "";
    height: 26px;
    left: 4px;
    position: absolute;
    transition: 0.4s;
    width: 26px;
  }

  input:checked + .slider {
    background-color: #66bb6a;
  }

  input:checked + .slider::before {
    transform: translateX(26px);
  }

  .slider.round {
    border-radius: 34px;
  }

  .slider.round::before {
    border-radius: 50%;
  }
} */
</style>
