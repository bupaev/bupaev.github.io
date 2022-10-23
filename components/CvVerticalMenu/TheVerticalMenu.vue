<template>
  <nav class="vertical-menu">
    <div
      :style="`transform: translateY(${markerOffset}px); height: ${markerHeight}px`"
      class="visible-area-marker"
    />
    <div ref="menu">
      <div
        v-for="(item, index) in items"
        :key="item.id"
        class="item"
        @click="onMenuItemClick(index)"
      >
        <span class="item-icon">
          <img :src="require(`./icons/${item.icon}`)" draggable="false">
        </span>
        <span class="item-text">
          {{ item.title }}
        </span>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'VerticalMenu',
  data () {
    return {
      items: [
        { title: 'Hello!', id: 'hero-area', icon: 'head-with-glasses.svg' },
        { title: 'Overview', id: 'synopsis', icon: 'venn-diagram.svg' },
        { title: 'Skills', id: 'skills', icon: 'pen-and-wrench.svg' },
        { title: 'Experience', id: 'experience', icon: 'mountain-with-flag.svg' },
        { title: 'Education', id: 'education', icon: 'academic-cap.svg' }
      ],
      menuItemHeight: 0,
      contentSectionsHeightArray: [],
      contentSectionsOffsetArray: [],
      scaleCoefficients: [],
      markerOffset: 0,
      markerHeight: 0
    }
  },

  mounted () {
    this.menuItemHeight = this.$refs.menu.getElementsByClassName('item')[0].clientHeight
    this.contentSectionsHeightArray = this.getSectionsProp('clientHeight')
    this.contentSectionsOffsetArray = this.getSectionsProp('offsetTop')

    // menu pixel per content pixel
    this.scaleCoefficients = this.contentSectionsHeightArray.map((SectionsHeight) => {
      return this.menuItemHeight / SectionsHeight
    })

    this.setAreaMarkerPosition()

    window.addEventListener('scroll', this.setAreaMarkerPosition)
    window.addEventListener('resize', this.setAreaMarkerPosition)
  },

  destroyed () {
    window.removeEventListener('scroll', this.setAreaMarkerPosition)
    window.removeEventListener('resize', this.setAreaMarkerPosition)
  },

  methods: {
    onMenuItemClick (targetIndex) {
      window.scrollTo({
        top: this.contentSectionsOffsetArray[targetIndex],
        left: 0,
        behavior: 'smooth'
      })
    },
    getSectionsProp (propName) {
      const sectionsHTMLCollection = document.getElementsByClassName('anchor-for-navigation')
      return [...sectionsHTMLCollection].map(section => section[propName])
    },
    /**
     * Menu items have equal heights but content sections have different heights.
     * We have to map content sections offsets to menu items offsets
     * to mark the current visible page area correctly
     * @param {number} windowScroll
     * @return {number}
     */
    getRescaledOffset (windowScroll) {
      const sectionIndex = this.contentSectionsOffsetArray.findIndex((offset) => {
        return windowScroll < offset
      })

      const selectedMenuItem = sectionIndex === -1
        ? this.contentSectionsOffsetArray.length
        : Math.max(sectionIndex - 1, 0)

      return selectedMenuItem * this.menuItemHeight +
        (windowScroll - this.contentSectionsOffsetArray[selectedMenuItem]) * this.scaleCoefficients[selectedMenuItem]
    },
    setAreaMarkerPosition () {
      const windowTopScrollY = window.scrollY
      const windowBottomScrollY = windowTopScrollY + window.innerHeight

      this.markerOffset = this.getRescaledOffset(windowTopScrollY)

      // when user reaches end of the page make visible area marker equals size of menu item for better look
      // P.S. by some reason windowBottomScrollY can be half pixel more thant clientHeight
      if (windowBottomScrollY >= document.body.clientHeight) {
        this.markerHeight = this.menuItemHeight
        return
      }

      this.markerHeight = this.getRescaledOffset(windowBottomScrollY) - this.markerOffset
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/scss/mixins";

$menu-open-width: 10em;

@mixin menu-transition {
  @for $i from 1 through 5 {
    &:nth-child(#{$i}) {
      transition: width 0.3s #{$i * 0.1}s ease-in-out;
    }
  }
}

.vertical-menu {
  position: fixed;
  top: max(10vh, 110px);
  left: 6px;
  font-family: "Dosis", sans-serif;
  font-size: 20px;
  z-index: 2;
  user-select: none;

  @include tablet-only {
    position: fixed;
  }

  // position and top values also managed by JS in the parent component
  @include touch {
    position: fixed;
    top: 0;
    width: 10%;
    overflow: hidden;
    margin-top: 56px;
    background-image: linear-gradient(90deg, #e6e6e6 0, #e6e6e6 10px, transparent 10px);

    [data-color-scheme="dark"] & {
      background-image: linear-gradient(90deg, #080812 0, #080812 10px, transparent 10px);
    }
  }

  .item {
    display: flex;
    height: 4em;
    width: 2em;
    overflow: hidden;
    font-weight: 400;
    text-decoration: none;
    cursor: pointer;
    will-change: auto;

    @include from(1700px) {
      width: $menu-open-width;

      .item-text::before {
        display: none;
      }
    }

    @include touch {
      position: relative;
      overflow: visible;
      height: 15vh;

      &::before {
        content: "";
        position: absolute;
        height: calc(100% - 8px);
        width: 10px;
        left: 0;
        margin-top: 8px;
        background-image: linear-gradient(90deg, var(--background-color) 0, var(--background-color) 4px, transparent 4px, transparent 6px, var(--background-color) 6px, var(--background-color) 10px);
      }

      &::after {
        content: "";
        position: absolute;
        height: 8px;
        width: 10px;
        left: 0;
        background-image: radial-gradient(circle, transparent 0, transparent 4px, var(--background-color) 4px, var(--background-color) 100%);
        background-repeat: no-repeat;
      }

      &:first-child {
        &::after {
          height: 10px;
          width: 10px;
          top: -2px;
          background-position-y: 1px;
        }
      }

      &:last-child {
        &::before {
          height: calc(100% - 11px);
        }
      }

      .item-icon,
      .item-text {
        display: none;
      }
    }

    @include menu-transition;

    .item-text {
      position: relative;
      color: var(--text-color);
      opacity: 0.5;
      transition: opacity 200ms, color 200ms;

      &::before,
      &::after {
        content: "";
        position: absolute;
        width: 0;
        height: 1.6em;
        left: -0.2em;
        top: 0;
        background: $accent-color;
        transform: scaleY(1) skew(-15deg);
        transition: width 250ms ease;
        z-index: -1;
      }

      &::before {
        background: var(--background-color);
        width: calc(100% + 0.4em);
      }

      &::after {
        background: $accent-color;
      }
    }

    .item-icon {
      margin-right: 0.7em;

      img {
        width: 2em;
        max-width: 2em; // override default styles of bulma
        // filter: invert(1);
      }
    }

    &:hover {
      .item-text {
        color: #000;

        &::after {
          width: calc(100% + 0.4em);
        }
      }
    }

    &:active {
      .item-text::after {
        transform: scale(1.1) skew(-15deg);
      }
    }
  }

  &:hover {
    .item {
      width: $menu-open-width;

      .item-text {
        opacity: 1;
      }
    }
  }

  .visible-area-marker {
    position: absolute;
    top: -5px;
    left: -0.1em;
    height: 2em;
    width: 2.2em;
    background-color: rgba($accent-color, 0.2);
    border-left: 2px $accent-color solid;
    pointer-events: none;

    @include touch {
      top: 0;
      left: 0;
      width: 10px;
      background-color: $accent-color;
      border: 0;
      border-radius: 0;
      pointer-events: none;
    }
  }
}
</style>
