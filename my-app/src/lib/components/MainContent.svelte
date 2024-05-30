<script>
    import ProductDetails from "./ProductDetails.svelte";
    import SearchProducts from "./SearchProducts.svelte";
    import NewProducts from "./NewProducts.svelte";
</script>


<div class="w-full h-full relative" id="MainContentParent">
    <div class="rounded-l-lg bg-base-100 relative w-full h-full overflow-clip flex" id="MainContentContainer">
        <ProductDetails/>
        <div class="h-full grow">
            <NewProducts/>
        </div>
        <div class="h-full w-2/5 md:w-auto border-l shrink">
            <SearchProducts/>
        </div>
    </div>
</div>

<style>
    #MainContentParent {
        background-color: rgba(100, 100, 100, 0.5);
    }
</style>