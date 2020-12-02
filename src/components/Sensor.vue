<template>
  <b-card> 
    <div class="d-flex flex-column justify-content-center align-items-center align-content-center">
      <h4 class="text-center">{{sensorInfo.name}}</h4>
      Moisture Level: {{value}}%
      <div class="progress progress-bar-vertical progress-bar-animated">
        <div :class="`${showColor} progress-bar progress-bar-success active bg-success`" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" :style="showValue"></div>
      </div>
      <b-button @click="deleteSensor(sensorInfo.id)" variant="danger" class="mt-2"><b-icon icon="trash"></b-icon></b-button>
    </div>
  </b-card>
</template>

<script>
import { db } from '../fbConfig';

export default {
  name: 'Sensor',
  props: ['sensorInfo'],
  data() {
    return {
        value: 0,
        max: 100
    }
  },
  mounted() {
    db.ref(`/sensors/${this.sensorInfo.id}`).on('value', (snapshot) =>{
      this.value = snapshot.val().value;
    });
  },
  computed: {
    showColor() {
      if (this.sensorInfo.value < 30) {
        return 'bg-danger';
      } else if (this.sensorInfo.value < 70) {
        return 'bg-warning';
      } else {
        return 'bg-success';
      }
    },
    showValue() {
      if (this.value) {
        return `height: ${this.value}%`
      } else {
        return null;
      }
    }
  },
  methods: {
    deleteSensor(id) {
      this.$store.dispatch('deleteSensor', id);
    }
  }
}
</script>

<style>
.progress-bar-vertical {
  width: 50px;
  min-height: 100px;
  display: flex;
  align-items: flex-end;
  float: left;
}

.progress-bar-vertical .progress-bar {
  width: 100%;
  height: 0;
  -webkit-transition: height 0.6s ease;
  -o-transition: height 0.6s ease;
  transition: height 0.6s ease;
}
</style>