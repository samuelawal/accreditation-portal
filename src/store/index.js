
import { createStore } from 'vuex'
import unitsModule from './modules/units/index.js'

const store = createStore({
    modules: {
        units: unitsModule
    }
})
export default store