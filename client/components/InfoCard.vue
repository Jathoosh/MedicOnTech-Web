<template>
    <div class="card">
      <div class="card-image">
        <div>
          <div class="image_profil">
            <p id="nom_img_profil"> {{ initialesPatient() }} </p>
          </div>
        </div>
      </div>

        <div class="card-body">
            <p>{{ sdatas.first_name }} {{ sdatas.last_name }}</p>
            <p v-if="sdatas.profession.name === 'Patient'">Né.e le {{ changeDate(sdatas.birth_date) }}</p>
            <p>{{ sdatas.mail }}</p>
            <p v-if="sdatas.mutual_name!='Pas de Mutuelle' && sdatas.profession.name === 'Patient'">Mutuelle : {{ sdatas.mutual_name }}</p>
            <button @click="modifyProfil" v-if="sdatas.profession.name === 'Patient' && button_actionne == false"><strong>Modifier profil</strong></button>
        </div>
    </div>
</template>

<script>
module.exports = {
  name: 'info-card',
  
  props: {
    sdatas: {
      type: Object,
      required: false,
      default: function () {
        return {};
      },
    },
    button_actionne: Boolean
  },
  
  methods:{
    modifyProfil: function(){
      this.$emit("disapear");
      this.$router.push("/Profil");
    },
    initialesPatient: function(){
      var String = this.sdatas.first_name[0] + this.sdatas.last_name[0];
      return String;
    },
    changeDate(date){
      dateSplit = date.split('-');
      return dateSplit[2] + "/" + dateSplit[1] + "/" + dateSplit[0];
    }
  }   
}
</script>

<style scoped>
  .card {
    display: flex;
    right: 15px;
    box-shadow: 1px 5px 5px rgb(85, 129, 170);
    z-index: 1;
  }
  
  .card-image {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-right: 19px;
  }

  .card-image img {
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .card-body {
    text-align: center; 
    padding: 15px 20px; 
    box-sizing: border-box;
  }

  button {
    color: rgb(49, 49, 49);
    text-decoration: none;
    padding: 10px;
    border-radius: 7px;
  }

  button:hover {
    background-color: #b1b1b1;
    transition: background-color 0.5s;
  }

  .image_profil {
    height:50px;
    width: 50px;
    border-radius: 100%;
    border: 2px solid black;
    margin-top: 20px;
  }

  #nom_img_profil{
    display: flex;
    flex-direction: row-reverse;
    align-content: stretch;
    justify-content: flex-end;
    margin-left: 6px;
  }

</style>