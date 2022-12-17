<template>
    <div style="display: flex;">
        <div class="identifier light-container">
        </div>
        <div class="key-container">
            <div v-for="index in 16" :key="index">
                <LightKey :style="lightColor(index)" />
            </div>
        </div>
    </div> 
</template>

<script>
import LightKey from './LightKey.vue';

export default {
    name: 'LightIndicator',
    props: ['isPlayed'],
    components: { LightKey },
    data() {
        return {
            keys: {
                    '1': false, '2': false, '3': false, '4': false,
                    '5': false, '6': false, '7': false, '8': false,
                    '9': false, '10': false, '11': false, '12': false,
                    '13': false, '14': false, '15': false, '16': false
                },
        }
    },
    methods: {
        lightColor(index) {
            var bgColor;

            if(this.keys[index]) bgColor = "rgb(94, 243, 140) !important";
            else bgColor = "rgb(222, 222, 222) !important"
            return {
                "background-color": bgColor,
            }
        },
        loopMusic(loop) {
            var interval = 700; // ms
            var expected = Date.now() + interval;

            setTimeout(function () {
                var dt = Date.now() - expected; // the drift (positive for overshooting)
                if (dt > interval) {
                    // something really bad happened. Maybe the browser (tab) was inactive?
                    // possibly special handling to avoid futile "catch up" run
                }

                if (this.isPlayed)
                {
                    this.keys[loop+1] = true;
                    this.keys[loop] = false;

                    loop++;

                    if (loop != 18)
                    {
                        expected += interval;
                        setTimeout(this.loopMusic(loop), Math.max(0, interval - dt)); // take into account drift
                    }  
                }
                else {
                    this.keys = {
                        '1': false, '2': false, '3': false, '4': false,
                        '5': false, '6': false, '7': false, '8': false,
                        '9': false, '10': false, '11': false, '12': false,
                        '13': false, '14': false, '15': false, '16': false
                    };
                }
                
            }.bind(this), interval); 

            if (loop == 17) {
                this.$emit('selesai');
            }
        }
    },
    watch: {
        isPlayed: function(newVal, oldVal) { // watch it
            if (newVal ==  true) {
                this.loopMusic(0);
            }

            if(newVal == false) {
                this.keys = {
                    '1': false, '2': false, '3': false, '4': false,
                    '5': false, '6': false, '7': false, '8': false,
                    '9': false, '10': false, '11': false, '12': false,
                    '13': false, '14': false, '15': false, '16': false
                };
            }
        }
    }
}
</script>

<style>
.light-container {
    border-color: #FFF !important;
}
</style>