<template>
    <transition name="flip">
        <div v-if="!table[id].animating" class="card" @click="open">
            <span v-if="table[id].opened">{{ table[id].value }}</span>
            <img src="../assets/success.png" v-else-if="table[id].found" />
        </div>
    </transition>
</template>

<script>
import { mapState } from 'vuex'

export default {
    methods: {
        open() {
            if(this.$store.state.table[this.id].found) return;
            this.$store.dispatch('openCard', this.id);
        }
    }, 
    props: {
        id: Number
    },
    computed: {
        ...mapState([
            'table'
        ])
    }
}
</script>

<style scoped lang="scss">
div.card {
    display: inline-block;
    background-color: var(--main-color);
    border: 2px solid #23395B;
    border-radius: 5px;
    width: 75px;
    height: 75px;
    margin: 15px;
    color:rgb(0, 5, 82);
    display: flex;
    align-content: center;
    span {
        font-size: 30px !important;
    }
}
img {
    width: 30px;
    height: 30px;
}

.flip-enter-active {
  transition: all .2s cubic-bezier(0.55, 0.085, 0.68, 0.53);
}

.flip-leave-active {
  transition: all .35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.flip-enter, .flip-leave-to {
  transform: scaleY(0) translateZ(0);
  opacity: 0;
}
</style>