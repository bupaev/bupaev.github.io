<template>
  <div class="timeline">
    <div class="jobs-wrapper">
      <div
        v-for="job in jobs"
        :key="job.company"
        class="job"
        style="left: 0;"
      >
        <span>{{ job.position }}</span>
        /
        <span>{{ job.company }}</span>
        <div class="has-text-weight-normal">
          {{ job.skills }}
        </div>
      </div>
    </div>
    <div class="years-wrapper">
      <div v-for="i in years" :key="i" class="year">
        {{ i }}
      </div>
    </div>
  </div>
</template>

<script>
const startYear = 2010
const endYear = 2022

export default {
  name: 'Timeline',

  data () {
    return {
      years: Array(endYear - startYear).fill(1).map((_, i) => startYear + i),
      jobs: [
        {
          position: 'Front-end developer',
          company: 'Bandlab',
          skills: 'React, Angular, VueJS',
          startDate: '2012-05',
          endDate: '2020-10',
          id: 'bandlab'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/mixins.sass";
@import "assets/scss/mixins.scss";

.timeline {
  $year-height: 30px;

  position: relative;
  width: 100%;
  height: 100px;

  .jobs-wrapper {
    position: absolute;
    bottom: $year-height;
  }

  .job {
    border: 1px solid black;
    border-bottom-width: 0;
    font-weight: 700;
    background-image: repeating-linear-gradient(135deg, #000 0, #000 1px, transparent 1px, transparent 10px);
    padding: 5px 10px;

    @include text-contour(#fff, 1px);
  }

  .years-wrapper {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-wrap: nowrap;

    .year {
      position: relative;
      flex: 1 0 auto;
      height: $year-height;
      border-top: 1px solid black;
      text-align: center;

      &::after {
        @include rhombus;

        content: "";
        top: -4px;
        left: calc(50% - 2px);
        background-color: #fff;
      }

      &:last-of-type {
        &::before {
          @include arrow(black);

          content: "";
          border-width: 1px !important;
          transform: rotate(-135deg);
          right: 0;
          top: 1px;
        }
      }
    }
  }
}
</style>
