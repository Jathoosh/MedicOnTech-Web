<template>
  <div>
    <h3>Historique des ordonnances passées</h3>

    <div id="container">
      <input
        class="SearchBar"
        type="search"
        v-model="search"
        placeholder="Rechercher un nom de patient"
        size="28"
      />
      <button @click="back">retour</button>
    </div>

    <h3>Filtres</h3>
    <hr/>
    <div class="filtre">
      
            <h4>Date</h4>
            <input class="filter_date" type="date" placeholder="Date" size="28" />
            <h4>Médicaments</h4>
            <input class="filter_drug" type="text" placeholder="Medicament" size="15" />

            <h4>Quantité</h4>

            <select class="filter_select">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            </select>


    </div>

    <div id="global" v-for="(patient, index) in patients" :key="index">
      <div class="prescription_info">
        <h2>
          Pour {{ patient.first_name }} {{ patient.last_name }}, fait le
          {{ prescription.creation_date }}
        </h2>
        
        <p>
          <strong>Quantité de médicaments : {{ prescription.quantity }}</strong>
        <p>
          Dr<span> {{ doctor.first_name }} {{ doctor.last_name }}</span>
        </p>
        <button><strong>Voir le détail</strong></button> 
      </div>
    </div>

   

  </div>
</template>

<script>
module.exports = {
  name: "History_patient",
  data() {
    return {
      prescription: {
        creation_date: "20/04/2022",
        quantity: "2",
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
.prescription_info {
  display: flex;
  flex-direction: column;
  max-width: 97%;
  box-shadow: 5px 5px 15px #eeecec, -5px 5px 5px #eeecec;
  border-radius: 5px;
  background-color: white;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  padding-bottom: 40px;
  margin-top: 7vh;
  margin-bottom: 25px;
}

.filtre {
    display:flex;
    justify-content: row;
}
.filter_date {
    max-height: 20px;
    margin-top:15px;
    margin-left: 15px;
    margin-right: 15px;
}

.filter_drug {
    max-height: 20px;
    margin-top:13px;
    margin-left: 15px;
    margin-right: 15px;

    border-top:none;
    border-left:none;
    border-right:none;  
}

.filter_select {
    max-height: 20px;
    margin-top: 19px;
    margin-left: 15px;
    margin-right: 15px;
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

#container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#container .SearchBar {
  border-top: none;
  border-left: none;
  border-right: none;
  max-width: 50%;
}
</style>