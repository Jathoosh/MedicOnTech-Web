<template>
  <div>
    <div class = "rectangle">
      <p class="title_profil"> Votre profil </p>
    </div>
    
    <div class="buttonRetour">
      <button @click="retourPagePrincipale" class="btn text-center" type="submit">Retour</button>
    </div>

    <div class = "card_patient">
      <p id = "informations" class="rectangle"> Vos informations </p>
      <!-- importer logo de la personne connectée -->
      <div class="position_formulaire">
        <img class = "image_formulaire rounded" src="ressources/formulaire.jpg" alt="Image">
      </div>
      
      <div class="d-flex flex-row">
        <p class="image_profil text-center" id="nom_profil"> {{ initialesPatient() }} </p>
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
              last_name: 'Last name',
              first_name: 'First name',
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
      },
      retourPagePrincipale: function(){
        this.$emit("retour page principale");
        this.$router.push("/PatientHome");
      }, 
      initialesPatient: function(){
        var String = this.patient.last_name[0] + this.patient.first_name[0];
        return String;
      }
    }
   
}
</script>

<style>

  .title_profil{
    margin-top: 10px;
    font-size: 30px;
  }

  #nom_profil{
    margin-bottom: 0rem;
    padding-top: 14px;
    font-size: 40px;
  }

  .rectangle{
    width: fit-content;
    border-bottom: 4px solid green;
  }

  .card_patient{
    position: relative;
    width: 1032px;
    height: 464px;
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
    padding: 15px 71px;
    border-bottom-width: 0px;
  }

  .table{
    width: 70%;
    margin: 0 auto;
    margin-top: -190px;
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
    position : relative;
    width: 175px; 
    height: auto;
  }

  .position_formulaire{
    display: flex;
    justify-content: flex-end;
    margin-right: 20px;
  }

  .image_profil {
    height: 100px;
    width: 100px;
    border-radius: 100%;
    border: 2px solid black;
    margin-top: -39px;
    margin-left: 29px;
  }

  .buttonRetour{
    position: absolute;
    width: fit-content;
    left: 1509px;
    top: 167px;

    background: #D9D9D9;
    border-radius: 20px;
  }
</style>