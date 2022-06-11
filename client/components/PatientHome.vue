<template>
    <div class="searchContainer">
        <form>
            <label id="police">Recherche</label>
            <input type="text" class="search-bar" placeholder="Rechercher Ordonnance - Date, médicaments">
            <button type="submit">Rechercher</button>
        </form>
    </div>

    <div class="ordonnanceContainer>
    </div>

    <div id="buttons">
        <button type="button"> la consultation par Mail</button>
        <button type="button">Imprimer la consultation</button>
    </div>
</template>


<script>

</script>


<style>
    .searchContainer{
        display: flex;
        justify-content: center;
        margin-top: 30px;
    }

    .search-bar{
        width: 50%;
        height: 30px;
        border-radius: 4px;
        border: 1px solid #213a4a;
        padding-left: 10px;
        font-size: 15px;
        font-family: 'Lucida Sans';
        color: #213a4a;
    }

</style>