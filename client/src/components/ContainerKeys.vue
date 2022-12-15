<template>
    <div>
        <row/>
        <div class="container" v-for="sound in sounds" :key="sound">
            <row-key/>
        </div>
    </div>
</template>

<script>
import RowKey from './RowKey.vue'
import Row from './Row.vue'

export default {
    components: { RowKey, Row },
    name: 'ContainerKeys',
    data() {
        return {
            sounds: 4
        }
    }
}
</script>