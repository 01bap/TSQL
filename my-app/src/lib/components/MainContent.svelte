<script>
    import ProductDetails from "./ProductDetails.svelte";
    import globals from "$lib/variables.js";
    import SearchProducts from "./SearchProducts.svelte";
    import NewProducts from "./NewProducts.svelte";

    let detailedProduct = null;        // Contains asin

    globals.detailedProduct.subscribe((value) => {
        detailedProduct = value;
    });
</script>


<div class="w-full h-full relative" id="MainContentParent">
    <div class="rounded-l-lg bg-base-100 relative w-full h-full overflow-clip flex" id="MainContentContainer">
        <ProductDetails asin={detailedProduct}/>

        <div class="h-full max-w-full grow">
            <NewProducts/>
        </div>

        <div class="h-full border-l">
            <SearchProducts/>
        </div>
    </div>
</div>

<style>
    #MainContentParent {
        background-color: rgba(100, 100, 100, 0.5);
    }
</style>