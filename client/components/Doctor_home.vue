<template>
  <div>
    <h1>
      Bonjour Dr {{ doctor.first_name }} {{ doctor.last_name }} |
      {{ doctor.speciality_name }}
    </h1>
    <h4>Mes patients</h4>
    <hr />
    <br />
    <input
      class="SearchBar"
      type="search"
      v-model="search"
      placeholder="Rechercher un patient"
      size="21"
    />

    <button id="editPrescription" @click="redirectionToEditPrescription()">
      Rédiger une ordonnance
    </button>

    <div id="global">
      <div
        class="patient_case"
        v-for="(patient,index) in patients"
        :key="index"
      >
        <h2>
          <strong>{{ patient.first_name }} {{ patient.last_name }}</strong> |
          {{ currentAge(new Date(patient.birth_date)) }} ans
        </h2>
        <div id="container" v-for="p in prescription" :key="p.creation_date">
          <p>Dernière ordonnance le {{ p.creation_date }}</p>
          <button id="historyButton" @click="redirectionToHistoryPatient()">
            Historique
          </button>
        </div>
      </div>
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
      prescription: [
        {
          creation_date: "20/04/2022",
        },
      ],
    };
  },
  methods: {
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
  computed: {},
};
</script>

<style>
.SearchBar {
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 5px;
  margin-bottom: 10px;
  border-top: none;
  border-right: none;
  border-left: none;
}

.patient_case {
  display: flex;
  flex-direction: column;
  max-width: 90%;
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