<template>
    <div>
        <p>La page d'accueil</p>
        
        <div class="child1">
            <img src="ressources/salle_dattente.jpg" alt="Image">
        </div>
        
        <div class="child2">
            <div id= "rectangle"> 
                <br><span class = "title"> Connectez-vous avec France connect </span> 
                <br><br>
                <a href = "#">
                <img src="ressources/france_connect.png" alt="Image">
                </a>
                <br><br><span> En cas de problème n'hésitez pas à <em>nous contacter</em> </span> 
                <br>
            </div> 
        </div>

    </div>
</template>

<script>
module.exports = {
    name: 'Home',

}
</script>

<style>
    
    .child1 {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0.5;
        text-align: center;
    }
    .child2 {
        margin-top: 200px;
        width: 100%;
        text-align: center;
        position : absolute;
        z-index: 20;
    }

    #rectangle {
        display: block;
        margin-top: 10px;
        margin-left: auto;
        margin-right: auto;
        width: 400px;
	    height: 200px;
        background: white;
    }
  
    .title{
        color: green;
        font: 20px "Questriallt", "Zapfino", cursive;
    }

    em { 
        text-decoration:underline; 
    }

</style>