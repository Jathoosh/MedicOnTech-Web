<template>
    <div>
        <p>Veuillez Patienter</p>
        <p>La connexion est en cours ...</p>
    </div>
</template>

<script>
module.exports = {
    name: 'login-retrieve',
    mounted() {
        this.load_data_fc();
    },
    methods: {
        load_data_fc() {
            this.$emit('load_data_fc');
        }
    }
}
</script>