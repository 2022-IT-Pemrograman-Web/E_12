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

        <div style="margin-top: 32px;">
            <!-- <div v-for="index in 7" :key="id">
                <div v-if="awesome">Vue is awesome!</div>
            </div> -->

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
        // onPickFile () {
        //     this.$refs.fileInput.click()
        // },
        // async onFilePicked (event) {
        //     const files = event.target.files

        //     let filename = files[0].name
        //     let audioUrl;
        //     const fileReader = new FileReader()
        //     fileReader.addEventListener('load', () => {
        //         audioUrl = fileReader.result
        //     })
        //     fileReader.readAsDataURL(files[0])
        //     this.uploadedAudio = files[0];

        //     const response = await AuthenticationService.receive(this.uploadedAudio);
        //     console.log(response);
            
        // },
        async createInstrument () {
            var i = this.wantToCreateInstrument
            var obj = this.newInstrument
            this.listOfInstruments[i].isUncreated = true;
            
            var upload = {soundFile: this.listOfInstruments[i].soundFile, name:obj.name, color: obj.color};

            if (upload.name == '') 
                upload.name = this.listOfInstruments[i].name;

            console.log(upload);


            const response = await AuthenticationService.createInstrument(upload);
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