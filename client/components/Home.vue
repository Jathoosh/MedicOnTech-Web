<template>
  <div>
    <div id="background">
      <div class="imageSuperposee">
        <div id="rectangle">
          <p class="title">Connectez-vous avec France connect</p>

          <a href="#">
            <img class="franceConnect" src="ressources/france_connect.png" alt="Image"/>
          </a>

          <p class="titleContact">
            En cas de problème n'hésitez pas à nous contacter.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  name: "Home",
  mounted: function() {
    document.getElementById("main").style.width = "100%";
  }
};
</script>

<style scoped>
#background {
  background: url("../ressources/salle_attente.jpg");
}

.imageSuperposee {
  padding-top: 10%;
  padding-bottom: 10%;
  width: 100%;
  text-align: center;
  background-color: rgba(255, 255, 255  , 0.5);
}

#rectangle {
  margin: 0 auto;
  width: 620px;
  height: 280px;
  background: white;
  box-shadow: 0px 0px 10px #000000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
  align-items: center;
}

.title {
  color: green;
  font: 30px "Verdana", "Arial", cursive;
}

.franceConnect {
  width: 100%;
}

.titleContact {
  font: 20px "Verdana", "Arial", cursive;
}
</style>