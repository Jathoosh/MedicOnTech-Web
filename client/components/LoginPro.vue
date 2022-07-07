<template>
    <div>
        <!--Login form-->
        <div id="rectangle">
            <div class="title">
                <h1>Connexion Alternative</h1>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Adresse Email</label>
                <input type="email" class="form-control" v-model="mail" aria-describedby="emailHelp" placeholder="Email">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Mot de passe</label>
                <input type="password" class="form-control" v-model="password" placeholder="Mot de passe">
            </div>
            <button @click="login" class="btn btn-primary">Connexion</button>
        </div>
    </div>
</template>

<script>
module.exports = {
    name: 'login-pro',
    data() {
        return {
            mail: '',
            password: ''
        }
    },
    methods:{
        //Emit login
        login(){
            this.$emit("login",{
                mail: this.mail,
                password: this.password
            });
        }
    }
}
</script>

<style scoped>
#rectangle > .btn
{
    margin-top: 10px;
}

#rectangle > .form-group
{
    margin-bottom: 10px;
}
    
</style>