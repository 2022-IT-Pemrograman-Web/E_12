<script setup>
import ContainerKeys from '../components/composer/InstrumentContainer.vue';
import RecordingContainer from '../components/RecordingContainer.vue';
</script>

<template>
  <main>
    <div>
      <RecordingContainer @isLoaded="this.loadedMusic" />
    </div>
    <div style="margin-top: 30px;">
      <ContainerKeys :loadedMusic="isLoaded" />
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      isLoaded: {}
    }
  },
  emits: ['loadedMusic', 'isLoaded'],
  methods: {
    loadedMusic (value) {
      this.isLoaded = value;
    }
  }
}
</script>
