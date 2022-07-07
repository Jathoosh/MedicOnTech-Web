<template>
  <div id="container">

    <div class="rectangle"> 
      <p id="title_profil"> Nous contacter </p>
    </div>    
    
    <div>
      <p id="texte_medicOnTech"> 
        Nous sommes disponibles tous les jours de la semaine
        de 9 h à 18 h pour tout renseignement complémentaire. 
      </p>
    </div>

    <div id="position_logos" >
      <div class="position_reseaux">
        <img id="logo_reseaux_sociaux" src="ressources\MedicOnTech_reseaux.png" alt="logo_reseaux_sociaux">
        <p id="texte_reseaux"> 
          <strong> Via nos réseaux sociaux </strong>
          <br><a href="https://linktr.ee/medicontech">Linkedin, Instagram et Youtube</a>
        </p> 
      </div>
      
      <div class="position_reseaux">
        <img id="logo_mail" src="ressources\logo_mail.png" alt="logo_mail">
        <p id="texte_mail"> 
            <strong> Via notre mail </strong>
            <br>
            <a href="mailto:team.MedicOnTech@gmail.com">team.MedicOnTech@gmail.com</a>
          </p>
      </div>       
    </div>   
  </div>
</template>

<script>
module.exports = {
    name: 'page-contact'   
}
</script>

<style scoped>
  
  #container{
    display: flex;
    flex-direction: column;
    justify-content: center;  
    align-items: center;
    margin-bottom: 60px;
  } 

  .rectangle{
    width: fit-content;
    border-bottom: 4px solid green;
    margin-top: 20px;
  }
    
  #title_profil{
    font-size: 35px;
    margin-bottom: 0px;
  }

  #texte_medicOnTech{
    font-size: 23px;
    margin-top: 20px;
    margin-bottom: 15px;
  }

  #logo_reseaux_sociaux{
    width: 212px;
    height: 197px;
  }

  #logo_mail{
    width: 183px;
    height: 187px;
  }

  #position_logos{
    display: flex;
    width: 40%;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 20px;
  }

  .position_reseaux{
    display: flex;
    flex-direction: column;
    align-content: stretch;
    align-items: center;
    text-align: center;
  }

  img {
    vertical-align: middle;
  }

  #texte_reseaux{
    font-size: 20px;
  }

  #texte_mail{
    margin-top: 9px;
    font-size: 20px;
  }

</style>