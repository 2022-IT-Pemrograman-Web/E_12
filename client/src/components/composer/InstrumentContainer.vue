<template>
    <div>
        <div class="play-button">
            <button type="button" @click="onClickPlay">{{ this.status }}</button>
            <button type="button" @click="onClickSave">{{ this.saveStatus }}</button>
        </div>
        <div style="margin-top: 8px;">
            <div>Project Name:</div>
            <input type="text" v-model="currentMusic.name">
        </div>
        <div style="margin-top: 8px;">

            <div v-for="index in 7" :key="id">
                <input type="checkbox" :value=listOfInstruments[index-1] v-model="createdInstruments[index-1]">
                <label :for=listOfInstruments[index-1] style="margin-left: 4px">{{ listOfInstruments[index-1] }}</label>
            </div>

            <button class="btn btn-info" @click="createInstrument">Create Instrument</button>

            <!-- <button class="btn btn-info" @click="onPickFile">Add Instrument</button>
            <input
                type="file"
                style="display: none"
                ref="fileInput"
                accept="image/*"
                @change="onFilePicked"
            /> -->

        </div>
        
        <!-- <div v-for="i in this.currentMusic.instruments.length"> -->
            {{ currentMusic.instruments }}
        <!-- </div> -->

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
            wantToCreateInstrument: '',

            isPlayed: false,
            isSaved: false,
            saveStatus: 'Save',
            status: 'Play',
            currentMusic: {
                name: 'My Music',
                instruments: {}
            },
            newInstruments: {},
            uploadedAudio: {},

            listOfInstruments: 
            [ 'C-3_Piano', 'D-3_Piano', 'E-3_Piano', 'F-3_Piano', 'G-3_Piano', 'A-3_Piano', 'B-3_Piano'],

            createdInstruments: {
                'C-3_Piano': false,
                'D-3_Piano': false,
                'E-3_Piano': false,
                'F-3_Piano': false,
                'G-3_Piano': false,
                'A-3_Piano': false,
                'B-3_Piano': false,
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
                instruments: this.currentMusicInstruments
            }

            if(this.currentMusic.hasOwnProperty('id')){
                console.log("alhamdulillah ada id nya...")
                this.editMusic(this.currentMusic.id, obj);
            }
            else {
                console.log("cukup tau");
                this.createMusic(obj);
            }
        },
        saveBuffer(value) {
            this.currentMusicInstruments = {
                ...this.currentMusicInstruments,
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