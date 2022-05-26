export default {
  async SUBMIT_FORM_DATA({ commit }, payload) {
    const serviceUnitDetails = {
      name: payload.name,
      serviceUnit: payload.serviceUnit,
      phone: payload.phone,
      mod1: payload.mod1,
      mod2: payload.mod2,
      mod3: payload.mod3,
      mod4: payload.mod4,
      remarks: payload.remarks,
      id: payload.id,
    };
    try {
      await fetch(
        `https://accreditation-portal-default-rtdb.firebaseio.com/units/${payload.serviceUnit}/${payload.name}.json`,

        {
          method: "PUT",
          body: JSON.stringify(serviceUnitDetails),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        res.json();
      });
      commit("ADD_SERVICEUNITS_MUTATIONS", {
        name: payload.name,
        phone: payload.phone,
        mod1: payload.mod1,
        mod2: payload.mod2,
        mod3: payload.mod3,
        mod4: payload.mod4,
        remarks: payload.remarks,
      });
    } catch (err) {
      const error = new Error(
        (err.message = "Failed to submit record, please try again later!!")
      );
      throw error;
    }
  },
  SUBMIT_ALL_FORM_DATA({ commit }, payload) {
    commit("GET_ALL_FORM_DATA", payload);
  },
  async LOAD_UNITS_DATA(context, payload) {
    try {
      const responseData = await fetch(
        `https://accreditation-portal-default-rtdb.firebaseio.com/units/.json`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        return res.json();
      });
      const response = await responseData;
      console.log(response);
      const serviceUnit = [];
      const myServiceName = [];
      for(const key in response){
        for(const i in response[key]){
          const unit = {
            name: response[key][i].name,
            serviceUnit: response[key][i].serviceUnit,
            phone:response[key][i].phone,
            mod1: response[key][i].mod1,
            mod2:response[key][i].mod2,
            mod3: response[key][i].mod3,
            mod4: response[key][i].mod4,
            remarks: response[key][i].remarks
          }
          myServiceName.push(response[key])
          serviceUnit.push(unit)
        }
      }
      context.commit("GET_ALL_FORM_DATA", serviceUnit);
    } catch (err) {
      const error = new Error(
        err.message || "Failed to submit record, please try again later!!"
      );
      throw error;
    }
  },
};
