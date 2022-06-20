<template>
  <div >
    <div class = "rectangle">
      <p> Votre profil </p>
    </div>

     <div class = "card_patient">
       <p id = "informations" class="rectangle"> Vos informations </p>

      <!-- <div v-for="info in person" :key="info.id">
        <p>Last name : {{info.last_name}}</p>
        <p>First name : {{info.first_name}}</p>
        <p>Birth date : {{info.birth_date}}</p>
        <p>Email_adress : {{info.email_address}}</p>      
      </div> -->
      
      <div>
        <p>Last name : Lisa</p>
        <p>First name : Raoul</p>
        <p>Birth date : 20/06/2001</p>
        <p>Email_adress : blabla</p>      
      </div>

  </div>

</template>

<script>
module.exports = {
    name: 'modify-card',
    data(){
        return{
          
        }
    },
    methods:{
    }
   
}
</script>

<style>

  p{
    margin-top: 13px;
    margin-bottom: 0rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-style: normal;
  }

  .rectangle{
    width: fit-content;
    border-bottom: 4px solid green;
  }

  .card_patient{
    position: relative;
    width: 1123px;
    height: 635px;
    left: 322px;
    background: rgba(216, 216, 216, 0.5);
    border-radius: 20px;
  }

  #informations{
    position: absolute;
    width: fit-content;
    height: 50px;
    left: 50px;
    font-style: normal;
    font-weight: 800;
    font-size: 25px;
    line-height: 44px;

    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
</style>