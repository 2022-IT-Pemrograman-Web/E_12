<template>
    <div class="identifier">
        <p>{{ this.instrument.name }}</p>
    </div>
    <div class="key-container">
        <div v-for="index in 16" :key="index">
            <div class="key" @click="click(index)">{{instrument.keys[index]}}</div>
        </div>
    </div>
    <audio ref="audio"></audio>
</template>

<script>
import AuthenticationService from '@/services/AutheticationService'
export default {
    name: 'RowKey',
    props: ['sound', 'isPlayed'],
    emits: ['selesai'],
    data() {
        return {
            instrument: {
                name: this.sound,
                soundFile: '',
                keys: {
                    '1': false, '2': false, '3': false, '4': false,
                    '5': false, '6': false, '7': false, '8': false,
                    '9': false, '10': false, '11': false, '12': false,
                    '13': false, '14': false, '15': false, '16': false
                }
            },
            musicPlaying: ''
        }
    },
    methods: {
        click(index) {
            this.instrument.keys[index] = !this.instrument.keys[index];
        },
        async getInstrument () {
            const response = await AuthenticationService.getInstrument(this.sound);
            this.instrument = response.data;
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
                    if(this.instrument.keys[loop+1])
                    {
                        var sfx = new Audio(audio);
                        sfx.play();
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
        }
    },
    mounted() {
        this.getInstrument();
    }, 
    watch: {
        isPlayed: function(newVal, oldVal) { // watch it
            if (newVal ==  true) {
                this.loopMusic(0);
            }
        }
    }
}
</script>

<style>
.key-container {
    display: grid;
    grid-template-columns: repeat(16, 1fr);
    background-color: gray;
}

.key {
    height: 20px;
    padding: 3px;
    margin: 2px;
    background-color: beige;
}

.active {
    background-color: blue;
}
</style>
