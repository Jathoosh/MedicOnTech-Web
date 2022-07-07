<template>
    <div class="ordonnanceContainer">

        <div class="topContainer" id="toDisapearForPrint">
            <h3>Détails de l'ordonnance</h3>
            <button @click="backHomePatient" id="buttons" v-if="status==0">Retour</button>
            <button @click="backHomeDoctor" id="buttons" v-if="status==1">Retour</button>
        </div>

        <div class="ordonnance" id="ordonnanceForPrint">
            <div>

                <div class="headerOrdonnance" v-if="status==0 || status==2">
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

                        <!-- Information non disponible -->
                        <!-- {{ ligne.infos_prescription.doctor_workplace_mail }}<br> -->
                    </p>
                </div>

                <div class="headerOrdonnance" v-if="status==1">
                    <!-- Information du Docteur - Table Id_Doctor & Person-->
                    <p id="doctorContainer">
                        Dr. {{ prescription_for_display.infos_prescription.doctor_infos.first_name }} {{ prescription_for_display.infos_prescription.doctor_infos.last_name }}<br>
                        <!-- Medecin {{ prescription_for_display.infos_prescription.doctor_infos.speciality }}<br> -->
                        <!-- {{ prescription_for_display.infos_prescription.doctor_infos.phone }}<br> -->
                        {{ prescription_for_display.infos_prescription.doctor_infos.mail }}<br>
                    </p>

                    <img id="logo_MedicOnTech" src="ressources\MedicOnTech - Logo.png" alt="logo_MedicOnTech">

                    <!-- Information du lieu de travail_docteur - Table Id_Doctor & Person-->
                    <p id="workContainer">
                        {{ prescription_for_display.infos_prescription.doctor_infos.workplace_name }}<br>
                        <!-- {{ prescription_for_display.infos_prescription.doctor_infos.address.road_number }}  -->
                        <!-- {{ prescription_for_display.infos_prescription.doctor_infos.address.road_name }}<br> -->
                        <!-- {{ prescription_for_display.infos_prescription.doctor_infos.address.town }} -->
                        <!-- {{ prescription_for_display.infos_prescription.doctor_infos.address.zip_code }}, -->
                        <!-- {{ prescription_for_display.infos_prescription.doctor_infos.address.country }}<br> -->

                        <!-- Information non disponible -->
                        <!-- {{ ligne.infos_prescription.doctor_workplace_mail }}<br> -->
                    </p>
                </div>

                <div class="bodyOrdonnance">
                    <div class="bodyHeaderContainer">
                        <div class="bodyHeader">
                            <p>Fait le {{ changeDate(prescription_for_display.infos_prescription.creation_date) }}.</p><br>

                            <!-- Information du Patient - Table Id_Patient & Person-->
                            <p>M. {{prescription_for_display.infos_patient.first_name}} {{prescription_for_display.infos_patient.last_name}}</p><br>
                        </div>

                        <div class="code_barres_container">
                            <img id="code_barres" :src="generateBarCode(prescription_for_display.infos_prescription.Id_Prescription )" alt="code_barres">
                            <!-- <p id="ID">{{ generateBarCodeNumber(prescription_for_display.infos_prescription.Id_Prescription) }}</p> -->
                        </div>
                    </div>

                    <!-- Information Liste de médicaments - Table Id_Prescription & Drug-->
                    <h5>Médicaments</h5>
                    <p v-for="(ligne,index_drug) in prescription_for_display.drugs" :key="index_drug">
                    - {{ ligne.drug_name }}
                    </p><br>
                    
                    <!-- Information Liste de services - Table Id_Prescription & Service-->
                    <h5>Services</h5>
                    <p v-for="(ligne,index_service) in listeservice" :key="index_service">
                    - {{ ligne.service_name }}
                    </p><br>

                    <!-- Informtion Ordonnance Note & Renouvelabilité -->
                    <h5>Notes</h5>
                    <p>{{ prescription_for_display.infos_prescription.note }}</p><br>            
                    <p v-if="prescription_for_display.infos_prescription.number_of_reuses!=0">Ordonnance renouvelable {{ prescription_for_display.infos_prescription.number_of_reuses }} 
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


        
        <button v-if="status==0 || status==1" type="button" id="imprimer" @click="print()">Imprimer l'ordonnance</button><hr>   
    </div>
</template>


<script>
module.exports = {
    name: 'Ordonnance',
    computed: {
        listeservice: function() {
            let temp = this.prescription_for_display.services;
            //ternaire : condition ? si vrai : si faux
            return temp.length > 0 ? temp[0].services : [];
        }
    },
    methods: {
        backHomePatient: function () {
            this.$router.push("/Patient_home");
        },
        backHomeDoctor: function () {
            this.$router.push("/History_patient");
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
            return "http://bwipjs-api.metafloor.com/?bcid=ean13&text=" + barcode + "&includetext";
        }
    },
    props:{
        prescription_for_display: {
            type: Object,
            required: true,
            default: function () {
                return {};
            }
        },
        status: Number,
    },
    mounted() {
        window.addEventListener('beforeprint', function () {
            const header = document.getElementById('header');
            const footer = document.getElementById('footer');
            const main = document.getElementById('main');
            const toDisapearForPrint = document.getElementById('toDisapearForPrint');
            const imprimer = document.getElementById('imprimer');
            header.style.display = 'none';
            footer.style.display = 'none';
            toDisapearForPrint.style.display = 'none';
            imprimer.style.display = 'none';

            const ordonnanceForPrint = document.getElementById('ordonnanceForPrint');
            ordonnanceForPrint.style.width = '100%';
            ordonnanceForPrint.style.backgroundColor = 'white';
            main.style.width = '100%';
        });
        //afterPrint
        window.addEventListener('afterprint', function () {
            const header = document.getElementById('header');
            const footer = document.getElementById('footer');
            const main = document.getElementById('main');
            const toDisapearForPrint = document.getElementById('toDisapearForPrint');
            const imprimer = document.getElementById('imprimer');
            header.style.display = 'block';
            footer.style.display = 'block';
            toDisapearForPrint.style.display = 'flex';
            imprimer.style.display = 'flex';

            const ordonnanceForPrint = document.getElementById('ordonnanceForPrint');
            ordonnanceForPrint.style.width = '80%';
            ordonnanceForPrint.style.backgroundColor = 'rgb(224, 224, 224)';
            main.style.width = '90%';
        });
        //failToPrint
        window.addEventListener('failtoprint', function () {
            alert("Veuillez réessayer");
        });
    },

}

</script>


<style scoped>
    .bodyOrdonnance > h5 {
        border-bottom: 2px solid black;
        padding-bottom: 10px;
        font-size: 1.5em;
    }
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
        padding-top: 30px;
        padding-bottom: 40px;
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
        font-size: 1.25em;
        font-weight: bold;
    }

    #workContainer{
        font-size: 1.25em;
        font-weight: bold;
        text-align: right;
    }

    #logo_MedicOnTech{
        width: 20%;
        height: auto;
    }

    .bodyOrdonnance{
        font-size: 1.20em;
        font-weight: bold;
        margin-left: 70px;
        margin-right: 70px;
        margin-top: 50px;
    }

    .bodyHeaderContainer{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: nowrap;
    }

    .code_barres_container{
        display: flex;
        flex-direction: column;
        align-items: left;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    /*1.25 données header 1.5 h5  1.20 contenu*/ 
    #code_barres{
        height: 100px;
    }

    #ID{
        color:grey;
        letter-spacing: 2px;
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
        border: none;
    }

    button:hover {
        background-color: #b1b1b1;
        transition: background-color 0.5s;

    }

</style>