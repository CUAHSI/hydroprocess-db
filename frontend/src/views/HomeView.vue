<template>
  <div class="why-hub">
    <v-img :src="landingImg" height="140" cover class="why-hub-banner"></v-img>

    <v-container fluid class="why-hub-body">
      <v-row align="stretch" class="why-hub-row">
        <v-col cols="12" md="5">
          <h2 class="why-hub-title mb-4">Why This Hub?</h2>

          <p class="heading">Hydrologic process knowledge exists at multiple scales.</p>

          <p class="text-medium-emphasis mb-4">
            Site-based studies provide detailed evidence about how individual watersheds function
            (Hydrological Process Database), while regional and continental syntheses help organize
            that knowledge across a broader landscape (Hydrologic Perceptual Models). This hub
            connects both perspectives in one place.
          </p>

          <p class="font-weight-bold mb-3">
            By bridging these projects together, the hub helps users:
          </p>

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
              <img :src="domainImg" alt="Domain scale" class="why-hub-img why-hub-img--domain" />
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
                  <div class="text-body-2 text-medium-emphasis">{{ step.description }}</div>
                </div>
              </div>
            </div>
          </div>

          <p class="text-caption font-italic text-right text-medium-emphasis mt-2">
            Conceptual image generated with ChatGPT / DALL·E, 2026.
          </p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { mdiCheckboxMarked } from '@mdi/js'
import landingImg from '@/assets/aboutPage/landingSection.png'
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
.why-hub {
  background-color: #eaf1fb;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.why-hub-banner {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
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
}

.heading {
  font-weight: bold;
  margin-bottom: 3px;
  color: #1a1464;
}

.why-hub-checklist {
  list-style: none;
  padding: 0;
  margin: 0;
}

.why-hub-checklist li {
  display: flex;
  align-items: flex-start;
  margin-bottom: 14px;
}

.why-hub-visual {
  display: flex;
  align-items: stretch;
  gap: 24px;
  height: 100%;
}

.why-hub-images {
  position: relative;
  flex: 1 0 62%;
}

.why-hub-img {
  position: absolute;
  filter: drop-shadow(0 8px 12px rgba(0, 0, 0, 0.15));
}

.why-hub-img--site {
  width: 46%;
  top: 0;
  right: 12%;
}

.why-hub-img--province {
  width: 64%;
  top: 27%;
  right: 0;
}

.why-hub-img--domain {
  width: 92%;
  top: 52%;
  left: 0;
}

.why-hub-timeline {
  position: relative;
  flex: 1;
}

.why-hub-timeline-line {
  position: absolute;
  left: 4px;
  top: 8%;
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
