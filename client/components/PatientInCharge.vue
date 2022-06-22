<template>
   <div>
    <br>
        <div class="container">
            <div>
                <button @click="backHome" id="buttons">Retour</button>
            </div>

            <div class="card" style="width: 18rem;" v-for="(patient, index) in patients" :key="index">
                <div class="card-body" >
                    <h5 class="card-title">{{patient.first_name}} {{patient.last_name}}</h5>
                    <p class="card-text">Tuteur : {{patient.id_tutor}}</p>
                    <button class="btn btn-primary" @click="goToHomePatientInCHarge">Détails</button>
                </div>
            </div>
        </div>
</div>

</template>

<script>
module.exports = {
    name: 'PatientInCharge',
    data() {
        return {
           patients: [
                {
                    first_name: "Jean",
                    last_name: "Pierre",
                    id_patient: "123456789",
                    id_tutor: "4357265334",
                    social_security_number: "987654321",
                },
                {
                    first_name: "Paul",
                    last_name: "Pierre",
                    id_patient: "123456789",
                    id_tutor: "4357265334",
                    social_security_number: "987654321",
                },
                {
                    first_name: "Jacques",
                    last_name: "Pierre",
                    id_patient: "123456789",
                    id_tutor: "4357265334",
                    social_security_number: "987654321",
                },
                {
                    first_name: "Jacques",
                    last_name: "Pierre",
                    id_patient: "123456789",
                    id_tutor: "4357265334",
                    social_security_number: "987654321",
                },
                {
                    first_name: "Jacques",
                    last_name: "Pierre",
                    id_patient: "123456789",
                    id_tutor: "4357265334",
                    social_security_number: "987654321",
                },

            ],
        }
    },
     methods: {
        backHome: function () {
        this.$router.push("/PatientHome");
        },
        goToHomePatientInCHarge: function () {
            this.$router.push("/PatientHome");
        }
    },

}
</script>

<style>
/*Bootstrap */
.btn-primary {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
}
.container
{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
</style>