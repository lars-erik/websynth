<template>
    <div class="sequencer">
        <span v-bind:style="beatStyle(0)" class="beat">
            <span class="key" v-for="(freq, $findex) in freqs" :key="$findex" v-bind:style="freqStyle(0, $findex)">
                <label>{{keys[$findex]}}</label>
            </span>
        </span>
        <span class="beat" v-for="(beat, $bindex) in beats" :key="$bindex" v-bind:style="beatStyle($bindex + 1)">
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
    </div>
</template>
<script>
import Vue from "vue";
import SequencerNote from "./SequencerNote"
import Notes from "../Notes"

let freqs = Notes.values;

export default {
    name: "sequencer",
    components: {
        SequencerNote
    },
    props: [
        "beats", 
        "currentNote",
        "minFreq",
        "maxFreq"
        ],
    data() {
        return {
            freqs: freqs.slice(this.minFreq, this.maxFreq),
            keys: Notes.keys.slice(this.minFreq, this.maxFreq)
        }
    },
    created() {
    },
    mounted() {
        this.$el.scrollTop = this.$el.scrollHeight / 2 - this.$el.clientHeight / 2;
    },
    methods: {
        update(beatIndex) {
            Vue.set(this.beats, beatIndex, this.beats[beatIndex].slice(0));
        },
        beatStyle(bi) {
            return {
                left: 10 + (bi * 20) + "px",
                height: (20 * this.freqs.length) + "px"
                // ,"background-color": this.currentNote === bi - 1 ? "#FFFFCC" : "transparent" 
            }
        },
        freqStyle(bi, fi) {
            return {
                position: "absolute",
                top: ((this.freqs.length * 20) - ((fi + 1) * 20)) + "px",
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
        width: 1310px;
        height: 262px;
        border: 1px solid #cccccc;
        border-radius: 5px;
        overflow: auto;
    }

    .sequencer .beat {
        font-size: 10px;
        position: absolute;
        width: 20px;
    }

    .sequencer .key label {
        text-align: right;
        padding-top: 5px;

        /* 
        line-height: 10px; */
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
</style>