<template>
  <div class="w-100 d-flex justify-content-center align-content-center align-items-center test" style="height: 100vh;">
    <b-card class="w-50">
      <div v-if="sensors.length > 0" class="d-flex flex-column justify-content-center align-content-center align-items-center">
        <h1 class="text-center">Sensors</h1>
        <b-button variant="success" @click="addNewSensor"><b-icon icon="plus" ></b-icon> Add</b-button>
        <div class="d-flex justify-content-center flex-wrap my-4">
          <div class="mx-5" :key="sensorInfo.id" v-for="sensorInfo in sensors">
            <Sensor :sensorInfo="sensorInfo"/>
          </div>
        </div>
      </div>
      <div v-else class="d-flex flex-column justify-content-center align-items-center flex-wrap my-4">
        <h3>Add New Sensor</h3>
        <b-button variant="success"><b-icon icon="plus" @click="toggleAddSensor"></b-icon></b-button>
      </div>
    </b-card>
    <b-modal v-model="addSensorBool" title="Add New Sensor" hide-footer centered>
      <b-form-group id="input-group-2" label="Sensor Name:" label-for="name">
        <input class="input-field" v-model="sensorInfo.name" id="name" placeholder="Enter Sensor Name"/>
      </b-form-group>
      <b-form-group id="input-group-2" label="Sensor ID:" label-for="id">
        <input class="input-field" type="tel" maxlength="4" id="id" v-model="sensorInfo.id" placeholder="Enter Sensor ID"/>
      </b-form-group>

      <div v-if="error" class="text-center">
        <b-alert show variant="danger">{{error}}</b-alert>
      </div>

      <div class="d-flex justify-content-end">
        <b-button variant="primary" class="mr-3" @click="addSensor">Add</b-button>
        <b-button variant="danger" @click="onCancel">Cancel</b-button>
      </div>
    </b-modal>
    <button class="logout-button" @click="onLogout"><b-icon class="h3" icon="arrow-bar-right"></b-icon></button>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Sensor from './Sensor';

export default {
  name: 'Dashboard',
  data() {
    return {
      addSensorBool: false,
      sensorInfo: {
        name: '',
        id: ''
      },
      error: null
    }
  },
  computed: {
    ...mapState([
      'sensors'
    ])
  },
  components: {
    Sensor
  },
  mounted() {
    this.$store.dispatch('getInfo');
  },
  methods: {
    addSensor() {
      if (this.sensorInfo.name && this.sensorInfo.id) {
        this.$store.dispatch('addSensor', this.sensorInfo).then(() => {
          this.onCancel();
        }).catch(error => {
          this.error = error;
        });
      }
    },
    onCancel() {
      this.sensorInfo = {
        name: '',
        id: ''
      };

      this.toggleAddSensor();
      this.error = null;
    },
    addNewSensor() {
      this.onCancel();
    },
    toggleAddSensor() {
      this.addSensorBool = !this.addSensorBool;
    },
    onLogout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/login');
      });
    }
  }
}
</script>

<style>
.test {
  background: url("../../public/background.png");
}
.logout-button {
  position: fixed;
  top: 0;
  right: 0;
  background-color: #C82333; /* Green */
  border: 1px solid transparent;;
  color: white;
  text-align: center;
  text-decoration: none;
  display: flex;
  justify-content: center;
  width: 75px;
  height: 75px;
  align-items: center;
  text-align: center;
  font-size: 16px;
  margin: 1% 1%;
  cursor: pointer;
  border-radius: 50%;
  
}
</style>