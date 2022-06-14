<template>
    <div>

        <h1>Rédiger une ordonnance</h1>
        <button @click="back" id="backButton">retour</button>
        <div class="global">
            
             <div class="formulaire">
                <form>

                    <input id="inputName" type="text" placeholder="Prénom et NOM du patient" required/>
                    <label> Le</label>
                    <input type="date">
                    
                    
                        <h4>Ajouter d'un médicament</h4>
                        <!--input pour ajouter le médicament-->
                        <form v-on:submit.prevent="addDrug">
                            <input type="text" v-model="newDrug_name" placeholder="Nom du médicament"/>
                            <input type="number" v-model="newDrug_quantity" placeholder="Quantité" required />
                            <button>Ajouter</button>
                        </form>

                        <!--Affichage de la liste de médicaments ajoutée-->
                        <ul>
                            <li v-for="(drug, index) in drugs" :key="index">
                                <span>{{drug.drug_name}}  Quantité : {{drug.drug_quantity}}</span>
                                <input type="text" v-model="drug.drug_quantity" v-if="hideQuantity === false" placeholder="Nom du médicament"/>
                                <button @click="editQuantity(drug)" v-if="hideQuantity === true">Modifier</button>
                                <button v-else @click="finishEditQuantity(drug)">Terminer</button>
                                <button @click="removeDrug(drug)">Supprimer</button>
                            </li>
                        </ul>
                    

                    

                    <br>
                    <label>Notes</label>
                    <br>
                    <textarea placeholder="Notes"></textarea>
                    <br>

                    <label>Ordonnace rétuilisable</label>
                    <input type="checkbox"
                    name="resuable" v-model="reusable"/>
                    <input type="text" placeholder="Nombre de réutilisations" v-if="reusable===true"/>

                    
                </form>
                <button type="submit">Envoyer</button>
             </div>
        </div>
    </div>
</template>

<script>
module.exports = {
    name: 'Edit_prescription',
    data() { 
        return {
            reusable : false,
            drugs: [
                {drug_name:"Dopliprane 1000mg", drug_quantity: "1"},
            ],
            newDrug_name: "",
            newDrug_quantity: "",   

            editDrug:{
                drug_quantity: "",
            },
            hideQuantity: true,

        }
    },
    methods: {
        addDrug(){
            // ajout dans la liste de la vue les mediacaments ajoutés
            this.drugs.push({drug_name: this.newDrug_name, drug_quantity: this.newDrug_quantity});
            // vider les champs de saisie
            this.newDrug_name = "";
            this.newDrug_quantity = "";
        },
        removeDrug(drug){
            // suppression dans la liste de la vue les mediacaments ajoutés
            this.drugs.splice(this.drugs.indexOf(drug), 1);
        },
        editQuantity(){
            this.hideQuantity = false;
        }, 
        finishEditQuantity(drug){
            this.hideQuantity = true;
            this.editDrug.drug_quantity = drug.drug_quantity;
            console.log("non");
        },
        back(){
            this.$router.push('/Doctor_home');
        }
    }
}
</script>

<style>

.formulaire {
    display: flex;
    flex-direction: column;
    /*max-width: 90%;*/
    box-shadow: 5px 5px 15px #eeecec, -5px 5px 5px #eeecec;
    background-color: white;
    margin-left: auto;
    margin-right: auto;
    padding: 20px;
    padding-bottom: 40px;
    margin-top: 7vh;
    margin-bottom: 25px;
}
/* #drug-list {
    display: flex;
    flex-direction: column;
    max-width: 90%;
    box-shadow: 5px 5px 15px #eeecec, -5px 5px 5px #eeecec;
    border-radius: 5px;
    background-color: white;
    margin-left: auto;
    margin-right: auto;
    padding: 20px;
    padding-bottom: 40px;
    margin-top: 7vh;
    margin-bottom: 25px;
} */
/*enlever la puce*/
ul {
    list-style: none;
}

#backButton{
    color: rgb(49, 49, 49);
    text-decoration: none;
    padding: 10px;
    margin-left: 5px;
    margin-right: 5px;
    border-radius: 7px;
    border: 0.4px solid rgb(49, 49, 49);
}

#backButton:hover {
    background-color: #b1b1b1;
    transition: background-color 0.5s;
}

#inputName{
  border: 1px solid rgb(7, 7, 7);
  
  border-radius: 5px;
}
</style>
