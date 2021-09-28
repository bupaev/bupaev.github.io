<template>
  <div class="container">
    <h2 class="title is-2">
      Synopsis
    </h2>
    <div class="columns">
      <div class="column is-one-third-desktop">
        <VennDiagramProfessions />
      </div>
      <div class="column">
        <div class="content">
          <p>
            Lead Front End Web Developer at CODENETIX,
            Master Degree in Computer Science (July, 2011).
            7+ years of software development experience.
            10+ years of front end focused experience.
            5 years of lecturing experience in Computer Science at Omsk State Technical University.
          </p>
          <p>
            I love to create clean and smart cutting-edge user interfaces using modern web technologies with powerful and complex client-side logic behind UI. In addition, I would
            like to work with Data Visualization and Data Mining.
            I love to create clean and smart cutting-edge user interfaces using modern web technologies with powerful and complex client-side logic behind UI. In addition, I would
            like to work with Data Visualization and Data Mining.
          </p>
          <p>
            I love to create clean and smart cutting-edge user interfaces using modern web technologies with powerful and complex client-side logic behind UI. In addition, I would
            like to work with Data Visualization and Data Mining.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VennDiagramProfessions from '@/components/VennDiagramProfessions'

export default {
  name: 'Synopsis',
  components: { VennDiagramProfessions }
}
</script>
