<template>
    <div>
        <div style="margin-top: 8px;">
            <div>Project Name:</div>
            <input type="text" v-model="currentMusic.name">
        </div>
        <div style="margin-top: 8px;">

            <div v-for="index in 7" :key="index">
                <div v-if="listOfInstruments[index-1].isUncreated">
                    <input type="radio" :id=index-1 :value=index-1 v-model="wantToCreateInstrument">
                    <label :for=index-1 style="margin-left: 4px">{{ listOfInstruments[index-1].name }}</label>
                </div>
            </div>

            <div style="margin-bottom: 12px;">
                <div>Instrument Name:</div>
                <input type="text" v-model="newInstrument.name">
            </div>

            <div style="margin-bottom: 12px;">
                <div>Instrument Color:</div>
                <input type="text" v-model="newInstrument.color">
            </div>

            <button class="btn btn-info" @click="createInstrument">Create Instrument</button>
        </div>

        <div class="play-button" style="margin-top: 24px;">
            <button type="button" @click="onClickPlay">{{ this.status }}</button>
            <button type="button" @click="onClickSave">{{ this.saveStatus }}</button>
        </div>

        <div style="margin-top: 24px;">
            <div v-for="i in this.firebaseInstruments">
                <row-key 
                    :sound=i.id
                    :isPlayed=this.isPlayed 
                    :loadedMusic=this.currentMusic
                    :isSaved=this.isSaved
                    @saveInstrument=this.saveBuffer
                    @onClickDelete=this.deleteInstrument
                    @onClickEdit=this.editInstrument
                />
            </div>
        </div>
        <div style="margin-top: 8px; margin-bottom: 18px; margin-left: 72px;">
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
            wantToCreateInstrument: 0,

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

            newInstrument: {
                color: '#FF0000',
                name: '',
            },

            listOfInstruments: [
                {
                    name: 'C-3 Piano',
                    soundFile: '../src/assets/C-3.mp3',
                    isUncreated: true
                }, 
                {
                    name: 'D-3 Piano',
                    soundFile: '../src/assets/D-3.mp3',
                    isUncreated: true
                },
                {
                    name: 'E-3 Piano',
                    soundFile: '../src/assets/E-3.mp3',
                    isUncreated: true
                },
                {
                    name: 'F-3 Piano',
                    soundFile: '../src/assets/F-3.mp3',
                    isUncreated: true
                },
                {
                    name: 'G-3 Piano',
                    soundFile: '../src/assets/G-3.mp3',
                    isUncreated: true
                },
                {
                    name: 'A-3 Piano',
                    soundFile: '../src/assets/A-3.mp3',
                    isUncreated: true
                },
                {
                    name: 'B-3 Piano',
                    soundFile: '../src/assets/B-3.mp3',
                    isUncreated: true
                }
            ],
            firebaseInstruments: '',
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
        async getInstruments() {
            const response = await AuthenticationService.getInstruments();
            this.firebaseInstruments = response.data;

            this.checkCreatedInstruments();
        },  
        async checkCreatedInstruments() {
            await this.firebaseInstruments.forEach(x => {
                this.listOfInstruments.forEach(y => {
                    if(x.id === y.name) y.isUncreated = false;
                })
            });
        },
        async createInstrument () {
            var i = this.wantToCreateInstrument
            var obj = this.newInstrument
            this.listOfInstruments[i].isUncreated = true;
            
            var upload = {soundFile: this.listOfInstruments[i].soundFile, name:obj.name, color: obj.color};

            if (upload.name == '') 
                upload.name = this.listOfInstruments[i].name;

            console.log(upload);


            const response = await AuthenticationService.createInstrument(upload);

            this.getInstruments();
        },
        async deleteInstrument(value) {
            console.log("masuk");
            const response = await AuthenticationService.deleteInstrument(value);

            this.getInstruments();

            this.listOfInstruments.forEach(i => {
                if(i.name == value) i.isUncreated = true;
            });
        },
        async editInstrument(id, obj) {
            const response = await AuthenticationService.editInstrument(id, obj);
            this.firebaseInstruments = [];
            this.getInstruments();
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
                this.editMusic(this.currentMusic.id, obj);
            }
            else {
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
    },
    mounted() {
        this.getInstruments();
    },
}
</script>