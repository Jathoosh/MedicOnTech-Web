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
            <router-link to="/login">Connexion</router-link>
            <router-link to="/pharmacien">Pharmacien</router-link>
            <router-link to="/Doctor_home">Médecin</router-link>
            <router-link to="/patientHome">Patient</router-link>
          </nav>

          <img
              class="image_profil"
              src="ressources/profil.png"
              alt="Image"
              @click="activateCard()"
            />
        </div>
          

    </div>

    <!-- TODO à rajuster pour que la card soit juste en dessous du profil --> 
    <div id="carteSuperposee" class="cardPosition">
      <infocard v-if="card == true" />
    </div>
    <br />
    <div>
    <input type="number" v-model="id_doctor">
    <button @click="modif_id_doctor">Changer Docteur ({{id_doctor}})</button>
    </div>
 </div>
</template>

<script>
module.exports = {
  name: "header-component",
  data(){
    return{
      card: false,
      Id_Person: 1,
      //TODO PARTIE DEV
      id_doctor: 1,
      //FIN TODO
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
  margin-top: 5px;
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

nav > a {
  color: rgb(49, 49, 49);
  text-decoration: none;
  padding: 10px;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 7px;
}
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
  margin: 5px;
  padding: 15px;
}
nav > a:hover {
  background-color: #b9b9b9;
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

</style>