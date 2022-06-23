<template>
    <div>
        <br>
        <div class="head">
            <h4>Rédiger une ordonnance</h4>
            <button @click="back" id="backButton" class="btn btn-outline-secondary" data-mdb-ripple-color="dark">retour</button>
        </div>
        <hr>
        
        <div class="global">

            <div class="globalcontainer">
                <div class="container">                   
                    <br>
                    <input class="inputName" type="text" placeholder="Nom" required/>
                    <input class="inputName" type="text" placeholder="Prénom" required/>
                </div>
            
                <div class="date_container">
                    <div style="margin-right:5px">
                        <p>Le </p>
                    </div>
                    <div class="date">
                        <input class="form-control" type="date" >
                    </div>
                </div>
            </div>
            <br>
            <div class="input_medicament_info">
                <label style="font-size:30px; margin-bottom:5px"><strong>Ajouter d'un médicament</strong></label>
                <!--input pour ajouter le médicament-->
                <form v-on:submit.prevent="addDrug">
                    <input type="text" v-model="newDrug_name" placeholder="Nom du médicament"/>
                    <input type="number" v-model="newDrug_quantity" placeholder="Quantité" required />
                    <br>
                    <br>
                    <input id="notes_input" type="text" v-model="newDrug_notes" placeholder="Notes"/>
                    <br>
                    <button>Ajouter</button>
                </form>
                <br>
                <!--Affichage de la liste de médicaments ajoutée-->
                <table class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Quantité</th>
                            <th>Notes</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="(drug, index) in drugs" :key="index.drug_name">
                            <td>{{drug.drug_name}}</td>
                            <td>
                                {{drug.drug_quantity}}
                                <input type="text" v-model="drug.drug_quantity" v-if="drug.hideQuantity === false" placeholder="Nom du médicament"/>
                            </td>
                            <td>{{drug.drug_notes}}</td>
                            <td>
                                <button class="btn btn-outline-secondary" @click="editQuantity(index)" v-if="drug.hideQuantity === true">Modifier</button>
                                <button class="btn btn-outline-secondary" @click="finishEditQuantity(index)" v-else>Terminer</button>
                                <button class="btn btn-outline-secondary" @click="removeDrug(drug)">Supprimer</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br>
            <textarea placeholder="Commentaires & services" class="form-control"></textarea>
            <br>
            <div class="reusable">
                <label>Ordonnance renouvelable <input type="checkbox" name="resuable" v-model="reusable"/></label>
                <input id="reuse" type="number" placeholder="Nombre de réutilisations" v-if="reusable===true"/>
            </div>
            <br>
            <br>
            <div class="send" style="text-align:center; ">
             <button type="submit" style="width:40%;">Envoyer</button>
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
                {drug_name:"Doliprane 1000mg", drug_quantity: "1", drug_notes: "3 fois par jour pendant 2 jours", hideQuantity: true},
                {drug_name:"Doliprane 500mg", drug_quantity: "1", drug_notes: "3 fois par jour pendant 2 jours", hideQuantity: true,},
            ],
            newDrug_name: "",
            newDrug_quantity: "",   
            newDrug_notes: "",

            editDrug:{
                drug_quantity: "",
            },
            

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
        editQuantity(index){
            this.drugs[index].hideQuantity = false;
        }, 
        finishEditQuantity(index){
            this.drugs[index].hideQuantity = true;
            // this.drugs[index].drug_quantity = this.editDrug.drug_quantity;
            console.log("non");
        },
        back(){
            this.$router.push('/Doctor_home');
        }
    }
}
</script>

<style>
.head {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.global {
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
    border-radius: 20px;
}

.globalcontainer {
    display: flex;
    justify-content: space-between;
    margin-bottom:3px;

}

.date_container {
    display: flex;
    flex-direction: row;
}


table,td {
    border: 1px solid #333;
}

#inputName{
  border: 1px solid rgb(7, 7, 7);
  border-radius: 5px;
}

button{
    color: rgb(49, 49, 49);
    text-decoration: none;
    padding: 10px;
    margin-left: 5px;
    margin-right: 5px;
    border-top:none;
    border-left:none;
    border-right:none;
    border-radius:  7px;
    border-bottom: 0.4px solid rgb(49, 49, 49);
}

button:hover {
    background-color: #b1b1b1;
    transition: background-color 0.5s;
}
/*tableau de medicaments*/
table{
    border-collapse:collapse;
    width: 100%;
}

.table-striped tbody tr:nth-of-type(odd){
    background-color:rgba(0,0,0,.08)
}
.table-bordered{
    border:1px solid #dee2e6
}
.table-bordered td,.table-bordered th{
    border:1px solid #dee2e6
}
.table-bordered thead td, .table-bordered thead th{
    border-bottom-width:2px
}

input[type="text"]{
    border-top:none;
    border-left:none;
    border-right:none;
    padding: 5px;
    margin-right: 5px;
}

input[type="number"] {
    border-top:none;
    border-left:none;
    border-right:none;
    padding: 5px;
    margin-right: 5px;
}
#reuse{
width: 20%;
}

.input_medicament_info {
    margin-top: 10px;
}

#notes_input {
    width:29%;
    height:60px;
    margin-bottom:20px;
}
</style>
