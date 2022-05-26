export default {
  FETCH_SERVICE_UNITS(state) {
    console.log(state.units)
    return state.units;
  },
  FETCH_GENERAL_SERVICE_UNIT(state){
    return state.generalUnit;
  }
};