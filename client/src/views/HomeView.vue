<script setup>
import ContainerKeys from '../components/composer/InstrumentContainer.vue';
import RecordingContainer from '../components/RecordingContainer.vue';
</script>

<template>
  <main>
    <div>
      <RecordingContainer :isReloading="isReloading" @isLoaded="this.loadedMusic" />
    </div>
    <div style="margin-top: 30px;">
      <ContainerKeys :loadedMusic="isLoaded" @loadRecord="this.needReload"/>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      isLoaded: {},
      isReloading: false,
    }
  },
  emits: ['loadedMusic', 'isLoaded'],
  methods: {
    loadedMusic (value) {
      this.isLoaded = value;
    },
    needReload (value) {
      this.isReloading = true;
      setTimeout(() => {
        this.isReloading = false;
      }, 1000);
    }
  }
}
</script>
