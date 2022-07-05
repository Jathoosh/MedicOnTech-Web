<template>
    <div class="ordonnanceContainer">

        <div class="topContainer" id="toDisapearForPrint">
            <h3>Détails de l'ordonnance</h3>
            <button @click="backHome" id="buttons">Retour</button>
        </div>

        <div class="ordonnance" id="ordonnanceForPrint">
            <div>

                    <div class="headerOrdonnance">
                        <!-- Information du Docteur - Table Id_Doctor & Person-->
                        <p id="doctorContainer">
                            Dr. {{ prescription_for_display.infos_prescription.doctor_infos.first_name }} {{ prescription_for_display.infos_prescription.doctor_infos.last_name }}<br>
                            Medecin {{ prescription_for_display.infos_prescription.doctor_infos.speciality }}<br>
                            {{ prescription_for_display.infos_prescription.doctor_infos.phone }}<br>
                            {{ prescription_for_display.infos_prescription.doctor_infos.mail }}<br>
                        </p>

                        <img id="logo_MedicOnTech" src="ressources\MedicOnTech - Logo.png" alt="logo_MedicOnTech">

                        <!-- Information du lieu de travail_docteur - Table Id_Doctor & Person-->
                        <p id="workContainer">
                            {{ prescription_for_display.infos_prescription.doctor_infos.workplace_name }}<br>
                            {{ prescription_for_display.infos_prescription.doctor_infos.address.road_number }} 
                            {{ prescription_for_display.infos_prescription.doctor_infos.address.road_name }}<br>
                            {{ prescription_for_display.infos_prescription.doctor_infos.address.town }}
                            {{ prescription_for_display.infos_prescription.doctor_infos.address.zip_code }},
                            {{ prescription_for_display.infos_prescription.doctor_infos.address.country }}<br>

                            <!-- {{ ligne.infos_prescription.doctor_workplace_mail }}<br> -->
                        </p>
                    </div>

                    <div class="bodyOrdonnance">
                        <div class="bodyHeadearContainer">
                            <div class="bodyHeader">
                                <p id="ID">ID : {{ generateBarCodeNumber(prescription_for_display.infos_prescription.Id_Prescription) }}</p>
                                <p>Fait le {{ changeDate(prescription_for_display.infos_prescription.creation_date) }}.</p><br>

                                <!-- Information du Patient - Table Id_Patient & Person-->
                                <p>M. {{prescription_for_display.infos_patient.first_name}} {{prescription_for_display.infos_patient.last_name}}</p><br>
                            </div>

                            <img id="code_barres" :src="generateBarCode(prescription_for_display.infos_prescription.Id_Prescription )" alt="code_barres">

                        </div>

                        <!-- Information Liste de médicaments - Table Id_Prescription & Drug-->
                        <p v-for="(ligne,index_drug) in prescription_for_display.drugs" :key="index_drug">
                            {{ ligne.drug_name }}
                        </p><br>
                        <!-- - {{ ligne.drug_quantity }} ???-->
                        
                        <!-- Information Liste de services - Table Id_Prescription & Service-->
                        <!-- <p v-for="(ligne,index_service) in prescription_for_display.services" :key="index_service">
                            {{ ligne.service_name }}
                        </p><br> -->

                        <!-- Informtion Ordonnance Note & Renouvelabilité -->
                        <p>Notes : {{ prescription_for_display.infos_prescription.note }}</p><br>            
                        <p>Ordonnance renouvelable {{ prescription_for_display.infos_prescription.number_of_reuses }} 
                            fois tous les {{ prescription_for_display.infos_prescription.frequency_of_reuse }} jours.</p><br><br>

                        <div class="statutContainer">
                            <div>
                                <p v-if="prescription_for_display.infos_prescription.used==true">Utilisée le {{ changeDate(prescription_for_display.infos_prescription.date_of_use) }}.</p>
                                <p v-if="prescription_for_display.infos_prescription.validity==true">Oronnance valide.</p>
                                <p v-if="prescription_for_display.infos_prescription.reported==true">
                                    Ordonnance signalée.<br>
                                    {{prescription_for_display.infos_prescription.report_note}}
                                </p> 
                            </div>
                            <div class="barCode">

                            </div>  
                        </div>  
                    </div> 

            </div>

            <!-- Ajouter le cas d'un patient à charge ! -->

        </div>


        
        <button type="button" id="imprimer" @click="print()">Imprimer l'ordonnance</button><hr>   
    </div>
</template>


<script>
module.exports = {
    name: 'Ordonnance',
    methods: {
        backHome: function () {
        this.$router.push("/Patient_home");
        },
        print: function () {
            window.print();
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
        },
        generateBarCode(ID){
            var prescription_ID = ID;
            var barcode = prescription_ID.toString();
            while (barcode.length < 12) {
                barcode = "0" + barcode;
            }
            console.log(barcode);
            return "http://bwipjs-api.metafloor.com/?bcid=ean13&text=" + barcode;
        }
    },
    props:{
        // mdatas: {
        //     type: Array,
        //     required: true,
        //     default: function () {
        //         return [];
        //     }
        // },
        // sdatas: {
        //     type: Object,
        //     required: true,
        //     default: function () {
        //         return [];
        //     }
        // },
        // sdatas_comp: {
        //     type: Array,
        //     required: true,
        //     default: function () {
        //         return [];
        //     }
        // },
        // index_pac: {
        //     type: Number,
        //     required: true,
        //     default: function () {
        //         return 0;
        //     }
        // },
        // tutor_bool: Boolean,
        // index_ordonnance: Number,
        prescription_for_display: {
            type: Object,
            required: true,
            default: function () {
                return {};
            }
        }
    },
    mounted() {
        console.log(this.prescription_for_display);
        //Parcourir la liste des Prescription d'un Patient et récupérer les données de la Presciption
        //Afficher les données de la Prescription (tables Prescription, Drug et Service) dans la vue 
        //Afficher les données du Docteur (table Person et Speciality) dans la vue en haut à gauche de l'ordonnance
        //Afficher les données du Lieu de travail (table Doctor) dans la vue en hat à droite de l'ordonnance

        //Pour Avoir une impression d'ordenance propre
        //beforePrint
        window.addEventListener('beforeprint', function () {
            const header = document.getElementById('header');
            const footer = document.getElementById('footer');
            const toDisapearForPrint = document.getElementById('toDisapearForPrint');
            const imprimer = document.getElementById('imprimer');
            header.style.display = 'none';
            footer.style.display = 'none';
            toDisapearForPrint.style.display = 'none';
            imprimer.style.display = 'none';

            const ordonnanceForPrint = document.getElementById('ordonnanceForPrint');
            ordonnanceForPrint.style.width = '100%';
        });
        //afterPrint
        window.addEventListener('afterprint', function () {
            const header = document.getElementById('header');
            const footer = document.getElementById('footer');
            const toDisapearForPrint = document.getElementById('toDisapearForPrint');
            const imprimer = document.getElementById('imprimer');
            header.style.display = 'block';
            footer.style.display = 'block';
            toDisapearForPrint.style.display = 'flex';
            imprimer.style.display = 'flex';

            const ordonnanceForPrint = document.getElementById('ordonnanceForPrint');
            ordonnanceForPrint.style.width = '80%';
        });
        //failToPrint
        window.addEventListener('failtoprint', function () {
            console.log('failToPrint');
        });
    },

}

</script>


<style scoped>
    .ordonnanceContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .topContainer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        margin-bottom: 20px;
        width: 100%;
    }

    .ordonnance{
        width: 80%;
        background-color: #e0e0e0;
        border-radius: 8px;
        padding: 10px;
    }

    .headerOrdonnance{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        margin-left: 5px;
        margin-right: 5px;
        margin-top: 10px;
    }

    #doctorContainer{
        font-size: 1em;
        font-weight: bold;
    }

    #workContainer{
        font-size: 1em;
        font-weight: bold;
        text-align: right;
    }

    #logo_MedicOnTech{
        width: 20%;
        height: auto;
    }

    .bodyOrdonnance{
        font-size: 0.9em;
        font-weight: bold;
        margin-left: 100px;
        margin-top: 50px;
    }

    .bodyHeaderOrdonnance{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: nowrap;
    }

    #imprimer{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: flex-end;
    justify-content: flex-end;
    margin-top: 30px;
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

    #ID{
        color:grey;
    }
</style>