<template>
  <v-container fluid class="about-page px-0">
    <section class="about-shell">
      <div class="about-hero">
        <div class="about-hero-text">
          <p class="about-eyebrow">PROJECTS, PEOPLE, & PUBLICATIONS</p>
          <h1 class="about-title">About the Hydrological Process Knowledge Hub</h1>
          <p class="about-text">
            A shared platform for exploring hydrologic process knowledge across site, regional, and
            continental scales. Below you can find the team, funding resources, publications, and
            data citations behind each project.
          </p>
        </div>

        <v-img
          :src="aboutTemplate"
          alt="Hydrologic Process Knowledge Hub overview"
          class="about-image"
          cover
        />
      </div>

      <section class="about-citation">
        <h2 class="citation-title">
          <v-icon class="citation-title-icon" :icon="mdiFileDocumentOutline" size="18" />
          How to cite
        </h2>
        <p class="citation-lead">
          Journal articles document the scientific methods; HydroShare hosts reusable maps,
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
              Images, geospatial feature boundaries, popup, or sidebar text come from HydroShare.
            </p>
          </article>
        </div>
      </section>
    </section>
  </v-container>
</template>

<script setup>
import { mdiFileDocumentOutline } from '@mdi/js'
import aboutTemplate from '@/assets/justin-mcfadden-unsplash.jpg'
</script>

<style scoped>
.about-page {
  background: #f2f3f5;
  min-height: calc(100vh - 64px);
  padding: 0 0 2rem;
}

.about-shell {
  width: min(1024px, calc(100% - 2rem));
  margin: 0 auto;
  background: #ffffff;
  box-shadow: none;
  font-family: 'Roboto', sans-serif;
}

.about-hero {
  display: grid;
  grid-template-columns: 0.95fr 1.45fr;
  align-items: stretch;
  height: 200px;
  position: relative;
}

.about-hero-text {
  padding: 0.7rem 1.2rem 0.55rem;
  position: relative;
  z-index: 3;
  margin-right: -110px;
  max-width: calc(100% + 110px);
}

.about-eyebrow {
  margin: 0 0 0.3rem;
  font-size: 0.82rem;
  letter-spacing: 0.05em;
  color: #666a71;
  font-weight: 700;
}

.about-title {
  margin: 0 0 0.28rem;
  font-size: clamp(0.96rem, 1.25vw, 1.2rem);
  line-height: 1.24;
  letter-spacing: 0.01em;
  color: #26176f;
}

.about-text {
  margin: 0;
  color: #202329;
  line-height: 1.34;
  font-size: 0.96rem;
}

.about-image {
  height: 200px;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.about-image :deep(.v-img__img) {
  object-position: 72% center;
  -webkit-mask-image: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.22) 10%,
    rgba(0, 0, 0, 0.58) 22%,
    rgba(0, 0, 0, 0.86) 34%,
    rgba(0, 0, 0, 1) 46%
  );
  mask-image: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.22) 10%,
    rgba(0, 0, 0, 0.58) 22%,
    rgba(0, 0, 0, 0.86) 34%,
    rgba(0, 0, 0, 1) 46%
  );
}

.about-image::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.38) 0%,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.08) 36%,
    rgba(255, 255, 255, 0.02) 50%,
    rgba(255, 255, 255, 0) 66%
  );
  filter: blur(4px);
  transform: scale(1.03);
  pointer-events: none;
  z-index: 2;
}

.about-citation {
  padding: 0.8rem 1.5rem 0.95rem;
  border-top: 1px solid #d7e4f2;
  background: #e9f2fc;
}

.citation-title {
  margin: 0 0 0.2rem;
  font-size: 0.95rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  color: #26176f;
}

.citation-title-icon {
  margin-right: 0.5rem;
  color: #26176f;
}

.citation-lead {
  margin: 0 0 0.6rem;
  color: #2b2b31;
  font-size: 0.82rem;
  line-height: 1.3;
}

.citation-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.65rem;
}

.citation-card {
  background: #c9dbef;
  border: 0;
  padding: 0.5rem 0.62rem;
}

.citation-card h3 {
  margin: 0 0 0.15rem;
  font-size: 0.82rem;
  color: #14306d;
}

.citation-card p {
  margin: 0;
  color: #33363d;
  font-size: 0.8rem;
  line-height: 1.32;
}

@media (max-width: 900px) {
  .about-shell {
    width: calc(100% - 1rem);
  }

  .about-hero {
    display: block;
    position: relative;
    height: 220px;
    min-height: 220px;
    overflow: hidden;
  }

  .about-hero-text {
    margin-right: 0;
    max-width: 100%;
    padding: 0.75rem 1rem 0.65rem;
  }

  .about-image {
    position: absolute;
    inset: 0;
    height: 100%;
    min-height: 0;
    aspect-ratio: auto;
    opacity: 1;
  }

  .about-image :deep(.v-img__img) {
    object-position: 70% center;
    -webkit-mask-image: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.24) 12%,
      rgba(0, 0, 0, 0.62) 26%,
      rgba(0, 0, 0, 0.9) 40%,
      rgba(0, 0, 0, 1) 54%
    );
    mask-image: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.24) 12%,
      rgba(0, 0, 0, 0.62) 26%,
      rgba(0, 0, 0, 0.9) 40%,
      rgba(0, 0, 0, 1) 54%
    );
  }

  .about-image::after {
    display: block;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.6) 0%,
      rgba(255, 255, 255, 0.36) 28%,
      rgba(255, 255, 255, 0.14) 48%,
      rgba(255, 255, 255, 0.04) 64%,
      rgba(255, 255, 255, 0) 78%
    );
    filter: blur(3px);
    transform: scale(1.04);
  }

  .about-title {
    font-size: clamp(0.88rem, 3.2vw, 1.08rem);
  }

  .about-text {
    font-size: 0.95rem;
  }

  .citation-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .about-image {
    display: none;
  }

  .about-hero {
    height: auto;
    min-height: 0;
  }

}
</style>
