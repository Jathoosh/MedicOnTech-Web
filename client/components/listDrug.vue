<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Nom</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(d, index) in table_drug" :key="index">
          <td>{{ d.name}} <button class="btn btn-outline-secondary" style="float:right;" @click="sendDrug(index)">Selectionner</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
module.exports=  {
    name: 'listDrug',
    props: {
    // Kdo pour jathoosh
      //  infos_drug: {
      //   type: Array,
      //   required: true,
      //   default: function () {
      //     return [];
      //   }
      // },
   },
    data() {
      return {
        table_drug: [
          {
            name: "Doliprane",
          },
          {
            name: "Eufon",
          }
        ],
      };
    },
    methods: {
      sendDrug(index) {
        this.$emit('fillinputdrug', [this.table_drug[index]]);
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