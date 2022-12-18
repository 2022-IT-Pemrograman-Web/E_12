<script setup>
import ContainerKeys from '../components/composer/InstrumentContainer.vue';
import RecordingContainer from '../components/RecordingContainer.vue';
import AuthenticationService from '@/services/AutheticationService'
</script>

<template>
  <main>
    <div style="background-color:aqua;">
      <RecordingContainer :isReloading="isReloading" @isLoaded="this.loadedMusic" />
    </div>
    <button style="margin-top: 30px;" class="button-1" @click="onClickNew">New Project</button>
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
      console.log("apa isinya");
      console.log(value);
      this.isLoaded = value;
    },
    needReload (value) {
      this.isReloading = true;
      setTimeout(() => {
        this.isReloading = false;
      }, 1000);
    },
    async onClickNew() {
      var obj = {
        name: "New Music",
        instruments: {}
      }
      this.loadedMusic(obj);
      this.needReload(1);
    }
  }
}
</script>
