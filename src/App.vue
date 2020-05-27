<template>
  <div id="app">
    <h2>Memory card game</h2>

    <transition name="fade">
     
    </transition>

    <cards-table />

    <form @submit.prevent="startGame">
      <span>Card pairs:</span> <input min="1" placeholder="Card pairs" v-model="pairs" type="number">
      <button>Start new game</button>
    </form>

    <transition name="fade">
      <modal v-if="$store.state.modal" @closed="$store.commit('hideModal'); $store.commit('resetValues');" :title="$store.state.modal.title" :message="$store.state.modal.message" />
    </transition>
  
  </div>
</template>

<script>
import CardsTable from './components/CardsTable.vue'
import Modal from './components/Modal.vue'

export default {
  data() {
    return {
      pairs: 5,
      color: 0
    }
  },
  methods: {
    startGame() {
      if(this.pairs < 1 || this.pairs >= 200) {
        this.$store.commit('setModal', {
          title: "Wait... That's illegal",
          message: "You can't set that amount of card pairs"          
        });
        return;
      }
      this.$store.dispatch('startGame', parseInt(this.pairs));
    },
  },
  components: {
    CardsTable,
    Modal
  }
}
</script>

<style lang="scss">
:root {
  --main-color: rgb(255, 255, 255);
  --bg-color: rgb(0, 5, 82);
}
body {
  background: rgb(255, 255, 255);
  color: var(--main-color);
  text-shadow: 0 0 6px black;
}
#app {
  input, button {
    padding: 10px;
    border-radius: 5px;
  }
  input {
    margin: 0 10px;
    text-shadow: 0 0 6px black;
  }
  span {
    font-size: 16px;
    vertical-align: middle;
  }
  button {
    background-color: var(--main-color);
    color:rgb(0, 5, 82);
    border: none;
    cursor: pointer;
    transition: box-shadow 0.2s ease-in;
    text-shadow: 0 0 6px  rgb(71, 72, 77);
    
  }
  button:hover {
    box-shadow: 2px 2px 0 grey;
  }
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
  background-color: var(--bg-color);
  padding: 20px 10px;
  max-width: 600px;
  margin: 80px auto;
  border-radius: 5px;
  border: 1px solid grey;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .9s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
