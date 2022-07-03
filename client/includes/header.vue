<template>
  <div>
    <div id="header_top">
      <div id="logo_title">
        <img
          src="ressources/MedicOnTech_Logo.svg"
          alt="Logo MedicOnTech, 2 serpents bleus clair enroulés autour d'un aiguille ailé bleu foncé sur un fond cyan"
          id="logo"
        />
        <h1>MedicOnTech</h1>
      </div>

      <div class="nav-block">
         <nav>
            <router-link to="/login" v-if="sdatas.profession.name===''">Connexion</router-link>
            <router-link to="/pharmacist_home" v-if="sdatas.profession.name===''">Page Pharmacien</router-link>
            <router-link to="/doctor_home" v-if="sdatas.profession.name===''">Page Médecin</router-link>
            <router-link to="/patient_home" v-if="sdatas.profession.name===''">Page Patient</router-link>
            <router-link to="/doctor_home" v-if="sdatas.profession.name==='Doctor'">Mes patients</router-link>
            <router-link to="/edit_prescription" v-if="sdatas.profession.name==='Doctor'">Rédiger Ordonnance</router-link>
            <router-link to="/" v-if="sdatas.profession.name==='Patient'">Mes Ordonnances</router-link>
            <router-link to="/" v-if="sdatas.profession.name==='Patient'">Personnes à charges</router-link>
            <router-link to="/" v-if="sdatas.profession.name==='Patient'">Autre ?????</router-link>
            <router-link to="/" v-if="sdatas.profession.name==='Pharmacist'">Scanner Ordonnance</router-link>
            <router-link to="/" v-if="sdatas.profession.name==='Pharmacist'">Autre ?????</router-link>
          </nav>

            <p class="image_profil text-center" 
            id="nom_img_profil" 
            @click="activateCard()"> {{ initialesPatient() }} </p>
        </div>
          

    </div>

    <button @click="login({mail:'moreau.camille@medecin.fr',password:'123'})" >connexion docteur (1) Camille Moreau</button>
    <button @click="login({mail:'laurent.sara@pharmacien.fr',password:'123'})" >connexion pharmacien (7) Sara Laurent</button>
    <button @click="login({mail:'rhoncus@google.edu',password:'123'})" >connexion patient (7) Keaton Smith</button>

    <!-- TODO à rajuster pour que la card soit juste en dessous du profil --> 
    <div id="carteSuperposee" class="cardPosition">
      <infocard v-if="card == true" @disapear="disapear"/>
    </div>
    <!-- {{sdatas}} -->
  </div>

</template>

<script>
module.exports = {
  name: "header-component",
  props: {
    sdatas: {
      type: Object,
      required: false,
      default: {},
    },
  },
  data(){
    return{
      card: false,
      Id_Person: 1,
      //TODO PARTIE DEV
      id_doctor: 1,
      //FIN TODO

      last_name: 'Nom de famille',
      first_name: 'Prénom',
    }
  },
  components: {
    infocard: InfoCard
  },
  methods: {
    //TODO Partie DEVELOPPEMENT, à supprimer quand le code sera terminé
    modif_id_doctor()
    {
      this.$emit('modif-id-doctor', {id: this.id_doctor});
    },
    //FIN TODO
    activateCard(){
      this.card = !this.card;
    }, 
    disapear(){
      this.card = false;
    },
    initialesPatient: function(){
        var String = this.last_name[0] + this.first_name[0];
        return String;
      },
    login: function(data){
      this.$emit('login', data);
    }

  },
};
</script>

<style scoped>
h1 {
  padding-top: 10px;
  font-size: 30px;
}
.image_profil {
  height:50px;
  width: 50px;
  border-radius: 100%;
  border: 2px solid black;
  float: right;
  margin-left: 20px;
}

.cardPosition {
  display: flex;
  flex-direction: row-reverse;
  position: static;
}

#carteSuperposee {
  margin-top: 66px;
  width: 100%;
  text-align: center;
  position: absolute;
}


/* nav {
  display: flex;
  justify-content: flex-start;
  padding: 10px;
  width: 90%;
  margin: 0 auto;
} */


/*Apply also on router-link (Main Purpose)*/
/*nav > a {
  color: rgb(49, 49, 49);
  text-decoration: none;
  padding: 10px;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 7px;
}

nav > a.router-link-exact-active.router-link-active {
  background-color: #9e9e9e;
}

nav > a:hover,
nav > a.router-link-exact-active.router-link-active:hover {
  color: rgb(49, 49, 49);
  background-color: #b1b1b1;
  transition: background-color 0.5s;
}
*/
#logo {
  width: 50px;
  height: 50px;
  /* margin-left: 5px;*/
  margin-right: 15px; 
}

#logo_title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  height: 100%;
  margin-bottom: 10px;
  margin-top: 10px;
  float: left;
  margin-left: 25px;
}



#header_top {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-bottom: 10px solid #01AA88;
} 


.nav-block, .d-flex{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  margin-bottom: 10px;
  margin-top: 10px;
  float: right;
}

.nav-block {
  margin-right: 25px;
}

nav > a {
  background-color: rgb(236, 235, 235);
  color: rgb(49, 49, 49);
  margin: 5px;
  padding: 15px;
  text-decoration: none;
  border-radius: 7px;
}
nav > a:hover {
  background-color: #b9b9b9;
}
nav > a.router-link-exact-active.router-link-active
{
  border-bottom: 5px solid #01AA88;
  padding-bottom:10px;
}

.card_profil {
  display: flex;
  align-items: center;

  background-color: #D9D9D9;
  border-radius: 7px;
  margin-left: 15px;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 90px;
  padding-bottom: 3px;
}

#nom_img_profil{
  margin-bottom: 0px;
  margin-top: 7px; 
  margin-right: 19px; 
  font-size: 1.5em;
  padding-top: 5px;
}

</style>