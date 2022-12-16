<template>
    <div class="play-button">
        <button type="button" @click="onClickButton">{{ this.status }}</button>
    </div>
    <div>
        <row-key sound='C-3_Piano' :isPlayed=this.isPlayed @selesai="onClickChild"/>
        <row-key sound='D-3_Piano' :isPlayed=this.isPlayed />
        <row-key sound='E-3_Piano' :isPlayed=this.isPlayed />
    </div>
</template>

<script>
import RowKey from './InstrumentKey.vue'

export default {
    components: { RowKey },
    name: 'ContainerKeys',
    data() {
        return {
            isPlayed: false,
            status: 'Play'
        }
    },
    methods: {
        onClickButton() {
            this.isPlayed = !this.isPlayed;
            if(this.isPlayed) this.status = 'Stop'
            else this.status = 'Play'
        },
        onClickChild (value) {
            this.isPlayed = false;
            this.status = 'Play'
            console.log("selesai");
        }
    },
}
</script>