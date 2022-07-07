<template>
    <div class="mainContainer">
        <h3> Bonjour {{ infosPharmacist() }} </h3>
        
        <div class="rectangle"> <p id="title_profil"> Recherche avancée </p> </div>    
        
        <div id="searchContainer"> 
            <input class="searchBar" type="search" id="search" placeholder="ID ordonnance" v-model="Id_Ordonnance" size="28"/>
            <input class="searchBar" type="search" id="search" placeholder="N° sécurité sociale" v-model="check_security" size="28"/>
            <button @click="rechercherID()" id="buttonRechercher">Rechercher</button>              
        </div>

        <!-- Affichage de l'ordonnance seulement si la fonction scanPrescription renvoit true -->
        <div v-if="scanprescription_bool == true">

            <ordonnance 
            :status="status"
            :prescription_for_display="prescription_for_display"></ordonnance>

            <div class="buttonValider">
                <button @click="validerOrdonnance" type="submit">Valider ordonnance</button>
            </div>

            <!-- Signalement ordonnance -->
            <h4> Signalement </h4> 

            <form> 
                <textarea class="form-control" placeholder="Cause du signalement, ... " v-model="signalement_text">  </textarea> 
            </form>

            <div class="buttonSignaler"> 
                <button @click="signalerOrdonnance" type="submit">Signaler</button> 
            </div> 
        </div>

    </div>
</template>

<script>
module.exports = {
    name: 'Pharmacien',
    components: {
        Ordonnance,
    },
    props:{
        // mdatas: {
        //     type: Array,
        //     required: true,
        //     default: function () {
        //         return [];
        //     }
        // },
        sdatas: {
            type: Object,
            required: true,
            default: function () {
                return {};
            }
        },
        prescription_for_display: {
            type: Object,
            required: true,
            default: function () {
                return {};
            }
        },
        scanprescription_bool: {
            type: Boolean,
            required: true,
            default: function () {
                return false;
            }
        },
        status: 
        {
            type: Number,
            required: true,
            default: function () {
                return 0;
            }
        },
    },
    data(){
        return{
            Id_Ordonnance: '',
            check_security: '',
            signalement_text: '',
        }
    },
    methods: {
        infosPharmacist: function(){
            var String = this.sdatas.first_name + " " + this.sdatas.last_name;
            return String;
        },
        rechercherID: function(){
            if(this.checkEAN13Digits(this.Id_Ordonnance.toString()))
            {
            this.$emit('scanprescription', {prescription : this.Id_Ordonnance, check_security : this.check_security});
            this.$emit('status_pharmacist');
            }
            else
            {
                alert("Le code barre n'est pas valide");
            }
        },
        validerOrdonnance: function(){
            //Décrémenter de 1 number_of_reuse et si number_of_reuse == 0, passer validity à 0
            if (this.prescription_for_display.infos_prescription.used === 1 || this.prescription_for_display.infos_prescription.validity === 0)
            {
                alert("L'ordonnance est déjà validée");
            }
            else
            {
                this.$emit('validate_prescription', {Id_Prescription:this.prescription_for_display.infos_prescription.Id_Prescription, check_security: this.check_security});
            }
        },
        signalerOrdonnance: function(){
            this.$emit("ordonnance_signalee", {Id_Prescription:this.prescription_for_display.infos_prescription.Id_Prescription, check_security: this.check_security,report_note : this.signalement_text});
            alert("Cette ordonnance a été signalée");
        },
        checkEAN13Digits(str){ //Le str est le code barre en nombre, faites attention à ce qu'il n'y ait que des nombres
            let sum1 = 0;
            let sum2 = 0;
            for (let i = 0; i<str.length-1;i++){
                if (i%2 == 0){
                    sum1 = sum1 + str[i]
                }
                else{
                    sum2 = sum2 + str[i]
                }
            }
            return str[str.length-1] == ((sum1*3 + sum2)%10 == 0)? 0 : (10 - (sum1*3 + sum2)%10)
        } 
    },
    mounted(){
    }
}
</script>

<style scoped>
    .mainContainer{
        width: 100%;
    }

   .rectangle{
        width: fit-content;
        border-bottom: 4px solid green;
        margin-top: 2%;
    }
     
   #title_profil{
        margin-top: 2%;
        font-size: 24px;
        margin-left: -2px;
        margin-bottom: 0px;
    }
    
    #searchContainer{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 60%;
        margin-top: 2%;
        margin-bottom: 3%;
    }

    .searchBar{
        border-top: none;
        border-left: none;
        border-right: none;
        padding: 5px;
        margin-right: 5px;
    }

    .buttonValider{
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-top: 3%;
        margin-bottom: 3%;
    }

    .buttonSignaler{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-top: 2%;
        margin-bottom: 3%;
    }

    button {
    color: rgb(49, 49, 49);
    text-decoration: none;
    padding: 10px;
    margin-left: 5px;
    margin-right: 5px;
    border-radius: 7px;
    border: none;
    }

    button:hover {
        background-color: #b1b1b1;
        transition: background-color 0.5s;
    }

</style>