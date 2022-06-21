<template>
  <div>
    <div class = "rectangle">
      <p> Votre profil </p>
    </div>

    <div class = "card_patient">
      <p id = "informations" class="rectangle"> Vos informations </p>
      <!-- importer logo de la personne connectée -->
      <div class = "image_formulaire">
        <img src="ressources/formulaire.jpg" alt="Image">
      </div>
      <!-- données du patient -->
      <table class="table">
        <tbody>
          <tr>
            <th scope="row">Nom de famille</th>
            <td><input v-model="patient.last_name"></td>
          </tr>
          <tr>
            <th scope="row">Prénom</th>
            <td><input v-model="patient.first_name"></td>
          </tr>
          <tr>
            <th scope="row">Date de naissance</th>
            <td><input v-model="patient.birth_date"></td>
          </tr>
          <tr>
            <th scope="row">Adresse mail</th>
            <td><input v-model="patient.email_adress"></td>
          </tr>
          <tr>
            <th scope="row">Mutuelle</th>
            <td><input v-model="patient.mutuelle"></td>
          </tr>
        </tbody>
      </table> 
      <div class="buttonModify">
        <button @click="modifyInformationsProfil" class="btn btn-outline-dark ml-2" type="submit">Modifier</button>
      </div>
    </div> 
    
  </div>

</template>

<script>
module.exports = {
    name: 'modify-card',
    data(){
        return{
          patient:
            {
              last_name: 'RAOUL',
              first_name: 'Lisa',
              birth_date: 'Date de naissance',
              email_adress: 'Adresse Mail',
              mutuelle: 0,
            }
        }
    },
    methods:{
       modifyInformationsProfil: function(){
        this.$emit("modify", this.patient);
        console.log(this.patient); //renvoie nouvelles informations Patient
      }
    }
   
}
</script>

<style>

  p{
    margin-top: 13px;
    margin-bottom: 0rem;
    font-size: 20px;
  }

  .rectangle{
    width: fit-content;
    border-bottom: 4px solid green;
  }

  .card_patient{
    position: relative;
    width: 1032px;
    height: 470px;
    left: 322px;
    background: rgba(216, 216, 216, 0.5);
    border-radius: 20px;
  }

  #informations{
    width: fit-content;
    height: 50px;
    margin-left: 10px;
    font-weight: 800;
    font-size: 25px;
    line-height: 44px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .table>:not(caption)>*>* {
    padding: 22px 80px;
    border-bottom-width: 0px;
  }
  .table{
    width: 70%;
    margin: 0 auto;
    text-indent: 20%;
  }

  .buttonModify{
    display:flex;
    align-items: flex-end;
    align-content: flex-end;
    flex-direction: column;
    margin-right: 20px;
  }

  .image_formulaire{
    display:flex;
    align-items: flex-end;
    position: relative;
    max-width: 100px;
    height: 8px;
    left: 397px;
    top: 379px;
  }

</style>