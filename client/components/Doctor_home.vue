<template>
  <div>
    <h1>Bonjour</h1>
    <h4>Mes patients</h4>
    <hr />
    <div id="global"> 
      <div class="tbl-container bdr"> 
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Nom Prénom</th>
                <th scope="col">Dernière ordonannce</th>
                
              </tr>
            </thead>
            <tbody>
              
              <tr v-for="(d, index) in mdatas" :key="index">
                <td>{{ d.infos_patient.last_name}} {{d.infos_patient.first_name}}</td>
                <td>{{displayLastPrescriptionDateOf(index)}}
                <button  style="float:right;" @click="redirectionToHistoryPatient(index)">Historique</button></td>
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
    sdatas: Object, // ca vient du back
    mdatas: {
      type: Array,
      required: true,
      default: function () {
        return [];
      }
    }, // ca vient du back <= mdatas est une liste de patients avec chacun leur prescriptions
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
      var pat = this.mdatas.find(patient => patient.id === id);
      return pat!==undefined? (pat.last_name + " " + pat.first_name) : "";
    },
    redirectionToHistoryPatient(index) {
      this.$router.push("/History_patient").catch(() => {});
      
      this.$emit('infos_patient', {index:index});
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
    displayLastPrescriptionDateOf(index)
    {
      let Dates = [];
      //find latest date of Dates array
      for(let i = 0; i < this.mdatas[index].prescriptions.length; i++)
      {
        Dates.push(this.mdatas[index].prescriptions[i].infos_prescription.creation_date);
      }
      //convert date string to date object
      for(let i = 0; i < Dates.length; i++)
      {
        Dates[i] = new Date(Dates[i]);
      }
      //sort dates array
      Dates.sort(function(a, b){return b-a});
      //return first date among dates
      // display Dates info
      return  (Dates[0].getDate()+1<10? "0"+(Dates[0].getDate()+1) : Dates[0].getDate()+1) + "/"  + (Dates[0].getMonth()+1<10? "0"+(Dates[0].getMonth()+1) : Dates[0].getMonth()+1) + "/" + Dates[0].getFullYear();

    },
  },
  mounted() {
    document.getElementById("main").style.width = "90%";
  },
  computed: {
  },
};
</script>

<style scoped>
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
  border: none;
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