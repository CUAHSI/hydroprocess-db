<template>
<v-container fluid>
    <div>
      <div class="mb-3">
        <h3>Hydrologic Process Knowledge Platform</h3>
        <p>
          This project enables you to view and search hydrologic process
          knowledge derived from perceptual models of research watersheds around
          the globe.
        </p>
      </div>

      <div class="mb-3">
        <h3>Hydrologic Processes</h3>
        <p>
          Hydrologic processes describe the flow paths and mechanisms that move
          water from the canopy and land surface to its release into streams,
          deep groundwater or evapotranspiration. Hydrologists often communicate
          process knowledge using a perceptual model, a qualitative summary of
          our knowledge about the hydrologic system presented as a schematic
          figure or a text description. Perceptual models are one of the best
          tools that the hydrologic community has to organize hydrologic
          knowledge, test hypotheses about runoff generation, design accurate
          computer models to predict river flows, and identify knowledge gaps. 
        </p>
      </div>

      <div class="mb-3">
        <h3>Funding</h3>
        <p>
          This project is funded by the NSF Division of Earth Sciences Award
          #2322510:
          <div>
            <a href="https://www.nsf.gov/awardsearch/showAward?AWD_ID=2322510"
            >Synthesizing hydrologic process knowledge to determine global
            drivers of dominant processes.</a>
          </div>          
        </p>
      </div>

      <div class="mb-3">
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
                  <v-card-title
                    class="text-white"
                    v-text="member.name"
                  ></v-card-title>
                </v-img>

                <v-card-actions>
                  <v-card-text v-text="member.designation"></v-card-text>

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

      <div>
        <h3>Useful Links:</h3>
        <v-list>
          <v-list-item
            title="Interactive Hydrologic Process Taxonomy:"
            class="mb-5">
            <div class="link-item-description">
              <a href="http://mcmillanhydrology.org/ProcessTaxonomy/ProcessTaxonomyDiagram.html">
                http://mcmillanhydrology.org/ProcessTaxonomy/ProcessTaxonomyDiagram.html
              </a>
            </div>
          </v-list-item>

          <v-list-item
            title="Journal Articles Describing this Project:"
            subtitle="McMillan, H., Araki, R., Gnann, S., Woods, R., & Wagener, T. (2023).">
            <div class="link-item-description">
              <div>
                How do hydrologists perceive watersheds? A survey and analysis of
                perceptual model figures for experimental watersheds.
              </div>
              <a href="https://onlinelibrary.wiley.com/doi/full/10.1002/hyp.14845"
                >Read the Article
              </a>
            </div>
          </v-list-item>
        </v-list>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { mdiOpenInNew } from '@mdi/js';
import hilary from '@/assets/hilary.jpg';
import ryoko from '@/assets/ryoko.jpg';

const members = [
        {
          name: 'Hilary McMillan',
          designation: 'Professor & Project Lead, San Diego State University',
          img: hilary,
          link: 'http://www.mcmillanhydrology.org/',
        },
        {
          name: 'Ryoko Araki',
          designation: 'PhD Student & Developer, San Diego State University',
          img: ryoko,
          link: 'http://rarakihydro.com/',
        },
      ]
</script>
<style>
.link-item-description{
  font-size: 18px;
}
</style>
