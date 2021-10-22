<template>
  <div :class="['skills-section', { 'interactive-area': true }]">
    <h4 class="is-size-5 has-text-weight-bold mb-4">
      {{ title }}
    </h4>
    <div class="mb-2">
      {{ info }}
    </div>
    <div>
      <div v-for="item in items" :key="item.title" class="skill-item">
        <span class="item-title">{{ item.title }}</span>
        <span v-if="item.info">
          <i class="info-icon"><img alt="icon" src="../assets/icons/info.svg"></i>
          <span class="info">{{ item.info }}</span>
        </span>
        <SkillBar :level="item.level" />
      </div>
    </div>
  </div>
</template>
<script>
import SkillBar from '@/components/SkillBar'

export default {
  name: 'SkillsSection',

  components: { SkillBar },

  props: {
    title: {
      type: String,
      required: true
    },

    info: {
      type: String,
      default: null
    },

    items: {
      type: Array,
      required: true
    }
  },

  computed: {
    hasAnyInfo () {
      return this.info && this.items.some(({ info }) => info)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/mixins.sass";

.skills-section {
  width: 100%;
  min-width: 100%;

  @include desktop {
    width: 49%;
    min-width: 49%;
  }

  @include fullhd {
    width: 32%;
    min-width: 32%;
  }

  .skill-item {
    line-height: 1em;
  }

  .item-title {
    line-height: 1.4em;
  }

  ul {
    margin-left: 0;
    list-style: none;

    li {
      margin-top: -0.2em;
    }
  }

  &.interactive-area {
    cursor: pointer;
    outline: 2px solid transparent;

    .info-icon {
      display: inline-block;
      overflow: hidden;
      width: 1em;
      height: 1em;
      transition: opacity 400ms 100ms;
      vertical-align: -0.18em;
      opacity: 1;

      img {
        margin-bottom: 0;
        transition: margin-bottom 500ms 100ms;
      }
    }

    .info {
      font-size: 0.9em;
      line-height: 1.2em;
      display: block;
      overflow: hidden;
      max-height: 0;
      transition: max-height 500ms linear;
    }

    &:hover {
      outline-color: rgba(0, 0, 255, 0.03);

      .info-icon {
        opacity: 0;

        img {
          margin-bottom: -0.7em;
        }
      }

      .info {
        max-height: 2.5em; // space just for 2 lines
      }
    }
  }
}
</style>
