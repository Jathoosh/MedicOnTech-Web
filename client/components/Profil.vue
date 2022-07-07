<template>
  <div>
    <div>
      <div class = "main_container">
        <p class="title_profil"> Votre profil </p>
        <div>
          <button @click="retourPagePrincipale" class="btn btn-outline-dark ml-2" type="submit">Retour</button>
      </div>
    </div>
      <div class="container">
        <div class = "card_patient">
          <p id = "informations" class="rectangle"> Vos informations </p>

          <div class="content_container">       
            <div>
              <p class="image_profil text-center" id="nom_profil"> {{ initialesPatient() }} </p>
            </div>
            
            <div>
              <!-- données du patient -->
              <table class="table">
            <tbody>
                <tr>
                  <th scope="row">Nom de famille</th>
                  <td>{{sdatas.last_name}}</td>
                </tr>
              <tr>
                <th scope="row">Prénom</th>
                <td>{{sdatas.first_name}}</td>
              </tr>
              <tr>
                <th scope="row">Date de naissance</th>
                <td>{{changeDate(sdatas.birth_date)}}</td>
              </tr>
              <tr>
                <th scope="row">Adresse mail</th>
                <td>{{sdatas.mail}}</td>
              </tr>
              <tr>
                <th scope="row">Mutuelle</th>
                <td><input v-model="mutuelle"></td>
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
            <p v-if='hide_length == "true"' id="lenght_message">Le nom de la mutuelle est incorrect</p>
            <button @click="modifyInformationsProfil()" class="btn btn-outline-dark ml-2">Ajouter une mutuelle</button>
          </div>
        </div> 
      </div>
    </div>
    <br>
  </div>
</template>

<script>
module.exports = {
  name: 'modify-card',
  props: {
    sdatas: {
      type: Object,
      required: false,
      default: function () {
        return {};
      },
    },
      hide_length: {
        type: String,
        default: "false",
        validator(value) {
          return ["true", "false", "changed"].includes(value)
        },
      },

    },
    data() {
      return {
        mutuelle: "",
        message: "",
      };
    },
    mounted() {
      this.mutuelle = this.sdatas.mutual_name;
      //watch hide_length
      this.$watch('hide_length', (value) => {
        if (value == "changed") {
          setTimeout(() => {
          this.message = "✔";
          }, 0001);
          setTimeout(() => {
            this.message = "";
          }, 4000);
        }
      });
    },
    methods:{
      modifyInformationsProfil(){
        this.$emit("modify_profil", {mutuelle:this.mutuelle});
      },
      retourPagePrincipale: function(){
        this.$emit("retour page principale");
        this.$router.push("/Patient_home");
      }, 
      initialesPatient: function(){
        var String = this.sdatas.first_name[0] + this.sdatas.last_name[0];
        return String;
      },
      changeDate(date){
        dateSplit = date.split('-');
        return dateSplit[2] + "/" + dateSplit[1] + "/" + dateSplit[0];
      },
    }
}

</script>

<style scoped>
  .main_container {
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
    margin-left : -2px;
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
    display: flex;
    justify-content: space-between;
    table-layout: auto;
    width: 100%;
  }

  .buttonModify{
    display: flex;
    align-items: center;
    place-content: flex-end;
    flex-direction: row;
    padding-right: 4%;
    margin-bottom: 1%;
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
  
.p {
  margin-top: 0;
  margin-bottom: 0;
  margin-right: 10px;
}

#add_message{
  color: green;
  font-size:30px; 
  display: flex;
  -content: center;
}

#lenght_message{
    margin-top: 0;
    margin-bottom: 1rem;
    margin-right: 1rem;
    color: red;
}
</style>