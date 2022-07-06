<template>
    <div class="card">
        <!-- affichage des données d'une personne -->
        <div class="card-image">
          <div>
            <div class="image_profil">
              <p id="nom_img_profil"> {{ initialesPatient() }} </p>
            </div>
          </div>
        </div>
        
        <div class="card-body">
            <p>{{ sdatas.first_name }}</p>
            <p>{{ sdatas.last_name }}</p>
            <p v-if="sdatas.profession.name === 'Patient'">{{ sdatas.birth_date }}</p>
            <p>{{ sdatas.mail }}</p>

            <button @click="modifyProfil" v-if="sdatas.profession.name === 'Patient' && button_actionne == false"><strong>Modifier profil</strong></button>
        </div>
    </div>
</template>

<script>
module.exports = {
    name: 'info-card',
    props: {
      sdatas: {
        type: Object,
        required: false,
        default: function () {
          return {};
        },
      },
      button_actionne: Boolean
    },
    methods:{
      modifyProfil: function(){
        this.$emit("disapear");
        this.$router.push("/Profil");
      },
      initialesPatient: function(){
        var String = this.sdatas.first_name[0] + this.sdatas.last_name[0];
        return String;
      }
    }
   
}
</script>

<style scoped>
  .card {
    width: 13%; 
    top: -48px;
    right: 21px;
    box-shadow: 0px 5px 20px rgb(81, 153, 220);
  }
  
  .card-image {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-right: 19px;
  }

  .card-image img {
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .card-title{
    font-weight: bold;
  }

  .card-body {
    text-align: center; 
    padding: 15px 20px; 
    box-sizing: border-box;
  }

  button{
    border-radius: 60px / 40px;
  }

  .image_formulaire{
    position : relative;
    width: 175px; 
    height: auto;
  }

  .position_formulaire{
    display: flex;
    justify-content: flex-end;
    margin-right: 20px;
  }

  .flex-row{
    justify-content: center;
    align-items: center;
  }

  .image_profil {
    height:50px;
    width: 50px;
    border-radius: 100%;
    border: 2px solid black;
    margin-top: 20px;
  }

  #nom_img_profil{
    display: flex;
    flex-direction: row-reverse;
    align-content: stretch;
    justify-content: flex-end;
    margin-left: 6px;
  }

</style>