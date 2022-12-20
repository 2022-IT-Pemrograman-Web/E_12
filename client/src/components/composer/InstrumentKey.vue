<template>
    <div style="display: flex;">
        <div class="identifier">
            <p>{{ this.instrument.name }}</p>
        </div>
        <div class="key-container" style="margin-left: 17px">
            <div v-for="index in 16" :key="index">
                <div class="key" :style="keyObject(index)" @click="click(index)"></div>
            </div>
        </div>
        <div class="crud" style="margin-left: 18px">
            <button @click="deleteInstrument">Delete</button>
            <button @click="editInstrument">edit</button>
            <form>
                <label for="name">name</label><input type="text" v-model="newInstrument.name">
                <label for="color">color</label><input type="text" v-model="newInstrument.color">
            </form>
        </div>
        <audio ref="audio"></audio>
    </div>
</template>

<script>
import AuthenticationService from '@/services/AutheticationService'

export default {
    name: 'RowKey',
    props: ['sound', 'isPlayed', 'isSaved', 'loadedMusic'],
    emits: ['selesai', 'saveInstrument', 'onClickDelete', 'onClickEdit'],
    data() {
        return {
            instrument: {},
            keys: {
                '1': false, '2': false, '3': false, '4': false,
                '5': false, '6': false, '7': false, '8': false,
                '9': false, '10': false, '11': false, '12': false,
                '13': false, '14': false, '15': false, '16': false
            },
            musicPlaying: '',
            sfx: '',
            newInstrument: {}
        }
    },
    methods: {
        keyObject(index) {
            var bgColor;

            if(!this.keys[index])
            {
                if(index <= 4 || (index >= 9 && index <= 12)) bgColor = "rgb(222, 222, 222)";
                else bgColor = "rgb(238, 238, 238)"; 
            }
            else bgColor = this.instrument.color;
            
            return {
                "background-color": bgColor + " !important",
            }
        },
        click(index) {
            this.keys[index] = !this.keys[index];
        },
        async getInstrument () {
            const response = await AuthenticationService.getInstrument(this.sound);
            console.log(this.sound);
            console.log(response.data);
            this.instrument = response.data;

            this.sfx = {
                '1': new Audio(this.instrument.soundFile),
                '2': new Audio(this.instrument.soundFile),
                '3': new Audio(this.instrument.soundFile),
                '4': new Audio(this.instrument.soundFile),
                '5': new Audio(this.instrument.soundFile),
                '6': new Audio(this.instrument.soundFile),
                '7': new Audio(this.instrument.soundFile),
                '8': new Audio(this.instrument.soundFile),
                '9': new Audio(this.instrument.soundFile),
                '10': new Audio(this.instrument.soundFile),
                '11': new Audio(this.instrument.soundFile),
                '12': new Audio(this.instrument.soundFile),
                '13': new Audio(this.instrument.soundFile),
                '14': new Audio(this.instrument.soundFile),
                '15': new Audio(this.instrument.soundFile),
                '16': new Audio(this.instrument.soundFile)
            }
        },
        loopMusic(loop) {
            var interval = 700; // ms
            var expected = Date.now() + interval;
            var audio = this.instrument.soundFile;

            setTimeout(function () {
                var dt = Date.now() - expected; // the drift (positive for overshooting)
                if (dt > interval) {
                    // something really bad happened. Maybe the browser (tab) was inactive?
                    // possibly special handling to avoid futile "catch up" run
                }

                if (this.isPlayed)
                {
                    if(this.keys[loop+1])
                    {
                        this.sfx[loop+1].play();
                    }
                    loop++;
                    console.log(loop);
                    console.log(this.isPlayed);

                    if (loop != 16)
                    {
                        expected += interval;
                        setTimeout(this.loopMusic(loop), Math.max(0, interval - dt)); // take into account drift
                    }  
                }
                
            }.bind(this), interval); 

            if (loop == 15) {
                this.$emit('selesai');
            }
        },
        loadMusic() {
            if(this.loadedMusic.instruments.hasOwnProperty(this.sound))
            {
                this.keys = this.loadedMusic.instruments[this.sound];
            }
            else 
            {
                this.keys = {
                    '1': false, '2': false, '3': false, '4': false,
                    '5': false, '6': false, '7': false, '8': false,
                    '9': false, '10': false, '11': false, '12': false,
                    '13': false, '14': false, '15': false, '16': false
                };
            }
        },
        saveMusic() {
            var obj = {
                [this.sound]: this.keys
            }
            this.$emit('saveInstrument', obj);
        },
        deleteInstrument() {
            console.log(this.sound);
            this.$emit('onClickDelete', this.sound);
        },
        editInstrument() {
            this.$emit('onClickEdit', this.newInstrument);
            console.log(this.newInstrument);
        }
    },
    mounted() {
        this.getInstrument();
    }, 
    watch: {
        isPlayed: function(newVal, oldVal) {
            if (newVal ==  true) {
                this.loopMusic(0);
            }
        },
        loadedMusic: function(newVal, oldVal) { 
            this.loadMusic();
        },
        isSaved: function(newVal, oldVal) {
            if(newVal == true) {
                this.saveMusic();
            }
        }
    }
}
</script>

<style>
.identifier {
    border: rgb(89, 89, 89) 2px solid;
    border-radius: 4px;
    margin: 2px;
    margin-right: 6px;
    padding: 2px 6px;
    width: 100px;
}
.key-container {
    display: grid;
    grid-template-columns: repeat(16, 1fr);
}

.key {
    width: 40px;
    height: 60px !important;
    margin: 2px;
    border-radius: 4px !important;
   
}
</style>
