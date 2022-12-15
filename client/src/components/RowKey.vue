<template>
    <div class="identifier">
        <p>{{ sound }}</p>
    </div>
    <div class="key-container">
        <div v-for="index in 16" :key="index">
            <div class="key" @click="click(index)">{{instrument.keys[index]}}</div>
        </div>
    </div>
</template>

<script>
import AuthenticationService from '@/services/AutheticationService'
export default {
    name: 'RowKey',
    props: ['sound'],
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
        },
        async getInstrument () {
            const response = await AuthenticationService.getInstrument("C-3_Piano");
            console.log(response.data);
            this.instrument = response.data;
        }
    },
    mounted() {
        this.getInstrument();
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
