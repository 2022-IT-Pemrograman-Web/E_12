<template>
    <div class="key-container">
        <div v-for="i in keys" :key="i">
            <div class="key" :class="{ active: i.active }" @click="click(i)">{{i.active}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RowKey',
    data() {
        return {
            keys: [
                { active: true }, { active: true }, { active: true }, { active: true },
                { active: true }, { active: true }, { active: true }, { active: true },
                { active: true }, { active: true }, { active: true }, { active: true },
                { active: true }, { active: true }, { active: true }, { active: true },
            ],
        }
    },
    methods: {
        click(i) {
            i.active = !i.active;
        }
    }
}
</script>

<style>

.key-container {
    display: grid;
    grid-template-columns: repeat(16, 1fr);
    background-color: red;
}

.key {
    height: 20px;
    padding: 3px;
    margin: 2px;
    background-color: beige;
}

.active {
    background-color: blue;
}
</style>
