<template>
    <div class="synth">
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
        width: 300px;
        height: 262px;
        border: 1px solid #cccccc;
        border-radius: 5px;
    }

    .synth input[type='range'] {
        width: 200px;
    }

</style>

