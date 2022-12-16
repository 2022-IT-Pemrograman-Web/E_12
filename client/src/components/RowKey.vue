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
            hasPlayed: [false, false, false, false, 
                        false, false, false, false, 
                        false, false, false, false, 
                        false, false, false, false]
        }
    },
    methods: {
        click(index) {
            this.instrument.keys[index] = !this.instrument.keys[index];
            console.log(this.isPlayed);
            console.log(this.instrument.soundFile);
        },
        async getInstrument () {
            const response = await AuthenticationService.getInstrument("C-3_Piano");
            console.log(response.data);
            this.instrument = response.data;
        },
        async loopMusic() {
            var loop = 0;
            var interval = 500; // ms
            var expected = Date.now() + interval;
            var audio = this.instrument.soundFile;

            setTimeout(step, interval);
            function step() {
                var dt = Date.now() - expected; // the drift (positive for overshooting)
                if (dt > interval) {
                    // something really bad happened. Maybe the browser (tab) was inactive?
                    // possibly special handling to avoid futile "catch up" run
                }

                var sfx = new Audio(audio);
                sfx.play();
                loop++;
                console.log(loop);

                if (loop != 16)
                {
                    expected += interval;
                    setTimeout(step, Math.max(0, interval - dt)); // take into account drift
                }  
            }   
        }
    },
    mounted() {
        this.getInstrument();
    }, 
    watch: {
        isPlayed: function(newVal, oldVal) { // watch it
          console.log('Prop changed: ', newVal, ' | was: ', oldVal);
          if(newVal == true) this.loopMusic();
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
