<template>
    <label :class="freqClass">
        <input type="checkbox" v-model="active"/>
    </label>
</template>

<script>
export default {
    name: "sequencer-note",
    props: ["currentNote", "beat", "beatIndex", "frequencyIndex", "frequency"],
    computed: {
        active: {
            get() {
                return this.beat.indexOf(this.frequency) > -1;
            },
            set(newValue) {
                if (newValue) {
                    this.beat.push(this.frequency);
                } else {
                    let index = this.beat.indexOf(this.frequency);
                    this.beat.splice(index, 1);
                }
                this.$emit("changed");
            }
        },
        freqClass() {
            return this.beat.indexOf(this.frequency) > -1
                ? this.beatIndex == this.currentNote
                    ? "active" 
                    : "selected" 
                : "inactive";
        }
    },
    methods: {
        
    }
}
</script>

<style>

    .sequencer .inactive {
        background-color: white;
    }

    .sequencer .selected {
        background-color: gray;
    }

    .sequencer .active {
        background-color: yellow;
    }

</style>
