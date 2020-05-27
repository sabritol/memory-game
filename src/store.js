import Vue from 'vue'
import Vuex from 'vuex'
// import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    table: [],
    lastOpenedId: -1,
    playerControllable: true,
    playing: false,
    modal: false,
    timer: false
  },
  mutations: {
    resetValues(state) {
      state.lastOpenedId = -1;
      state.playerControllable = true;
      state.table = [];
      state.playing = false;
      state.timer = false;
    },
    createCard(state, {id, PickedItem}) {
      state.table.push({
        id,
        value: PickedItem,
        found: false,
        opened: false,
        animating: false
      });
    },
    toggleCard(state, id) {
      state.table[id].opened = !state.table[id].opened;
      state.lastOpenedId = id;

      if(!state.playing) {
        state.playing = true;
        state.timer = true;
      }
    },
    setAsFound(state, typeID) {
      state.table.forEach(card => {
        if(card.value === typeID) {
          card.found = true;
        }
      });
    },
    togglePlayerControllable(state, cntrlValue) {
      state.playerControllable = cntrlValue;
    },
    animateCard(state, id) {
      if(!state.table[id]) return;
      state.table[id].animating = !state.table[id].animating;
    },
    setModal(state, modalObj) {
      state.modal = modalObj;
    },
    hideModal(state) {
      state.modal = false;
    },
    stopTimer(state) {
      state.timer = false;
    }
  },
  actions: {
    startGame({dispatch, commit}, picked) {
      commit('resetValues');
      dispatch('createCardTable', picked);
    },
    createCardTable({commit}, picked) {
      let itemPicked = new Array(picked).fill(0);
      for (let i = 0; i < picked * 2; i++) {
        do {
          var randomPickedItem = Math.floor(Math.random() * picked);
        } while (itemPicked [randomPickedItem] > 1);
        itemPicked[randomPickedItem]++;
        commit('createCard', { id: i, randomPickedItem });
      }
    },
    openCard({dispatch, state, commit}, id) {
      if(!state.playerControllable) return;
      dispatch('cardAnimation', id);
      if(state.table.some(card => card.opened) && state.lastOpenedId !== id) {
        dispatch('hideCards', [id, state.lastOpenedId]);
      }
      commit('toggleCard', id);
    },
    hideCards({commit, dispatch, state}, cardsArr) {
      commit('togglePlayerControllable', 0);

      setTimeout(() => {
        let neededType = state.table[cardsArr[0]].value;
        let sameType = true;
        cardsArr.forEach(cardID => {
          commit('toggleCard', cardID);
          if (neededType !== state.table[cardID].value) {
            sameType = false;
          }
        });
        if (sameType) {
          commit('setAsFound', state.table[cardsArr[0]].value);
          dispatch('checkForGameEnd');
        }
        commit('togglePlayerControllable', 1);

        cardsArr.forEach(el => dispatch('cardAnimation', el));
      }, 1500);
    },
    checkForGameEnd({state, commit}) {
      let gameEnd = state.table.every(card => card.found);
      if(gameEnd) {
        
        commit('stopTimer');
        commit('setModal', {
          title: 'Game end',
          message: 'Yeahh, the game just ended. You can play one more time'
        });
      }
    },
    cardAnimation({commit}, id) {
      commit('animateCard', id);
      setTimeout(() => commit('animateCard', id), 200);
    }
  }
})
