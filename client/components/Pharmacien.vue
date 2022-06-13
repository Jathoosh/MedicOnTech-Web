<template>
    <div>
        <router-link to='/'> Deconnection </router-link>
               
        <!-- affichage des données du pharmacien -->
        <p>{{ id_pharmacist }}</p> <!-- numéro d'identification -->
        <p>{{ last_name }}</p>
        <p>{{ first_name }}</p>

        <!-- affichage de l'ordonnance seulement si la fonction scanPrescription renvoit true -->
        <p>Affichage de l'ordonnance</p>

    </div>
</template>

<script>
module.exports = {
    name: 'Pharmacien',
    data(){
        return{
            id_pharmacist: 1, // attention c'est un int et non un string - l'idée est de ne pas le voir sur la page
            last_name: 'RAOUL',
            first_name: 'Lisa'            
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