<template>
    <div>
        <div class="topContainer">
            <h3>Patient - Accueil</h3>
            <button @click="goToPatientInCharge" id="buttons">Personnes à charge</button>
        </div>

        <div id="container">
        <input
            class="SearchBar"
            type="search"
            v-model="search"
            placeholder="Rechercher une ordonnance"
            size="28"
        />
        </div>

        <h3>Filtres</h3>
        <hr/>
        <div class="filtre">
        
            <h4>Date</h4>
            <input class="filter_date" type="date" placeholder="Date" size="28" />
            <h4>Médicaments</h4>
            <input class="filter_drug" type="text" placeholder="Medicament" size="15" />

            <h4>Quantité</h4>

            <select class="filter_select">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            </select>


        </div>

        <div id="global" v-for="(ligne, index) in listOrdonnance" :key="index">
            <div class="prescriptionCard">
                <div>
                    <h2>
                        Dr {{ doctor.first_name }} {{ doctor.last_name }}, fait le
                        {{ ligne.creation_date }}
                    </h2>
                    
                    <div class="statePrescription">
                        <p v-if="ligne.used=='true'">Utilisée le {{ ligne.date_of_use }}.</p>
                        <p v-if="ligne.validity=='true'">Oronnance valide.</p>
                        <p v-if="ligne.reported=='true'">Ordonnance signalée.</p> 
                    </div>

                    <p id="ID"> ID : {{ ligne.Id_Prescription }}</p>
                </div> 

                 <button id="detail" @click="toOrdonnance"><strong>Voir le détail</strong></button>
            </div>
        </div>

    </div>
</template>

<script>
module.exports = {
  name: "PatientHome",
    data() {
        return {
            person: {
                first_name: 'DUPONT',
                last_name: 'Thomas',
                phone: '06-12-34-56-78',
                email_address: 'testPatient.adresse@gmail.com'
            },
            doctor: {
                first_name: 'CHEVALIER',
                last_name: 'Jean',
                phone: '06-50-30-01-59',
                email_address: 'testDoctor.adresse@gmail.com',
                work_place: 'Hôpital de la ville',
                work_name: 'Rue de la ville',
                work_phone: '06-50-30-01-95',
                work_email_address: 'hopital.adresse@gmail.com'},
            speciality: {
                speciality_name: 'Dentiste',
            },
            listOrdonnance: [{
                Id_Prescription: '0362819304',
                creation_date: '01/01/2020',
                date_of_use: '12/04/2020',
                number_of_reuses: '1',
                used: 'true',
                validity: 'true',
                note: 'Le médicament est bon',
                reported: 'true',
                listDrug: [
                    {drug_name: 'Medoc1',
                    quantity: '1'},
                    {drug_name: 'Medoc2',
                    quantity: '2'},
                ],
                listService: [
                    {service_name: 'Service1',
                    quantity: '1'},
                    {service_name: 'Service2',
                    quantity: '2'},
                ],
            },
            {
                Id_Prescription: '0274849139',
                creation_date: '11/01/2020',
                date_of_use: '23/05/2020',
                number_of_reuses: '2',
                used: 'false',
                validity: 'false',
                note: 'La séance de kinésithérapie est nécessaire',
                reported: 'false',
                listDrug: [
                    {drug_name: 'Medoc3',
                    quantity: '3'},
                    {drug_name: 'Medoc4',
                    quantity: '4'}
                ],
                listService: [
                    {service_name: 'Service3',
                    quantity: '3'},
                    {service_name: 'Service4',
                    quantity: '4'},
                ],

            }],
            
            search: "",
            
        }
    },
  methods: {
    toOrdonnance: function () {
      this.$router.push("/Ordonnance");
    },
    goToPatientInCharge: function () {
      this.$router.push("/PatientInCharge");
    },
  },
  computed: {
    filteredPatients() {
      return this.patient.filter((patient) => {
        return (
          patient.last_name.toLowerCase().indexOf(this.search.toLowerCase()) >
          -1
        );
      });
    },
  },
};
</script>

<style>
    .topContainer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
    }
    .prescriptionCard {
        display: flex;
        flex-direction: row;
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
        display:flex;
        justify-content: row;
    }
    .filter_date {
        max-height: 20px;
        margin-top:15px;
        margin-left: 15px;
        margin-right: 15px;
    }

    .filter_drug {
        max-height: 20px;
        margin-top:13px;
        margin-left: 15px;
        margin-right: 15px;

        border-top:none;
        border-left:none;
        border-right:none;  
    }

    #detail {
        align-self: center;
        margin-left: auto;
        margin-right: 30px;
        height: 10%;
    }

    .filter_select {
        max-height: 20px;
        margin-top: 19px;
        margin-left: 15px;
        margin-right: 15px;
    }


    button {
        color: rgb(49, 49, 49);
        text-decoration: none;
        padding: 10px;
        margin-left: 5px;
        margin-right: 5px;
        border-radius: 7px;
        border: 0.4px solid rgb(49, 49, 49);
    }

    button:hover {
        background-color: #b1b1b1;
        transition: background-color 0.5s;
    }

    #container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    #container .SearchBar {
        border-top: none;
        border-left: none;
        border-right: none;
        max-width: 50%;
    }

    .statePrescription {
        margin: 10px;
        margin-left: 35px;
    }

    #ID{
        color:grey;
        margin-left: 35px;
    }
</style>