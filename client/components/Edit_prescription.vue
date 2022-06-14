<template>
    <div>
        <div class="global">
             <div class="formulaire">
                <form>

                    <input type="text" 
                    placeholder="Prénom et NOM du patient"
                    required
                    />
                    <label> Le</label>
                    <input type="date">
                    
                    <div id="drug-list">
                        <h2>Ajout d'un médicament</h2>
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
                    </div>

                    

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
        }
    }
}
</script>

<style>
input {
  border: 1px solid rgb(7, 7, 7);
  border-top: none;
  border-right: none;
  border-left: none;
}
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
#drug-list {
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
}
/*enlever la puce*/
ul {
    list-style: none;
}
</style>
