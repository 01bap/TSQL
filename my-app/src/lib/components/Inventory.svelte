<script>
    import Product from "./Product.svelte";
    import globals from "$lib/variables.js";
    import {getProducts} from "$lib/api/api_querys.js";

    let products = new Array();
    let newProduct = false;

    globals.inventory.subscribe((value) => {
        products = value;
    });
    globals.newProduct.subscribe((value) => {
        newProduct = value;
    });

    $: {
        if(newProduct)
            updateInventory();
    }

    async function updateInventory() {
        let response = await getProducts();
        products = response.map((product) => {
            return globals.getProductObject(product.asin, product.title, product.price, product.currency, product.country, product.previewLn)
        });
        globals.setinventory(products);
        globals.setnewProduct(false);
    }
</script>

<div class="relative w-full h-full p-4" id="InventoryParent">
    <div class="h-full border-2 rounded p-1 md:max-w-72 flex flex-col" id="InventoryContainer">
        <h1 class="border-b p-1 font-bold text-primary">Inventory</h1>
        <div class="h-full w-full overflow-y-scroll p-1 flex flex-col gap-1" id="Inventory">
            {#each products as product}
                <Product previewLn={product.previewLn} title={product.title} asin={product.asin}/>
            {/each}
        </div>
    </div>
</div>

<style>
    #InventoryParent {
        background-color: rgba(100, 100, 100, 0.5);
    }
</style>