<template>
    <div>
        <div id="global">
            <h3>Ordannances passées de Nom Prenom</h3>
            <div class="prescription_info"> <!--v-for="patient in patients" :key="patient.last_name">-->
                <h2>Le creation_date | used </h2>
                <p>Pour X X</p>
                <h5>Medicament x mg quantité</h5>
                <p>Notes :</p>
                <p>Dr X X</p>
            </div>
        
            <div class="filtre">
                <h3>Filtres</h3>
                <div class="filtre_info">
                    <h4>Date</h4>
                    <input type="date" v-model="date" placeholder="Date" size="28"/>
                    <h4>Medicaments</h4>
                    <input type="text" v-model="medicament" placeholder="Medicament" size="15"/>
                    <h4>Quantité</h4>
                    <select>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
module.exports = {
    name: 'History_patient',
}
</script>

<style>
body {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.prescription_info {
    display: flex;
    flex-direction: column;
    max-width: 97%;
    box-shadow: 5px 5px 15px #eeecec, -5px 5px 5px #eeecec;
    border-radius: 5px;
    background-color: white;
    margin-left: auto;
    margin-right: auto;
    padding: 20px;
    padding-bottom: 40px;
    margin-top: 7vh;
    margin-bottom: 25px;
   
}

.filtre {
    display: flex;
    flex-direction: column;
    max-width: 10%;
    box-shadow: 5px 5px 15px #eeecec, -5px 5px 5px #eeecec;
    margin-left: auto;
    padding: 20px;
    margin-top: 7vh;
    margin-bottom: 25px;
   
}

#global{
  width:100%;
}
#global .prescription_info {
    float:left;
    width:80%;
}
#global .filtre {
    float:right;
    width:20%;
    margin-right:10px;
}
</style>