<script>
    import globals from "$lib/variables.js";

    let searchProducts;
    let productObjects;

    globals.searchProducts.subscribe((value) => {
        searchProducts = value;
    });

    $: {
        if(searchProducts != null)
            makeProductObjects(searchProducts);
    }

    function makeProductObjects(resultObject) {
        const country = resultObject.data.country;
        const products = resultObject.data.products;
        productObjects = products.map((product) => {
            // console.log(product)
            return product;
        });
    }
</script>

{#if searchProducts != null}
    <div class="flex flex-col gap-2 p-2 overflow-y-scroll h-full">
        {#each productObjects as product}
            <div class="border rounded p-1">
                {product.product_title}
            </div>
        {/each}
    </div>
{/if}