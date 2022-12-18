<template>
    <div v-for="(music, id) in musics" :key="id">
        <RecordingItem :music="music" @isLoaded="loadedMusic" @isDeleted="deleteMusic"/>
    </div>
</template>

<script>
import AuthenticationService from '@/services/AutheticationService'
import RecordingItem from './RecordingItem.vue';

export default {
    components: { RecordingItem },
    name: 'ContainerKeys',
    props: ['isReloading'],
    emits: ['loadedMusic', 'isLoaded', 'isDeleted'],
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
        },
        deleteMusic() {
            this.getMusics();
        }
    },
    mounted() {
        this.getMusics();
    },
    watch: {
        isReloading: function(newVal, oldVal) {
            if(newVal) this.getMusics();
        }
    }
}
</script>