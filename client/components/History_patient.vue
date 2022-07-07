<template>
  <div>
    <br>
    <div class="head">
      <div class="info">
        <h3>Historique des ordonnances de {{mdatas[index_history_patient].infos_patient.last_name}} {{mdatas[index_history_patient].infos_patient.first_name}} - {{currentAge(mdatas[index_history_patient].infos_patient.birth_date)}} ans</h3>
      </div>
      <br>
      <div class="buttonback">
        <button @click="redirectToPac()" >Ajouter une personne à charge</button>
        <button @click="back()"  >Retour</button>
      </div>
    </div>
      
    <p id="search_adv">Recherche avancée</p>
    <div class="container">
      <p style="max-height:5px; align-self :center;">A partir du : </p>
      <input placeholder="Select date" v-model="input_date" type="date" class="form-control" style="max-width:fit-content; margin-left:5px;">
    </div>
    <br>

    <br>

    <div class="prescription_info" v-for="(d, index) in orderedDate" :key="index"> 
      <div class="detail">
        <h2>Fait le {{changeDate(d.infos_prescription.creation_date)}} - expire le {{changeDate(d.infos_prescription.expiration_date)}}</h2>
        <p><strong>Etat ordonnance : {{statePres(d.infos_prescription.validity)}}</strong></p>
        <p>Nombre de réutilisations : {{d.infos_prescription.frequency_of_reuse}}</p>
        <p>Ordonnance signalée : {{reportedPres(d.infos_prescription.reported)}}</p>
        <p  v-if="d.infos_prescription.reported == true">  Raisons du signalement : {{d.infos_prescription.report_note}}</p>
      </div>
      
      <div class="buttonRedirect">
          <button @click="redirectionToOrdonnance(index)">Voir le détail</button> 
      </div>
      <br>
    </div>

    <br>

  </div>
</template>

<script>
module.exports = {
  name: "History_patient",
  components: {
    Ordonnance,
  },
  props: {
    sdatas: Object,
    mdatas: {
      type: Array,
      required: true,
      default: function () {
        return [];
      }
    },
    index_history_patient: {
      type: Number,
      required: true,
      default: function () {
        return 0;
      }
    },
  },
  
  data() {
    return {
      input_date: "",
    };
  },

  methods: {
    back: function () {
      this.$router.push("/Doctor_home");
    },

    redirectionToOrdonnance: function (index) {
      this.$emit('save_ordonnance_doctor', {prescription : this.mdatas[this.index_history_patient].prescriptions[index], infos_patient : {first_name : this.mdatas[this.index_history_patient].infos_patient.first_name, last_name : this.mdatas[this.index_history_patient].infos_patient.last_name}, doctor_infos : this.sdatas});
      this.$emit('status_doctor');
    },

    redirectToPac: function () {
      this.$router.push("/Profil_PAC");
    },

    changeDate(date){
      dateSplit = date.split('-');
      return dateSplit[2] + "/" + dateSplit[1] + "/" + dateSplit[0];
    },

    reportedPres(reported){
      if(reported == 1){
        return "Oui";
      }
      else{
        return "Non";
      }
    },

    statePres(validity){
      if(validity == 1){
        return "Valide";
      }
      else{
        return "Invalide";
      }
    },

    currentAge(birthDate) {
      var today = new Date();
      var birth = new Date(birthDate);
      
      var age = today.getFullYear() - birth.getFullYear();
      var month = today.getMonth() - birth.getMonth();
      if (month < 0 || (month === 0 && today.getDay() < birth.getDay())) {
        age--;
      }
      return age;
    }

  },

  computed: {
    filteredData() {
      var select_date = this.input_date;
      var date = new Date(select_date).getTime();

      if(select_date == ""){
        return this.mdatas[this.index_history_patient].prescriptions;
      }
      else{
        return this.mdatas[this.index_history_patient].prescriptions.filter(function (d) {
          return new Date(d.infos_prescription.creation_date).getTime() >= date;
        });
      }
    },
    orderedDate() {
      return this.filteredData.sort(function (a, b) {
        return new Date(b.infos_prescription.creation_date).getTime() - new Date(a.infos_prescription.creation_date).getTime();
      });
    }
  }
}
</script>

<style scoped>
#search_adv {
  border-bottom: 5px solid #01AA88;
  max-width: fit-content;
  inline-size: fit-content;
}

/*bloc minimisé ordonnance*/
.prescription_info {
  display: flex;
  flex-direction: row;
  border-radius: 20px;
  background-color: #D8D8D8;
  opacity: 0.9;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  margin-top: 7vh;
  justify-content: space-between;
}

.buttonRedirect {
  align-self:center;
  margin-left: inherit;
}

/*bouton voir detail */
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

/*Recherche avancée */
.container {
  max-width: 100%;
  float: left;
  display: flex;
  flex-direction: row;
}

input[type=text] {
  max-width: 80%;
}

.head {
  display: flex;
  justify-content: space-between;
}
</style>