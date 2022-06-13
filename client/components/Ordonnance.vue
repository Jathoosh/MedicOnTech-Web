<template>
    <div>
        <div v-for="(ligne, index) in listOrdonnance" :key="index"><hr>
            <p>{{ ligne.Id_Prescription }}</p>

            <!-- Information du Patient - Table Id_Patient & Person-->
            <p>M. {{ person.first_name }} {{ person.last_name }}</p><br>
            
            <p>Fait le {{ ligne.creation_date }}.</p><br>
        
            <!-- Information Liste de médicaments - Table Id_Prescription & Drug-->
            <p v-for="(drug,index) in listDrug" :key="index">{{ drug.drug_name }}</p><br>
            
            <!-- Information Liste de services - Table Id_Prescription & Service-->
            <p v-for="(service,index) in listService" :key="index">{{ service.service_name }}</p><br>
            <p>Notes : {{ ligne.note }}</p><br>            
            <p>Ordonnance renouvelable {{ ligne.number_of_reuses }} fois.</p><br>
            
            <!-- Information du Docteur - Table Id_Doctor & Person-->
            <p>Dr. {{ person.first_name }} {{ person.last_name }}, {{ speciality.speciality_name }}</p><br><br>

            <p v-if="ligne.used=='true'">Utilisée le {{ ligne.date_of_use }}.</p>
            <p v-if="ligne.validity=='true'">Oronnance valide.</p>
            <p v-if="ligne.reported=='true'">Ordonnance signalée.</p><br><hr>        
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
            },
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
            }],
            listDrug: [{
                drug_name: 'Medoc1',
            },
            {
                drug_name: 'Medoc2',
            }],
            listService: [{
                service_name: 'Service1',
            },
            {
                service_name: 'Service2',
            }],
        }
    },
    mounted() {
        //Parcourir la liste des Prescription d'un Patient et récupérer les données de la Presciption
        //Afficher les données de la Prescription (tables Prescription, Drug et Service) dans la vue 
        //Afficher les données du Docteur (table Person et Speciality) dans la vue en bas de l'ordonnance
    },
}

</script>




<style>

</style>