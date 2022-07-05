<template>
    <div>
        <div class="topContainer">
            <h3>Bonjour {{sdatas.first_name}} {{sdatas.last_name}} !</h3>
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

        <div v-if="tutor_bool==true">
            <div id="global" v-for="(ligne, index) in sdatas_comp" :key="index">
                <div class="prescriptionCard">
                    <div>
                        <h2>
                            Dr. {{ ligne.infos_prescription.doctor_infos.first_name }} {{ ligne.infos_prescription.doctor_infos.last_name }}, fait le
                            {{ ligne.infos_prescription.creation_date }}
                        </h2>
                        <div class="statePrescription">
                            <p v-if="ligne.infos_prescription.used==true">Utilisée le {{ ligne.infos_prescription.date_of_use }}.</p>
                            <p v-if="ligne.infos_prescription.validity==true">Oronnance valide.</p>
                            <p v-if="ligne.infos_prescription.reported==true">Ordonnance signalée.</p> 
                        </div>

                        <p id="ID"> ID : {{ ligne.infos_prescription.Id_Prescription }}</p>
                    </div> 
                    <button id="detail" @click="toOrdonnance(index)"><strong>Voir le détail</strong></button>
                </div>
            </div>
        </div>

        <div v-else>
            <div id="global" v-for="(ligne, index) in mdatas[index_pac].prescriptions_pac" :key="index">
                <div class="prescriptionCard">
                    <div>
                        <h2>
                            Dr. {{ ligne.infos_prescription.doctor_infos.first_name }} {{ ligne.infos_prescription.doctor_infos.last_name }}, fait le
                            {{ ligne.infos_prescription.creation_date }}
                        </h2>
                        <div class="statePrescription">
                            <p v-if="ligne.infos_prescription.used==true">Utilisée le {{ ligne.infos_prescription.date_of_use }}.</p>
                            <p v-if="ligne.infos_prescription.validity==true">Oronnance valide.</p>
                            <p v-if="ligne.infos_prescription.reported==true">Ordonnance signalée.</p> 
                        </div>

                        <p id="ID"> ID : {{ ligne.infos_prescription.Id_Prescription }}</p>
                    </div> 

                    <button id="detail" @click="toOrdonnance(index)"><strong>Voir le détail</strong></button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
module.exports = {
  name: "PatientHome",
    data() {
        return {
            
            search: "",
            
        }
    },
    methods: {
        toOrdonnance: function (index) {
            if (this.tutor_bool==true) {
                this.$emit('save_ordonnance', this.sdatas_comp[index]);
            }
            else {
                this.$emit('save_ordonnance', this.mdatas[this.index_pac].prescriptions_pac[index]);
            }
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
    props:{
        mdatas: {
            type: Array,
            required: true,
            default: function () {
                return [];
            }
        },
        sdatas: {
            type: Object,
            required: true,
            default: function () {
                return [];
            }
        },
        sdatas_comp: {
            type: Array,
            required: true,
            default: function () {
                return [];
            }
        },
        index_pac: {
            type: Number,
            required: true,
            default: function () {
                return 0;
            }
        },
        tutor_bool: Boolean,
    },
    mounted() {
        //Afficher la liste des ordonnances en fonction du bon patient
        //Soit le Tuteur 
        //Soit la bonne personne à sa charge (en fonction du bouton appuyé dans PatientInCharge)
    }
};
</script>

<style scoped>
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