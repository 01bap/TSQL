<script>
    import Inventory from "$lib/components/Inventory.svelte";
    import MainContent from "$lib/components/MainContent.svelte";
    import globals from "$lib/variables.js";
</script>

<div class="w-screen h-screen grid" id="Bestandslager">
    <div class="relative w-full h-full">
        <Inventory/>
    </div>
    <div class="relative w-full h-full overflow-hidden">
        <MainContent/>
    </div>
</div>

<style>
    #Bestandslager {
        grid-template-columns: auto 1fr;
        grid-template-rows: 100%;
    }
</style>