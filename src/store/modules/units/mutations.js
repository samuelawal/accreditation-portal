export default {
    ADD_SERVICEUNITS_MUTATIONS(state, payload){
        state.units.push(payload)
    },
    GET_ALL_FORM_DATA(state, payload){
        state.generalUnit = payload
    }
}