<script setup>
import ContainerKeys from '../components/composer/InstrumentContainer.vue';
import RecordingContainer from '../components/RecordingContainer.vue';
import AuthenticationService from '@/services/AutheticationService'
</script>

<template>
  <main>
    <h2>BeatMaker</h2>
    <br>  
    <h5>List Project</h5>
    <div style="background-color:honeydew;">
      <RecordingContainer :isReloading="isReloading" @isLoaded="this.loadedMusic" />
    </div>
    <button style="margin-top: 30px;" class="button-1" @click="onClickNew">New Project</button>
    
    <br>
    <h5 style="margin-top: 30px;">Workspace</h5>
    <div style="margin-top: 10px;">
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
