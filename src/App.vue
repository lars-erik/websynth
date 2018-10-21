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
      <label>Time</label>{{currentNote}}
    </div>
    <div>
      <label>Synth 1</label>
      <div class="row">
        <synth :settings="synthSettings[0]"></synth>
        <sequencer :min-freq="24" :max-freq="62" :beats="tracks[0]" :currentNote="playedNote"></sequencer>
      </div>
    </div>
    <div>
      <label>Synth 2</label>
      <div class="row">
        <synth :settings="synthSettings[1]"></synth>
        <sequencer :min-freq="24" :max-freq="62" :beats="tracks[1]" :currentNote="playedNote"></sequencer>
      </div>
    </div>
    <div>
    <label>Drums</label>
    <div class="row">
      <div class="synth"></div>
      <sequencer :min-freq="45" :max-freq="47" :beats="tracks[2]" :currentNote="playedNote"></sequencer>
    </div>
    </div>

  </div>
</template>

<script>
import Synth from './components/Synth.vue'
import Sequencer from './components/Sequencer.vue'
import Vue from "vue";
import Notes from "./Notes"

let lookahead = 25,
    scheduleAheadTime = .02,
    freqs = Notes.values;

export default {
  name: 'app',
  data() {
    return {
      tempo: 90,
      tracks: [[], [], []],
      debugOutput: "",
      ctx: null,
      synthSettings: [{
        shape: "sine",
        duration: 1,
        attack: .1,
        release: .5,
        gain: 1,
        enableLowpass: false,
        lowpassFreq: 400,
        enableHighpass: false,
        highpassFreq: 2000,
        enableLfo: false,
        lfoFreq: 4,
        lfoShape: "square"
      }, {
        shape: "sine",
        duration: 1,
        attack: .1,
        release: .5,
        gain: 1,
        enableLowpass: false,
        lowpassFreq: 400,
        enableHighpass: false,
        highpassFreq: 2000,
        enableLfo: false,
        lfoFreq: 4,
        lfoShape: "square"
      }],
      currentNote: 0,
      playedNote: 0,
      nextNoteTime: 0,
      timer: null,
      playing: true,
      compressor: null
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
    
    this.ctx = new window.AudioContext();
    
    this.compressor = this.ctx.createDynamicsCompressor();
    this.compressor.threshold.value = -50;
    this.compressor.knee.value = 40;
    this.compressor.ratio.value = 12;
    this.compressor.attack.value = 0;
    this.compressor.release.value = 0.25;
    this.compressor.connect(this.ctx.destination);
    
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.scheduler();
    window.addEventListener("keypress", this.togglePlay);
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
      Vue.set(this, 'currentNote', this.currentNote + 1);
      if (this.currentNote === 64) {
        this.currentNote = 0;
      }
    },
    scheduler() {
      while(this.nextNoteTime < this.ctx.currentTime + scheduleAheadTime) {
        this.saw(this.synthSettings[0], 0);
        this.saw(this.synthSettings[1], 1);
        this.bassDrum();
        this.nextNote();
      }
      this.timer = setTimeout(() => this.scheduler(), lookahead);
    },
    saw(sawSettings, index) {
      let beat = this.tracks[index][this.currentNote] || [];
      for(let note = 0; note < beat.length; note++) {
        let saw = this.ctx.createOscillator();
        saw.type = sawSettings.shape;
        saw.frequency.value = beat[note];

        // let preEnv = this.ctx.createGain();
        // preEnv.gain.cancelScheduledValues(this.ctx.currentTime);
        // preEnv.gain.setValueAtTime(1, this.ctx.currentTime);

        let env = this.ctx.createGain();
        env.gain.cancelScheduledValues(this.ctx.currentTime);
        env.gain.setValueAtTime(0, this.ctx.currentTime);
        env.gain.linearRampToValueAtTime(Number(sawSettings.gain), this.ctx.currentTime + Number(sawSettings.attack));
        env.gain.linearRampToValueAtTime(0, this.ctx.currentTime + Number(sawSettings.duration) - Number(sawSettings.release));

        let highpass = this.ctx.createBiquadFilter();
        highpass.type = "highpass";
        highpass.frequency.value = sawSettings.highpassFreq;

        let lowpass = this.ctx.createBiquadFilter();
        lowpass.type = "lowpass";
        lowpass.frequency.value = sawSettings.lowpassFreq;

        let connections = [];

        let preEnv = this.ctx.createGain();
        preEnv.gain.value = 1;
        preEnv.connect(env);

        if (sawSettings.enableLowpass) {
          saw.connect(lowpass).connect(preEnv);
        }
        if (sawSettings.enableHighpass) {
          saw.connect(highpass).connect(preEnv);
        }
        if (connections.length === 0) {
          saw.connect(preEnv);
        }

        if (sawSettings.enableLfo) {
          let lfo = this.ctx.createOscillator();
          lfo.type = sawSettings.lfoShape;
          lfo.frequency.setValueAtTime(sawSettings.lfoFreq, this.ctx.currentTime);
          lfo.connect(preEnv.gain);
          lfo.start();
          lfo.stop(this.ctx.currentTime + Number(sawSettings.duration));
        }

        env.connect(this.compressor);

        saw.start();
        saw.stop(this.ctx.currentTime + Number(sawSettings.duration));
      }
    },
    bassDrum() {
      let beat = this.tracks[2][this.currentNote] || [];
      
      // kick
      if (beat.indexOf(220) > -1) {
        let kick = this.ctx.createOscillator();
        kick.frequency.value = 80;

        let env = this.ctx.createGain();
        env.gain.cancelScheduledValues(this.ctx.currentTime);
        env.gain.setValueAtTime(0, this.ctx.currentTime);
        env.gain.linearRampToValueAtTime(4, this.ctx.currentTime + .005);
        env.gain.linearRampToValueAtTime(0, this.ctx.currentTime + .03);

        kick.connect(env).connect(this.ctx.destination);
        kick.start();
        kick.stop(this.ctx.currentTime + 0.05);
      }

      // snare
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
