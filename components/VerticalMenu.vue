<template>
  <nav
    class="vertical-menu"
  >
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
          <v-icon color="#ff321c">
            {{ item.icon }}
          </v-icon>
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
  data() {
    return {
      items: [
        { title: 'Hello!', id: 'hero-area', icon: 'mdi-human-greeting' },
        { title: 'Synopsis', id: 'synopsis', icon: 'mdi-account-box' },
        { title: 'Skills', id: 'skills', icon: 'mdi-hammer-wrench' },
        { title: 'Experience', id: 'experience', icon: 'mdi-history' },
        { title: 'Contacts', id: 'contacts', icon: 'mdi-card-account-mail-outline' }
      ],
      menuItemHeight: 0,
      contentSectionsHeightArray: [],
      contentSectionsOffsetArray: [],
      scaleCoefficients: [],
      markerOffset: 0,
      markerHeight: 0
    }
  },

  mounted() {
    this.menuItemHeight = this.$refs.menu.getElementsByClassName('item')[0].clientHeight
    this.contentSectionsHeightArray = this.getSectionsProp('clientHeight')
    this.contentSectionsOffsetArray = this.getSectionsProp('offsetTop')

    // menu pixel per content pixel
    this.scaleCoefficients = this.contentSectionsHeightArray.map((SectionsHeight) => {
      return this.menuItemHeight / SectionsHeight
    })

    window.addEventListener('scroll', this.setAreaMarkerPosition)
  },

  destroyed() {
    window.removeEventListener('scroll', this.setAreaMarkerPosition)
  },

  methods: {
    onMenuItemClick (targetIndex) {
      window.scrollTo({
        top: this.contentSectionsOffsetArray[targetIndex],
        left: 0,
        behavior: 'smooth'
      })
    },
    getSectionsProp(propName) {
      const sectionsHTMLCollection = document.getElementsByClassName('page-section')
      return [...sectionsHTMLCollection].map(section => section[propName])
    },
    /**
     * Menu items have equal heights but content sections have different heights.
     * We have to map content sections offsets to menu items offsets
     * to mark the current visible page area correctly
     * @param {number} windowScroll
     * @return {number}
     */
    getRescaledOffset(windowScroll) {
      const sectionIndex = this.contentSectionsOffsetArray.findIndex((offset) => {
        return windowScroll < offset
      })

      const selectedMenuItem = sectionIndex === -1
        ? this.contentSectionsOffsetArray.length
        : Math.max(sectionIndex - 1, 0)

      return selectedMenuItem * this.menuItemHeight +
          (windowScroll - this.contentSectionsOffsetArray[selectedMenuItem]) * this.scaleCoefficients[selectedMenuItem]
    },
    setAreaMarkerPosition() {
      const windowTopScrollY = window.scrollY
      const windowBottomScrollY = windowTopScrollY + window.innerHeight

      this.markerOffset = this.getRescaledOffset(windowTopScrollY)
      this.markerHeight = this.getRescaledOffset(windowBottomScrollY) - this.markerOffset
    }
  }
}
</script>

<style lang="scss">
@mixin menu-transition {
  @for $i from 1 through 5 {
    &:nth-child(#{$i}) {
      transition: width 0.3s #{$i * 0.1}s ease-in-out;
    }
  }
}

.vertical-menu {
  position: fixed;
  top: 10vh;
  left: 10px;

  .item {
    display: flex;
    height: 50px;
    cursor: pointer;
    color: #ff321c;
    text-decoration: none;
    width: 2em;
    overflow: hidden;
    will-change: auto;

    @include menu-transition;

    &.is-active {
      .item-text {
        text-decoration: underline;
      }
    }

    .item-icon {
      margin-right: 0.7em;
    }
  }

  &:hover {
    .item {
      width: 10em;
    }
  }

  .visible-area-marker {
    position: absolute;
    left: -4px;
    height: 2em;
    width: 2em;
    background-color: rgba(#ff321c, 0.3);
    border-radius: 0.5em;
  }
}
</style>
