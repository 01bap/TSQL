<script>
    import { onMount } from "svelte";
    import globals from "$lib/variables.js";

    let detailedProduct;        // For asin

    let detailCard = null;
    let closePanel = null;

    let productCount = 5;
    let previewLn = "https://m.media-amazon.com/images/I/713s+hZTbXL._AC_SX444_SY639_QL65_.jpg";
    let title = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero expedita facere quae necessitatibus, dicta qui soluta rerum eum facilis, laborum, quis quidem. Autem fuga totam accusamus natus id maxime qui?";
    let price = "13,56€";
    let country = "DE";

    globals.detailedProduct.subscribe((value) => {
        detailedProduct = value;
    });

    // Get details from db selecting where asin equal

    $: {
        console.log(detailedProduct)
        toggleCard(detailedProduct);
    }
    onMount(() => {
        detailCard = document.getElementById("ProductDetailsParent");
        closePanel = document.getElementById("closePanel");
        document.addEventListener("click", (event) => {
            if(event.target == closePanel && detailedProduct != "")        // Collabsing card when clicked outside
                globals.setdetailedProduct("");
        });
    });

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
        <div id="ProductDetailInfo" class="bg-sky-800/[.3] p-2 overflow-y-scroll md:overflow-y-visible rounded">
            <h1 class="font-medium">{title}</h1>
        </div>
        <div id="ProductDetailPreview" class="w-full h-full relative grid place-items-center">
            <div class="w-full h-full bg-contain bg-no-repeat bg-center" style="background-image: url({previewLn});"></div>
        </div>
        <div id="ProductDetailDetails" class="bg-base p-1">
            <h2 class="w-full border-b-2 p-1 text-lg">Details:</h2>
            <div class="p-1">
                <p>Product is from: {country}</p>
                <p>Number of Products: {productCount}</p>
                <p>Price: {price}</p>
            </div>
        </div>
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