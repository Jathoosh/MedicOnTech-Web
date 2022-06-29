<template>
    <div>
        <!--Login form-->
        <div id="rectangle">
            <div class="title">
                <h1>Connexion France Connect</h1>
            </div>
            <div>
                <a>
                    <img class="franceConnect" @click="FCMethod()" src="ressources/france_connect.png" alt="Image"/>
                </a>
                <p class="titleContact">
                    En cas de problème n'hésitez pas à nous contacter.
                </p>
            </div>
            <!-- <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button> -->
        </div>
    </div>
</template>

<script>
module.exports = {
    name: 'login-par',
    methods:{
        FCMethod(){
            this.$emit("fc-method");
        }
    }
}
</script>

<style scoped> 
.franceConnect {
  width: 50%;
  cursor: pointer;
  margin-bottom: 20px;
}
</style>