<template>
  <div>
    <br>
    <div class="head">
      <div class="info">
        <h3>Historique des ordonnances de {{patients[0].last_name}} {{patients[0].first_name}}</h3>
        
      </div>

      <div class="buttonback"><button @click="back()" class="btn btn-outline-secondary" data-mdb-ripple-color="dark">Retour</button></div>

    </div>
      <p id="search_adv">Recherche avancée</p>
      <div class="container">
        <input placeholder="Select date" type="date" class="form-control">
      </div>

  <br>
  <br>
  <br>

    <div class="prescription_info">
      <div class="detail" v-for="(patient, index) in patients" :key="index">
        <h2>{{ patient.last_name }} {{ patient.first_name }}  - {{ prescription.creation_date }}</h2>
        <p><strong>Etat ordonnance</strong></p>
        <p style="color:grey;">id : {{ prescription.id }}</p>
      </div>

      <div class="buttonRedirect">
          <button @click="redirectionToOrdonnance()" class="btn btn-outline-secondary" data-mdb-ripple-color="dark">Voir le détail</button> 
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  name: "History_patient",
  props:
  {
    mdatas: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      prescription: {
        creation_date: "20/04/2022",
        id: 21374673265,
      },
      patients: [
        {
          first_name: "Paul",
          last_name: "Pierre",
          id: "43572653",
        },
      ],
      doctor: {
        first_name: "Truc",
        last_name: "Muche",
        speciality: "général",
      },

      search: "",
    };
  },
  methods: {
    back: function () {
      this.$router.push("/Doctor_home");
    },
    redirectionToOrdonnance: function () {
      this.$router.push("/Ordonnance");
    },
  },
  computed: {
    filteredPatients() {
      return this.patient.filter((patient) => {
        return (
          patient.last_name.toLowerCase().indexOf(this.search.toLowerCase()) >
          -1
        );
      });
    },
  },
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