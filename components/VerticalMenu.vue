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
      const currentStartScroll = window.scrollY
      const currentEndScroll = currentStartScroll + window.innerHeight
      // const percent = currentScroll / contentHeight

      const currentStartSectionIndex = this.contentSectionsOffsetArray.findIndex((offset) => {
        return currentStartScroll < offset
      })
      const currentEndSectionIndex = this.contentSectionsOffsetArray.findIndex((offset) => {
        return currentEndScroll < offset
      })

      const selectedStartMenuItem = Math.max(currentStartSectionIndex - 1, 0)
      const selectedEndMenuItem = currentEndSectionIndex === -1
        ? this.contentSectionsOffsetArray.length
        : Math.max(currentEndSectionIndex - 1, 0)

      const startVisibleScreen = selectedStartMenuItem * this.menuItemHeight +
        (currentStartScroll - this.contentSectionsOffsetArray[selectedStartMenuItem]) * this.coefficients[selectedStartMenuItem]
      const endVisibleScreen = selectedEndMenuItem * this.menuItemHeight +
        (currentEndScroll - this.contentSectionsOffsetArray[selectedEndMenuItem]) * this.coefficients[selectedEndMenuItem]
      // console.log('DEBUG: selectedMenuItem, curPos:', selectedMenuItem, Math.round(curPos))

      this.$refs.currentPosition.style.transform = `translateY(${startVisibleScreen}px)`
      this.$refs.currentPosition.style.height = `${endVisibleScreen - startVisibleScreen}px`
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
    // padding-top: 15px;
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

  .current-position {
    position: absolute;
    left: -4px;
    height: 2em;
    width: 2em;
    background-color: rgba(#ff321c, 0.3);
  }
}
</style>
