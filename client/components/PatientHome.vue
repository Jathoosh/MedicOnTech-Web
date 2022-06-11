<template>
    <div id="mainContainer">
        <div class="searchContainer">
            <form>
                <input type="text" class="search-bar" placeholder="Rechercher Ordonnance - Date, médicaments ...">
            </form>
        </div>

        <div class="ordonnanceContainer">
            
        </div>

        <div id="buttons">
            <button type="button">Envoyer la consultation par Mail</button>
            <button type="button">Imprimer la consultation</button>
        </div>
    </div>
</template>


<script>
module.exports = {
    name: 'PatientHome',
}
</script>


<style>

    .mainCongtainer{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    form{
        display : flex;
        justify-content: center;
        flex-direction: row;
        flex-wrap: nowrap;
        width: auto;
        height: auto;
    }

    .searchContainer{
        flex: 1 1;
        margin-top: 30px;
        width: 100%;
        width: auto;
        height: auto;
    }

    .search-bar{
        width: 80%;
        height: 30px;
        border-radius: 4px;
        border: 1px solid #213a4a;
        font-size: 15px;
        font-family: 'Lucida Sans';
        color: #213a4a;
    }

    .buttons{
        flex : 1 1;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        padding-top: 30px;
        justify-content: center;
        text-align: center;
        align-items: center;
    }

    button{
        flex: 1 1;
        background-color: #48A649;
        border-radius: 4px;
        border-style: none;
        color: #fff;
        font-family: 'Lucida Sans';
        font-weight: bold;
        min-height: 44px;
        min-width: 10px;
        text-align: center;
        width: 40%;
    }

    button:hover{
        opacity: 0.75;
    }


</style>