<template>
    <div>
        <p> Bonjour {{ infosPharmacist() }} </p>
        
        <div class="buttonDeconnexion">
            <button @click="retourPagePrincipale" class="btn text-center" type="submit">Deconnexion</button>
        </div>
        
        <div class = "rectangle"> <p class="title_profil"> Recherche avancée </p> </div>    
        
        <div id="container"> 
            <div>
                <input class="buttonTextSize SearchBar" type="search" id="search" placeholder="ID ordonnance" size="28"/>
                <button @click="rechercherID()" id = "buttonRechercher" class="buttonTextSize btn text-center">Rechercher</button>              
            </div>
        </div>

        <!-- affichage de l'ordonnance seulement si la fonction scanPrescription renvoit true -->
        <!-- <p v-if="scanPrescription == true"> Affichage de l'ordonnance </p> -->

        <div class="buttonValiderOrdonnance">
            <button @click="validerOrdonnance" class="buttonTextSize btn text-center" type="submit">Valider ordonnance</button>
        </div>

        <p class="signalement"> Signalement </p>
        
        <div id="containerInput"> 
            <div id="SignalContainer">
                <input class="buttonTextPosition Signaler" id="signaler" placeholder="Cause du signalement, ... "> 
                <div class="buttonSignaler"> 
                    <button @click="signalerOrdonnance" class="buttonTextSize btn text-center" type="submit">Signaler</button> 
                </div>
            </div>
            
            
        </div> 
      

    </div>
</template>

<script>
module.exports = {
    name: 'Pharmacien',
    data(){
        return{
            pharmacist: {
                id_pharmacist: 1, 
                last_name: 'Last Name',
                first_name: 'First Name '            
            }
        }
    },
    methods: {
        infosPharmacist: function(){
            var String = this.pharmacist.first_name + this.pharmacist.last_name;
            return String;
        },
        retourPagePrincipale: function(){
            this.$emit("retour page principale");
            this.$router.push("/login");
        },
        rechercherID: function(){
            var idOrdonnance = document.getElementById("search").value;
            //sera à modifier pour qu'on puisse récupérer l'id de l'ordonnance => backend
            alert(idOrdonnance);
        },
        validerOrdonnance: function(){
            //this.$emit("ordonannce validée", this.id_prescription);
            alert("Ordonnance validée");
        },
        signalerOrdonnance: function(){
            var idOrdonnanceSignalee = document.getElementById("signaler").value;
            //sera à modifier pour qu'on puisse récupérer l'id de l'ordonnance => backend
            alert(idOrdonnanceSignalee);
        }       
    },
    mounted(){
        // afficher l'ordonnance du patient en fonction de son id
        // pour ce faire, il faut récupérer l'id_prescription du patient associé de la table patient
    }
}
</script>

<style>

    .title_profil{
        margin-top: 12px;
        font-size: 24px;
        margin-left: -2px;
        margin-bottom: 0px;
    }
    
    .rectangle{
        width: fit-content;
        border-bottom: 4px solid green;
        margin-top: 20px;
    }
    
    .buttonDeconnexion{
        position: absolute;
        left: 1509px;
        top: 167px;
        background: #D9D9D9;
        border-radius: 20px;
    }
  
    #container {        
        display: flex;
        flex-direction: row;
        justify-content: center;   
    }

    #containerInput {
        display: flex;
        flex-direction: column;
    }
    
    #container .SearchBar {
        border-top: none;
        border-left: none;
        border-right: none;
        margin-bottom: 15px;
        margin-top: 15px;
        width: 70%;
    }

    .buttonValiderOrdonnance{
        width: fit-content;
        margin-left: 790px;
        background: #D9D9D9;
        border-radius: 20px;  
    }

    .signalement{
        width: fit-content;
        height: 50px;
        margin-left: 441px;
        font-weight: 800;
        font-size: 25px;
    }

    .buttonSignaler{
        background: #D9D9D9;
        border-radius: 20px;
        max-width: 100px;
        align-self: flex-end;
    }

    #containerInput .Signaler{
        width: 1019px;
        height: 368px;
        background: rgba(216, 216, 216, 0.5);
        border-radius: 20px;
        margin-bottom: 30px;  
        position: static;   
    }

    #buttonRechercher{
        width: fit-content;
        margin-left: 790px;
        background: #D9D9D9;
        border-radius: 20px; 
        margin-right: -162px;
        margin-top: -69px;
    }
    
    .buttonTextSize{
        font-size: 20px;
    }

    .buttonTextPosition{
        top: 0px;
    }

    #SignalContainer{
        align-self: center;
        display: flex;
        flex-direction: column;
        justify-content: end;        
    }

</style>