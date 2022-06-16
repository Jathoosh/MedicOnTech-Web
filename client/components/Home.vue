<template>
  <div>
    <!-- à mettre dans le header -->         
    <img class="image_profil" src="ressources/profil.png" alt="Image" @click="activateCard()">   
    <div id="background">
      <div class="imageSuperposee">
        <!-- à rajuster pour que la card soit juste en dessous du profil --> 
        <div id="carteSuperposee" class="cardPosition">
            <login v-if="card == true"/> 
        </div>
        <div id="rectangle">
          <p class="title">Connectez-vous avec France connect</p>
          <a>
            <img class="franceConnect" @click="FCMethod()" src="ressources/france_connect.png" alt="Image"/>
          </a>
          <p class="titleContact">
            En cas de problème n'hésitez pas à nous contacter.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

const login = window.httpVueLoader('./components/Login.vue');
module.exports = {
    name: 'Home',
    data(){
        return{
            card: false,
            Id_Person: 1 
        }
    },
    components:{
        login : login
    },
    mounted() {
      document.getElementById("main").style.width = "100%";
    },
    methods:{
        FCMethod() {
          this.$emit("fc-method");
        },
       activateCard(){
        if(this.card == false){
            this.card = true;
        }
        else{
            this.card = false;
        }
       }
    }
}

</script>

<style scoped>
#background {
  background: url("../ressources/salle_attente.jpg");
}

.imageSuperposee {
  padding-top: 10%;
  padding-bottom: 10%;
  width: 100%;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.5);
}

#rectangle {
  margin: 0 auto;
  width: 620px;
  height: 280px;
  background: white;
  box-shadow: 0px 0px 10px #000000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
  align-items: center;
}

.title {
  color: green;
  font: 30px "Verdana", "Arial", cursive;
}

#rectangle > .title
{
  margin-top: 30px;
  margin-bottom: 30px;
}
    
    .image_profil{
        height: 50px;
        width: 50px;
        border-radius: 100%;
        border: 2px solid black;
        margin-top : 5px;
        float: right;
    }
        
    .cardPosition{
        display: flex;
        flex-direction: row-reverse;
        position : static;
    }

    #carteSuperposee {
        margin-top: 66px;
        width: 100%;
        text-align: center;
        position : absolute;
    }
    

#rectangle > .titleContact
{
  margin-top: 20px;
  margin-bottom: 20px;
}

.franceConnect {
  width: 100%;
}

.titleContact {
  font: 20px "Verdana", "Arial", cursive;
}
</style>