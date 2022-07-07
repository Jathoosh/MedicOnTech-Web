<template>
  <div>
    <h1>Bonjour Dr {{sdatas.first_name}} {{sdatas.last_name}} ! </h1>
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
  </div> 
</template>

<script>
module.exports = {
  name: "Medecin_home",
  props: {
    sdatas: Object,
    mdatas: {
      type: Array,
      required: true,
      default: function () {
        return [];
      }
    }
  },
  data() {
    return {
      search: "",
    };
  },
  methods: {
    redirectionToHistoryPatient(index) {
      this.$router.push("/History_patient").catch(() => {});
      this.$emit('infos_patient', {index:index});
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
  computed: {
    
  },

  mounted() {
    document.getElementById("main").style.width = "90%";
  }
}
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