<template>
   <div>
    <div class="topContainer">
        <h3>Personnes à la charge de {{sdatas.first_name}} {{sdatas.last_name}}</h3>
        <button @click="backHome" id="button">Retour</button>
    </div>

        <div class="container">
            <div class="card" style="width: 18rem;" v-for="(ligne, index) in mdatas" :key="index">
                <div class="card-body" >
                <h5 class="card-title">{{ligne.infos_pac.first_name}} {{ligne.infos_pac.last_name}} - {{ligne.infos_pac.birth_date}}</h5>
                    <div class="card-text">
                        <p id="ID">Tuteur_ID : {{ sdatas.Id_Person }}</p>
                        <p id="ID">Patient_ID : {{ ligne.infos_pac.Id_Person }}</p>
                    </div>
                    <div class="button_container">
                        <button id="button" @click="goToHomePatientInCHarge(index)">Détails</button>
                    </div>
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
            // tutor:
            //     {
            //         id_tutor: "4357265334",
            //         first_name: "Alain",
            //         last_name: "PIERRE"
            //     }
            // ,
            // patients: [
            //     {
            //         first_name: "Jean",
            //         last_name: "PIERRE",
            //         id_patient: "123456789",
            //         social_security_number: "987654321",
            //     },
            //     {
            //         first_name: "Paul",
            //         last_name: "PIERRE",
            //         id_patient: "123456789",
            //         social_security_number: "987654321",
            //     },
            //     {
            //         first_name: "Jacques",
            //         last_name: "PIERRE",
            //         id_patient: "123456789",
            //         social_security_number: "987654321",
            //     },
            //     {
            //         first_name: "Jacques",
            //         last_name: "PIERRE",
            //         id_patient: "123456789",
            //         social_security_number: "987654321",
            //     },
            //     {
            //         first_name: "Jacques",
            //         last_name: "PIERRE",
            //         id_patient: "123456789",
            //         social_security_number: "987654321",
            //     },
                

            // ],
        }
    },
     methods: {
        backHome: function () {
        this.$router.push("/Patient_home");
        },
        goToHomePatientInCHarge: function (index) {
            this.$router.push("/Patient_home");            
            this.$emit('save_index_pac', {index:index});
            this.$emit('tutor_false');


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
                return [];
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

}
</script>

<style scoped>
    .topContainer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .button_container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
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

    .ID_container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
        flex-direction: row;
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

    .card-text {
        font-size: 15px;
        margin-top: -4px;
        margin-bottom: 0px;
    }

    #ID{
        color:grey;
        font-size: 15px;
        margin-top: -4px;
        margin-bottom: 1px;
    }
</style>