<template>
  <v-container fluid class="pa-0 index-page">
    <!-- Section 1 (Top) -->
    <section class="page-section section-1" :style="{ backgroundImage: `url(${landingBg})` }">
      <div class="hero-content">
        <div class="hero-text">
          <h1>Hydrological Process Knowledge Hub</h1>
          <p class="hero-subhead">
            A shared platform for exploring hydrologic process knowledge across site, regional, and
            continental scales
          </p>
          <p class="hero-body">
            The Hydrological Process Knowledge Hub brings together two complementary resources for
            advancing hydrologic process understanding across site, regional, and continental
            scales. These resources are (1) the Hydrological Process Database (NSF-funded) and (2)
            the Hydrologic Perceptual Models platform (CIROH-funded). Together, these resources
            connect detailed watershed-scale evidence with broader regional synthesis, helping
            hydrologists, model developers, educators, and water managers explore how water moves
            through landscapes and how dominant hydrologic processes vary across space.
          </p>
        </div>

        <div class="hero-cta-row">
          <RouterLink class="hero-cta cta-blue" to="/map">
            <div class="hero-cta-main">
              <v-icon :icon="mdiDatabaseOutline" size="44" class="hero-cta-icon" />
              <span class="hero-cta-text">Explore hydrological<br />process database</span>
            </div>
            <span class="hero-cta-arrow" aria-hidden="true"></span>
          </RouterLink>
          <RouterLink class="hero-cta cta-green" to="/perceptual_models">
            <div class="hero-cta-main">
              <v-icon :icon="mdiMapMarkerRadiusOutline" size="44" class="hero-cta-icon" />
              <span class="hero-cta-text">Explore hydrologic<br />domains &amp; processes</span>
            </div>
            <span class="hero-cta-arrow" aria-hidden="true"></span>
          </RouterLink>
          <RouterLink class="hero-cta cta-light" to="/about">
            <div class="hero-cta-main">
              <v-icon :icon="mdiInformationOutline" size="44" class="hero-cta-icon" />
              <span class="hero-cta-text">Learn about<br />perceptual models</span>
            </div>
            <span class="hero-cta-arrow" aria-hidden="true"></span>
          </RouterLink>
        </div>
      </div>
      <a
        class="photo-credit"
        href="https://unsplash.com/photos/a-winding-river-flows-through-a-lush-green-forest-fbBTXLbolC4?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        target="_blank"
        rel="noopener noreferrer"
      >
        Photo by Justin McFadden on Unsplash
      </a>
    </section>

    <!-- Section 2 -->
    <section class="page-section">
      <div class="why-hub">
        <v-container fluid class="why-hub-body">
          <v-row align="stretch" class="why-hub-row">
            <v-col cols="12" md="5">
              <h2 class="why-hub-title">Why This Hub?</h2>

              <p class="heading">Hydrologic process knowledge exists at multiple scales.</p>

              <p class="why-hub-description">
                Site-based studies provide detailed evidence about how individual watersheds
                function (Hydrological Process Database), while regional and continental syntheses
                help organize that knowledge across a broader landscape (Hydrologic Perceptual
                Models). This hub connects both perspectives in one place.
              </p>

              <p class="heading">By bridging these projects together, the hub helps users:</p>

              <ul class="why-hub-checklist">
                <li v-for="item in checklist" :key="item">
                  <v-icon :icon="mdiCheckboxMarked" color="success" size="20" class="mr-2"></v-icon>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </v-col>

            <v-col cols="12" md="7">
              <div class="why-hub-visual">
                <div class="why-hub-images">
                  <img :src="siteImg" alt="Site scale" class="why-hub-img why-hub-img--site" />
                  <img
                    :src="provinceImg"
                    alt="Province scale"
                    class="why-hub-img why-hub-img--province"
                  />
                  <div class="why-hub-domain-wrap">
                    <img
                      :src="domainImg"
                      alt="Domain scale"
                      class="why-hub-img why-hub-img--domain"
                    />
                    <p class="text-caption font-italic text-right text-medium-emphasis mt-2">
                      Conceptual image generated with ChatGPT / DALL·E, 2026.
                    </p>
                  </div>
                </div>

                <div class="why-hub-timeline">
                  <div class="why-hub-timeline-line"></div>

                  <div
                    v-for="step in steps"
                    :key="step.title"
                    class="why-hub-timeline-step"
                    :style="{ top: step.top }"
                  >
                    <span class="why-hub-timeline-dot"></span>
                    <div class="why-hub-timeline-text">
                      <div class="font-weight-bold">{{ step.title }}</div>
                      <div class="why-hub-step-description text-medium-emphasis">
                        {{ step.description }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </section>

    <!-- Section 3 -->
    <section class="page-section section-3">
      <div class="section-3-content">
        <h2 class="section-3-title">Explore Two Resources</h2>

        <div class="resource-grid">
          <article
            v-for="resource in section3Resources"
            :key="resource.title"
            class="resource-card"
          >
            <div class="resource-card-top">
              <img :src="resource.logo" :alt="resource.logoAlt" class="resource-logo" />
              <div>
                <h3>{{ resource.title }}</h3>
                <p class="resource-top-text">{{ resource.summary }}</p>
              </div>
            </div>

            <div class="resource-card-body">
              <p class="resource-description">{{ resource.description }}</p>
              <h4>Use this resource to:</h4>
              <ul>
                <li v-for="item in resource.bullets" :key="item">{{ item }}</li>
              </ul>
            </div>

            <RouterLink class="resource-cta" :class="resource.ctaClass" :to="resource.to">
              <span>{{ resource.ctaLabel }}</span>
              <v-icon :icon="mdiOpenInNew" size="23" />
            </RouterLink>
          </article>
        </div>
      </div>
    </section>

    <!-- Section 4 -->
    <section class="page-section section-4">
      <div class="section-4-content">
        <h2 class="section-4-title">Who Can Use This Hub?</h2>
        <div class="audience-grid">
          <article v-for="item in section4AudienceCards" :key="item.title" class="audience-card">
            <div class="audience-card-header">
              <v-icon :icon="item.icon" size="28" class="audience-icon" />
              <h3>{{ item.title }}</h3>
            </div>
            <p>{{ item.description }}</p>
          </article>
        </div>
      </div>
    </section>
  </v-container>
</template>

<script setup>
import {
  mdiCheckboxMarked,
  mdiDatabaseOutline,
  mdiInformationOutline,
  mdiMapMarkerRadiusOutline,
  mdiAccountSearchOutline,
  mdiAccountGroupOutline,
  mdiCodeBraces,
  mdiOpenInNew,
  mdiSchoolOutline
} from '@mdi/js'
import { RouterLink } from 'vue-router'
import landingBg from '@/assets/landing section.png'
import siteImg from '@/assets/aboutPage/siteBackground.png'
import provinceImg from '@/assets/aboutPage/provinceBackground.png'
import domainImg from '@/assets/aboutPage/domainBackground.png'
import nfsImgUrl from '@/assets/logo-desktop.png'
import hubLogoImgUrl from '@/assets/CIROHLogo_200x200.png'

const checklist = [
  'Explore published evidence of hydrologic processes from research watersheds around the world.',
  'Understand how dominant processes vary across North American hydrologic landscapes.',
  'Compare local watershed knowledge with broader regional process patterns.',
  'Identify knowledge gaps and support process-informed model development.',
  'Improve how hydrologic systems are represented in computational models.'
]

const steps = [
  {
    title: 'Site',
    description: 'Local watershed-scale evidence from observations',
    top: '10%'
  },
  {
    title: 'Province',
    description:
      'Regional process unit with shared hydrologic controls and dominant hydrologic behavior',
    top: '44%'
  },
  {
    title: 'Domain',
    description:
      'Broad hydrologic regions that shape provinces around major controls on hydrologic behavior',
    top: '78%'
  }
]

const section3Resources = [
  {
    title: 'Hydrological Process Database',
    logo: nfsImgUrl,
    logoAlt: 'NSF logo',
    summary:
      'Search and compare site-level hydrologic process knowledge from published watershed studies.',
    description:
      'Access a curated collection of hydrologic process evidence and perceptual model information from published research watersheds around the world. Search, filter, and explore site-level knowledge about runoff generation, storage, flow pathways, and watershed response mechanisms.',
    bullets: [
      'Explore watershed-scale perceptual models',
      'Search published process evidence using hydrologic taxonomy',
      'Compare dominant processes across research watersheds',
      'Identify process knowledge gaps',
      'Support model-structure decisions using observed evidence'
    ],
    ctaLabel: 'Open Hydrologic Process Database',
    ctaClass: 'resource-cta-blue',
    to: '/map'
  },
  {
    title: 'Hydrologic Perceptual Models',
    logo: hubLogoImgUrl,
    logoAlt: 'Hydrologic Process Knowledge Hub logo',
    summary:
      'Explore dominant hydrologic processes across North America through regional synthesis and hydrologic landscape units.',
    description:
      'A large-scale synthesis of dominant hydrologic processes across North America organized across five domains and 35 hydrologic provinces. Built from the hydrologic mosaic framework and informed by expert knowledge, data analysis, and community input.',
    bullets: [
      'Explore regional process patterns',
      'Understand hydrologic differences across landscapes',
      'Compare dominant processes among hydrologic provinces',
      'Provide context for large-sample hydrologic analysis',
      'Inform large-domain hydrologic model development'
    ],
    ctaLabel: 'Open Hydrologic Landscapes and Their Associated Conceptual Models',
    ctaClass: 'resource-cta-green',
    to: '/perceptual_models'
  }
]

const section4AudienceCards = [
  {
    title: 'Researchers',
    icon: mdiAccountSearchOutline,
    description:
      'Use the hub to explore hydrologic similarity, process diversity, watershed function, and knowledge gaps across sites and regions.'
  },
  {
    title: 'Developers',
    icon: mdiCodeBraces,
    description:
      'Use process knowledge to inform model structure, evaluate model assumptions, and support flexible hydrologic modeling frameworks.'
  },
  {
    title: 'Educators',
    icon: mdiSchoolOutline,
    description:
      'Use perceptual models and process summaries to teach watershed behavior, runoff generation, and regional hydrologic diversity.'
  },
  {
    title: 'Practitioners',
    icon: mdiAccountGroupOutline,
    description:
      'Use the hub to access organized hydrologic knowledge and better understand how landscapes influence water movement.'
  }
]
</script>

<style scoped>
.index-page {
  background: #f3f4f6;
}

.page-section {
  min-height: 100vh;
  width: min(1024px, calc(100% - 2rem));
  margin: 0 auto;
}

.section-1 {
  position: relative;
  aspect-ratio: 3556 / 2000;
  min-height: 0;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: right top;
  padding: 2.25rem 1.75rem;
}

.section-1::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(248, 248, 248, 0.95) 0%,
    rgba(248, 248, 248, 0.85) 34%,
    rgba(248, 248, 248, 0.45) 55%,
    rgba(248, 248, 248, 0.08) 72%,
    rgba(248, 248, 248, 0) 100%
  );
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 860px;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

.hero-text {
  max-width: 620px;
  color: #111;
}

.hero-text h1 {
  font-size: clamp(1.5rem, 2.2vw, 2.15rem);
  line-height: 1.16;
  letter-spacing: 0.01em;
  white-space: nowrap;
  margin-bottom: 0.7rem;
  color: #26176f;
}

.hero-subhead {
  font-size: clamp(0.98rem, 1.25vw, 1.12rem);
  line-height: 1.38;
  color: #26176f;
  margin-bottom: 0.9rem;
}

.hero-body {
  font-size: 1.02rem;
  line-height: 1.48;
  margin: 0;
}

.hero-cta-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  width: min(730px, 100%);
  gap: 0.75rem;
}

.hero-cta {
  min-height: 96px;
  border-radius: 0.55rem;
  text-decoration: none;
  font-weight: 700;
  line-height: 1.25;
  font-size: 0.96rem;
  padding: 0.86rem 0.92rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.35rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.13);
  transition:
    transform 170ms ease,
    box-shadow 170ms ease,
    filter 170ms ease;
}

.hero-cta:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 22px rgba(0, 0, 0, 0.28);
  filter: brightness(1.08) saturate(1.08);
}

.hero-cta:active {
  transform: translateY(0);
}

.hero-cta-main {
  display: flex;
  align-items: center;
  gap: 0.42rem;
}

.hero-cta-icon {
  flex: 0 0 auto;
}

.hero-cta-text {
  flex: 1;
  line-height: 1.2;
}

.hero-cta-arrow {
  align-self: flex-end;
  position: relative;
  width: 2.3rem;
  height: 0.85rem;
  margin-top: 0.1rem;
  transition: transform 170ms ease;
}

.hero-cta:hover .hero-cta-arrow {
  transform: translateX(4px);
}

.hero-cta-arrow::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 1.65rem;
  height: 3px;
  background: currentColor;
  border-radius: 2px;
}

.hero-cta-arrow::after {
  content: '';
  position: absolute;
  right: 1px;
  top: 50%;
  width: 0.5rem;
  height: 0.5rem;
  border-top: 3px solid currentColor;
  border-right: 3px solid currentColor;
  transform: translateY(-50%) rotate(45deg);
}

.cta-blue {
  background: #092a78;
  color: #fff;
}

.cta-green {
  background: #1f5f1d;
  color: #fff;
}

.cta-light {
  background: #f7f7f7;
  color: #222;
}

.photo-credit {
  position: absolute;
  top: auto;
  left: auto;
  right: 1rem;
  bottom: 1rem;
  color: white;
  font-style: italic;
  font-size: 0.64rem;
  padding: 0.22rem 0.45rem;
  background: rgba(0, 0, 0, 0.45);
  border-radius: 0.3rem;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
  line-height: 1.2;
  z-index: 4;
  text-decoration: none;
}

.photo-credit:hover {
  text-decoration: underline;
}

.why-hub {
  background-color: #eaf1fb;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.why-hub-body {
  max-width: 100%;
  padding-top: 32px;
  padding-bottom: 32px;
  flex: 1;
  display: flex !important;
  flex-direction: column;
}

.why-hub-row {
  flex: 1;
}

.why-hub-title {
  color: #1a1464;
  font-weight: 700;
  margin-bottom: 24px;
}

.heading {
  font-weight: bold;
  margin-bottom: 23px;
  color: #1a1464;
}

.why-hub-description {
  margin-bottom: 34px;
  color: #757575;
  font-size: small;
}
.why-hub-checklist {
  font-size: small;
  list-style: none;
  padding: 0;
  margin: 0;
}

.why-hub-checklist li {
  display: flex;
  align-items: flex-start;
  margin-bottom: 14px;
  color: #757575;
}

.why-hub-visual {
  display: flex;
  align-items: stretch;
  gap: 24px;
  height: 100%;
}

.why-hub-images {
  position: relative;
  flex: 0.5 0 62%;
}

.why-hub-img {
  position: absolute;
  filter: drop-shadow(0 8px 12px rgba(0, 0, 0, 0.15));
}

.why-hub-img--site {
  width: 76%;
  top: 5%;
  right: 12%;
}

.why-hub-img--province {
  width: 84%;
  top: 35%;
  right: 20%;
}

.why-hub-domain-wrap {
  position: absolute;
  width: 100%;
  top: 60%;
  right: 10%;
}

.why-hub-img--domain {
  position: static;
  width: 100%;
}

.why-hub-step-description {
  font-size: 0.875rem !important;
  width: 170% !important;
  font-weight: 400;
  line-height: 1.425;
  letter-spacing: 0.0178571429em !important;
  font-family: 'Roboto', sans-serif;
  text-transform: none !important;
}

.why-hub-timeline {
  position: relative;
  flex: 1;
  right: 10%;
}

.why-hub-timeline-line {
  position: absolute;
  left: 4px;
  top: 11%;
  bottom: 14%;
  width: 2px;
  background-color: rgba(0, 0, 0, 0.3);
}

.why-hub-timeline-step {
  position: absolute;
  display: flex;
  align-items: flex-start;
  left: 0;
  right: 0;
}

.why-hub-timeline-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #1a1a1a;
  margin-top: 6px;
  margin-right: 16px;
  flex-shrink: 0;
}

.section-3 {
  padding: 1.35rem 1rem;
}

.resource-grid {
  grid-template-columns: 1fr;
}

.resource-card-top h3 {
  font-size: 1.08rem;
}

.resource-card-top {
  min-height: 0;
}

.resource-cta {
  font-size: 0.93rem;
}

.audience-grid {
  grid-template-columns: 1fr;
  gap: 0.8rem;
}

.audience-card {
  min-height: auto;
}

@media (max-width: 960px) {
  .section-1 {
    aspect-ratio: auto;
    min-height: 620px;
    padding: 1.35rem 1rem;
    background-position: center top;
    background-size: contain;
  }

  .section-1::before {
    background: linear-gradient(
      180deg,
      rgba(248, 248, 248, 0.93) 0%,
      rgba(248, 248, 248, 0.8) 42%,
      rgba(248, 248, 248, 0.15) 82%,
      rgba(248, 248, 248, 0) 100%
    );
  }

  .hero-content {
    max-width: 100%;
    gap: 1rem;
  }

  .hero-body {
    font-size: 0.95rem;
  }

  .hero-text h1 {
    font-size: clamp(1.2rem, 5vw, 1.7rem);
    white-space: normal;
  }

  .hero-subhead {
    font-size: clamp(0.92rem, 3.4vw, 1rem);
    line-height: 1.35;
  }

  .hero-cta-row {
    grid-template-columns: 1fr;
  }

  .photo-credit {
    right: 0.75rem;
    bottom: 0.75rem;
    font-size: 0.7rem;
  }

  .why-hub-visual {
    display: grid;
    grid-template-columns: 1.15fr 1fr;
    column-gap: 14px;
    row-gap: 20px;
    min-height: auto;
  }

  /* Promote images and timeline steps to direct children of .why-hub-visual so
     each image can be placed in its own grid row next to its matching description. */
  .why-hub-images,
  .why-hub-timeline {
    display: contents;
  }

  .why-hub-img {
    position: static;
    display: block;
    width: 100% !important;
    margin: 0;
  }

  .why-hub-img--site {
    grid-column: 2;
    grid-row: 1;
    align-self: center;
  }

  .why-hub-img--province {
    grid-column: 2;
    grid-row: 2;
    align-self: center;
  }

  .why-hub-domain-wrap {
    position: static;
    width: 100%;
    right: auto;
    margin: 0;
    grid-column: 2;
    grid-row: 3;
    align-self: center;
  }

  .why-hub-timeline-line {
    display: none;
  }

  .why-hub-timeline-step {
    position: static !important;
    grid-column: 1;
    align-self: center;
  }

  .why-hub-timeline-step:nth-child(2) {
    grid-row: 1;
  }

  .why-hub-timeline-step:nth-child(3) {
    grid-row: 2;
  }

  .why-hub-timeline-step:nth-child(4) {
    grid-row: 3;
  }

  .why-hub-step-description {
    width: 100% !important;
  }

  .section-4 {
    padding: 1.15rem 1rem;
  }

  .section-3 {
    padding: 1.35rem 1rem;
  }

  .resource-grid {
    grid-template-columns: 1fr;
  }

  .resource-card-top h3 {
    font-size: 1.08rem;
  }

  .resource-card-top {
    min-height: 0;
  }

  .resource-cta {
    font-size: 0.93rem;
  }

  .audience-grid {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }

  .audience-card {
    min-height: auto;
  }
}

@media (min-width: 961px) and (max-width: 1220px) {
  .audience-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
