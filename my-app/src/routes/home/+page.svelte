<script>
    import globals from "$lib/variables";
    import {testConnection} from "$lib/api/api_querys.js";
    import { onMount } from "svelte";
    import Inventory from "$lib/components/Inventory.svelte";
    import MainContent from "$lib/components/MainContent.svelte";

    onMount(async () => {
        let response = await testConnection();
        globals.globalAlert(response);
        globals.setnewProduct(true);        // Update inventory
        globals.checkDatabase();        // Runs recursivly
    });
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