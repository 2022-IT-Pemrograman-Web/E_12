<template>
    <div class="recording">
        <div>
            {{ music.name }}
        </div>
        <button class="button-39" type="button" @click="onClickLoad">Load</button>
        <button style="background-color:gainsboro" class="button-39" type="button" @click="deleteMusic">Delete</button>
    </div>
</template>

<script>
import AuthenticationService from '@/services/AutheticationService'

export default {
    name: 'RecordingItem',
    props: ['music'],
    methods: {
        onClickLoad () {
            this.$emit('isLoaded', this.music);
        },
        async deleteMusic() {
            console.log("ALHAMDULILLAH MASUK");
            console.log(this.music.id);
            const response = await AuthenticationService.deleteMusic(this.music.id);

            this.$emit('isDeleted', true);
        },
    },
}
</script>

<style>
.recording {
    border: black 1px solid
}
</style>