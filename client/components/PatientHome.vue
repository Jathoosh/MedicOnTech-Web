<template>
    <div class="mainContainer">
        <div class="searchContainer">
            <form>
                <input type="text" class="search-bar" placeholder="Rechercher Ordonnance - Date, médicaments ...">
            </form>
        </div>

        <div class="ordonnanceContainer">
            <Ordonnance class="box"/>
        </div>
    </div>
</template>


<script>
module.exports = {
    name: 'PatientHome',
    components: {
        Ordonnance
    },
    mounted() {
        document.getElementById("main").style.width = "90%";
    },
}
</script>


<style>

    .mainContainer{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        align-content: center;
    }

    .searchContainer{
        display: flex;
        justify-content: center;
        align-content: center;
        align-items: center;
        margin: 30px;
        width: 60%;
        height: auto;
    }

    form{
        display: flex;
        width: 80%;
    }

    .search-bar{
        width: 100%;
        height: 30px;
        border-radius: 4px;
        border: 1px solid #213a4a;
        font-size: 15px;
        font-variant: 'Lucida Sans';
        color: #213a4a;
    }

</style>