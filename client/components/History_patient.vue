<template>
    <div>
        <input class="SearchBar" type="search" v-model="search" placeholder="Rechercher un nom de patient" size="28"/>
        <h3>Historique des ordannances passées </h3>

        <div id="global" v-for="(patient, index) in patients" :key="index">
            
            <div class="prescription_info">
                <h2>Pour {{patient.first_name}} {{patient.last_name}},fait le {{prescription.creation_date }}</h2>
                <p>Medicament(s) {{prescription.drug}} Quantité {{prescription.quantity}}</p>
                <p>Notes : {{prescription.notes}}</p>
                <p>Dr<span> {{doctor.first_name}} {{doctor.last_name}}</span></p>
            </div>

        </div>

        <div class="filtre">
                <h3>Filtres</h3>
                <div class="filtre_info">
                    <h4>Date</h4>
                    <input type="date" placeholder="Date" size="28"/>
                    <h4>Medicaments</h4>
                    <input type="text" placeholder="Medicament" size="15"/>
                    <h4>Quantité</h4>
                    <select>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>

    </div>
</template>

<script>
module.exports = {
    name: 'History_patient',
    data () {
        return {
            prescription: {
                creation_date: "20/04/2022",
                drug: "Doliprane",
                quantity: "2",
                notes: "2 fois par jour pendant 3 jours",
            },
            patients: [{
                first_name: "Paul",
                last_name: "Pierre",
                id: "43572653",
            }],
            doctor: {
                first_name: "Truc",
                last_name: "Muche",
                speciality: "général",
            },

            search: '',
        }
    },
    methods:{
        test:function(){
            console.log(prescription.creation_date);
        }
    },
    computed: {
            filteredPatients() {
                return this.patient.filter(patient => {
                    return patient.last_name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
                })
            }
    }
}
</script>

<style>
body {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.prescription_info {
    display: flex;
    flex-direction: column;
    max-width: 97%;
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

.filtre {
    display: flex;
    flex-direction: column;
    max-width: 10%;
    box-shadow: 5px 5px 15px #eeecec, -5px 5px 5px #eeecec;
    margin-left: auto;
    padding: 20px;
    margin-top: 7vh;
    margin-bottom: 25px;
   
}

#global{
  width:100%;
}
#global .prescription_info {
    float:left;
    width:80%;
}
#global .filtre {
    float:right;
    width:20%;
    margin-right:10px;
}
</style>