<template>
  <div class ="container">

    <div class="rectangle"> 
      <p id="title_profil"> Foire aux questions </p>
    </div> 
    <div> 
      <p id="text_faq"> Ici, vous retrouverez les questions les plus posées. 
        Si votre question ne s’y trouve pas, n’hésitez pas à nous contacter. Nous serons ravis de vous répondre :)
      </p>
    </div>

  
  </div>
</template>

<script>
module.exports = {
    name: 'page-faq'   
}
</script>

<style>
  
  .container{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 60px;
  } 

  .rectangle{
    width: fit-content;
    border-bottom: 4px solid green;
    margin-bottom: 10px;
  }
    
  #title_profil{
    font-size: 35px;
    margin-bottom: 0px;
  }

  #texte_faq{
    display: flex;
    text-align: center;
    font-size: 23px;
    margin-top: 20px;
    line-height: 30px;
  }
  
</style>