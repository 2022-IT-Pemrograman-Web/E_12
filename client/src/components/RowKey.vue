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
        loopMusic() {
            var i = 0;
            var interval = setInterval(() => {
                this.playMusic();
                i++;
                console.log(i);
                if(i == 16) clearInterval(interval);
            }, 1000);
        },
        playMusic() {
            var sfx = new Audio(this.instrument.soundFile);
            sfx.play();
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
