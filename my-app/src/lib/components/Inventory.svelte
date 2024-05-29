<script>
    import Product from "./Product.svelte";

    let productCount = 5;
    let previewLn = "https://m.media-amazon.com/images/I/713s+hZTbXL._AC_SX444_SY639_QL65_.jpg";
    let title = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero expedita facere quae necessitatibus, dicta qui soluta rerum eum facilis, laborum, quis quidem. Autem fuga totam accusamus natus id maxime qui?";
    let asin = "BFK758JF";

</script>

<div class="relative w-full h-full p-4" id="InventoryParent">
    <div class="h-full border-2 rounded p-1 max-w-40 md:max-w-72 flex flex-col" id="InventoryContainer">
        <h1 class="border-b p-1 font-bold text-primary">Inventory</h1>
        <div class="h-full w-full overflow-y-scroll p-1 flex flex-col gap-1" id="Inventory">
            {#each new Array(productCount) as _}
                <Product {previewLn} {title} {asin}/>
            {/each}
        </div>
    </div>
</div>

<style>
    #InventoryParent {
        background-color: rgba(100, 100, 100, 0.5);
    }
</style>