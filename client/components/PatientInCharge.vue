<template>
   <div>
    <div class="topContainer">
        <h3>Personnes à la charge de {{sdatas.first_name}} {{sdatas.last_name}}</h3>
        <button @click="backHome" id="button">Retour</button>
    </div>

        <div class="container">
            <div class="card" style="width: 18rem;" v-for="(ligne, index) in mdatas" :key="index">
                <div class="card-body" >
                    <h5 class="card-title">
                        {{ligne.infos_pac.first_name}} {{ligne.infos_pac.last_name}} - 
                        {{ currentAge(new Date(ligne.infos_pac.birth_date)) }} ans
                    </h5>
                    <div class="card-text">
                        Dernière ordonnance : {{ changeDate(displayLastPrescriptionDateOf(index)) }}<br>
                        Expire le : {{ changeDate(displayLastPrescriptionExpirationDateOf(index)) }}
                    </div>
                    <!-- <div class="card-text">
                        <p id="ID">Tuteur_ID : {{ generateBarCodeNumber(sdatas.Id_Person) }}</p>
                        <p id="ID">Patient_ID : {{ generateBarCodeNumber(ligne.infos_pac.Id_Person) }}</p>
                    </div> -->
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

        }
    },
     methods: {
        backHome: function () {
        this.$router.push("/Patient_home");
        },
        goToHomePatientInCHarge: function (index) {          
            this.$emit('save_index_pac', {index:index});
            this.$emit('tutor_false');
            this.$router.push("/Patient_home");  
        },
        currentAge(birthDate) {
            var today = new Date();
            var todayYear = today.getFullYear();
            var todayMonth = today.getMonth();
            var birthDateYear = birthDate.getFullYear();
            var birthDateMonth = birthDate.getMonth();
            var age = todayYear - birthDateYear;
            var month = todayMonth - birthDateMonth;
            if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        },
        generateBarCodeNumber(Id_Prescription){
            var barcode = Id_Prescription.toString();
            while (barcode.length < 12) {
                barcode = "0" + barcode;
            }
            return barcode; 
        },
        displayLastPrescriptionDateOf(index_last)
        {
            let Dates = [];
            //find latest date of Dates array
            for(let i = 0; i < this.mdatas[index_last].prescriptions_pac.length; i++)
            {
                Dates.push(this.mdatas[index_last].prescriptions_pac[i].infos_prescription.creation_date);
            }
            //convert date string to date object
            for(let i = 0; i < Dates.length; i++)
            {
                Dates[i] = new Date(Dates[i]);
            }
            //sort dates array
            Dates.sort(function(a, b){return b-a});
            //return first date among dates
            // display Dates info
            return  Dates[0].getFullYear() + "-" + (Dates[0].getMonth()+1<10? "0"+(Dates[0].getMonth()+1) : Dates[0].getMonth()+1) + "-" + (Dates[0].getDate()+1<10? "0"+(Dates[0].getDate()+1) : Dates[0].getDate()+1);
        },
        displayLastPrescriptionExpirationDateOf(index_last)
        {
            let Dates = [];
            //find latest date of Dates array
            for(let i = 0; i < this.mdatas[index_last].prescriptions_pac.length; i++)
            {
                Dates.push(this.mdatas[index_last].prescriptions_pac[i].infos_prescription.expiration_date);
            }
            //convert date string to date object
            for(let i = 0; i < Dates.length; i++)
            {
                Dates[i] = new Date(Dates[i]);
            }
            //sort dates array
            Dates.sort(function(a, b){return b-a});
            //return first date among dates
            // display Dates info
            return  Dates[0].getFullYear()+ "-" + (Dates[0].getMonth()+1<10? "0"+(Dates[0].getMonth()+1) : Dates[0].getMonth()+1) + "-" + (Dates[0].getDate()+1<10? "0"+(Dates[0].getDate()+1) : Dates[0].getDate()+1);
        },
        changeDate(date){
            dateSplit = date.split('-');
            return dateSplit[2] + "/" + dateSplit[1] + "/" + dateSplit[0];
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
        padding: 5px;
        padding-left: 10px;
        padding-right: 10px;
        margin-left: 5px;
        margin-right: 5px;
        border-radius: 7px;
        border: none;
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

    button {
        color: rgb(49, 49, 49);
        text-decoration: none;
        padding: 10px;
        border-radius: 7px;
    }

    button:hover {
        background-color: #b1b1b1;
        transition: background-color 0.5s;
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
        margin-bottom: 5px;
    }

    #ID{
        color:grey;
        font-size: 12px;
        margin-top: -4px;
        margin-bottom: 1px;
    }
</style>