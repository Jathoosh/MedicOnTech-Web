<template>
  <div>
    <p>La page d'accueil</p>

    <div>
      <img class="image" src="ressources/salle_attente.jpg" alt="Image" />
    </div>

    <div class="imageSuperposee">
      <div id="rectangle">
        <div class="title" id="flexbox">Connectez-vous avec France connect</div>
        <div id="flexbox">
          <a href="#">
            <img
              class="franceConnect"
              src="ressources/france_connect.png"
              alt="Image"
            />
          </a>
        </div>
        <div id="flexbox" class="titleContact">
          En cas de problème n'hésitez pas à nous contacter.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  name: "Home",
};
</script>

<style>
.image {
  position: absolute;
  width: 100%;
  height: 80%;
  opacity: 0.5;
  text-align: center;
}

.imageSuperposee {
  margin-top: 250px;
  width: 100%;
  text-align: center;
  position: absolute;
}

#rectangle {
  display: block;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  width: 620px;
  height: 280px;
  background: white;
}

.title {
  color: green;
  font: 30px "Verdana", "Arial", cursive;
}

.franceConnect {
  width: 120%;
}

.titleContact {
  font: 20px "Verdana", "Arial", cursive;
}

#flexbox {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  margin-top: 30px;
  align-items: start;
}
</style>