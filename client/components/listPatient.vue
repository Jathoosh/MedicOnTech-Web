<template>
  <div>
    <p>Je ne suis pas ton père.</p>
    <table class="table">
      <thead>
              <tr>
                <th scope="col">Nom Prénom</th>
                <th scope="col">N° sécurité sociale</th>
              </tr>
      </thead>
      <tbody>
              
              <tr v-for="(d, index) in table_patient" :key="index">
                <td>{{ d.last_name}} {{d.first_name}}</td>
                <td>NUM SECU</td>
                <td><button class="btn btn-outline-secondary" style="float:right;" @click="sendName(index)">Selectionner</button></td>
              </tr>
              
      </tbody>
    </table>
  </div>
</template>

<script>
module.exports = {
    name:"listPatient",
    
   props: {
    // Kdo pour jathoosh
      //  infos_patients: {
      //   type: Array,
      //   required: true,
      //   default: function () {
      //     return [];
      //   }
      // },
   },
    data() {
      return {
        table_patient: [
          {
            last_name: "Dupont",
            first_name: "Jean",
          },
          {
            last_name: "Dupont",
            first_name: "aze",
          }
      
        ],
      };
    },
    methods: {
      sendName(index) {
        console.log("wesh");
        this.$emit('fillinput', [this.table_patient[index]]);

      }
    }
} 
</script>

<style scoped>

</style>