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
    </div>

    <div class="band">
      <div class="d-flex flex-row">
        <nav>
          <router-link to="/login" v-if="solo_data.function_name===''">Connexion</router-link>
          <router-link to="/pharmacien" v-if="solo_data.function_name===''">Page Pharmacien</router-link>
          <router-link to="/Doctor_home" v-if="solo_data.function_name===''">Page Médecin</router-link>
          <router-link to="/patientHome" v-if="solo_data.function_name===''">Page Patient</router-link>
          <router-link to="/" v-if="solo_data.function_name==='Doctor'">Rédiger Ordonnance</router-link>
          <router-link to="/" v-if="solo_data.function_name==='Doctor'">Mes patients</router-link>
          <router-link to="/" v-if="solo_data.function_name==='Doctor'">Historique Ordonnance</router-link>
          <router-link to="/" v-if="solo_data.function_name==='Patient'">Mes Ordonnances</router-link>
          <router-link to="/" v-if="solo_data.function_name==='Patient'">Personnes à charges</router-link>
          <router-link to="/" v-if="solo_data.function_name==='Patient'">Autre ?????</router-link>
          <router-link to="/" v-if="solo_data.function_name==='Pharmacist'">Scanner Ordonnance</router-link>
          <router-link to="/" v-if="solo_data.function_name==='Pharmacist'">Autre ?????</router-link>
        </nav>
        <div class="d-flex flex-row-reverse">
          <p class="image_profil text-center" id="nom_img_profil" @click="activateCard()"> {{ initialesPatient() }} </p>
        </div>
      </div>
    </div>
    <!-- TODO à rajuster pour que la card soit juste en dessous du profil --> 
    <div id="carteSuperposee" class="cardPosition">
      <infocard v-if="card == true" @disapear="disapear"/>
    </div>
    {{solo_data}}
  </div>
</template>

<script>
module.exports = {
  name: "header-component",
  props: {
    solo_data: {
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
      }

  },
};
</script>

<style scoped>
.image_profil {
  height: 50px;
  width: 50px;
  border-radius: 100%;
  border: 2px solid black;
  margin-top: 5px;
  float: right;
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

nav {
  display: flex;
  justify-content: flex-start;
  padding: 10px;
  width: 90%;
  margin: 0 auto;
}

/*Apply also on router-link (Main Purpose)*/
nav > a {
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

#logo {
  width: 70px;
  height: 70px;
  margin-left: 10px;
  margin-right: 10px;
}

#logo_title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  margin-bottom: 10px;
  margin-top: 10px;
}

#header_top {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 90%;
  margin: 0 auto;
}

#nom_img_profil{
  margin-bottom: 0px;
  margin-top: 0px; 
  font-size: 1.5em;
}
</style>