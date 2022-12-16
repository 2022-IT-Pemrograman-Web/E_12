<template>
    <div class="play-button">
        <button type="button" @click="onClickPlay()">Play</button>
        <button type="button" @click="onClickPause()">Pause</button>
    </div>
    <div>
        <row-key sound='C-3_Piano' :isPlayed=this.isPlayed />
        <row-key sound='D-3_Piano' :isPlayed=this.isPlayed />
        <row-key sound='E-3_Piano' :isPlayed=this.isPlayed />
    </div>
</template>

<script>
import RowKey from './RowKey.vue'

export default {
    components: { RowKey },
    name: 'ContainerKeys',
    data() {
        return {
            isPlayed: false,
        }
    },
    methods: {
        onClickPlay() {
            this.isPlayed = true;
        },
        onClickPause() {
            this.isPlayed = false;
        }
    },
}
</script>