<template>
    <div class="row">
        <p class="inline">{{ soundName }}</p>
        <row-key class="inline"/>
    </div>
</template>

<script>
import RowKey from './RowKey.vue';

export default {
    components: { RowKey },
    name: 'Row',
    data() {
        return {
            soundName: "tes",
        }
    },
    methods: {
    
    }
}
</script>

<style>
    .row {
        display: inline-block;
    }

    .inline {
        display: inline;
    }
</style>
