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
      fetch(
        `https://accreditation-portal-default-rtdb.firebaseio.com/${payload.serviceUnit}/${payload.name}.jso`,
        {
          method: "PUT",
          body: JSON.stringify(serviceUnitDetails),
        }
      ).then((res) => {
        res.json();
      });
    } 
    catch (err) {
      const error = new Error(err.message || "Failed to submit data");
        throw error
    }
  },
};
