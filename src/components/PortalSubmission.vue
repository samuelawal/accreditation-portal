<template>
  <base-dialog title="Success" v-if="successMessage" :show="isLoading">
    <p class="text-black font-bold">Data submitted successfully......</p>
  </base-dialog>

  <base-spinner v-if="isLoading" />
  <base-card>
  <p v-if="myError">{{error}}grfrfrfrf</p>
    <img src="../img/winners.png" class="w-20 mx-auto" />
    <p v-if="myError">{{error}}</p>
    <h1 class="text-center text-xl font-bold text-red-600 text-2xl py-4 px-16">
      Deacon's Board Accreditation Portal
    </h1>
    <p class="p-3 mx-4 mt-2 text-center text-sm bg-red-100" v-if="!formIsValid">
      Service units and File must be inputed correctly
    </p>
    <form type="submit" @submit.prevent="submitForm">
      <div class="p-6">
        <label for="service-unit" class="font-bold text-xl"
          >Service Unit:</label
        >
        <input
          type="text"
          v-model.trim="serviceUnit"
          placeholder="Enter Service unit"
          id="service-unit"
          class="w-full mt-2 text-center h-10 font-bold border-solid border border-red-400 focus:outline-none focus:border-red-600 focus:border-2 rounded-lg placeholder-font-light"
        />
        <div class="pt-4">
          <label
            for="document"
            class="w-full flex flex-col items-center px-4 py-6 mt-6 mx-auto rounded-lg bg-red-100 border-2 border-dashed border-red-600 cursor-pointer"
          >
            <i class="fa-solid fa-folder text-2xl"></i>
            <input
              type="file"
              accept=".xlsx"
              id="document"
              @change="fileName"
              class="hidden"
            />
            <span class="mt-2 text-base leading-normal">{{ myFileName }}</span>
          </label>
        </div>
        <button
          class="bg-red-600 hover:bg-red-500 text-white w-full mt-8 h-10 rounded-xl"
        >
          Submit
        </button>
      </div>
    </form>
  </base-card>
</template>
<script>
import * as XLSX from "xlsx/xlsx.mjs";
import BaseCard from "./BaseCard.vue";
import BaseDialog from './BaseDialog.vue';
export default {
  data() {
    return {
      results: [],
      serviceUnit: "",
      unitFile: "",
      isLoading: false,
      formIsValid: true,
      successMessage: false,
      error: '',
      myError: false
    };
  },
  computed: {
    myFileName() {
      if (this.unitFile == "") {
        return "Click to upload File";
      } else {
        return this.unitFile;
      }
    },
  },
  components: {
    BaseCard,
    BaseDialog,
  },
  methods: {
    fileName(event) {
      const accreditationName = event.target.files[0].name;
      this.unitFile = accreditationName;
    },

    async submitForm(e) {
      if (this.serviceUnit === "" || this.unitFile === "") {
        this.formIsValid = false;
        return;
      } else {
        this.isLoading = true
        let finalData = [];
        const file = e.target[1].files[0];
        const data = await file.arrayBuffer();
        const workbook = await XLSX.read(data);
        const workbook_sheet_names = workbook.SheetNames;
        let unitID = this.serviceUnit.toLowerCase();
        workbook_sheet_names.forEach((sheet_name) => {
          let rowObject = XLSX.utils.sheet_to_row_object_array(
            workbook.Sheets[sheet_name]
          );
          const finalData = [];
          rowObject.map(async (data) => {
            const sheetData = {
              name: data.Name,
              serviceUnit: unitID,
              phone: data.Phone,
              mod1: data.Mod1,
              mod2: data.Mod2,
              mod3: data.Mod3,
              mod4: data.Mod4,
              remarks: data.Remarks,
              id: Math.random() * 1000,
            };
            finalData.push(sheetData);
            this.results = finalData;
          });
          // console.log(this.results)
          let unitData = {}
          for (let i = 0; i < this.results.length; i++) {
            const myData = {
              name: finalData[i].name,
              serviceUnit: finalData[i].serviceUnit,
              phone: finalData[i].phone,
              mod1: finalData[i].mod1,
              mod2: finalData[i].mod2,
              mod3: finalData[i].mod3,
              mod4: finalData[i].mod4,
              remarks: finalData[i].remarks,
              id: finalData[i].id,
            };
            unitData = myData
          }
          try {
            this.$store.dispatch("units/SUBMIT_FORM_DATA", unitData)
          }catch(err){
            this.error = err
            console.log(this.error)
          }
            this.serviceUnit = "";
            this.unitFile = "";

        });
      }
    },
    // async loadUnits(data) {
    //   try{
    //     await this.$store.dispatch("units/SUBMIT_FORM_DATA", data);
    //   }
    //   catch(err){
    //     this.error = err.message || 'Failed to submit Data'
    //     console.log(this.eror)
    //   }
    //   this.isLoading = false
    // },
  },
};
</script>
