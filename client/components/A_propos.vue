<template>
  <div class="container">
    <div class="rectangle"> 
      <p id="title_profil"> A propos de nous </p>
    </div>    
    
    <div>
      <p id="texte_presentation_equipe"> 
        À l’apparition d'un appel d’offres, MedicOnTech a vu le jour pour répondre à ce besoin. 
        Groupe d’ingénieur du numérique en devenir, comportant 6 membres de 1ère année du cycle ingénieur (L3) se spécialisant en IT, nous nous sommes réunis pour développer notre solution alliant les domaines médicales et technologiques.
      </p>
    </div>

    <div class="container_box">
      <div class="row justify-content-center pb-3">
        <div class="col-xl-3 col-sm-6 mb-5">
          <div class="bg-white rounded shadow-sm py-5 px-4"><img src="ressources\profils\profil_Sylvain.jpg" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm">
            <h5 class="mb-0">Sylvain MIGEON</h5>
          </div>
        </div>

        <div class="col-xl-3 col-sm-6 mb-5">
          <div class="bg-white rounded shadow-sm py-5 px-4"><img src="ressources\profils\profil_Lisa.jpg" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm">
            <h5 class="mb-0">Lisa RAOUL</h5>
          </div>
        </div>    

        <div class="col-xl-3 col-sm-7 mb-5">
          <div class="bg-white rounded shadow-sm py-5 px-4"><img src="ressources\profils\profil_Nathan.jpg" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm">
            <h5 class="mb-0">Nathan DOLY</h5>
          </div>
        </div> 
      </div>
      
      <div class="row justify-content-center pb-1">
        <div class="col-xl-3 col-sm-7 mb-10">
          <div class="bg-white rounded shadow-sm py-5 px-4"><img src="ressources\profils\profil_Jathoosh.jpg" alt="" width="100" class="img-fluid rounded-circle mb-4 img-thumbnail shadow-sm">
            <h5 class="mb-0">Jathoosh THAVARASA</h5>
          </div>
        </div>

        <div class="col-xl-3 col-sm-7 mb-10">
          <div class="bg-white rounded shadow-sm py-5 px-4"><img src="ressources\profils\profil_Maxence.jpg" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm">
            <h5 class="mb-0">Maxence ROBICHON</h5>
          </div>
        </div>    

        <div class="col-xl-3 col-sm-7 mb-10">
          <div class="bg-white rounded shadow-sm py-5 px-4"><img src="ressources\profils\profil_Guillaume.jpg" alt="" width="100" class="img-fluid rounded-circle mb-2 img-thumbnail shadow-sm">
            <h5 class="mb-0">Guillaume JACQUET</h5>
          </div>
        </div>
        
      </div> 
    </div>
  </div>
</template>

<script>
module.exports = {
    name: 'page-a-propos'   
}
</script>

<style scoped>
  
  .container{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;  
    align-items: center;
    margin-bottom: 60px;
  } 

  .container_box{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-content: center;
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

  #texte_presentation_equipe{
    display: flex;
    text-align: center;
    font-family: 'Acme';
    font-weight: 400;
    font-size: 23px;
    margin-top: 20px;
    line-height: 30px;    
  }

  .rounded-circle {
    border-radius: 18%!important;
  }

  .img-thumbnail {
    width: 100%;
    height: auto;
  }

  .row {
    --bs-gutter-x: 1.5rem;
  }

  .mb-0{
    text-align: center;
  }

</style>