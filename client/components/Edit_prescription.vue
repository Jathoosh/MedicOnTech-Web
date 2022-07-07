
<template>
    <div>
        <br>
        <div class="head">
            <h4>Rédiger une ordonnance</h4>
            <button @click="back" id="backButton" class="btn btn-outline-secondary" data-mdb-ripple-color="dark">retour</button>
        </div>
        <hr>
        
        <div class="global">       
            <form>
            <div class="globalcontainer">
                <div class="container">                   
                    <br>
                    <input class="inputName" v-model="newPatient_lastname" type="text" placeholder="Nom" required/>
                    <input class="inputName" v-model="newPatient_firstname" type="text" placeholder="Prénom" required/>
                    <button @click="searchpatient()">Rechercher</button>
                    <listpatient @fillinput = "fillinput" :liste_patient_search = "liste_patient_search" v-if="print_list_patient == true"> </listpatient>
                </div>

                <div class="date_container">
                    <div style="margin-right:5px">
                        <p>Le </p>
                    </div>
                    <div class="date">
                        <input class="form-control" type="date" v-model="myDate">
                    </div>
                </div>
            </div>
            <br>
            <div class="input_medicament_info">
                <div id="container_drug">
                    <!--input pour ajouter le médicament-->
                    <form id="form_add" v-on:submit.prevent="addDrug">
                        <label style="font-size:30px; margin-bottom:5px"><strong>Ajouter un médicament</strong></label>
                        <br>
                        <input type="text" v-model="newDrug_name" placeholder="Nom du médicament"/>
                        <button type="button" @click="searchdrug()">Rechercher un médicament</button>
                        
                        <br>
                        <br>
                        <div>
                            <input type="number" min="1" v-model="newDrug_quantity" placeholder="Quantité" required />
                            <input id="notes_input" type="text" v-model="newDrug_notes" placeholder="Notes"/>
                        </div>
                        <br>
                        
                        <button type="submit">Ajouter</button>
                    </form>
                
                    <listdrug id="drug_table" @fillinputdrug = "fillinputdrug" :liste_drug_search = "liste_drug_search" v-if="print_list_drug == true"></listdrug>
                </div>
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
            <textarea placeholder="Commentaires & services" class="form-control" v-model="notes"></textarea>
            <br>
            <div class="reusable">
                <label>Ordonnance renouvelable <input type="checkbox" name="resuable" v-model="reusable"/></label>
                <input id="reuse" type="number" min="1" placeholder="Nombre de réutilisations" v-model="reuse" v-if="reusable===true"/>
            </div>
            <br>
            <br>
            <div class="send" style="text-align:center; ">
                <button type="button" style="width:40%;" @click="sendPrescription()">Envoyer</button>
                <p id="message" v-if="sendMessage === true">Ordonnance envoyée. Redirection dans 2s.</p>
                <p id="message_error" v-if="boolerror == true">{{message_error}}</p>
            </div>
            </form>
           
        </div>
    </div>
</template>

<script>

module.exports = {
    name: 'Edit_prescription',
    components: {
        listpatient:listpatient,
        listdrug: listdrug,
    },
    props: {
        liste_patient_search: {
            type: Array,
            required: true,
            default: []
        },
        liste_drug_search: {
            type: Array,
            required: true,
            default: []
        },
    },
    data() { 
        return {
            reusable : false,
            reuse : 1,
            myDate : new Date().toISOString().slice(0,10),
            drugs: [ // tableau des médicaments
                {drug_name:"", drug_quantity: "", drug_notes: "", hideQuantity: true},
            ],
            newDrug_name: "",
            newDrug_quantity: "",   
            newDrug_notes: "",
            newPatient_lastname: "",
            newPatient_firstname: "",
            notes: "",

            editDrug:{
                drug_quantity: "",
            },

            newPrescription : { // ordonnance à envoyer
                patient_lastname: "",
                patient_firstname: "",
                date: "",
                drugs: [
                    {drug_name:"", drug_quantity: "", drug_notes: "", hideQuantity: true}
                ],
                notes: "",
                reusable: false,
                reuse: "",
            },
            sendMessage: false, // message de confirmation d'envoi de l'ordonnance
            print_list_patient: false, // affichage de la liste des patients
            print_list_drug: false, // affichage de la liste des médicaments
            message_error : "",
            boolerror : false, 
        }
    },
    methods: {
        addDrug(){
            // ajout dans la liste de la vue les mediacaments ajoutés
            this.drugs.push({drug_name: this.newDrug_name, drug_quantity: this.newDrug_quantity, drug_notes: this.newDrug_notes, hideQuantity: true});
            // vider les champs de saisie
            this.newDrug_name = "";
            this.newDrug_quantity = "";
            this.newDrug_notes = "";
        },
        removeDrug(drug){
            // suppression dans la liste des médicaments d'un médicament
            this.drugs.splice(this.drugs.indexOf(drug), 1);
        },
        editQuantity(index){
            this.drugs[index].hideQuantity = false;
        }, 
        finishEditQuantity(index){
            this.drugs[index].hideQuantity = true;
        },
        back(){
            this.$router.push('/Doctor_home');
        },
        sendPrescription(){
            if(this.newPatient_lastname == "" && this.newPatient_firstname == "" ){
                this.message_error = "Veuillez entrer un nom et un prénom";
                this.boolerror = true;
            }
            else if (this.drugs.length == 0) {
                this.message_error = "Veuillez entrer au moins un médicament";
                this.boolerror = true;
            }
            else {
                this.newPrescription.date = this.myDate;
                this.newPrescription.drugs = this.drugs;
                this.newPrescription.notes = "Notes pour les médicaments : \n";
                this.drugs.forEach(drug => {
                    this.newPrescription.notes += drug.drug_name + ":" + drug.drug_notes + "\n";
                });
                this.newPrescription.notes += "\nNotes supplémentaires :\n" + this.notes;
                this.newPrescription.reusable = this.reusable;
                this.newPrescription.reuse = this.reuse;
                this.newPrescription.patient_lastname = this.newPatient_lastname;
                this.newPrescription.patient_firstname = this.newPatient_firstname;
                this.sendMessage = true;
                this.boolerror = false;

                this.$emit('sendprescription', this.newPrescription);
                setTimeout(() => {
                    this.$router.push('/Doctor_home');
                }, 2000);
            }
        },
        searchpatient(){
            if(this.newPatient_lastname != "" || this.newPatient_firstname != ""){
                this.$emit('search_patient', {last_name:(this.newPatient_lastname == "" ? "=" : this.newPatient_lastname), first_name:(this.newPatient_firstname  == "" ? "=" : this.newPatient_firstname)});
                this.print_list_patient = true;
            }
            else{
                alert("Veuillez remplir les champs nom et/ou prénom");
            }
        },
        searchdrug(){
            if(this.newDrug_name != ""){
                this.$emit('search_drug', this.newDrug_name);
                this.print_list_drug = true;
            }
            else{
                alert("Veuillez remplir le champ nom du médicament");
            }
        },

        fillinput(patient){ // remplir les champs de saisie avec les données du patient sélectionné
            this.newPatient_lastname = patient[0].last_name;
            this.newPatient_firstname = patient[0].first_name;
            this.print_list_patient = false;
        },
        fillinputdrug(drug){ // remplir les champs de saisie avec les données du médicament sélectionné
            this.newDrug_name = drug;
            this.print_list_drug = false;
        }
    }, 
    created: function(){
        this.drugs = [];
        this.newDrug_name = "";
        this.newDrug_quantity = "";
        this.newDrug_notes = "";
    }
}
</script>

<style scoped>
.head {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.global {
    display: flex;
    flex-direction: column;
    box-shadow: 5px 5px 15px #eeecec, -5px 5px 5px #eeecec;
    background-color: white;
    margin-left: auto;
    margin-right: auto;
    padding: 20px;
    padding-bottom: 40px;
    margin-top: 4vh;
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
    width:300px;
    margin-bottom:20px;
}

#container_drug {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
}

#form_add {
    width: 100%;
}

#drug_table {
    width: 100%;
}

#message{
    margin-top: 20px;
}

#message_error{
    color: red;
    padding-top: 15px;
}
</style>
