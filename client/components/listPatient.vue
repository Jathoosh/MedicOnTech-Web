<template>
  <div>
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
                <td>{{ d.social_security_number }}</td>
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
    liste_patient_search: {
      type: Array,
      required: true,
      default: function () {
        return [];
      },
    },
   },
   watch: {
    liste_patient_search: function (newValue) {
      this.table_patient = newValue;
    }
   },
  data() {
    return {
      table_patient: [],
    };
  },
  methods: {
    sendName(index) {
      this.$emit('fillinput', [this.table_patient[index]]);

    }
  }
} 
</script>

<style scoped>

</style>