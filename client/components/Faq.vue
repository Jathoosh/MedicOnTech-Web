<template>
  <div>
    <div class ="container">
      <div class="rectangle"> 
        <p id="title_profil"> Foire aux questions </p>
      </div> 
      
      <div> 
        <p class="texte_faq"> Ici, vous retrouverez les questions les plus posées. 
          Si votre question ne s’y trouve pas, n’hésitez pas à nous contacter. <br>Nous serons ravi.e.s de vous répondre :)
        </p>
      </div>
    </div>
    
    <!-- FAQ -->
    <div>      
      <div class="accordion accordion-flush box_faq" id="accordionFlushExample">        
        <div class="accordion-item box_texte">
          <h2 class="accordion-header" id="flush-headingOne">
            <button class="accordion-button collapsed box_question rounded-4 text-primary" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
              <strong> Comment se connecter sur France Connect ? </strong>
            </button>
          </h2>
          <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body fs-5"> Pour se connecter, il vous suffit d’aller sur la page Connexion. </div>
          </div>
        </div>
        
        <div class="accordion-item box_texte">
          <h2 class="accordion-header" id="flush-headingTwo">
            <button class="accordion-button collapsed box_question rounded-4 text-primary" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                <strong> Comment ajouter sa mutuelle / adresse mail ? </strong>
            </button>
          </h2>
          <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body fs-5"> C’est très simple, il vous suffit d’aller sur votre profil puis “Modifier son profil”. </div>
          </div>
        </div>
        
        <div class="accordion-item box_texte">
          <h2 class="accordion-header" id="flush-headingThree">
            <button class="accordion-button collapsed box_question rounded-4 text-primary" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                <strong> Comment ajouter un patient à charge ? </strong>
            </button>
          </h2>
          <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body fs-5"> Si vous êtes <strong>un patient</strong>, veuillez vous rapprocher de votre médecin.
            <br> Si vous êtes <strong>un médecin</strong>, il vous suffit d’aller sur l'historique du patient puis son profil et ajouter une personne à charge.</div>
          </div>
        </div>

        <div class="accordion-item box_texte">
          <h2 class="accordion-header" id="flush-headingFour">
            <button class="accordion-button collapsed box_question rounded-4 text-primary" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                <strong> Comment gérer ses données personnelles ? </strong>
            </button>
          </h2>
          <div id="flush-collapseFour" class="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body fs-5"> Vous avez juste à contacter un membre de MedicOnTech. </div>
          </div>
        </div>

        <div class="accordion-item box_texte">
          <h2 class="accordion-header" id="flush-headingFive">
            <button class="accordion-button collapsed box_question rounded-4 text-primary" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                <strong> Comment modifier son profil ? </strong>
            </button>
          </h2>
          <div id="flush-collapseFive" class="accordion-collapse collapse" aria-labelledby="flush-headingFive" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body fs-5"> C’est très simple, il vous suffit d’appuyer en haut à droite sur votre icone de profil puis “Modifier son profil”. </div>
          </div>
        </div>

        <div class="accordion-item box_texte">
          <h2 class="accordion-header" id="flush-headingSix">
            <button class="accordion-button collapsed box_question rounded-4 text-primary" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSix" aria-expanded="false" aria-controls="flush-collapseSix">
                <strong> Puis-je recevoir mon ordonnance ? </strong>
            </button>
          </h2>
          <div id="flush-collapseSix" class="accordion-collapse collapse" aria-labelledby="flush-headingSix" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body fs-5"> Oui vous pouvez la recevoir en mode PDF. </div>
          </div>
        </div>

        <div class="accordion-item box_texte">
          <h2 class="accordion-header" id="flush-headingSeven">
            <button class="accordion-button collapsed box_question rounded-4 text-primary" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSeven" aria-expanded="false" aria-controls="flush-collapseSeven">
                <strong> Puis-je utiliser MedicOnTech pour réaliser une télécommunication ? </strong>
            </button>
          </h2>
          <div id="flush-collapseSeven" class="accordion-collapse collapse" aria-labelledby="flush-headingSeven" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body fs-5"> Non, pas pour le moment. </div>
          </div>
        </div>

        <div class="accordion-item box_texte">
          <h2 class="accordion-header" id="flush-headingEight">
            <button class="accordion-button collapsed box_question rounded-4 text-primary" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseEight" aria-expanded="false" aria-controls="flush-collapseEight">
                <strong> Comment sont stocker les données ? </strong>
            </button>
          </h2>
          <div id="flush-collapseEight" class="accordion-collapse collapse" aria-labelledby="flush-headingEight" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body fs-5"> Les données sont stockées dans une base de données en ligne. Tout est bien sûr sécurisé. </div>
          </div>
        </div>

        <div class="accordion-item box_texte">
          <h2 class="accordion-header" id="flush-headingNine">
            <button class="accordion-button collapsed box_question rounded-4 text-primary" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseNine" aria-expanded="false" aria-controls="flush-collapseNine">
                <strong> Comment supprimer mon compte ? </strong>
            </button>
          </h2>
          <div id="flush-collapseNine" class="accordion-collapse collapse" aria-labelledby="flush-headingNine" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body fs-5"> Vous avez juste à contacter un membre de MedicOnTech. </div>
          </div>
        </div>

        <div class="accordion-item box_texte">
          <h2 class="accordion-header" id="flush-headingTen">
            <button class="accordion-button collapsed box_question rounded-4 text-primary" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTen" aria-expanded="false" aria-controls="flush-collapseTen">
                <strong> Comment récupérer une copie de mes données ? </strong>
            </button>
          </h2>
          <div id="flush-collapseTen" class="accordion-collapse collapse" aria-labelledby="flush-headingTen" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body fs-5"> Vous avez juste à contacter un membre de MedicOnTech. </div>
          </div>
        </div>

        <div class="accordion-item box_texte">
          <h2 class="accordion-header" id="flush-headingEleven">
            <button class="accordion-button collapsed box_question rounded-4 text-primary" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseEleven" aria-expanded="false" aria-controls="flush-collapseEleven">
                <strong> Est-ce qu’il y a des fonctionnalités payantes ? </strong>
            </button>
          </h2>
          <div id="flush-collapseEleven" class="accordion-collapse collapse" aria-labelledby="flush-headingEleven" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body fs-5"> Non, pas pour le moment. </div>
          </div>
        </div>

        <div class="accordion-item box_texte">
          <h2 class="accordion-header" id="flush-headingTwelve">
            <button class="accordion-button collapsed box_question rounded-4 text-primary" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwelve" aria-expanded="false" aria-controls="flush-collapseTwelve">
                <strong> Est-ce que le site est affilié à l’Etat ? </strong>
            </button>
          </h2>
          <div id="flush-collapseTwelve" class="accordion-collapse collapse" aria-labelledby="flush-headingTwelve" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body fs-5"> Non mais à l’avenir peut-être. </div>
          </div>
        </div>

        <div class="accordion-item box_texte">
          <h2 class="accordion-header" id="flush-headingThirteen">
            <button class="accordion-button collapsed box_question rounded-4 text-primary" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThirteen" aria-expanded="false" aria-controls="flush-collapseThirteen">
                <strong> Est-ce que l’application est compatible avec Windows Phone ? </strong>
            </button>
          </h2>
          <div id="flush-collapseThirteen" class="accordion-collapse collapse" aria-labelledby="flush-headingThirteen" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body fs-5"> Oui et même vous pourrez y avoir accès sur toutes platefomes confondues. </div>
          </div>
        </div>
      </div>
    </div>      
  </div>
</template>

<script>
  module.exports = {
      name: 'page-faq'   
  }
</script>

<style scoped>  
@media (min-width: 768px) {
    .box_faq{
        margin-left: 0px;
        margin-right: 0px;
    }
}
  .container{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  } 

  .rectangle{
    width: fit-content;
    border-bottom: 4px solid green;
  }
    
  #title_profil{
    font-size: 36px;
    margin-bottom: 0px;
  }

  .texte_faq{
    display: flex;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 25px;
    font-size: 22px;
    line-height: 30px;
  }
  
  .box_faq{
    margin-left: 25%; 
    margin-right: 25%; 
    margin-bottom: 20px 
  }

  .box_texte{
    margin-top: 5px;
  }

  .box_question{
    border: 0.3px solid black;
    font-size: 22px;
  }

</style>