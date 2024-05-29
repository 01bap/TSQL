<script>
    import {searchProducts} from "$lib/api/search_querys.js";
    import globals from "$lib/variables";
    import { onMount } from "svelte";

    let queryInput, countryInput;

    async function search() {
        try {
            if(queryInput.value == "")
                throw "Please enter a search query!";
            let response = await searchProducts(queryInput.value, countryInput.value);
            globals.setsearchProducts(response);
        } catch (error) {
            globals.globalAlert(error);
        }
    }
    onMount(() => {
        queryInput = document.getElementById("searchQuery");
        countryInput = document.getElementById("country");
    })
</script>

<div class="h-full p-1">
    <div class="w-80 bg-neutral p-1 rounded">
        <h1 class="font-bold text-lg text-secondary border-b p-1">Search for new product</h1>
        <div class="flex flex-col">
            <div class="p-1">
                <label for="searchQuery" class="text-lg">Typ in your product:</label>
                <input type="text" id="searchQuery" class="w-full p-1">
            </div>
            <div class="p-1 flex place-content-between">
                <label for="country" class="text-lg">Choose a country:</label>
                <select name="Country" id="country" class="p-1 outline-0 h-[30px]">
                    <option value="US">US</option>
                    <option value="AU">AU</option>
                    <option value="BR">BR</option>
                    <option value="CA">CA</option>
                    <option value="CN">CN</option>
                    <option value="FR">FR</option>
                    <option value="DE">DE</option>
                    <option value="IN">IN</option>
                    <option value="IT">IT</option>
                    <option value="MX">MX</option>
                    <option value="SG">SG</option>
                    <option value="ES">ES</option>
                    <option value="TR">TR</option>
                    <option value="AE">AE</option>
                    <option value="GB">GB</option>
                    <option value="JP">JP</option>
                    <option value="SA">SA</option>
                    <option value="PL">PL</option>
                    <option value="SE">SE</option>
                    <option value="BE">BE</option>
                    <option value="EG">EG</option>
                </select>
            </div>
            <div class="w-full p-1">
                <button class="btn btn btn-secondary" on:click={search}>Search</button>
            </div>
        </div>
    </div>


</div>