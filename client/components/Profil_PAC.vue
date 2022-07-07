<template>
  <div>
    <div class="main_container">
      <div id="retour_container">
        <button id="button" @click="redirectToHistoryPatient()" type="submit">Retour</button>
      </div>
    </div>
      
    <br>

    <div class="container">
      <div class = "card_patient">
        <p id = "informations" class="rectangle">Ajout d'une personne à charge pour {{mdatas[index_history_patient].infos_patient.first_name}} {{mdatas[index_history_patient].infos_patient.last_name}}</p>
        <div class="content_container">

          <div class="d-flex flex-row">
            <p class="image_profil text-center" id="nom_profil">{{initialesPatient()}} </p>
          </div>
          
          <div>
            <!-- données du patient -->
            <table class="table">
              <tbody>
                  <tr>
                    <th scope="row">Nom de famille</th>
                    <td><input type="text" v-model="newLast_name" required></td>
                  </tr>

                <tr>
                  <th scope="row">Prénom</th>
                  <td><input type="text" v-model="newFirst_name" required></td>
                </tr>
                <tr>
                  <th scope="row">Date de naissance</th>
                  <td><input type="date" min="1900-01-01" v-model="newBirth_date" required></td>
                </tr>
                
                <tr>
                  <th scope="row">Mutuelle</th>
                  <td><input type="text" v-model="newMutuelle"></td>
                </tr>
              </tbody>
            </table> 
          </div>
          <div class="position_formulaire">
            <img class = "image_formulaire rounded" src="ressources/formulaire.jpg" alt="Image">
          </div>

        </div>
        
        <div class="buttonModify">
          <p class="p" id="add_message">{{message}}</p>
          <p id="error_message" v-if="boolerror == true">{{message_error}}</p>
          <button @click="sendPac()" class="btn btn-outline-dark ml-2">Ajouter patient</button>
          <br>
        </div>
        
        <br>
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
            [{
              last_name: "",
              first_name: "",
              birth_date: "",
              mutuelle: "",
            }],

          newLast_name: "",
          newFirst_name: "",
          newBirth_date: "",
          newMutuelle: "",
          message: "",
          message_error: "",
          boolerror: false,
      }
    },
    props: {
        sdatas: Object,
        mdatas: {
          type: Array,
          required: true,
          default: function () {
            return [];
          }
        },
        index_history_patient: {
          type: Number,
          required: true,
          default: function () {
            return 0;
          }
        }
    },
    methods:{
      initialesPatient: function(){
        var String = this.mdatas[this.index_history_patient].infos_patient.first_name[0] + this.mdatas[this.index_history_patient].infos_patient.last_name[0];
        return String;
      },
      redirectToHistoryPatient(){
        this.$router.push("/History_patient");
      },
      sendPac(){
        // verifier que les champs last_name et first_name et birth_date sont remplis
        if(this.newLast_name == "" || this.newFirst_name == "" || this.newBirth_date == ""){
          this.message_error = "Veuillez remplir au moins les champs nom, prénom et la date de naissance.";
          this.boolerror = true;
        }
        // verifier que la date est au moins 1900-01-01
        else if(this.newBirth_date < "1900-01-01"){
          this.message_error = "Veuillez entrer une date de naissance valide.";
          this.boolerror = true;
        }
        else{
          // emit les données des champs de patient
          this.patient.last_name = this.newLast_name;
          this.patient.first_name = this.newFirst_name;
          this.patient.birth_date = this.newBirth_date;
          this.patient.mutuelle = this.newMutuelle;
          this.boolerror = false;
          this.$emit("sendpac", this.patient);

          // vider les champs remplis
          
          this.newLast_name = "";
          this.newFirst_name = "";

          this.newBirth_date = "";
          this.newMutuelle = "";

          setTimeout(() => {
            this.message = "✔";
          }, 0001);
          setTimeout(() => {
            this.message = "";
          }, 4000);
        }
      },
    }
}
</script>

<style scoped>
#error_message{
  color: red;
  margin-right: 15%;
}

#add_message{
  color: green;
  font-size:30px; 
  display: flex;
  -content: center;
}

#retour_container{
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  width: 100%;
}

.p {
  margin-top: 0;
  margin-bottom: 0;
  margin-right: 10px;
}

#button {
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
  margin-top:15px;
}

.title_profil{
  margin-top: 12px;
  font-size: 24px;
}

#nom_profil{
  margin-bottom: 0rem;
  padding-top: 20px;
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
  width: 100%;
  table-layout: auto;;
  display: flex;
  justify-content: space-between;
}

.buttonModify{
  display:flex;
  align-items: center;
  align-content: flex-end;
  justify-content: flex-end;
  flex-direction: row;
  padding-right: 62px;
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