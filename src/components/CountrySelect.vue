<template>
  <select
    @change="onChange()"
    v-model="selected"
    class="form-select mt-10 block w-full border p-3 rounded"
  >
    <option value="0">Select Country</option>
    <option v-for="country in countries" :value="country.ID">
      {{ country.Country }}
    </option>
  </select>
</template>

<script>
import { EventBus } from "@/main.js";

export default {
  name: "CountrySelect",
  props: ["countries"],
  data() {
    return {
      selected: 0,
    };
  },
  methods: {
    onChange: function () {
      const country = this.countries.find((item) => item.ID === this.selected);
      EventBus.$emit("get-country", country);
    },
  },
};
</script>

