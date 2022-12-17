<template>
    <div class="recording">
        <div>
            {{ music.name }}
        </div>
        <button type="button" @click="onClickLoad">Load</button>
        <button type="button" @click="onClickDelete">Delete</button>
    </div>
</template>

<script>
export default {
    name: 'RecordingItem',
    props: ['music', 'isLoaded'],
    data() {
        return {

        }
    },
    methods: {
        onClickLoad () {
            this.$emit('isLoaded', this.music);
        }
    },
}
</script>

<style>
.recording {
    border: black 1px solid
}
</style>