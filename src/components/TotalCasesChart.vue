<template>
<div>
  <LineChart
    v-if="loaded"
    :chartData="datacollection"
    :options="chartOptions"
  />
  <LineChart 
    v-if="loaded"
    :chartData="datacollectionActive"
    :options="chartOptions"
  />
</div>
  
</template>

<script>
import moment from "moment";
import LineChart from "@/components/Charts/LineChart";

export default {
  name: "TotalCasesChart",
  components: {
    LineChart,
  },
  props: ["country"],
  data() {
    return {
      loaded: false,
      dates: [],
      confirmed: [],
      deaths: [],
      recovered: [],
      active: [],
      datacollection: {},
      datacollectionActive: {},
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  watch: {
    'country' () {
      this.resetData()
      this.fillData()
    }
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
        this.dates.push(
          moment(d.Date, "YYYY MM Do h:mm:ss a").format("DD/MM/YYYY")
        );
        this.confirmed.push(d.Confirmed);
        this.deaths.push(d.Deaths);
        this.recovered.push(d.Recovered);
        this.active.push(d.Active);
      });

      this.datacollection = {
        labels: this.dates,
        datasets: [
          {
            label: "Confirmed",
            data: this.confirmed,
            borderColor:"#0062A3",
            pointBorderColor: "#0062A3",
            pointBackgroundColor: "#1FA5FF",
            backgroundColor: "#1FA5FF"
          },
          {
            label: "Deaths",
            data: this.deaths,
            borderColor:"#E00F00",
            pointBorderColor: "#E00F00",
            pointBackgroundColor: "#FF4133",
            backgroundColor: "#FF4133"
          },
          {
            label: "Recovered",
            data: this.recovered,
            borderColor:"#35C073",
            pointBorderColor: "#35C073",
            pointBackgroundColor: "#60D394",
            backgroundColor: "#60D394"
          },
        ],
      };

      this.datacollectionActive = {
        labels: this.dates,
        datasets: [
          {
            label: "Active",
            data: this.active
          }
        ]
      }
    },
    resetData() {
      this.dates = []
      this.confirmed = []
      this.deaths = []
      this.recovered = []
      this.active = []
    }
  },
  async created() {
    this.loaded = false;
    
    try {
      this.fillData();
      this.loaded = true;
    } catch (e) {
      console.log(e);
    }
  },
};
</script>
