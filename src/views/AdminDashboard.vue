<template>
<h1>MY DASHBOARD</h1>
<ul>
    <li v-for="unit in displayServiceUnits">{{unit.name}}</li>
</ul>   
</template>
<script>
export default {
    computed: {
        displayServiceUnits() {
            return this.$store.getters['units/FETCH_SERVICE_UNITS']
        }
    }
}
</script>