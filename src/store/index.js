import Vuex from 'vuex';
import Vue from 'vue';
import { auth, db } from '../fbConfig';

import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    sensors: []
  },
  mutations: {
    UPDATE_USER(state, user) {
      state.user = user;
    },
    ADD_VALUE(state, payload) {
      let updateId = payload.sensor.id;
      let idx = state.sensors.findIndex(item => item.id === updateId);
      state.sensors.splice(idx, 1, payload.sensor); 
    },
    SET_SENSOR(state, sensor) {
      if (!sensor.sensors) {
        state.sensors = [];
      } else {
        state.sensors = sensor.sensors;
      }
    },
    DELETE_SENSOR(state, idx) {
      state.sensors.splice(idx, 1);
    },
    CLEAR_STORE(state) {
      state.user = null;
      state.sensors = [];
    }
  },
  actions: {
    createUser({ commit, dispatch }, signupInfo) {
      return new Promise((resolve, reject) => {
        auth.createUserWithEmailAndPassword(signupInfo.email, signupInfo.password).then((user) => {
          db.ref(`/users/${user.user.uid}/sensors`).set(0).then(() => {
            commit('UPDATE_USER', { id: user.user.uid });
            resolve();
          }).catch(error => {
            reject(error);
          });
        }).catch(error => {
          reject(error);
        })
      });
    },
    getInfo({ commit, dispatch, state }) {
      db.ref(`/users/${state.user.id}`).on('value', (snapshot) =>{
        commit('SET_SENSOR', { ...snapshot.val() });
      });
    },
    loginUser({ commit, dispatch }, loginInfo) {
      return new Promise((resolve, reject) => {
        auth.signInWithEmailAndPassword(loginInfo.email, loginInfo.password)
        .then(user => {
          commit('UPDATE_USER', { id: user.user.uid });
          resolve();
        }).catch(error => {
          reject(error);
        })
      })
    },
    addSensor({ state }, newSensorInfo) {
      return new Promise((resolve, reject) => {
        let idx = state.sensors.findIndex(item => item.id === newSensorInfo.id);
        if (idx < 0) {
          db.ref(`/sensors/${newSensorInfo.id}`).once('value').then((snapshot) => {
            if (snapshot.val()) {
              let newSensorList = [];
              if (state.sensors.length > 0) {
                newSensorList = state.sensors;
              }
              newSensorList.push(newSensorInfo);

              db.ref(`/users/${state.user.id}/sensors`).set(newSensorList).then(() => {
                resolve();
              }).catch(error => {
                reject(error);
              });
            } else {
              reject('Sensor not found.')
            }
          });
        } else {
          resolve();
        }
      })
    },
    deleteSensor({ commit, state }, id) {
      let idx = state.sensors.findIndex(item => item.id === id);
      commit('DELETE_SENSOR', idx);
      let newSensors = null;
      if (state.sensors.length === 0) {
        newSensors = 0;
      } else {
        newSensors = state.sensors;
      }
      db.ref(`/users/${state.user.id}/sensors`).set(newSensors);
    },
    requestUpdate({ commit }, id) {
      db.ref(`/sensors/${id}/userRequest`).set(true);
    },
    logout({ commit }) {
      return new Promise(resolve => {
        commit('CLEAR_STORE')
        resolve();
      })
    }
  },
  plugins: [vuexLocal.plugin]
});