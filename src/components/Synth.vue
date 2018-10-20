<template>
    <div class="synth">
        <div class="content">
            <div>
                <label>Duration:</label><input type="range" min="0" max="2" step=".05" v-model="saw.duration"/>
                {{saw.duration}}
            </div>
            <div>
                <label>Attack:</label><input type="range" min="0" max="1" step=".01" v-model="saw.attack"/>
                {{saw.attack}}
            </div>
            <div>
                <label>Release:</label><input type="range" min="0" max="1" step=".01" v-model="saw.release"/>
                {{saw.release}}
            </div>
            <div>
                <label>Gain:</label><input type="range" min="0" max="1" step=".01" v-model="saw.gain"/>
                {{saw.gain}}
            </div>
            <div>
                <label><input type="checkbox" v-model="saw.enableLowpass"/> Lowpass</label>
                {{saw.enableLowpass}}
            </div>
            <div>
                <label>Cutoff:</label><input type="range" min="0" max="10000" step="10" v-model="saw.lowpassFreq"/>
            </div>
            <div>
                <label><input type="checkbox" v-model="saw.enableHighpass"/> Highpass</label>
            </div>
            <div>
                <label>Cutoff:</label><input type="range" min="0" max="10000" step="10" v-model="saw.highpassFreq"/>
                {{saw.highpassFreq}}
            </div>
            <div>
                <label><input type="checkbox" v-model="saw.enableLfo"/> LFO</label>
            </div>
            <div>
                <label>Shape:</label>
                <select v-model="saw.lfoShape">
                    <option value="square">Square</option>
                    <option value="sine">Sine</option>
                </select>
            </div>
            <div>
                <label>Frequency:</label><input type="range" min="0" max="25" step=".01" v-model="saw.lfoFreq"/>
                {{saw.lfoFreq}}
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "synth",
        props: ["saw"],
        data() {
            return {

            }
        }
    }
</script>
<style>
    .synth {
        position: relative;
        display:inline-block;
        float: left;
        padding: 10px;
        width: 370px;
        height: 262px;
        border: 1px solid #cccccc;
        border-radius: 5px;
        overflow: auto;
    }

    .synth label {
        display: inline-block;
        width: 80px;
    }

    .synth input[type='range'] {
        width: 230px;
    }

</style>

