<template>
    <div>
        <router-link to='/'> Deconnexion </router-link>
               
        <!-- affichage des données du pharmacien -->
        <p>{{ id_pharmacist }}</p> <!-- numéro d'identification -->
        <p>{{ last_name }}</p>
        <p>{{ first_name }}</p>

        <!-- affichage de l'ordonnance seulement si la fonction scanPrescription renvoit true -->
        <p v-if="scanPrescription == true"> Affichage de l'ordonnance </p>

    </div>
</template>

<script>
module.exports = {
    name: 'Pharmacien',
    data(){
        return{
            id_pharmacist: 1, // on ne doit pas le voir sur la page
            last_name: '',
            first_name: ''            
        }
    },
    mounted(){
        // afficher caractéristiques du Pharmacien
        // pour ce faire, il faut récupérer l'id_pharmacist dans la table pharmacist
        // puis récupérer first_name et last_name de la table person en fonction de l'id_person du pharmacien
    }
}
</script>

<style>
        
    

</style>