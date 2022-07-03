<template>
  <div>
    <br>
    <div class="head">
      <div class="info">
        <h3>Historique des ordonnances de {{mdatas[index_history_patient].infos_patient.last_name}} {{mdatas[index_history_patient].infos_patient.first_name}} </h3>
      </div>
      <br>
      <div class="buttonback">
        <button @click="redirectToPac()" id="button">Ajouter une personne à charge</button>
        <button @click="back()" class="btn btn-outline-secondary" data-mdb-ripple-color="dark">Retour</button>

      </div>


    </div>
      <p id="search_adv">Recherche avancée</p>
      <div class="container">
        <input placeholder="Select date" type="date" class="form-control">
      </div>

  <br>
  <br>
  <br>

    <div class="prescription_info" v-for="(d, index_history_patient) in mdatas[index_history_patient].prescriptions" :key="index_history_patient">
      <div class="detail" >
        <h2>Fait le {{changeDate(d.infos_prescription.creation_date)}} - expire le {{changeDate(d.infos_prescription.expiration_date)}}</h2>
        <p><strong>Etat ordonnance : {{statePres(d.infos_prescription.validity)}}</strong></p>
        <p>Nombre de réutilisations : {{d.infos_prescription.frequency_of_reuse}}</p>
        <p>Ordonnance signalée : {{reportedPres(d.infos_prescription.reported)}}</p>
        <p  v-if="d.infos_prescription.reported == true">  Raisons du signalement : {{d.infos_prescription.report_note}}</p>
        <p style="color:grey;">ID : {{generateBarCodeNumber(d.infos_prescription.Id_Prescription)}}</p>
      </div>

      <div class="buttonRedirect">
          <button @click="redirectionToOrdonnance()" class="btn btn-outline-secondary" data-mdb-ripple-color="dark">Voir le détail</button> 
      </div>
    </div>
    <br>
  </div>
</template>

<script>
module.exports = {
  name: "History_patient",
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
    };
  },
  methods: {
    back: function () {
      this.$router.push("/Doctor_home");
    },
    redirectionToOrdonnance: function () {
      this.$router.push("/Ordonnance");
    },
    redirectionToPatientInCharge: function () {
      this.$router.push("/PatientInCharge");
    },
    redirectToPac: function () {
      this.$router.push("/Profil_PAC");
    },
    changeDate(date){
      dateSplit = date.split('-');
      return dateSplit[2] + "/" + dateSplit[1] + "/" + dateSplit[0];
    },
    generateBarCodeNumber(Id_Prescription){
      var barcode = Id_Prescription.toString();
      while (barcode.length < 12) {
          barcode = "0" + barcode;
      }
      return barcode; 
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
    }
  },
  computed: {},
};
</script>

<style>
/*recherche avancéd */
#search_adv {
  border-bottom: 5px solid #01AA88;
  max-width: 10%;
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
  margin-left : 10px;
}


/*bouton voir detail */
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


/*Recherche avancée */
.container {
  max-width: 12%;
  float: left;
}

input[type=text] {
  max-width: 80%;
}

/*head */
.head {
  display: flex;
  justify-content: space-between;
}

</style>