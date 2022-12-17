<template>
    <div class="play-button">
        <button type="button" @click="onClickPlay">{{ this.status }}</button>
        <button type="button" @click="onClickSave">Save</button>
    </div>
    <div style="margin-top: 8px;">
        <div>Project Name:</div>
        <input type="text" v-model="currentMusic.name">
    </div>
    <div style="margin-top: 12px;">
        <row-key sound='C-3_Piano' :isPlayed=this.isPlayed />
        <row-key sound='D-3_Piano' :isPlayed=this.isPlayed />
        <row-key sound='E-3_Piano' :isPlayed=this.isPlayed />
    </div>
    <div style="margin-top: 8px;">
        <LightIndicator :isPlayed=this.isPlayed @selesai="onClickChild" />
    </div>
</template>

<script>
import RowKey from './InstrumentKey.vue'
import LightIndicator from './LightIndicator.vue'

export default {
    components: { RowKey, LightIndicator },
    props: ['loadedMusic'],
    name: 'ContainerKeys',
    emits: ['selesai'],
    data() {
        return {
            isPlayed: false,
            status: 'Play',
            currentMusic: {
                name: 'My Music',
                instruments: {}
            }
        }
    },
    methods: {
        onClickPlay() {
            this.isPlayed = !this.isPlayed;
            if(this.isPlayed) this.status = 'Stop'
            else this.status = 'Play'
        },
        onClickChild (value) {
            this.isPlayed = false;
            this.status = 'Play'
            console.log("selesai");
        },
        loadMusic() {
            this.currentMusic
            console.log(this.loadedMusic.instruments);
        }
    },
    watch: {
        loadedMusic: function(newVal, oldVal) {
            this.loadMusic();
        }
    }
}
</script>