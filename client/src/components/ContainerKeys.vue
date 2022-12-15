<template>
    <div class="play-button">
        <button type="button">Play</button>
    </div>
    <div>
        <row-key sound='C-3_Piano'/>
        <row-key sound='D'/>
        <row-key sound='E'/>
    </div>
</template>

<script>
import RowKey from './RowKey.vue'

export default {
    components: { RowKey },
    name: 'ContainerKeys',
    data() {
        return {
            sounds: 1
        }
    }
}
</script>