<template>
  <v-container fluid>
    <div>
      <div class="useful-links-wrapper mb-5">
        <h3>Hydrologic Process Knowledge Platform</h3>
        <p>
          This project enables users to view and search a hydrologic process knowledge database derived from
          perceptual models of research watersheds around the globe (McMillan et al., 2023, 2025). The relational
          database captures extensive knowledge from hundreds of experimental watersheds using standardized 
          workflows and a hierarchical Hydrologic Process Taxonomy to ensure consistency and data quality 
          (McMillan, 2022). 
        </p>
        <p>
          Potential use cases for this platform include, but are not limited to, exploring global patterns of 
          hydrologic function and analyzing how dominant processes relate to physical watershed features. 
          The database can also support evaluation of next-generation, continental-scale hydrologic models, which
          often lack the process-level data needed to inform model structure.
        </p>
      </div>

      <div class="useful-links-wrapper mb-5">
        <h3>Hydrologic Processes</h3>
        <p>
          Hydrologic processes describe the flow paths and mechanisms that move water from the
          canopy and land surface to its release into streams, deep groundwater or
          evapotranspiration. Hydrologists often communicate process knowledge using a perceptual
          model, a qualitative summary of our knowledge about the hydrologic system presented as a
          schematic figure or a text description. Perceptual models are one of the best tools that
          the hydrologic community has to organize hydrologic knowledge, test hypotheses about
          runoff generation, design accurate computer models to predict river flows, and identify
          knowledge gaps.
        </p>
      </div>

      <div class="useful-links-wrapper mb-5">
        <h3>Funding</h3>
        <p>
          This project is supported by the National Science Foundation (NSF), Division of Earth Sciences,
          under Award No. 2322510:
          <a href="https://www.nsf.gov/awardsearch/showAward?AWD_ID=2322510" target="_blank">
            Synthesizing hydrologic process knowledge to determine global drivers of dominant processes.
          </a>
        </p>
      </div>

      <div class="useful-links-wrapper mb-5">
        <h3>Project Team</h3>
        <v-container fluid>
          <v-row dense>
            <v-col v-for="member in members" :key="member.name" cols="4">
              <v-card>
                <v-img
                  :src="member.img"
                  class="align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="350px"
                >
                  <v-card-title class="text-white">{{ member.name }}</v-card-title>
                </v-img>

                <v-card-actions>
                  <v-card-text>{{ member.designation }}</v-card-text>

                  <v-btn
                    :icon="mdiOpenInNew"
                    class="mx-auto"
                    :href="member.link"
                    size="small"
                    target="_blank"
                  ></v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <div class="useful-links-wrapper mb-5">
        <h3>Useful Links:</h3>
        <v-list density="compact">
          <v-list-item class="mb-4">
            <div>
              <div class="text-h6 font-weight-medium mb-1">
                Interactive Hydrologic Process Taxonomy:
              </div>
              <div class="text-body-2">
                <a
                  href="http://mcmillanhydrology.org/ProcessTaxonomy/ProcessTaxonomyDiagram.html"
                  target="_blank"
                >
                  http://mcmillanhydrology.org/ProcessTaxonomy/ProcessTaxonomyDiagram.html
                </a>
              </div>
            </div>
          </v-list-item>
            
          <v-list-item class="mb-4">
            <div>
              <div class="text-h6 font-weight-medium mb-1">
                Journal Articles Describing this Project:
              </div>

              <div class="text-body-2 mb-3">
                McMillan, H. (2022). A taxonomy of hydrological processes and watershed function. <i>Hydrological Processes, 36</i>(3), e14537.
                <a
                  href="https://onlinelibrary.wiley.com/doi/10.1002/hyp.14537"
                  target="_blank"
                >
                  https://doi.org/10.1002/hyp.14537
                </a>
              </div>

              <div class="text-body-2 mb-3">
                McMillan, H., Araki, R., Gnann, S., Woods, R., & Wagener, T. (2023). How do hydrologists perceive watersheds? A survey and analysis of perceptual model figures for experimental watersheds.
                <i>Hydrological Processes, 37</i>(5), e14845.
                <a
                  href="https://onlinelibrary.wiley.com/doi/full/10.1002/hyp.14845"
                  target="_blank"
                >
                  https://doi.org/10.1002/hyp.14845
                </a>
              </div>
            </div>
          </v-list-item>
        </v-list>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { mdiOpenInNew } from '@mdi/js'
import hilary from '@/assets/hilary.jpg'
import ryoko from '@/assets/ryoko.jpg'
import tony from '@/assets/tony.jpg'
import devin from '@/assets/devin.jpg'
import irene from '@/assets/irene.jpg'
import sandesh from '@/assets/sandesh.jpg'

const members = [
  {
    name: 'Hilary McMillan',
    designation: 'Professor & Project Lead, San Diego State University',
    img: hilary,
    link: 'http://www.mcmillanhydrology.org/'
  },
  {
    name: 'Ryoko Araki',
    designation: 'PhD Student & Developer, San Diego State University',
    img: ryoko,
    link: 'http://rarakihydro.com/'
  },
  {
    name: 'Anthony Castronova',
    designation: 'Senior Research Scientist, CUAHSI',
    img: tony,
    link: 'https://www.linkedin.com/in/anthony-castronova-900a2632/'
  }, 
  {
    name: 'Devin Cowan',
    designation: 'Research Programmer, CUAHSI',
    img: devin,
    link: 'https://www.linkedin.com/in/devin-cowan/'
  },
  {
    name: 'Irene Garousi-Nejad',
    designation: 'Research Scientist, CUAHSI',
    img: irene,
    link: 'https://www.linkedin.com/in/irene-garousi-nejad-phd-0809a047/'
  },
  {
    name: 'Sandesh Maddila',
    designation: 'Software Engineer, CUAHSI',
    img: sandesh,
    link: 'https://www.cuahsi.org/about/our-team/sandesh-maddilia'
  }
]
</script>
<style>
.link-item-description {
  font-size: 18px;
}

.useful-links-wrapper {
  max-width: 950px;
  margin-left: auto;
  margin-right: auto;
}
</style>
