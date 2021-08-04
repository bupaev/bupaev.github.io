<template>
  <nav
    class="vertical-menu"
  >
    <div ref="currentPosition" class="current-position" />
    <scrollactive ref="menu">
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
      ],
      menuEl: null,
      contentSectionsHeightArray: [],
      contentSectionsOffsetArray: [],
      menuItemHeight: 0,
      coefficients: 0
    }
  },

  mounted () {
    this.menuEl = this.$refs.menu
    this.menuItemHeight = this.$refs.menu.$el.clientHeight / this.items.length
    this.contentSectionsHeightArray = this.getSectionHeight()
    this.contentSectionsOffsetArray = this.getSectionOffset()
    // menu pixel per content pixel
    this.coefficients = this.contentSectionsHeightArray.map((SectionsHeight) => {
      return this.menuItemHeight / SectionsHeight
    })
    window.addEventListener('scroll', this.listenPageScroll)
  },

  destroyed () {
    window.removeEventListener('scroll', this.listenPageScroll)
  },

  methods: {
    listenPageScroll () {
      /* const contentHeight = document.body.scrollHeight
      const currentScroll = window.scrollY
      const percent = currentScroll / contentHeight
      console.log('DEBUG: percent:', contentHeight, currentScroll, percent)
      this.$refs.currentPosition.style.top = `${percent * 100}%` */
      this.setCurrentPositionOffset()
    },
    getSectionHeight () {
      const sectionsHTMLCollection = document.getElementsByClassName('page-section')
      return [...sectionsHTMLCollection].map(({ clientHeight }) => clientHeight)
    },
    getSectionOffset () {
      const sectionsHTMLCollection = document.getElementsByClassName('page-section')
      return [...sectionsHTMLCollection].map(({ offsetTop }) => offsetTop)
    },
    // Menu items have equal heights but content sections have different heights.
    // We have to map content sections height to menu items height
    // to position the current position pointer correctly
    setCurrentPositionOffset () {
      // const contentHeight = document.body.scrollHeight
      const currentScroll = window.scrollY
      // const percent = currentScroll / contentHeight

      // console.log('DEBUG: contentSectionsOffsetArray:', this.contentSectionsOffsetArray)
      const currentSectionIndex = this.contentSectionsOffsetArray.findIndex((offset) => {
        return currentScroll < offset
      })

      const selectedMenuItem = Math.max(currentSectionIndex - 1, 0)
      const curPos = selectedMenuItem * this.menuItemHeight +
        (currentScroll - this.contentSectionsOffsetArray[selectedMenuItem]) * this.coefficients[selectedMenuItem]

      console.log('DEBUG: selectedMenuItem, curPos:', selectedMenuItem, Math.round(curPos))

      this.$refs.currentPosition.style.top = `${curPos}px`
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
    margin-bottom: 2em;
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

  .current-position {
    position: absolute;
    left: -4px;
    height: 2em;
    width: 2em;
    border-radius: 999em;
    background-color: rgba(#ff321c, 0.3);
  }
}
</style>
