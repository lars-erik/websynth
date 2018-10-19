<template>
    <div class="sequencer">
        <span v-for="(beat, $bindex) in beats" :key="$bindex" v-bind:style="beatStyle($bindex)">
            <span v-for="(freq, $findex) in freqs" :key="$findex" v-bind:style="freqStyle($bindex, $findex)">
                <input type="checkbox" v-on:change="toggle($bindex, freq)"/>
            </span>
        </span>
    </div>
</template>
<script>
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

export default {
    name: "sequencer",
    props: ["beats"],
    data() {
        return {
            freqs,
            debugOutput: ""
        }
    },
    created() {
        for(let b = 0; b<16; b++){
            this.beats[b] = [];
        }
    },
    methods: {
        toggle(beat, freq) {
            let ext = this.beats[beat].indexOf(freq);
            if (ext > -1) {
                this.beats[beat].splice(ext, 1);
            } else {
                this.beats[beat].push(freq);
            }

            Vue.set(this, 'debugOutput', JSON.stringify(this.beats));
            Vue.set(this.beats, beat, this.beats[beat]);
        },
        beatStyle(bi) {
            return {
                position: "absolute",
                left: 10 + (bi * 20) + "px",
                width: "20px"
            }
        },
        freqStyle(bi, fi) {
            return {
                position: "absolute",
                top: (fi * 20) + "px",
                width: "20px",
                height: "20px"
            }
        }
    }
}

</script>
<style>
    .sequencer {
        padding: 10px;
        width: 322px;
        height: 262px;
        border: 1px solid #cccccc;
        border-radius: 5px;
    }
</style>