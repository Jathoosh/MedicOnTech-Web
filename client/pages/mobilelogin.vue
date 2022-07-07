<template>
    <div>
        <p>Je ne suis pas ton père.</p>
        <p v-if="check_connexion_mobile === true">Vous êtes connecté. Vous pouvez fermer cette page</p>
        <p v-else>Vous êtes en cours de connexion. Veuillez Patienter</p>
        <p>{{check_connexion_mobile}}</p>
    </div>
</template>

<script>
module.exports = {
    name:"mobilelogin",
    props: {
        check_connexion_mobile: {
            type: Boolean,
            required: true,
            default: function () {
                return false;
            },
        },
    },
    methods: {
        checkConnexion() {
            this.$emit('checkconnexionmobile');
        }
    },
    mounted() {
        this.checkConnexion();
    }
}
</script>