<template>
    <div class="play-button">
        <button type="button" @click="onClickPlay">{{ this.status }}</button>
        <button type="button" @click="onClickSave">{{ this.saveStatus }}</button>
    </div>
    <div style="margin-top: 8px;">
        <div>Project Name:</div>
        <input type="text" v-model="currentMusic.name">
    </div>
    <div style="margin-top: 12px;">
        <row-key 
            sound='C-3_Piano' 
            :isPlayed=this.isPlayed 
            :loadedMusic=this.currentMusic
            :isSaved=this.isSaved
            @saveInstrument=this.saveBuffer
        />

        <row-key 
            sound='D-3_Piano' 
            :isPlayed=this.isPlayed 
            :loadedMusic=this.currentMusic
            :isSaved=this.isSaved
            @saveInstrument=this.saveBuffer
        />

        <row-key 
            sound='E-3_Piano' 
            :isPlayed=this.isPlayed 
            :loadedMusic=this.currentMusic
            :isSaved=this.isSaved
            @saveInstrument=this.saveBuffer
        />
    </div>
    <div style="margin-top: 8px;">
        <LightIndicator :isPlayed=this.isPlayed @selesai="onClickChild" />
    </div>
</template>

<script>
import AuthenticationService from '@/services/AutheticationService'
import RowKey from './InstrumentKey.vue'
import LightIndicator from './LightIndicator.vue'

export default {
    components: { RowKey, LightIndicator },
    props: ['loadedMusic'],
    name: 'ContainerKeys',
    emits: ['loadRecord'],
    data() {
        return {
            isPlayed: false,
            isSaved: false,
            saveStatus: 'Save',
            status: 'Play',
            currentMusic: {
                name: 'My Music',
                instruments: {}
            },
            newInstruments: {}
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
        },
        async onClickSave() {
            this.isSaved = true;
            this.saveStatus = 'Saving...'
            await setTimeout(this.saveMusic, 1000);
        },
        async editMusic(id, obj) {
            console.log(id, obj);
            const response = await AuthenticationService.editMusic(id, obj);
            this.isSaved = false;
            this.saveStatus = 'Save';
        },
        async createMusic(obj) {
            const response = await AuthenticationService.createMusic(obj);
            this.isSaved = false;
            this.saveStatus = 'Save';

            this.$emit('loadRecord');
        },
        saveMusic() {
            var obj = {
                name: this.currentMusic.name,
                instruments: this.newInstruments
            }

            if(this.currentMusic.hasOwnProperty('id')){
                this.editMusic(this.currentMusic.id, obj);
            }
            else this.createMusic(obj);
        },
        saveBuffer(value) {
            this.newInstruments = {
                ...this.newInstruments,
                ...value
            };
        },
        loadMusic() {
            this.currentMusic = this.loadedMusic;
        }
    },
    watch: {
        loadedMusic: function(newVal, oldVal) {
            this.loadMusic();
        }
    }
}
</script>