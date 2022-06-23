<template>
    <div class="card">
        <!-- affichage des données d'une personne -->
        <div class="card-image">
          <img src="ressources/profil.png" alt="Image">
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
      }
    }
   
}
</script>

<style>
  .card {
    width: 12%; 
    top: -48px;
    right: 21px;
    box-shadow: 0px 5px 20px rgb(81, 153, 220);
  }
  
  .card-image {
    height: 250px;
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

</style>