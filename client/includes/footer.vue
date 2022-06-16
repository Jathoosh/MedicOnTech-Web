<template>
  <div>
    <hr />
    <div class="container-h">
      <div class="contSec center" id="rs_footer">
        <a href="https://www.youtube.com/user/MedicOnTech">
          <img
            src="ressources/youtube.png"
            alt="Logo Youtube"
            width="15%"
            height="15%"
          />
        </a>
        <a href="https://www.instagram.com/medicontech/">
          <img
            src="ressources/instagram.png"
            alt="Logo Instagram"
            width="15%"
            height="15%"
          />
        </a>
        <a href="https://www.linkedin.com/in/medicontech/">
          <img
            src="ressources/linkedin.png"
            alt="Logo Linkedin"
            width="15%"
            height="15%"
          />
        </a>
      </div>
      <div class="contPri center">
        <h1>MedicOnTech</h1>
        <p>jathooshthvrs@gmail.com</p>
      </div>
      <div class="contSec center">
        <ul class="simple-list">
          <li>
            <router-link to="/annexe2">A propos</router-link>
          </li>
          <li>
            <router-link to="/annexe2">Mentions légales</router-link>
          </li>
          <li>
            <router-link to="/annexe2">Contact</router-link>
          </li>
        </ul>
      </div>
    </div>

    <div class="band center">
      <p>Copyright © 2022 par MedicOnTech - Tous droits réservés</p>
    </div>
  </div>
</template>

<script>
module.exports = {
  name: "foot-component",
};
</script>

<style scoped>
.center {
  text-align: center;
}

li > a {
  color: rgb(49, 49, 49);
  margin: 0px;
  padding: 0px;
  border-radius: 0px;
  text-decoration: none;
}

li > a.router-link-exact-active.router-link-active {
  background-color: transparent;
}

li > a:hover,
li > a.router-link-exact-active.router-link-active:hover {
  color: rgb(49, 49, 49);
  background-color: transparent;
  transition: none;
}

#rs_footer > a:hover {
  background-color: transparent;
  transition: none;
}

.container-h {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.contPri {
  flex: 75 30;
  margin-left: 10px;
  margin-right: 10px;
  align-content: center;
}

.contSec {
  flex: 50 30;
  margin-left: 10px;
  margin-right: 10px;
}

.simple-list {
  list-style-type: none;
}

.simple-list > li {
  padding: 10px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 7px;
}
</style>