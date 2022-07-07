<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Nom</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(d, index) in liste_drug_search" :key="index">
        <td>{{ d.drug_name }} <button class="btn btn-outline-secondary" style="float:right;" @click="sendDrug(index)">Selectionner</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
module.exports=  {
    name: 'listDrug',
    props: {
      liste_drug_search: {
        type: Array,
        required: true,
        default: function () {
          return [];
        }
      },
    },
    methods: {
      sendDrug(index) {
        this.$emit('fillinputdrug', this.liste_drug_search[index].drug_name);
      }
    }
}
</script>

<style scoped>
.table {
  flex-wrap: nowrap;
  max-width: 50%;
}
</style>