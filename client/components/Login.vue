<template>
    <div class="card">
        <!-- affichage des données d'une personne -->
        <div class="card-image">
          <img src="ressources/profil.png" alt="Image">
        </div>
        
        <div class="card-body">
            <p>{{ Id_Person }}</p>

            <div class="card-title">
              <p>{{ last_name }}</p>
              <p>{{ first_name }}</p>
            </div>

            <p>{{ birth_date }}</p>
            <p>{{ email_adress }}</p>
        </div>

        <!-- créer un formulaire : rentrer mutuelle - nom / numero de securité sociale -->
    </div>
</template>

<script>
module.exports = {
    name: 'Login',
    data(){
        return{
            Id_Person: 1,  // on ne doit pas le voir sur la page
            last_name: 'Raoul',
            first_name: 'Lisa',
            birth_date: '20-06-2001',
            email_adress: 'blabla@hotmail.com'
        }
    }
   
}
</script>

<style>
  .card {
    width: 30%; 
    margin: 64px auto; 
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
    font-family: 'Century Schoolbook', serif;
    font-weight: bold;
  }

  .card-body {
    text-align: center; 
    padding: 15px 20px; 
    box-sizing: border-box;
  }

</style>