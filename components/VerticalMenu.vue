<template>
  <nav class="vertical-menu">
    <div
      :style="`transform: translateY(${markerOffset - 5}px); height: ${markerHeight}px`"
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
          <img :src="require(`../assets/icons/${item.icon}`)" draggable="false" />
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
      if (windowBottomScrollY === document.body.clientHeight) {
        this.markerHeight = this.menuItemHeight
        return
      }

      this.markerHeight = this.getRescaledOffset(windowBottomScrollY) - this.markerOffset
    }
  }
}
</script>

<style lang="scss">
@import "assets/scss/mixins.scss";
@import "~bulma/sass/utilities/_all.sass";

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
  top: 10vh;
  left: 10px;
  font-family: "Dosis", sans-serif;
  font-size: 20px;
  z-index: 2;
  user-select: none;

  .item {
    display: flex;
    height: 4em;
    width: 2em;
    overflow: hidden;
    color: #000;
    font-weight: 400;
    text-decoration: none;
    cursor: pointer;
    will-change: auto;

    @include fullhd {
      width: $menu-open-width;
    }

    @include menu-transition;

    .item-text {
      position: relative;
      color: #555;
      // letter-spacing: -0.02em;

      &::after {
        content: "";
        position: absolute;
        width: 0;
        height: 1.6em;
        left: -0.2em;
        top: 0;
        background: gold;
        transform: scaleY(1) skew(-15deg);
        transition: width 250ms ease;
        z-index: -1;
      }
    }

    .item-icon {
      margin-right: 0.7em;

      img {
        width: 2em;
        max-width: 2em; // override default styles of bulma
      }
    }

    &:hover {
      .item-text::after {
        width: calc(100% + 0.4em);
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
        color: #000;
      }
    }
  }

  .visible-area-marker {
    position: absolute;
    left: -4px;
    height: 2em;
    width: 2.4em;
    background-color: rgba(gold, 0.1);
    border-radius: 0.5em;
    border: 2px rgba(gold, 0.8) solid;
    pointer-events: none;
  }
}
</style>
