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
    <section class="page-section"></section>

    <!-- Section 3 -->
    <section class="page-section"></section>

    <!-- Section 4 -->
    <section class="page-section"></section>
  </v-container>
</template>

<script setup>
import { mdiDatabaseOutline, mdiInformationOutline, mdiMapMarkerRadiusOutline } from '@mdi/js'
import { RouterLink } from 'vue-router'
import landingBg from '@/assets/landing section.png'
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
}
</style>
