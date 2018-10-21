<template>
    <div class="sequencer">
        <span v-for="(beat, $bindex) in beats" :key="$bindex" v-bind:style="beatStyle($bindex)">
            <span v-for="(freq, $findex) in freqs" :key="$findex" v-bind:style="freqStyle($bindex, $findex)">
                <sequencer-note
                    :current-note="currentNote"
                    :beat="beat"
                    :beat-index="$bindex"
                    :frequency-index="$findex"
                    :frequency="freq"
                    
                    @changed="update($bindex)">
                </sequencer-note>
                <!-- <label :class="freqClass($bindex, $findex)">
                    <input type="checkbox" v-on:change="toggle($bindex, freq)"/>
                </label> -->
            </span>
        </span>
        <pre>{{currentNote}}</pre>
    </div>
</template>
<script>
import Vue from "vue";
import SequencerNote from "./SequencerNote"

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
    components: {
        SequencerNote
    },
    props: ["beats", "currentNote"],
    data() {
        return {
            freqs: freqs
        }
    },
    created() {
    },
    methods: {
        update(beatIndex) {
            Vue.set(this.beats, beatIndex, this.beats[beatIndex].slice(0));
        },
        beatStyle(bi) {
            return {
                position: "absolute",
                left: 10 + (bi * 20) + "px",
                width: "20px",
                height: (20 * freqs.length) + "px",
                "background-color": this.currentNote === bi ? "#FFFFCC" : "transparent" 
            }
        },
        freqStyle(bi, fi) {
            return {
                position: "absolute",
                top: ((freqs.length * 20) - ((fi + 1) * 20)) + "px",
                width: "20px",
                height: "20px"
            }
        }
    }
}

</script>
<style>
    .sequencer {
        position: relative;
        display:inline-block;
        float: left;
        padding: 10px;
        width: 1288px;
        height: 262px;
        border: 1px solid #cccccc;
        border-radius: 5px;
    }

    .sequencer pre {
        position: absolute;
        left: 1290px;
        background: pink;
    }

    .sequencer label {
        display: inline-block;
        border: 1px solid #cccccc;
        border-radius: 6px;
        width: 16px;
        height: 16px;
    }

    .sequencer input {
        visibility: hidden;
    }

    .sequencer .selected {
        background-color: gray;
    }

    .sequencer .active {
        background-color: yellow;
    }
</style>