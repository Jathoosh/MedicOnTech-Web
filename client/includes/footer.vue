<template>
  <div>

    <div class="container-h">

      <div class="contSec center" id="rs_footer">
        <a href="https://www.youtube.com/channel/UCmfFBwFw6xyORSaFwlfAgWg">
          <img
            src="ressources/youtube.png"
            alt="Logo Youtube"
            width="15%"
            height="15%"
          />
        </a>
        <a href="https://instagram.com/team.medicontech">
          <img
            src="ressources/instagram.png"
            alt="Logo Instagram"
            width="15%"
            height="15%"
          />
        </a>
        <a href="https://www.linkedin.com/company/medicontech/">
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
        <p>Solution Factory 2022</p>
      </div>
      <div class="contSec center">
        <ul class="simple-list">
          <li>
            <router-link to="/A_propos">A propos</router-link>
          </li>
          <li>
            <router-link to="/Faq">FAQ</router-link>
          </li>
          <li>
            <router-link to="/Contact">Contact</router-link>
          </li>
        </ul>
      </div>
    </div>

    <div class="band center">
      
    </div>
  </div>
</template>

<script>
module.exports = {
  name: "foot-component",
  methods: {
    footerToBottom(){
      let footer = document.getElementById("footer");
      let height = footer.offsetHeight + "px";
      footer.style.height = height;
      this.$emit("footertobottom", height);
    },
  },
  mounted() {
    this.footerToBottom();
  },
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

#copyright {
  font-weight: lighter;
}
.container-h {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #D6D6D6;
  padding-top: 20px;
  padding-bottom: 20px;
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
  float: left;
}

.simple-list > li {
  padding: 10px;
  /* margin-left: 10px;
  margin-right: 10px; */
  border-radius: 7px;
  font-weight: lighter;
}
</style>