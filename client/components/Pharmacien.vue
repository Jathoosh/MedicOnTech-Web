<template>
    <div>
        <p> Bonjour {{ infosPharmacist() }} </p>
        
        <div class="buttonDeconnexion">
            <button @click="retourPagePrincipale" class="btn text-center" type="submit">Deconnexion</button>
        </div>
        
        <div class = "rectangle">
            <p class="title_profil"> Recherche avancée </p>
        </div>    
        
        <div id="container"> 
            <input class="SearchBar" type="search" v-model="search" placeholder="ID ordonnance" size="28"/>
        </div>

        <!-- affichage de l'ordonnance seulement si la fonction scanPrescription renvoit true -->
        <p v-if="scanPrescription == true"> Affichage de l'ordonnance </p>

        <div class="buttonValiderOrdonnance">
            <button @click="validerOrdonnance" class="btn text-center" type="submit">Valider ordonnance</button>
        </div>

        <div>
            <p class="signalement"> Signalement </p>
        </div>
        
        <div id="container">
            <input class="Signaler" v-model="signaler" placeholder="Cause du signalement, ... ">
        </div>
        
        <div class="buttonSignaler">
            <button @click="signalerOrdonnance" class="btn text-center" type="submit">Signaler</button>
        </div>

    </div>
</template>

<script>
module.exports = {
    name: 'Pharmacien',
    data(){
        return{
            pharmacist: {
                id_pharmacist: 1, // on ne doit pas le voir sur la page
                last_name: 'Raoul',
                first_name: 'Lisa '            
            }
        }
    },
    methods: {
        retourPagePrincipale: function(){
            this.$emit("retour page principale");
            this.$router.push("/login");
        }, 
        infosPharmacist: function(){
            var String = this.pharmacist.first_name + this.pharmacist.last_name;
            return String;
        },
        signalerOrdonnance: function(){
            //this.$emit("signaler", this.id_prescription);
            //console.log(this.patient); 
            alert("Signalement ordonnance");
        }
    },
    mounted(){
        // afficher l'ordonnance du patient en fonction de l'id patient récupéré
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
        width: fit-content;
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
    
    #container .SearchBar {
        border-top: none;
        border-left: none;
        border-right: none;
        margin-bottom: 15px;
        width: 50%;
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
        margin-left: 492px;
        font-weight: 800;
        font-size: 25px;
    }

    .buttonSignaler{
        width: fit-content;
        margin-left: 900px;
        background: #D9D9D9;
        border-radius: 20px;
    }

    #container .Signaler{
        width: 1019px;
        height: 368px;
        background: rgba(216, 216, 216, 0.5);
        border-radius: 20px;
        margin-bottom: 30px;
    }
</style>