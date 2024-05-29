<script>
    import globals from "$lib/variables.js";
    export let previewLn, title, asin;

    function showProductDetails() {
        const target = this.childNodes[0].childNodes[0];
        globals.setdetailedProduct(target.id);
    }
</script>

<button on:click={showProductDetails} class="flex border-2 border-slate-800 hover:bg-blue-800 hover:border-green-700 transition-[0.5s] rounded p-2 w-full relative items-center">
    <div class="w-full">
        <textarea class="w-full bg-transparent overflow-hidden border-none resize-none overflow-hidden" name="ProductTitle" id="{asin}" rows="2" disabled>{title}</textarea>
        <div class="cursor-pointer absolute inset-0"></div>
    </div>
    <div class="w-0 md:w-2/6">
        <img src="{previewLn}" alt="ProductPreview">
    </div>
</button>