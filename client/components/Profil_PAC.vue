<template>
  <div>
    <p>NRTIAEZHGIOEZH</p>
  <div class="main_container">
    <div class = "test"> <!-- TTTTTEEEEESSSSTTTT -->
      <p class="title_profil">Profil de {{patient.first_name}} {{patient.last_name}}</p>

      <div >
        <button @click="redirectToHistoryPatient()" class="btn btn-outline-dark ml-2" type="submit">Retour</button>
      </div>
    </div>
    
    

  <div class="container">
    <div class = "card_patient">
      <p id = "informations" class="rectangle">Ajout d'une personne à charge</p>
      <div class="content_container">
        <!-- importer logo de la personne connectée -->
        
        
        <div class="d-flex flex-row">
          <p class="image_profil text-center" id="nom_profil"> New </p>
        </div>
        
        <div>
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
              <td><input v-model="patient.birth_date" type="date"></td>
            </tr>
            
            <tr>
              <th scope="row">Mutuelle</th>
              <td><input v-model="patient.mutuelle"></td>
            </tr>
          </tbody>
        </table> 
        </div>
        <div class="position_formulaire">
          <img class = "image_formulaire rounded" src="ressources/formulaire.jpg" alt="Image">
        </div>

      </div>
      <div class="buttonModify">
        <button @click="sendPac" class="btn btn-outline-dark ml-2" type="submit">Ajouter patient</button>
      </div>
    </div> 
    
  </div>
  </div>
  <br>
</div>
</template>

<script>
module.exports = {
    name: 'Profil_PAC',
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
      redirectToHistoryPatient: function(){
        this.$emit("redirect to history patient");
        this.$router.push("/History_patient");
     },
      initialesPatient: function(){
        var String = this.patient.last_name[0] + this.patient.first_name[0];
        return String;
      },
        sendPac: function(){
            this.$emit("sendpac", this.patient);
            this.$router.push("/History_patient");
        }
    }
   
}
</script>

<style>
  .test {
    display: flex;
    justify-content: space-between ;
  }
  .d-flex {
    align-content: center;
  }
  .content_container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    flex-wrap: nowrap;
  }
  .title_profil{
    margin-top: 12px;
    font-size: 24px;
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

  .title_profil{
  border-bottom: 4px solid green;
  width: fit-content;
  }
  .card_patient{


    background: rgba(216, 216, 216, 0.5);
    border-radius: 20px;

    display: flex;
    flex-direction: column;

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
    border-bottom-width: 0px;
    padding-left:100px;
    padding-right: 100px;
  }

  .table{
    width: 60%;
    
    display: flex;
    justify-content: space-between;
  }

  .buttonModify{
    display:flex;
    align-items: flex-end;
    align-content: flex-end;
    flex-direction: column;
    margin-right: 20px;
    margin-bottom: 10px;
  }

  .image_formulaire{
    width: 175px; 
    height: auto;
  }

  .position_formulaire{
    display: flex;
    justify-content: flex-start;
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


</style>