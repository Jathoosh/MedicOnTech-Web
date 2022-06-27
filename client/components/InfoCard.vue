<template>
    <div class="card">
        <!-- affichage des données d'une personne -->
        <div class="card-image">
          <div class="d-flex flex-row">
            <p class="image_profil text-center" id="nom_profil"> {{ initialesPatient() }} </p>
          </div>
        </div>
        
        <div class="card-body">
            <p>{{ last_name }}</p>
            <p>{{ first_name }}</p>
            <p>{{ birth_date }}</p>
            <p>{{ email_adress }}</p>
            <button @click="modifyProfil"><strong>Modifier profil</strong></button>
        </div>
    </div>
</template>

<script>
module.exports = {
    name: 'info-card',
    data(){
        return{
            Id_Person: 1,  // on ne doit pas le voir sur la page
            last_name: 'Nom de famille',
            first_name: 'Prénom',
            birth_date: 'Date de naissance',
            email_adress: 'Adresse mail'
        }
    },
    mounted(){
        // afficher caractéristiques de l'utilisateur de la table personne
    }, 
    methods:{
      modifyProfil: function(){
        this.$emit("disapear");
        this.$router.push("/Profil");
      },
      initialesPatient: function(){
        var String = this.last_name[0] + this.first_name[0];
        return String;
      }
    }
   
}
</script>

<style scoped>
  .card {
    width: 12%; 
    top: -48px;
    right: 21px;
    box-shadow: 0px 5px 20px rgb(81, 153, 220);
  }
  
  .card-image {
    position: relative;
  }

  .card-image img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .card-title{
    font-weight: bold;
  }

  .card-body {
    text-align: center; 
    padding: 15px 20px; 
    box-sizing: border-box;
  }

  button{
    width: 138px;
    height: 33px;
    border-radius: 60px / 40px;
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

  .flex-row{
    justify-content: center;
    align-items: center;
  }

  .image_profil {
    height: 50px;
    width: 50px;
    border-radius: 100%;
    border: 2px solid black;
    margin-top: -39px;
    
  }

</style>