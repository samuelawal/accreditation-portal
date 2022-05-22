import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";
export default {
  namespaced: true,
  state() {
      return {
          units: [ 
              {
                name: 'Toyosi',
                phone: '08045681391',
                mod1: 'Done',
                mod2: 'Fair',
                mod3: 'Complete',
                mod4: 'Delivered',
                remarks: 'Average',
              }
          ]
      }
  },
  mutations,
  actions,
  getters,
};
