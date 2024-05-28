<script>
    let productCount = 5;

</script>

<div class="relative w-full h-full p-4" id="InventoryParent">
    <div class="h-full border-2 rounded p-1 max-w-72 flex flex-col" id="InventoryContainer">
        <h1 class="border-b p-1 font-bold text-primary">Inventory</h1>
        <div class="h-full overflow-y-scroll p-1" id="Inventory">
            {#each new Array(productCount) as _, i}
                <div class="flex border-2 border-slate-800 hover:bg-blue-800 hover:border-green-700 transition-[0.5s] rounded p-2 w-full relative items-center">
                    <div class="w-full">
                        <textarea class="bg-transparent overflow-hidden border-none resize-none" name="ProductTitle" id="product{i}" rows="2" disabled>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore distinctio velit aliquam quos magni sapiente rerum fuga nobis adipisci, laboriosam dolorem pariatur, nihil inventore tempore, blanditiis suscipit doloremque dolorum ullam.</textarea>
                    </div>
                    <div class="w-full">
                        <img src="https://m.media-amazon.com/images/I/713s+hZTbXL._AC_SX444_SY639_QL65_.jpg" alt="ProductPreview">
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    #InventoryParent {
        background-color: rgba(0, 0, 0, 0.5);
    }
</style>