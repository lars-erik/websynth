<template>
    <div class="synth">
        <div class="content">
            <div>
                <label>Shape:</label>
                <select v-model="settings.shape">
                    <option value="sawtooth">Saw</option>
                    <option value="sine">Sine</option>
                    <option value="square">Square</option>
                    <option value="triangle">Triangle</option>
                </select>
            </div>
            <div>
                <label>Duration:</label><input type="range" min="0" max="5" step=".05" v-model="settings.duration"/>
                {{settings.duration}}
            </div>
            <div>
                <label>Attack:</label><input type="range" min="0" max="3" step=".01" v-model="settings.attack"/>
                {{settings.attack}}
            </div>
            <div>
                <label>Release:</label><input type="range" min="0" max="3" step=".01" v-model="settings.release"/>
                {{settings.release}}
            </div>
            <div>
                <label>Gain:</label><input type="range" min="0" max="5" step=".05" v-model="settings.gain"/>
                {{settings.gain}}
            </div>
            <div>
                <label><input type="checkbox" v-model="settings.enableLowpass"/> Lowpass</label>
                {{settings.enableLowpass}}
            </div>
            <div>
                <label>Cutoff:</label><input type="range" min="0" max="10000" step="10" v-model="settings.lowpassFreq"/>
            </div>
            <div>
                <label><input type="checkbox" v-model="settings.enableHighpass"/> Highpass</label>
            </div>
            <div>
                <label>Cutoff:</label><input type="range" min="0" max="10000" step="10" v-model="settings.highpassFreq"/>
                {{settings.highpassFreq}}
            </div>
            <div>
                <label><input type="checkbox" v-model="settings.enableLfo"/> LFO</label>
            </div>
            <div>
                <label>Shape:</label>
                <select v-model="settings.lfoShape">
                    <option value="square">Square</option>
                    <option value="sine">Sine</option>
                </select>
            </div>
            <div>
                <label>Frequency:</label><input type="range" min="0" max="25" step=".01" v-model="settings.lfoFreq"/>
                {{settings.lfoFreq}}
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "synth",
        props: ["settings"],
        data() {
            return {

            }
        },
        created() {
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

