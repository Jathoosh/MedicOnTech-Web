<template>
    <div class="ordonnanceContainer">
        <div class="ordonnance">
            <div v-for="(ligne, index1) in listOrdonnance" :key="index1"><hr>
                
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

                <div id="buttons">
                    <button type="button">Imprimer l'ordonnance</button><hr> 
                </div>     
            </div>
        </div>
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
            listOrdonnance: [{
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
            },
            {
                Id_Prescription: 'Prescription 2',
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
    .ordonnanceContainer{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .ordonnance{
        width: 80%;
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

    .buttons{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-around;
    padding-top: 30px;
    }

    button{
        background-color: #48A649;
        border-radius: 4px;
        border-style: none;
        color: #fff;
        font-family: 'Lucida Sans';
        font-weight: bold;
        min-height: 44px;
        min-width: 10px;
        text-align: center;
        width: 40%;
    }

    button:hover{
        opacity: 0.75;
    }
</style>