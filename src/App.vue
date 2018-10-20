<template>
  <div id="app">
    <h1>I friggin' made a sequencer!</h1>
    <p>Press space to toggle playing. Tick boxes to add notes. Drums are only two lower for now, kick and snare.</p>
    <div>
    <label>BPM Here</label><br/>
    <input class="tempo" type="range" min="30" max="240" v-model="tempo"/>
    {{tempo}}
    </div>
    <div>
    <label>Phat saw</label>
      <div class="row">
        <synth :saw="sawSettings"></synth>
        <sequencer :beats="tracks[0]" :currentNote="playedNote"></sequencer>
      </div>
    </div>
    <div>
    <label>Drums</label>
    <div class="row">
    <sequencer :beats="tracks[1]" :currentNote="playedNote"></sequencer>
    </div>
    </div>
    <label>Useless song output for now</label>
    <pre>{{debugOutput}}</pre>
  </div>
</template>

<script>
import Synth from './components/Synth.vue'
import Sequencer from './components/Sequencer.vue'
import Vue from "vue";

const freqs = [
    220.00,
    233.08,
    246.94,
    261.63,
    277.18,
    293.66,
    311.13,
    329.63,
    349.23,
    369.99,
    392.00,
    415.30,
    440.00
];

let lookahead = 25,
    scheduleAheadTime = .02;

export default {
  name: 'app',
  data() {
    return {
      tempo: 90,
      tracks: [[], []],
      debugOutput: "",
      ctx: null,
      sawSettings: {
        duration: 2,
        attack: .1,
        release: .5
      },
      currentNote: 0,
      playedNote: 0,
      nextNoteTime: 0,
      timer: null,
      playing: true
    }
  },
  components: {
    Sequencer,
    Synth
  },
  created() {
    for(let t = 0; t<this.tracks.length; t++) {
      for(let b = 0; b<64; b++){
        this.tracks[t][b] = [];
      }
    }
    this.tracks[0] = [
      [220],[],[261.63],[],[329.63],[],[440],[],[220],[],[261.63],[],[329.63],[],[440],[],
      [220],[],[261.63],[],[329.63],[],[440],[],[220],[],[261.63],[],[329.63],[],[440],[],
      [220],[],[261.63],[],[329.63],[],[440],[],[220],[],[261.63],[],[329.63],[],[440],[],
      [220],[],[261.63],[],[329.63],[],[440],[],[220],[],[261.63],[],[329.63],[],[440],[]
    ];
    this.tracks[1] = [
      [220],[],[],[],[220],[],[],[],[220],[],[],[],[220],[],[],[],
      [220],[],[],[],[220],[],[],[],[220],[],[],[],[220],[],[],[],
      [220],[],[],[],[220],[],[],[],[220],[],[],[],[220],[],[],[],
      [220],[],[],[],[220],[],[],[],[220],[],[],[],[220],[],[],[]
    ];
    Vue.set(this,"debugOutput", JSON.stringify(this.tracks));
    this.ctx = new window.AudioContext();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.scheduler();
    window.addEventListener("keypress", this.togglePlay);
  },
  watch: {
    tracks: {
      handler() {
        Vue.set(this,"debugOutput", JSON.stringify(this.tracks));
      },
      deep: true
    }
  },
  destroyed() {
    clearTimeout(this.timer);
    window.removeEventListener("keypress", this.togglePlay);
  },
  methods: {
    togglePlay(evt) {
      if (evt.keyCode === 0x20) {
        if (this.playing) {
          window.clearTimeout(this.timer);
        } else {
          if (this.ctx.state === "suspended") {
            this.ctx.resume();
          }
          this.currentNote = 0;
          this.nextNoteTime = this.ctx.currentTime;
          this.scheduler();
        }
        this.playing = !this.playing;
      }
    },
    nextNote() {
      const secondsPerBeat = 60 / (this.tempo * 4);
      this.nextNoteTime += secondsPerBeat;
      this.playedNote = this.currentNote;
      this.currentNote++;
      if (this.currentNote === 64) {
        this.currentNote = 0;
      }
    },
    scheduler() {
      while(this.nextNoteTime < this.ctx.currentTime + scheduleAheadTime) {
        this.saw();
        this.bassDrum();
        this.nextNote();
      }
      this.timer = setTimeout(() => this.scheduler(), lookahead);
    },
    saw() {
      let beat = this.tracks[0][this.currentNote] || [];
      for(let note = 0; note < beat.length; note++) {
        let saw = this.ctx.createOscillator();
        saw.type = "sawtooth";
        saw.frequency.value = beat[note];
        let env = this.ctx.createGain();
        env.gain.cancelScheduledValues(this.ctx.currentTime);
        env.gain.setValueAtTime(0, this.ctx.currentTime);
        env.gain.linearRampToValueAtTime(.4, this.ctx.currentTime + Number(this.sawSettings.attack));
        env.gain.linearRampToValueAtTime(0, this.ctx.currentTime + Number(this.sawSettings.duration) - Number(this.sawSettings.release));

        let filter = this.ctx.createBiquadFilter();
        filter.type = "highpass";
        filter.frequency.value = 2500;

        let filter2 = this.ctx.createBiquadFilter();
        filter2.type = "lowpass";
        filter2.frequency.value = 800;

        // saw.connect(filter).connect(env).connect(this.ctx.destination);
        saw.connect(filter2).connect(env).connect(this.ctx.destination);
        
        saw.start();
        saw.stop(this.ctx.currentTime + Number(this.sawSettings.duration));
      }
    },
    bassDrum() {
      let beat = this.tracks[1][this.currentNote] || [];
      
      // kick
      if (beat.indexOf(220) > -1) {
        let kick = this.ctx.createOscillator();
        kick.frequency.value = 80;

        let env = this.ctx.createGain();
        env.gain.cancelScheduledValues(this.ctx.currentTime);
        env.gain.setValueAtTime(0, this.ctx.currentTime);
        env.gain.linearRampToValueAtTime(2, this.ctx.currentTime + .005);
        env.gain.linearRampToValueAtTime(0, this.ctx.currentTime + .03);

        kick.connect(env).connect(this.ctx.destination);
        kick.start();
        kick.stop(this.ctx.currentTime + 0.05);
      }

      if (beat.indexOf(233.08) > -1) {

        let bufferSize = this.ctx.sampleRate;
        let buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        let output = buffer.getChannelData(0);
        for(let i = 0; i<bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        let noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        let filter = this.ctx.createBiquadFilter();
        filter.type = "highpass";
        filter.frequency.value = 1000;
        noise.connect(filter);

        let env = this.ctx.createGain();
        env.gain.setValueAtTime(1, this.ctx.currentTime);
        env.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
        filter.connect(env);
        env.connect(this.ctx.destination);

        let osc = this.ctx.createOscillator();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(100, this.ctx.currentTime)
        let oscEnv = this.ctx.createGain();
        oscEnv.gain.setValueAtTime(0.7, this.ctx.currentTime);
        oscEnv.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
        osc.connect(oscEnv);
        oscEnv.connect(this.ctx.destination);

        noise.start(this.ctx.currentTime);
        osc.start(this.ctx.currentTime);
        noise.stop(this.ctx.currentTime + .2);
        osc.stop(this.ctx.currentTime + .2);
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
}

.row {
  white-space: nowrap; 
  height: 292px; 
  width: 2000px;
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
