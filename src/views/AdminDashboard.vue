<template>
  <the-header />
  <div class="mt-6">
    <div class="mx-auto container">
      <div class="mx-8">
      <h1>MY DASHBOARD</h1>
      <div class="bg-red-100 w-36">
        <div class="text-center p-5 font-bold text-xl">
          {{ displayServiceUnits.length }} Workers
        </div>
      </div>
      <div class="mt-12">
        <div v-for="unit in displayServiceUnits" class="m-3 rounded-lg border p-3">
          <h3 class="text-xl font-bold">{{ unit.name }}</h3>
          <p>{{ unit.phone }}</p>
        </div>
      </div>

      </div>
    </div>
  </div>
</template>
<script>
import TheHeader from "../components/TheHeader.vue";
export default {
  created() {
    this.loadServiceUnit();
  },
  methods: {
    loadServiceUnit() {
      this.$store.dispatch("units/LOAD_UNITS_DATA");
    },
  },
  computed: {
    displayServiceUnits() {
      return this.$store.getters["units/FETCH_GENERAL_SERVICE_UNIT"];
    },
    displayChurchUnitName() {
      return this.$store.getters["units/FETCH_SERVICE_UNITS"];
    },
  },
  components: {
    TheHeader,
  },
};
</script>
