<template>
    <div>
        <p> Bonjour {{ infosPharmacist() }} </p>
        
        <div class="buttonDeconnexion">
            <button @click="retourPagePrincipale" class="buttonTextSize btn text-center" type="submit">Deconnexion</button>
        </div>
        
        <div class="rectangle"> <p id="title_profil"> Recherche avancée </p> </div>    
        
        <div id="container"> 
            <div>
                <input class="buttonTextSize SearchBar" type="search" id="search" placeholder="ID ordonnance" size="28"/>
                <button @click="rechercherID()" id="buttonRechercher" class="buttonTextSize btn text-center">Rechercher</button>              
            </div>
        </div>

        <!-- affichage de l'ordonnance seulement si la fonction scanPrescription renvoit true -->
        <!-- <p v-if="scanPrescription == true"> Affichage de l'ordonnance </p> -->

        <div class="buttonValiderOrdonnance">
            <button @click="validerOrdonnance" class="buttonTextSize btn text-center" type="submit">Valider ordonnance</button>
        </div>

               
        <div id="containerInput"> 
            <p class="signalement"> Signalement </p> 
            <div id="SignalContainer">
                <form> <textarea class= "buttonTextSize" placeholder="Cause du signalement, ... ">  </textarea> </form>
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

<style scoped>

    .buttonDeconnexion{
        position: absolute;
        left: 1509px;
        top: 167px;
        background: #D9D9D9;
        border-radius: 20px;
    }

   .rectangle{
        width: fit-content;
        border-bottom: 4px solid green;
        margin-top: 20px;
    }
     
   #title_profil{
        margin-top: 12px;
        font-size: 24px;
        margin-left: -2px;
        margin-bottom: 0px;
    }
     
    #container{        
        display: flex;
        flex-direction: row;
        justify-content: center;   
        margin-right: -10px;
    }

    #containerInput{
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-content: space-around;    
        align-items: stretch;
    }
    
    #container .SearchBar{
        border-top: none;
        border-left: none;
        border-right: none;
        margin-bottom: 15px;
        margin-top: 15px;
        width: 70%;
    }

    .buttonTextSize{
        font-size: 17px;
    }

    
    #buttonRechercher{
        width: fit-content;
        background: #D9D9D9;
        border-radius: 20px; 
        margin-right: -162px;
        margin-top: -69px;
        margin-left: 790px;
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
        font-weight: 800;
        font-size: 25px;
    }

    #containerInput .Signaler{
        width: 1019px;
        height: 368px;
        background: rgba(216, 216, 216, 0.5);
        border-radius: 20px;
        margin-bottom: 30px;  
        position: static;   
    }

    #SignalContainer{
        align-self: center;
        display: flex;
        flex-direction: column;
        justify-content: end;        
    }

    textarea {
        width: 1022px;
        height: 368px;
        background: rgba(216, 216, 216, 0.5);
        border-radius: 20px;
        margin-top: 15px;  
        margin-bottom: 30px;  
    }

    .buttonSignaler{
        background: #D9D9D9;
        border-radius: 20px;
        max-width: 100px;
        align-self: flex-end;
    }

</style>