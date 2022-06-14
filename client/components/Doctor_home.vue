<template>
    <div>
        <h3>Dr {{doctor.first_name}} {{doctor.last_name}}| {{doctor.speciality}}</h3>
        <input class="SearchBar" type="search" v-model="search" placeholder="Rechercher un nom de patient" size="28"/>
        
        <button @click="redirectionToEditPrescription()">Rédiger une ordonnance</button>

        <div id="global">
            <div class="patient_case" v-for="patient in patients" :key="patient.last_name">
                <h3>{{patient.first_name}} {{patient.last_name}} | {{patient.id}}</h3>
                 <button @click="redirectionToHistoryPatient()">Historique</button>
            </div>

        </div>
    </div>
</template>

<script>
module.exports = {
    name: 'Medecin_home',
    props: {
            //patients: {type: Array,}, // chaque bloc est un patient  venant du back
            //doctor: {type: Array}, // ca vient du back

    },
    data() {
        return {
            search: '',
            patients: [{ //peut-etre pas necessaire
                first_name: "Nathan",
                last_name: "DOLY",
                id: "43572653",
                birth_date:"22/04/2001",
                email_adress:"bonsoirnon@gmail.com"
            }],
            doctor: {
                first_name: "Nathan",
                last_name: "DOLY",
                speciality: "général",
            }
        }      
    },
    methods: {
        redirectionToHistoryPatient() {
            this.$router.push('/History_patient');
        },
        redirectionToEditPrescription() {
            this.$router.push('/Edit_prescription');
        }
    },
    computed: function (){
        return this.patients.filter(function(patient){
            return patient.last_name.toLowerCase().indexOf(this.search.toLowerCase());
        });
    }

}
</script>

<style>
.SearchBar{
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 5px;
    margin-bottom: 10px;
    border-top: none;
    border-right: none;
    border-left: none;
}

.patient_case {
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
#button_more {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
}
button{
   float: right;
}

body{
    font-family: 'Verdana';
}
</style>