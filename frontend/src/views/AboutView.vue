<template>
  <v-container fluid class="pa-0">
    <home-view></home-view>

    <div class="about-shell">
      <section class="about-hero">
        <div class="about-hero-text">
          <p class="about-eyebrow">PROJECTS, PEOPLE, &amp; PUBLICATIONS</p>
          <h1 class="about-title">About the Hydrological Process Knowledge Hub</h1>
          <p class="about-text">
            A shared platform for exploring hydrologic process knowledge across site, regional, and
            continental scales. Below you can find the teams, funding resources, publications, and
            data citations behind each project.
          </p>
        </div>

        <v-img
          :src="aboutHeroImage"
          alt="Hydrologic Process Knowledge Hub overview"
          class="about-hero-image"
          cover
        />
      </section>

      <section class="about-citation">
        <h2 class="citation-title">
          <v-icon class="citation-title-icon" :icon="mdiFileDocumentOutline" size="18" />
          How to cite
        </h2>
        <p class="citation-lead">
          Journal articles document the scientific methods; HydroShare hosts the reusable maps,
          illustrations, and text shown in the tool. Choose the citation that matches what you are
          using.
        </p>

        <div class="citation-grid">
          <article class="citation-card">
            <h3>Citing the science</h3>
            <p>Cite the journal articles listed under each project tab below.</p>
          </article>

          <article class="citation-card">
            <h3>Reusing materials from this site</h3>
            <p>
              Images, geospatial feature boundaries, popup or sidebar text come from HydroShare.
            </p>
          </article>
        </div>
      </section>
    </div>

    <div class="pa-4">
      <div class="useful-links-wrapper mb-5">
        <h3>Funding</h3>
        <p>
          This project is supported by the National Science Foundation (NSF), Division of Earth
          Sciences, under Award No. 2322510:
          <a href="https://www.nsf.gov/awardsearch/showAward?AWD_ID=2322510" target="_blank">
            Synthesizing hydrologic process knowledge to determine global drivers of dominant
            processes.
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
                McMillan, H. (2022). A taxonomy of hydrological processes and watershed function.
                <i>Hydrological Processes, 36</i>(3), e14537.
                <a href="https://onlinelibrary.wiley.com/doi/10.1002/hyp.14537" target="_blank">
                  https://doi.org/10.1002/hyp.14537
                </a>
              </div>

              <div class="text-body-2 mb-3">
                McMillan, H., Araki, R., Gnann, S., Woods, R., & Wagener, T. (2023). How do
                hydrologists perceive watersheds? A survey and analysis of perceptual model figures
                for experimental watersheds.
                <i>Hydrological Processes, 37</i>(5), e14845.
                <a
                  href="https://onlinelibrary.wiley.com/doi/full/10.1002/hyp.14845"
                  target="_blank"
                >
                  https://doi.org/10.1002/hyp.14845
                </a>
              </div>

              <div class="text-body-2 mb-3">
                McMillan, H., Araki, R., Bolotin, L., Kim, D-H., Coxon, G., Clark, M., Seibert, J.
                (2025). Global patterns in observed hydrologic processes.
                <i>Nature Water</i>, in press.
              </div>
            </div>
          </v-list-item>
        </v-list>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { mdiOpenInNew, mdiFileDocumentOutline } from '@mdi/js'
import aboutHeroImage from '@/assets/landing section.png'
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

.about-shell {
  width: min(1024px, calc(100% - 2rem));
  margin: 0 auto;
  background: #ffffff;
}

.about-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: stretch;
  min-height: 260px;
  position: relative;
  background: #ffffff;
}

.about-hero-text {
  padding: 40px 32px 32px 40px;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.about-eyebrow {
  margin: 0 0 8px;
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  color: #6b7280;
  font-weight: 700;
  text-transform: uppercase;
}

.about-title {
  margin: 0 0 12px;
  font-size: clamp(1.1rem, 1.9vw, 1.4rem);
  line-height: 1.25;
  color: #26176f;
  font-weight: 700;
}

.about-text {
  margin: 0;
  color: #1f2329;
  line-height: 1.5;
  font-size: 1rem;
}

.about-hero-image {
  height: 100%;
  min-height: 260px;
}

.about-citation {
  padding: 40px 45px;
  border-top: 1px solid #d7e4f2;
  background: #eef4fb;
}

.citation-title {
  margin: 0 0 8px;
  font-size: 1.15rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  color: #26176f;
}

.citation-title-icon {
  margin-right: 10px;
  color: #26176f;
}

.citation-lead {
  margin: 0 0 20px;
  color: #2b2b31;
  font-size: 0.95rem;
  line-height: 1.4;
  max-width: 900px;
}

.citation-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 45px;
}

.citation-card {
  background: #d7e4f2;
  border: 0;
  padding: 16px 20px;
}

.citation-card h3 {
  margin: 0 0 6px;
  font-size: 1rem;
  color: #14306d;
  font-weight: 700;
}

.citation-card p {
  margin: 0;
  color: #33363d;
  font-size: 0.92rem;
  line-height: 1.4;
}

@media (max-width: 900px) {
  .about-hero {
    display: block;
    position: relative;
    min-height: 220px;
    overflow: hidden;
  }

  .about-hero-text {
    padding: 24px 20px;
  }

  .about-hero-image {
    position: absolute;
    inset: 0;
    height: 100%;
    z-index: 1;
    opacity: 0.25;
  }

  .about-citation {
    padding: 24px 20px;
  }

  .citation-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
