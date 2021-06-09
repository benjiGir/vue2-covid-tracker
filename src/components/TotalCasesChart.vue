<template>
  <LineChart v-if="loaded" :chartData="datacollection" :options="chartOptions" />
</template>

<script>
import moment from "moment";
import LineChart from "@/components/Charts/LineChart";
import {EventBus} from '@/main.js'

export default {
  name: "TotalCasesChart",
  components: {
    LineChart,
  },
  data() {
    return {
      loaded: false,
      country: '',
      dates: [],
      datacollection: {},
      confirmed: [],
      deaths: [],
      recovered: [],
      active: [],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  methods: {
    async fetchCountryData() {
      try {
        const res = await fetch(
          `https://api.covid19api.com/total/country/${this.country}`
        );
        const data = res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async fillData() {
        const data = await this.fetchCountryData();

      data.forEach((d) => {
        this.dates.push(moment(d.Date, "YYYY MM Do h:mm:ss a").format("DD/MM/YYYY"))
        this.confirmed.push(d.Confirmed)
        this.deaths.push(d.Deaths)
        this.recovered.push(d.Recovered)
        this.active.push(d.Active)
      });

      
      this.datacollection = { 
          labels: this.dates,
          datasets: [{
              label: 'Confirmed',
              data: this.confirmed
          },
          {
              label: 'Deaths',
              data: this.deaths
          },
          {
              label: 'Recovered',
              data: this.recovered
          }
         ]}
    }
  },
    async mounted() {
    this.loaded = false;
    try {
      this.fillData()
      this.loaded = true;
    } catch (e) {
      console.log(e);
    }

  },
  created() {
      EventBus.$on("get-country", (country) => {
      this.country = country.Slug;
    });
  }
};
</script>
