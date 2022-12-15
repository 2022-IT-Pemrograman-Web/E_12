<template>
  <div id="app">
    <router-view/>
    <!-- <container-keys/> -->
    <row/>
  </div>
</template>

<script>
import RowKey from './components/RowKey.vue'
import ContainerKeys from './components/ContainerKeys.vue'
import Row from './components/Row.vue'

export default {
  components: { RowKey, ContainerKeys, Row },
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
