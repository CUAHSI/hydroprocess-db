<template>
  <v-container fluid class="pa-0">
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
                  <img
                    :src="domainImg"
                    alt="Domain scale"
                    class="why-hub-img why-hub-img--domain"
                  />
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
    <section class="page-section"></section>

    <!-- Section 4 -->
    <section class="page-section"></section>
  </v-container>
</template>

<script setup>
import {
  mdiCheckboxMarked,
  mdiDatabaseOutline,
  mdiInformationOutline,
  mdiMapMarkerRadiusOutline
} from '@mdi/js'
import { RouterLink } from 'vue-router'
import landingBg from '@/assets/landing section.png'
import siteImg from '@/assets/aboutPage/siteBackground.png'
import provinceImg from '@/assets/aboutPage/provinceBackground.png'
import domainImg from '@/assets/aboutPage/domainBackground.png'
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
</script>

<style scoped>
.page-section {
  min-height: 100vh;
  width: min(1024px, calc(100% - 2rem));
  margin: 0 auto;
  padding: 4rem 0;
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
  margin-top: -64px;
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
  margin-bottom: 4px;
}

.heading {
  font-weight: bold;
  margin-bottom: 3px;
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
  top: 10%;
  right: 12%;
}

.why-hub-img--province {
  width: 84%;
  top: 37%;
  right: 20%;
}

.why-hub-img--domain {
  width: 100%;
  top: 60%;
  right: 10%;
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
    flex-direction: column;
    min-height: auto;
  }

  .why-hub-images {
    position: static;
    flex: none;
    height: auto;
  }

  .why-hub-img {
    position: static;
    display: block;
    width: 80% !important;
    margin: 0 auto 16px;
  }

  .why-hub-timeline {
    position: static;
    flex: none;
    width: 100%;
    height: auto;
    margin-top: 16px;
    right: 10%;
  }

  .why-hub-timeline-line {
    display: none;
  }

  .why-hub-timeline-step {
    position: static !important;
    margin-bottom: 16px;
  }
}
</style>
