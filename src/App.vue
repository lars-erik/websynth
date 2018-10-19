<template>
  <div id="app">
    <sequencer :beats="beats"></sequencer>
    <pre>{{debugOutput}}</pre>
  </div>
</template>

<script>
import Sequencer from './components/Sequencer.vue'
import Vue from "vue";

export default {
  name: 'app',
  data() {
    return {
      beats: [],
      debugOutput: ""
    }
  },
  components: {
    Sequencer
  },
  watch: {
    beats: {
      handler() {
        Vue.set(this,"debugOutput", JSON.stringify(this.beats));
      },
      deep: true
    }
  }
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
