<template>
    <div>
        <div class="topContainer">
            <h3>Bonjour {{sdatas.first_name}} {{sdatas.last_name}} !</h3>
        </div>

        <p id="search_adv">Recherche avancée</p>
        <div class="filtre">
            <h4>Date</h4>
            <input class="filter_date" type="date" v-model="input_date" placeholder="Date" size="28" />
        </div>

        <div v-if="tutor_bool==true">
            <div id="global" v-for="(ligne, index) in filteredDataTutor" :key="index">
                <div class="prescriptionCard">
                    <div>
                        <h2>
                            Par Dr. {{ ligne.infos_prescription.doctor_infos.first_name }} {{ ligne.infos_prescription.doctor_infos.last_name }}
                            - Pour {{ sdatas.first_name }} {{ sdatas.last_name }}
                        </h2>                       
                        <h4> 
                            Fait le {{ changeDate(ligne.infos_prescription.creation_date) }}
                            - Expire le {{ changeDate(ligne.infos_prescription.expiration_date) }} <br>
                        </h4>

                        <div class="statePrescription">
                            <p v-if="ligne.infos_prescription.used==true">Ordonnance utilisée le {{ changeDate(ligne.infos_prescription.date_of_use) }}.</p>
                            <p v-if="ligne.infos_prescription.validity==false">Oronnance invalide.</p>
                            <p v-if="ligne.infos_prescription.reported==true" class="presc_reported">
                                Ordonnance signalée :<br>
                                {{ligne.infos_prescription.report_note}}
                            </p>  
                        </div>

                        <!-- <p id="ID"> ID : {{ generateBarCodeNumber(ligne.infos_prescription.Id_Prescription) }}</p> -->
                    </div> 
                    <button id="detail" @click="toOrdonnance(index)">Voir le détail</button>
                </div>
            </div>
        </div>

        <div v-else>
            <div id="global" v-for="(ligne, index) in filteredData" :key="index">
                <div class="prescriptionCard">
                    <div>
                        <h2>
                            Par Dr. {{ ligne.infos_prescription.doctor_infos.first_name }} {{ ligne.infos_prescription.doctor_infos.last_name }}
                            - Pour {{ mdatas[index_pac].infos_pac.first_name }} {{ mdatas[index_pac].infos_pac.last_name }}
                        </h2>
                        <h4>
                            Fait le {{ changeDate(ligne.infos_prescription.creation_date) }}
                            - Expire le {{ changeDate(ligne.infos_prescription.expiration_date) }}
                        </h4>
                        <div class="statePrescription">
                            <p v-if="ligne.infos_prescription.used==true">Ordonnance utilisée le {{ changeDate(ligne.infos_prescription.date_of_use) }}.</p>
                            <p v-if="ligne.infos_prescription.validity==false">Oronnance invalide.</p>
                            <p v-if="ligne.infos_prescription.reported==true" class="presc_reported">
                                Ordonnance signalée.<br>
                                {{ligne.infos_prescription.report_note}}
                            </p>  
                        </div>

                        <!-- <p id="ID"> ID : {{ ligne.infos_prescription.Id_Prescription }}</p> -->
                    </div> 

                    <button id="detail" @click="toOrdonnance(index)">Voir le détail</button>
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
            
            input_date: "",
            
        }
    },
    methods: {
        toOrdonnance: function (index) {
            if (this.tutor_bool==true) {
                this.$emit('save_ordonnance', {prescription : this.sdatas_comp[index], infos_patient : {first_name : this.sdatas.first_name, last_name : this.sdatas.last_name}});
                this.$emit('status_patient');
            }
            else {
                this.$emit('save_ordonnance', {prescription : this.mdatas[this.index_pac].prescriptions_pac[index], infos_patient : {first_name : this.mdatas[this.index_pac].infos_pac.first_name, last_name : this.mdatas[this.index_pac].infos_pac.last_name}});
                this.$emit('status_patient');
            }
        },
        generateBarCodeNumber(Id_Prescription){
            var barcode = Id_Prescription.toString();
            while (barcode.length < 12) {
                barcode = "0" + barcode;
            }
            return barcode; 
        },
        changeDate(date){
            dateSplit = date.split('-');
            return dateSplit[2] + "/" + dateSplit[1] + "/" + dateSplit[0];
        }
    },
    computed: {
    filteredDataTutor() {
        var select_date = this.input_date;
        var date = new Date(select_date).getTime();

        if(select_date == ""){
            return this.sdatas_comp;
        }
        else{
            return this.sdatas_comp.filter(function (ligne) {
            return new Date(ligne.infos_prescription.creation_date).getTime() >= date;
            });
        }
      
    },
    filteredData() {
        var select_date = this.input_date;
        var date = new Date(select_date).getTime();

        if(select_date == ""){
            return this.mdatas[this.index_pac].prescriptions_pac;
        }
        else{
            return this.mdatas[this.index_pac].prescriptions_pac.filter(function (ligne) {
            return new Date(ligne.infos_prescription.creation_date).getTime() >= date;
            });
        }
      
    }

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
                return {};
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
    }
};
</script>

<style scoped>
    .presc_reported
    {
        color: red;
    }
    #search_adv {
    border-bottom: 5px solid #01AA88;
    max-width: fit-content;
    inline-size: fit-content;
    }
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
        margin-top: 7vh;
        margin-bottom: 25px;
    }

    .filtre {
        display:flex;
        justify-content: row;
    }
    .filter_date {
        max-height: 20px;
        margin-left: 15px;
        align-self: center;
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
        border: none;
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
        margin-top: 20px;
        margin-left: 35px;
    }

    #ID{
        color:grey;
        margin-left: 35px;
    }
</style>