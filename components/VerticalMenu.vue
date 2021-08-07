<template>
  <nav
    class="vertical-menu"
  >
    <div
      :style="`transform: translateY(${markerOffset}px); height: ${markerHeight}px`"
      class="visible-area-marker"
    />
    <scrollactive ref="menu">
      <a
        v-for="item in items"
        :key="item.id"
        :href="`#${item.id}`"
        class="item scrollactive-item"
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
    this.menuItemHeight = this.$refs.menu.$el.getElementsByClassName('item')[0].clientHeight
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

<style lang="scss" scoped>
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
    border-top: 1px black solid;

    &.is-active {
      .item-text {
        text-decoration: underline;
      }
    }

    .item-icon {
      margin-right: 0.7em;
    }
  }

  .visible-area-marker {
    position: absolute;
    left: -4px;
    height: 2em;
    width: 2em;
    background-color: rgba(#ff321c, 0.3);
  }
}
</style>
