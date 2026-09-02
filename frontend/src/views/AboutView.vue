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

    <section class="projects-shell">
      <div class="projects-header">
        <p class="projects-eyebrow">THE PROJECTS</p>
        <h2 class="projects-title">Two efforts, one hub</h2>
        <p class="projects-subhead">
          Each project has its own team, funding, and publications. Select a project to explore its
          details.
        </p>
      </div>

      <div class="project-switcher" role="tablist">
        <button
          v-for="option in projectOptions"
          :key="option.key"
          type="button"
          role="tab"
          :aria-selected="activeProject === option.key"
          class="switcher-btn"
          :class="{ 'switcher-btn--active': activeProject === option.key }"
          @click="activeProject = option.key"
        >
          <v-icon :icon="option.icon" size="20" class="switcher-icon" />
          {{ option.label }}
        </button>
      </div>

      <div class="projects-grid">
        <div class="projects-main">
          <h3 class="project-title">{{ currentProject.title }}</h3>
          <p v-for="(paragraph, i) in currentProject.paragraphs" :key="i" class="project-paragraph">
            {{ paragraph }}
          </p>

          <div class="info-card">
            <h4 class="info-card-title">
              <v-icon :icon="mdiFileDocumentOutline" size="18" class="info-card-icon" />
              Read the papers
            </h4>
            <p class="info-card-lead">{{ currentProject.papers.lead }}</p>
            <ul class="citation-list">
              <li v-for="(paper, i) in currentProject.papers.items" :key="i" class="citation-item">
                {{ paper.citation }}
                <a
                  v-if="paper.doi"
                  :href="paper.doi"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="doi-link"
                >
                  DOI
                  <v-icon :icon="mdiArrowTopRight" size="14" />
                </a>
              </li>
            </ul>
          </div>

          <div v-if="currentProject.usefulLinks" class="info-card">
            <h4 class="info-card-title">
              <v-icon :icon="mdiArrowTopRight" size="18" class="info-card-icon" />
              {{ currentProject.usefulLinks.title }}
            </h4>
            <p class="info-card-lead">{{ currentProject.usefulLinks.description }}</p>
            <a
              :href="currentProject.usefulLinks.url"
              target="_blank"
              rel="noopener noreferrer"
              class="pill-button"
            >
              {{ currentProject.usefulLinks.buttonText }}
              <v-icon :icon="mdiOpenInNew" size="16" />
            </a>
          </div>

          <div v-if="currentProject.reuseData" class="info-card">
            <h4 class="info-card-title">
              <v-icon :icon="mdiFileDocumentMultipleOutline" size="18" class="info-card-icon" />
              {{ currentProject.reuseData.title }}
            </h4>
            <p class="info-card-lead">{{ currentProject.reuseData.description }}</p>
            <ul class="citation-list">
              <li
                v-for="(item, i) in currentProject.reuseData.items"
                :key="i"
                class="citation-item"
              >
                {{ item.citation }}
                <a
                  v-if="item.doi"
                  :href="item.doi"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="doi-link"
                >
                  DOI
                  <v-icon :icon="mdiArrowTopRight" size="14" />
                </a>
                <span v-else class="doi-pending">DOI</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="projects-side">
          <div class="info-card">
            <div class="funding-header">
              <h4 class="info-card-title">
                <v-icon :icon="mdiBankOutline" size="18" class="info-card-icon" />
                {{ currentProject.funding.title }}
              </h4>
              <img
                v-if="currentProject.funding.logo"
                :src="currentProject.funding.logo"
                alt=""
                class="funding-logo"
              />
            </div>
            <p class="info-card-lead">{{ currentProject.funding.text }}</p>
          </div>

          <div class="info-card">
            <h4 class="info-card-title">
              <v-icon :icon="mdiAccountGroupOutline" size="18" class="info-card-icon" />
              Website development team
            </h4>
            <p class="info-card-lead">
              People who built this hub. The broader scientific project has additional contributors
              listed in the papers above.
            </p>
            <ul class="team-list">
              <li v-for="member in members" :key="member.name" class="team-item">
                <a
                  v-if="member.link"
                  :href="member.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="team-name"
                >
                  {{ member.name }}
                </a>
                <span v-else class="team-name team-name--plain">{{ member.name }}</span>
                <p class="team-role">{{ member.designation }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="info-card info-card--wide">
        <h4 class="info-card-title">
          <v-icon :icon="mdiEmailOutline" size="15" class="info-card-icon" />
          Questions or feedback?
        </h4>
        <p class="info-card-lead">
          For questions about the process database, publications, or data use, please contact the
          project team through
          <a href="http://www.mcmillanhydrology.org/" target="_blank" rel="noopener noreferrer">
            McMillan Hydrology Lab</a
          >. For technical issues with the hub, contact
          <a href="https://www.cuahsi.org/" target="_blank" rel="noopener noreferrer">CUAHSI</a>.
        </p>
      </div>
    </section>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  mdiOpenInNew,
  mdiFileDocumentOutline,
  mdiFileDocumentMultipleOutline,
  mdiDatabaseOutline,
  mdiMapOutline,
  mdiArrowTopRight,
  mdiBankOutline,
  mdiAccountGroupOutline,
  mdiEmailOutline
} from '@mdi/js'
import aboutHeroImage from '@/assets/landing section.png'
import nsfLogo from '@/assets/nsf_logo.png'
import cirohLogo from '@/assets/CIROHLogo_200x200.png'

const members = [
  {
    name: 'Hilary McMillan',
    designation: 'Professor & Project Lead . San Diego State University',
    link: 'https://orcid.org/0000-0002-9330-9730'
  },
  {
    name: 'Wouter Knoben',
    designation: 'Senior Research Associate & Project Lead',
    link: 'https://orcid.org/0000-0001-8301-3787'
  },
  {
    name: 'Anthony Castronova',
    designation: 'Lead of Research . CUAHSI',
    link: 'https://www.linkedin.com/in/anthony-castronova-900a2632/'
  },
  {
    name: 'Ying Fan Reinfelder',
    designation: 'Professor . Rutgers University',
    link: 'https://orcid.org/0000-0002-0024-7965'
  },
  {
    name: 'Shaun Carney',
    designation: 'Senior Research Environmental Engineer . RTI International',
    link: null
  },
  {
    name: 'Katie van Werkhoven',
    designation: 'Senior Water Resources Scientist . RTI International',
    link: 'https://orcid.org/0000-0001-5735-422X'
  },
  {
    name: 'Peter Wagener',
    designation: 'PhD Candidate . University of Calgary',
    link: 'https://orcid.org/0009-0005-5560-3698'
  },
  {
    name: 'Irene Garousi-Nejad',
    designation: 'Research Scientist . CUAHSI',
    link: 'https://orcid.org/0000-0003-2929-3946'
  },
  {
    name: 'Julia Masterman',
    designation: 'Community Relations & Training Coordinator . CUAHSI',
    link: 'https://orcid.org/0000-0002-1613-7090'
  },
  {
    name: 'Jordan Read',
    designation: 'Chief Executive Officer . CUAHSI',
    link: 'https://orcid.org/0000-0002-3888-6631'
  },
  {
    name: 'Martyn Clark',
    designation: 'Professor . University of Calgary',
    link: 'https://orcid.org/0000-0002-2186-2625'
  },
  {
    name: 'Anthony Castronova',
    designation: 'Lead of Research . CUAHSI',
    link: 'https://orcid.org/0000-0002-1341-5681'
  },
  {
    name: 'Martin Seul',
    designation: 'Lead of Software Engineering (acting) . CUAHSI',
    link: 'https://orcid.org/0000-0002-0260-9771'
  },
  {
    name: 'Zahraa Alhmood',
    designation: 'Research Software Engineer . CUAHSI',
    link: null
  }
]

const projectOptions = [
  { key: 'database', label: 'Hydrologic Processes', icon: mdiDatabaseOutline },
  { key: 'perceptual', label: 'Perceptual Models', icon: mdiMapOutline }
]

const activeProject = ref('database')

const projects = {
  database: {
    title: 'Hydrological Process Database',
    paragraphs: [
      'This project enables users to view and search a hydrologic process knowledge database derived from perceptual models of research watersheds around the globe (McMillan et al., 2023, 2025). The relational database captures extensive knowledge from hundreds of experimental watersheds using standardized workflows and a hierarchical Hydrologic Process Taxonomy to ensure consistency and data quality (McMillan, 2022).',
      'Potential use cases include exploring global patterns of hydrologic function and analyzing how dominant processes relate to physical watershed features. The database can also support evaluation of next-generation, continental-scale hydrologic models, which often lack the process-level data needed to inform model structure.'
    ],
    papers: {
      lead: 'Cite these journal articles when you use the database or build on its methods.',
      items: [
        {
          citation:
            'McMillan, H. (2022). A taxonomy of hydrological processes and watershed function. Hydrological Processes, 36(3), e14537.',
          doi: 'https://doi.org/10.1002/hyp.14537'
        },
        {
          citation:
            'McMillan, H., Araki, R., Gnann, S., Woods, R., & Wagener, T. (2023). How do hydrologists perceive watersheds? A survey and analysis of perceptual model figures for experimental watersheds. Hydrological Processes, 37(5), e14845.',
          doi: 'https://doi.org/10.1002/hyp.14845'
        },
        {
          citation:
            'McMillan, H., Araki, R., Bolotin, L., Kim, D-H., Coxon, G., Clark, M., Seibert, J. (2025). Global patterns in observed hydrologic processes. Nature Water, 3, 497–506.',
          doi: 'https://doi.org/10.1038/s44221-025-00407-w'
        }
      ]
    },
    usefulLinks: {
      title: 'Useful links',
      description:
        'The hierarchical taxonomy used to classify process evidence in the database (McMillan, 2022).',
      buttonText: 'Open full view',
      url: 'http://mcmillanhydrology.org/ProcessTaxonomy/ProcessTaxonomyDiagram.html'
    },
    funding: {
      title: 'Funding',
      logo: nsfLogo,
      text: 'Supported by the National Science Foundation (NSF), Division of Earth Sciences, under Award No. 2322510: Synthesizing hydrologic process knowledge to determine global drivers of dominant processes.'
    }
  },
  perceptual: {
    title: 'Perceptual Models',
    paragraphs: [
      'This effort takes a top-down view: North America is delineated into five hydrologic domains and 34 provinces based on climate, topography, soils, and geology. Domain-level illustrations summarize the drivers and controls that define landscape hierarchy and guided province delineation.',
      'Each province is paired with a perceptual model and a regional factsheet, so regionally applicable process understanding can be explored directly on the map.'
    ],
    papers: {
      lead: 'For the science behind the domain and province delineation and the perceptual models.',
      items: [
        {
          citation:
            'Knoben et al. Hydrologic Process Synthesis across Diverse Landscapes 1: Hierarchical Classification of the Hydrologic Landscapes of North America. Water Resources Research. In-review',
          doi: 'https://doi.org/10.4211/hs.00c1d461e9554a71a4b2d4ba80507a4c'
        },
        {
          citation:
            'McMillan et al. Hydrologic Process Synthesis across Diverse Landscapes 2: Perceptual Models for North America. Water Resources Research. In-review',
          doi: 'http://www.hydroshare.org/resource/74f92d07ad204fa7bcc49ccf29b11510'
        }
      ]
    },
    reuseData: {
      title: 'Reuse the Data & Illustrations',
      description:
        'Reusing images, province boundaries, or the text shown in map popups and sidebars? Cite the HydroShare resources, not the papers.',
      items: [
        {
          citation:
            'Knoben, W. J. M., McMillan, H., Fan, Y., Carney, S., van Werkhoven, K., Wagener, P., Garousi-Nejad, I., Masterman, J., Read, J. S., Clark, M. P. (2026). Hierarchical Classification of the Hydrologic landscapes of the North American Continent (shapefile - v1), HydroShare.',
          doi: 'https://doi.org/10.4211/hs.00c1d461e9554a71a4b2d4ba80507a4c'
        },
        {
          citation:
            'McMillan, H. (2026). Hydrological Perceptual Models of the 35 Provinces of North America, HydroShare.',
          doi: 'http://www.hydroshare.org/resource/74f92d07ad204fa7bcc49ccf29b11510'
        },
        {
          citation:
            'Fan, Y. (2026). Hydrological Process Illustrations of the Five Domains of North America, HydroShare.',
          doi: 'http://www.hydroshare.org/resource/9c92f62ced274fa69ed19434447c8422'
        }
      ]
    },
    funding: {
      title: 'Funding',
      logo: cirohLogo,
      text: 'This research was supported by the Cooperative Institute for Research to Operations in Hydrology (CIROH) with funding under award NA22NWS4320003 from the NOAA Cooperative Institute Program. The statements, findings, conclusions, and recommendations are those of the author(s) and do not necessarily reflect the opinions of NOAA.'
    }
  }
}

const currentProject = computed(() => projects[activeProject.value])
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

.projects-shell {
  width: min(1024px, calc(100% - 2rem));
  margin: auto;
  padding: 40px;
  background-color: #d7e4f2;
}

.projects-eyebrow {
  margin: 0 0 8px;
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  color: #6b7280;
  font-weight: 700;
  text-transform: uppercase;
}

.projects-title {
  margin: 0 0 8px;
  font-size: 1.6rem;
  color: #26176f;
  font-weight: 700;
}

.projects-subhead {
  margin: 0 0 24px;
  color: #4b5563;
  font-size: 1rem;
}

.project-switcher {
  display: flex;
  background: #d9dde3;
  border-radius: 999px;
  padding: 6px;
  gap: 6px;
  margin-bottom: 32px;
}

.switcher-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 20px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: #4b5563;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.15s ease,
    color 0.15s ease;
}

.switcher-btn--active {
  background: #26176f;
  color: #ffffff;
}

.projects-grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 24px;
  align-items: start;
}

.project-title {
  margin: 0 0 16px;
  font-size: 1.3rem;
  color: #26176f;
  font-weight: 700;
}

.project-paragraph {
  margin: 0 0 16px;
  color: #2b2b31;
  font-size: 0.98rem;
  line-height: 1.55;
}

.info-card {
  background: #d7e4f2;
  border: 1px solid #cacbd5;
  border-left: 4px solid #26176f;
  padding: 20px 24px;
  margin-bottom: 24px;
}

.info-card--wide {
  margin-top: 24px;
  margin-bottom: 0;
  padding: 40px;
  border-left: 1px solid #cacbd5;
}

.info-card--wide .info-card-title {
  font-size: 0.92rem;
  margin-bottom: 6px;
}

.info-card--wide .info-card-lead {
  font-size: 0.85rem;
  margin-bottom: 0;
}

.info-card-lead a {
  color: #1d4ed8;
}

.info-card-title {
  margin: 0 0 10px;
  font-size: 1.05rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  color: #26176f;
}

.info-card-icon {
  margin-right: 10px;
  color: #26176f;
}

.info-card-lead {
  margin: 0 0 14px;
  color: #2b2b31;
  font-size: 0.92rem;
  line-height: 1.45;
}

.citation-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.citation-item {
  border-left: 3px solid #cacbd5;
  padding: 2px 0 2px 14px;
  margin-bottom: 14px;
  color: #2b2b31;
  font-size: 0.9rem;
  line-height: 1.45;
}

.citation-item:last-child {
  margin-bottom: 0;
}

.doi-link {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  color: #1d4ed8;
  text-decoration: underline;
  font-weight: 600;
  margin-left: 4px;
  white-space: nowrap;
}

.doi-pending {
  color: #8a93a3;
  font-weight: 600;
  margin-left: 4px;
}

.pill-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #26176f;
  color: #ffffff;
  border-radius: 999px;
  padding: 10px 22px;
  font-size: 0.92rem;
  font-weight: 600;
  text-decoration: none;
}

.funding-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.funding-logo {
  width: 44px;
  height: 44px;
  object-fit: contain;
  flex-shrink: 0;
}

.team-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.team-item {
  padding: 12px 0;
  border-bottom: 1px solid #cacbd5;
}

.team-item:first-child {
  padding-top: 0;
}

.team-item:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

.team-name {
  display: block;
  color: #1d4ed8;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
}

.team-name--plain {
  color: #26176f;
}

.team-role {
  margin: 2px 0 0;
  color: #6b7280;
  font-size: 0.85rem;
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

  .projects-shell {
    padding: 24px 20px;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .project-switcher {
    flex-direction: column;
    border-radius: 16px;
  }

  .switcher-btn {
    border-radius: 12px;
  }
}
</style>
