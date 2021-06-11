<template>
<div>
    <SvgMap 
    :map="France"
    @click="getLocationInfos"
    @mouseout="unpointLocation"
    @mousemove="moveOnLocation"
    />
    <div v-if="loaded" class="tooltip" :style="tooltipStyle">
        <span>{{pointedLocation}}</span>
        <ul>
          <li>Hospitalized: {{hospitalized}}</li>
          <li>Reanimation: {{reanimation}}</li>
          <li>Deaths: {{deaths}}</li>
          <li>Recovered: {{recovered}}</li>
        </ul>
        
    </div>
</div>
</template>

<script>
import { SvgMap } from "vue-svg-map"
import { getLocationName } from '@/utilities/index.js'
import France from "@svg-maps/france.departments"

export default {
  name: "FranceMap",
  components: {
    SvgMap,
  },
  data() {
    return {
      France,
      data: null,
      loaded: false,
      pointedLocation: null,
      tooltipStyle: null,
      reanimation: null,
      hospitalized: null,
      deaths: null,
      recovered: null
    }
  },
  methods: {
    async fetchLocationData() {
      try {
        const res = await fetch(`https://coronavirusapi-france.now.sh/LiveDataByDepartement?Departement=${this.pointedLocation}`)
        const data = res.json()
        return data
      } catch(error) {
        console.log(error)
      }
      
    },
    async getLocationInfos(event) {
      this.loaded = false
      this.pointedLocation = getLocationName(event.target)

      this.data = await this.fetchLocationData()
      console.log(this.pointedLocation)
      this.hospitalized = this.data.LiveDataByDepartement[0].hospitalises
      this.reanimation = this.data.LiveDataByDepartement[0].reanimation
      this.deaths = this.data.LiveDataByDepartement[0].deces
      this.recovered = this.data.LiveDataByDepartement[0].gueris
      this.loaded = true
    },
    unpointLocation() {
      this.pointedLocation = null
      this.loaded = false
      this.tooltipStyle = {display: 'none'}
    },
    moveOnLocation(event) {
      this.tooltipStyle = {
        display: 'block',
        top: `${event.clientY + 10}px`,
        left: `${event.clientX - 100}px`,
      }
    },
  },
}
</script>

<style>
  .tooltip {
    position: fixed;
    border: 1px solid black;
    width: 150px;
    background-color: gray;
    color: #fff;
    text-align: left;
    border-radius: 5px;
    padding: 5px 5px;
  }

  .svg-map {
  width: 100%;
  height: auto;
  stroke: #666;
  stroke-width: 1;
  stroke-linecap: round;
  stroke-linejoin: round; }
  .svg-map__location {
    fill: #a1d99b;
    cursor: pointer; }
    .svg-map__location:focus, .svg-map__location:hover {
      fill: #b8e2b3;
      outline: 0; }
    .svg-map__location[aria-checked="true"] {
      fill: #f4bc44; }
</style>