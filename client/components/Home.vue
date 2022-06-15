<template>
    <div>
        <p>La page d'accueil </p>   

        <!-- à mettre dans le header -->         
        <img class="image_profil" src="ressources/profil.png" alt="Image" @click="activateCard()">   

        <br><br>
        <div>
            <img class="image" src="ressources/salle_attente.jpg" alt="Image">
        </div>
        <div class="imageSuperposee" >
            <!-- à rajuster pour que la card soit juste en dessous du profil --> 
            <div id="carteSuperposee" class="cardPosition">
                <login v-if="card == true"/> 
            </div>
            
            <div id= "rectangle"> 
                <div class = "title" id= "flexbox"> Connectez-vous avec France connect </div>
                <div id= "flexbox">
                <a href = "#"> <img class = "franceConnect" src="ressources/france_connect.png" alt="Image"> </a> </div>
                <div id= "flexbox" class = "titleContact"> En cas de problème n'hésitez pas à nous contacter. </div>
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
    methods:{
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

<style>
        
    .image{
        position: absolute;
        width: 100%;
        height: 80%;
        opacity: 0.5;
        text-align: center;
    }

    .imageSuperposee {
        margin-top: 250px;
        width: 100%;
        text-align: center;
        position : absolute;
    }
    
    #imageSuperposee {
        margin-top: 250px;
        width: 100%;
        text-align: center;
        position : absolute;
    }
    

    #rectangle {
        display: block;
        margin-top: 10px;
        margin-left: auto;
        margin-right: auto;
        width: 620px;
	    height: 280px;
        background: white;
    }
  
    .title{
        color: green;
        font: 30px "Verdana", "Arial", cursive;   
    }

    .franceConnect{
        width: 120%;
    }

    .titleContact{
        font: 20px "Verdana", "Arial", cursive;  
    }

    #flexbox{
        display: flex;
        justify-content: center;
        padding-top: 20px;
        margin-top: 30px;
        align-items: start; 
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
    

</style>