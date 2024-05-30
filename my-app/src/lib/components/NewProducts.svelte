<script>
    import globals from "$lib/variables.js";

    let searchProducts, searching;
    let productObjects;

    globals.searchProducts.subscribe((value) => {
        searchProducts = value;
    });
    globals.searching.subscribe((value) => {
        searching = value;
    });

    $: {
        if(searching)
            searchProducts = null;
        if(searchProducts != null)
            makeProductObjects(searchProducts);
    }

    function makeProductObjects(resultObject) {
        const country = resultObject.data.country;
        const products = resultObject.data.products;
        productObjects = products.map((product) => {
            let productObject = Object.create(PRODUCT);
            productObject.init(product.asin, product.product_title, product.product_price, product.currency, country, product.product_photo);
            return productObject;
        });
    }
    function addProduct() {
        console.log(this.value)
    }

    const PRODUCT = {
        asin : "",
        title : "",
        price : "",       // As string -> converting in db
        currency : "",
        country : "",
        previewLn : "",
        init(asin, title, price, currency, country, previewLn) {
            this.asin = asin;
            this.title = title;
            this.price = price;
            this.currency = currency;
            this.country = country;
            this.previewLn = previewLn;
        }
    }
</script>

{#if searchProducts != null}
    <div class="flex flex-col gap-2 p-2 overflow-y-scroll h-full w-full items-center">
        {#each productObjects as product, i}
            <!-- Displayed product card -->
            <div class="border rounded p-2 flex max-w-96 w-full">
                <div style="background-image: url({product.previewLn});" class="w-full bg-contain bg-no-repeat bg-center"></div>
                <div class="w-full h-full flex flex-col pl-2">
                    <textarea class="font-bold text-pretty w-full h-full bg-transparent overflow-hidden border-none resize-none grow" name="Title" id="{product.asin}{i}" rows="4" disabled>{product.title}</textarea>
                    <div class="w-full shirnk">
                        <p>{product.price}</p>
                    </div>
                    <div class="flex w-full justify-end">
                        <button class="btn btn-primary" on:click={addProduct} value="{product}">Add</button>
                    </div>
                </div>
            </div>
        {/each}
    </div>
{/if}

<!-- Waiting animation -->
{#if searching == true}
    <div class="p-2 flex flex-col gap-2 overflow-y-scroll">
        {#each new Array(4) as _}
            <div class="flex flex-col gap-4 w-full">
                <div class="flex gap-4 items-center">
                    <div class="skeleton w-16 h-16 rounded-full shrink-0"></div>
                    <div class="flex flex-col gap-4">
                        <div class="skeleton h-4 w-20"></div>
                        <div class="skeleton h-4 w-28"></div>
                    </div>
                </div>
                <div class="skeleton h-32 w-full"></div>
            </div>
        {/each}
    </div>
{/if}