<template>
    <div class="ordonnanceContainer">

        <div class="topContainer">
            <h3>Détails de l'ordonnance</h3>
            <button @click="backHome" id="buttons">Retour</button>
        </div>

        <div class="ordonnance">
            <div v-for="(ligne, index) in ordonnance" :key="index">
                
                <div class="headerOrdonnance">
                    <!-- Information du Docteur - Table Id_Doctor & Person-->
                    <p id="doctorContainer">
                        Dr. {{ person.first_name }} {{ person.last_name }}<br>
                        Medecin {{ speciality.speciality_name }}<br>
                        {{ person.phone }}<br>
                        {{ person.email_address }}<br>
                    </p>

                    <img id="logo_MedicOnTech" src="ressources\MedicOnTech - Logo.png" alt="logo_MedicOnTech">

                    <!-- Information du lieu de travail_docteur - Table Id_Doctor & Person-->
                    <p id="workContainer">
                        {{ doctor.work_place }}<br>
                        Adresse : {{ doctor.work_name }}<br>
                        {{ doctor.work_phone }}<br>
                        {{ doctor.work_email_address }}<br>
                    </p>
                </div>
                
                <div class="bodyOrdonnance">
                    <p>{{ ligne.Id_Prescription }}</p>

                    <p>Fait le {{ ligne.creation_date }}.</p><br>

                    <!-- Information du Patient - Table Id_Patient & Person-->
                    <p>M. {{ person.first_name }} {{ person.last_name }}</p><br>
                
                    <!-- Information Liste de médicaments - Table Id_Prescription & Drug-->
                    <p v-for="(drug,index2) in ligne.listDrug" :key="index2">{{ drug.drug_name }} - {{ drug.quantity }}</p><br>
                    
                    <!-- Information Liste de services - Table Id_Prescription & Service-->
                    <p v-for="(service,index3) in ligne.listService" :key="index3">{{ service.service_name }} - {{ service.quantity }}</p><br>
                    <p>Notes : {{ ligne.note }}</p><br>            
                    <p>Ordonnance renouvelable {{ ligne.number_of_reuses }} fois.</p><br><br>

                    <p v-if="ligne.used=='true'">Utilisée le {{ ligne.date_of_use }}.</p>
                    <p v-if="ligne.validity=='true'">Oronnance valide.</p>
                    <p v-if="ligne.reported=='true'">Ordonnance signalée.</p><br> 
                </div> 
  
            </div>
        </div>
        
        <button type="button" id="imprimer">Imprimer l'ordonnance</button><hr>   
    </div>
</template>


<script>
module.exports = {
    name: 'Ordonnance',
    data() {
        return {
            person: {
                first_name: 'DUPONT',
                last_name: 'Thomas',
                phone: '06-12-34-56-78',
                email_address: 'test.adresse@gmail.com'
            },
            doctor: {
                work_place: 'Hôpital de la ville',
                work_name: 'Rue de la ville',
                work_phone: '06-50-30-01-95',
                work_email_address: 'hopital.adresse@gmail.com'},
            speciality: {
                speciality_name: 'Dentiste',
            },
            ordonnance: [{
                Id_Prescription: 'Prescription 1',
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
            }],
            
        }
    },
    methods: {
        backHome: function () {
        this.$router.push("/PatientHome");
        }
    },
    mounted() {
        //Parcourir la liste des Prescription d'un Patient et récupérer les données de la Presciption
        //Afficher les données de la Prescription (tables Prescription, Drug et Service) dans la vue 
        //Afficher les données du Docteur (table Person et Speciality) dans la vue en haut à gauche de l'ordonnance
        //Afficher les données du Lieu de travail (table Doctor) dans la vue en hat à droite de l'ordonnance
    },
}

</script>


<style>
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
    }

    #doctorContainer{
        font-size: 1.3em;
        font-weight: bold;
    }

    #workContainer{
        font-size: 1.3em;
        font-weight: bold;
        text-align: right;
    }

    #logo_MedicOnTech{
        width: 40%;
        height: auto;
    }

    .bodyOrdonnance{
        font-size: 1.1em;
        font-weight: bold;
        margin-left: 100px;
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
</style>