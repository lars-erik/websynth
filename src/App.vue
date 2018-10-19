<template>
  <div id="app">
    <input class="tempo" type="range" min="30" max="240" value="60" v-model="tempo"/>
    {{tempo}}
    <sequencer :beats="beats"></sequencer>
    <pre>{{debugOutput}}</pre>
  </div>
</template>

<script>
import Sequencer from './components/Sequencer.vue'
import Vue from "vue";

let lookahead = 25,
    scheduleAheadTime = .1;

export default {
  name: 'app',
  data() {
    return {
      tempo: 60,
      beats: [],
      debugOutput: "",
      ctx: null,
      currentNote: 0,
      nextNoteTime: 0
    }
  },
  components: {
    Sequencer
  },
  created() {
    this.ctx = new window.AudioContext();

  },
  watch: {
    beats: {
      handler() {
        Vue.set(this,"debugOutput", JSON.stringify(this.beats));
      },
      deep: true
    }
  },
  methods: {
    nextNote() {
      const secondsPerBeat = 60 / this.tempo;
      this.nextNoteTime += secondsPerBeat;
      this.currentNote++;
      if (this.currentNote === 16) {
        this.currentNote = 0;
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

input[type=range].tempo {
  width: 600px;
}

input[type=range] {
  -webkit-appearance: none;
  margin: 13px 0;
  width: 100%;
}
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  background: #3071a9;
  border-radius: 1.3px;
  border: 0.2px solid #010101;
}
input[type=range]::-webkit-slider-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #000000;
  height: 26px;
  width: 16px;
  border-radius: 8px;
  background: #ffffff;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -9px;
}
input[type=range]:focus::-webkit-slider-runnable-track {
  background: #367ebd;
}
input[type=range]::-moz-range-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  background: #3071a9;
  border-radius: 1.3px;
  border: 0.2px solid #010101;
}
input[type=range]::-moz-range-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #000000;
  height: 26px;
  width: 16px;
  border-radius: 8px;
  background: #ffffff;
  cursor: pointer;
}
input[type=range]::-ms-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  animate: 0.2s;
  background: transparent;
  border-color: transparent;
  border-width: 16px 0;
  color: transparent;
}
input[type=range]::-ms-fill-lower {
  background: #2a6495;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}
input[type=range]::-ms-fill-upper {
  background: #3071a9;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}
input[type=range]::-ms-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #000000;
  height: 26px;
  width: 16px;
  border-radius: 8px;
  background: #ffffff;
  cursor: pointer;
}
input[type=range]:focus::-ms-fill-lower {
  background: #3071a9;
}
input[type=range]:focus::-ms-fill-upper {
  background: #367ebd;
}
</style>
