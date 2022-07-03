<template>
   <div>
    <div class="topContainer">
        <h3>Personnes en charge de {{tutor.first_name}} {{tutor.last_name}}</h3>
        <button @click="backHome" id="button">Retour</button>
    </div>

        <div class="container">
            <div class="card" style="width: 18rem;" v-for="(patient, index) in patients" :key="index">
                <div class="card-body" >
                    <h5 class="card-title">{{patient.first_name}} {{patient.last_name}}</h5>
                    <p class="card-text">Tuteur : {{tutor.id_tutor}}</p>
                    <button class="btn btn-primary" @click="goToHomePatientInCHarge(index)">Détails</button>
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
            tutor:
                {
                    id_tutor: "4357265334",
                    first_name: "Alain",
                    last_name: "PIERRE"
                }
            ,
            patients: [
                {
                    first_name: "Jean",
                    last_name: "PIERRE",
                    id_patient: "123456789",
                    social_security_number: "987654321",
                },
                {
                    first_name: "Paul",
                    last_name: "PIERRE",
                    id_patient: "123456789",
                    social_security_number: "987654321",
                },
                {
                    first_name: "Jacques",
                    last_name: "PIERRE",
                    id_patient: "123456789",
                    social_security_number: "987654321",
                },
                {
                    first_name: "Jacques",
                    last_name: "PIERRE",
                    id_patient: "123456789",
                    social_security_number: "987654321",
                },
                {
                    first_name: "Jacques",
                    last_name: "PIERRE",
                    id_patient: "123456789",
                    social_security_number: "987654321",
                },
                

            ],
        }
    },
     methods: {
        backHome: function () {
        this.$router.push("/PatientHome");
        },
        goToHomePatientInCHarge: function (index) {
            this.$router.push("/PatientHome");            
            this.$emit('save_index_pac', {index:index});
            this.$emit('tutor_false');


        }
    },

}
</script>

<style>
    .topContainer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        margin-bottom: 20px;
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
        flex-wrap: wrap;
        justify-content: flex-start;
    }

    .card {
        width: 18rem;
        margin-top: 20px;
        margin-bottom: 20px;
        margin-left: 3%;
        margin-right: 3%;
    }
</style>