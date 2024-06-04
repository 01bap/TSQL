<script>
    import { onMount } from "svelte";
    import {getPriceAndCount} from "$lib/api/api_querys.js";
    import globals from "$lib/variables.js";

    let detailedProduct;        // For asin
    let inventory;          // All products

    let detailCard = null;
    let closePanel = null;

    let productCount = null;
    let previewLn = null;
    let title = null;
    let price = null;
    let country = null;

    let add = false;
    let remove = false;

    globals.detailedProduct.subscribe((value) => {
        detailedProduct = value;
    });
    globals.inventory.subscribe((value) => {
        inventory = value;
    });

    $: {
        toggleCard(detailedProduct);
        updateCard(detailedProduct);
    }

    function AddProduct() {
        if(!add) {
            add = true;
            console.log(detailedProduct)
            // Add one to Storage
            setTimeout(() => {
                add = false;
            }, 1000);
        }
    }
    function RemoveProduct() {
        if(!remove) {
            remove = true;
            console.log(detailedProduct),
            setTimeout(() => {
                remove = false;
            }, 1000);
        }
    }

    onMount(() => {
        detailCard = document.getElementById("ProductDetailsParent");
        closePanel = document.getElementById("closePanel");
        document.addEventListener("click", (event) => {
            if(event.target == closePanel && detailedProduct != "")        // Collabsing card when clicked outside
                globals.setdetailedProduct("");
        });
    });
    async function updateCard(_asin) {
        if(_asin == "") 
            return -1;
        productCount = null;        // Reseting card information
        let displayProductObject = inventory.find((product) => product.asin == _asin);
        let response = await getPriceAndCount(_asin);

        previewLn = displayProductObject.previewLn;
        title = displayProductObject.title;
        country = displayProductObject.country;

        price = response.fullprice;
        productCount = response.Count;
    }
    function toggleCard(_asin) {
        if(detailCard == null || closePanel == null)
            return -1;
        if(_asin == "") {
            detailCard.classList.add("hideCard");
            closePanel.classList.add("disablePanel");
        } else {
            detailCard.classList.remove("hideCard");
            closePanel.classList.remove("disablePanel");
        }
    }
</script>

<div id="closePanel" class="absolute inset-0 disablePanel"></div>
<div class="absolute left-0 top-0 h-full w-3/5 max-w-lg p-2 transition-[3s] hideCard" id="ProductDetailsParent">
    <div class="relative h-full w-full border rounded p-1 flex flex-col" id="ProductDetailsContainer">
        {#if productCount == null}
            <div class="flex flex-col h-full gap-4 w-full items-center">
                <div class="skeleton w-full h-[10%]"></div>
                <div class="skeleton w-[80%] h-[70%]"></div>
                <div class="skeleton w-full h-[20%]"></div>
            </div>
        {:else}
            <div id="ProductDetailInfo" class="bg-sky-800/[.3] p-2 overflow-y-scroll md:overflow-y-visible rounded">
                <h1 class="font-medium">{title}</h1>
            </div>
            <div id="ProductDetailPreview" class="w-full h-full relative grid place-items-center">
                <div class="w-full h-full bg-contain bg-no-repeat bg-center" style="background-image: url({previewLn});"></div>
            </div>
            <div id="ProductDetailDetails" class="bg-base p-1">
                <h2 class="w-full border-b-2 p-1 text-lg">Details:</h2>
                <div class="flex w-full">
                    <div class="p-1 grow">
                        <p>Product is from: {country}</p>
                        <p>Number of Products: {productCount}</p>
                        <p>Price: {price}</p>
                    </div>
                    <div class="flex flex-col shrink gap-1 p-1">
                        <button class="btn btn-success font-bold" on:click={AddProduct}>
                            {#if add}
                                loading...
                            {:else}
                                Add +1
                            {/if}
                        </button>
                        <button class="btn btn-accent font-bold" on:click={RemoveProduct}>
                            {#if remove}
                                loading...
                            {:else}
                                Remove -1
                            {/if}
                        </button>
                    </div>
                </div>
            </div>
        {/if}
    </div>
</div>

<style>
    #ProductDetailsContainer {
        background: rgba(0, 0, 0, 0.8);
    }
    .hideCard {
        transform: translateX(-100%);
    }
    .disablePanel {
        display: none;
    }
</style>