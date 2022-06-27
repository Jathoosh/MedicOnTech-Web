<template>
  <div>
    <h4>Mes patients</h4>
    <hr />
    <div id="global"> 
      <div class="tbl-container bdr"> 
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Nom Prénom</th>
                <th scope="col">Date</th>
                
              </tr>
            </thead>
            <tbody>
              
              <tr v-for="(prescription, index) in prescriptions" :key="index">
                  <td>{{ getNamePatients(prescription.patientID) }}</td>
                  <td>{{prescription.creation_date}} <button class="btn btn-outline-secondary" style="float:right;" @click="redirectionToHistoryPatient()">Historique</button></td>
                  
              </tr>
              
            </tbody>
          </table>
        </div>
      </div> 

</template>

<script>
module.exports = {
  name: "Medecin_home",
  props: {
    patients: Array, // chaque bloc est un patient  venant du back
    doctor: Object, // ca vient du back
  },
  data() {
    return {
      search: "",
      prescriptions: [
        {creation_date: "20/04/2022",
        patientID: 8,},
        {creation_date: "29/12/2022",
        patientID: 10,},
        {creation_date: "10/09/2022",
        patientID: 17,},
        {creation_date: "20/04/2021",
        patientID: 21,},
        {creation_date: "01/03/2019",
        patientID: 23,},
        
      ],
    };
  },
  methods: {
    getNamePatients(id) {
      var pat = this.patients.find(patient => patient.id === id);
      return pat!==undefined? (pat.last_name + " " + pat.first_name) : "";
    },
    redirectionToHistoryPatient() {
      this.$router.push("/History_patient");
    },
    redirectionToEditPrescription() {
      this.$router.push("/Edit_prescription");
    },
    currentAge(birthDate) {
      var today = new Date();
      var todayYear = today.getFullYear();
      var todayMonth = today.getMonth();
      var birthDateYear = birthDate.getFullYear();
      var birthDateMonth = birthDate.getMonth();
      var age = todayYear - birthDateYear;
      var month = todayMonth - birthDateMonth;
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
    
  },
  mounted() {
    document.getElementById("main").style.width = "90%";
  },
  computed: {
    // masquer occurence patientID
    filteredPatients() {
      return this.patients.filter((patient) => {
        return patient.last_name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1;
      });
    },
  },
};
</script>

<style>
h4 {
  padding-top: 15px;
}
hr {
  border: 2px solid #D9D9D9;
 }

thead {
  background-color: #01AA88;
  border-radius: 25px;

}

.tbl-container {
  max-width: 100%;
  margin-top: 10px;
  margin-left: 10px;

}



.bdr {
  border-radius: 10px;
  overflow: hidden;
}
button {
  color: rgb(49, 49, 49);
  text-decoration: none;
  padding: 10px;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 7px;
  border: 0.4px solid rgb(49, 49, 49);
}

button:hover {
  background-color: #b1b1b1;
  transition: background-color 0.5s;
}
#historyButton {
  color: black;
  float: right;
  max-width: 20%;
  max-height: 20%;
}

#editPrescription {
  color: black;
  float: right;
}

#container {
  display: flex;
  justify-content: space-between;
}
</style>