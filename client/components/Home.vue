<template>
  <div>
    <div id="background">
      <div class="imageSuperposee">
        <div class="d-flex flex-row align-items-center justify-content-around flex-wrap">
          <loginpar @fc-method="FCMethod"></loginpar>
          <loginpro @login="login"></loginpro>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
    name: 'Home',
    
    components: {
      loginpar : LoginPar,
      loginpro : LoginPro,    
    },
    methods:{
        FCMethod() {
          this.$emit("fc-method");
        },
        login(data){
          this.$emit("login",data);
        }
    }
}

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
  background-color: rgba(255, 255, 255, 0.5);
}

#rectangle {
  margin: 0 auto;
  width: 620px;
  height: fit-content;
  background: white;
  box-shadow: 0px 0px 10px #000000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 30px;
  margin-top: 20px;
  margin-bottom: 20px;
  align-items: center;
}

.title {
  color: green;
  font-size: 30px;
}

#rectangle > .title
{
  margin-bottom: 20px;
}

#rectangle > .titleContact
{
  margin-top: 20px;
  margin-bottom: 20px;
}

.titleContact {
  font-size: 20px;
}
</style>