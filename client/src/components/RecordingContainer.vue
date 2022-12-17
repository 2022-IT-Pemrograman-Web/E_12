<template>
    <div v-for="(music, id) in musics" :key="id">
        <RecordingItem :music="music" @isLoaded="loadedMusic"/>
    </div>
</template>

<script>
import AuthenticationService from '@/services/AutheticationService'
import RecordingItem from './RecordingItem.vue';

export default {
    components: { RecordingItem },
    name: 'ContainerKeys',
    emits: ['loadedMusic', 'isLoaded'],
    data() {
        return {
            musics: []
        }
    },
    methods: {
        async getMusics () {
            const response = await AuthenticationService.getMusics();
            this.musics = response.data;
        },
        loadedMusic (value) {
            this.$emit('isLoaded', value);
        }
    },
    mounted() {
        this.getMusics();
    },
}
</script>