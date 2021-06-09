<template>
  <main v-if="!loading">
    <DataTitle :text="title" :dataDate="dataDate" />

    <DataBoxes :stats="stats" />

    <CountrySelect :countries="countries"/>

    <button
      @click="clearCountryData"
      v-if="stats.Country" 
      class="bg-green-700 text-white rounded p-3 mt-10 focus:outline-none hover:bg-green-600
    ">Clear Country</button>

    <TotalCasesChart v-if="stats.Country"/>
  </main>

  <main class="flex flex-col align-center justify-center text-center" v-else> 
    <div class="text-gray-500 text-3xl mt-10 mb-6">
      Fetching Data
    </div>
    <img :src="loadingImage" class="w-24 m-auto" alt="">
  </main>
</template>

<script>
import DataTitle from '@/components/DataTitle'
import DataBoxes from '@/components/DataBoxes'
import CountrySelect from '@/components/CountrySelect'
import TotalCasesChart from '@/components/TotalCasesChart'
import { EventBus } from '@/main.js'

export default {
  name: 'Home',
  components: {
    DataTitle,
    DataBoxes,
    CountrySelect,
    TotalCasesChart,
  },
  data () {
    return {
      loading: true,
      title: 'Global',
      dataDate: '',
      stats: {},
      countries: [],
      loadingImage: require('../assets/hourglass.gif')
    }
  },
  methods: {
    async fetchCovidData () {
      try {
        const res = await fetch('https://api.covid19api.com/summary')
        const data = res.json()
        return data
      } catch (error) {
        console.log(error)
      }  
    },
    // getCountryData(country) {
    //   this.stats = country
    //   this.title = country.Country
    // },
    async clearCountryData() {
      this.loading = true
      const data = await this.fetchCovidData()
      this.title = 'Global'
      this.stats = data.Global
      this.loading = false
    }
  },
  async created() {
    const data = await this.fetchCovidData()
    
    this.dataDate = data.Date
    this.stats = data.Global
    this.countries = data.Countries
    this.loading = false

  },
  mounted: function() {
    EventBus.$on('get-country', country => {
      this.stats = country
      this.title = country.Country
    })
  }
 
}
</script>
