<template>
    <label :class="freqClass">
        <input type="checkbox" v-model="active"/>
    </label>
</template>

<script>
export default {
    name: "sequencer-note",
    props: ["currentNote", "beat", "beatIndex", "frequencyIndex", "frequency"],
    data() {
        return {
            isActive: null
        };
    },
    computed: {
        active: {
            get() {
                if (this.isActive === null)
                {
                    this.isActive = this.beat.indexOf(this.frequency) > -1;
                }
                return this.isActive;
            },
            set(newValue) {
                if (newValue) {
                    this.beat.push(this.frequency);
                } else {
                    let index = this.beat.indexOf(this.frequency);
                    this.beat.splice(index, 1);
                }
                this.isActive = newValue;
                this.$emit("changed");
            }
        },
        freqClass() {
            return this.active
                ? this.beatIndex === this.currentNote
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
