<script>
    import axios from "axios";

    let products;

    async function trySearch() {
        let product, country, page;
        let paramsToSearch = ["product", "country", "page"];
        try {
            for(let param of paramsToSearch) {
                let value = document.getElementById(`${param}ToSearch`).value;
                switch(param) {
                    case "product":
                        if(value == "") {
                            throw "No product specified!";
                        } else {
                            product = value;
                        }
                        break;
                    case "country":
                        (value == "") ? country = "de" : country = value;
                        break;
                    case "page":
                        (value == "") ? page = 1 : page = value;
                        break;
                }
            }
            products = await searchProduct(product, country, page);           // Get products
            console.log(products, products.data.products)
        } catch (error) {
            console.error("Error in searching query:", error)
        }
    }

    async function searchProduct(product, country, page) {
        const options = {
            method: 'GET',
            url: 'https://real-time-amazon-data.p.rapidapi.com/search',
            params: {
                query: product,
                page: page,
                country: country,
                sort_by: 'RELEVANCE',
                product_condition: 'ALL'
            },
            headers: {
                'x-rapidapi-key': '14723d6096mshaee9cfdbf0e668fp17c31cjsnf5f49d821370',
                'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
            }
        };
        try {
            const response = await axios.request(options);
            // console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
</script>

<input type="text" id="productToSearch" placeholder="Which product are you searching for?">
<input type="text" id="countryToSearch" placeholder="In which country do you want to search in?">
<input type="text" id="pageToSearch" placeholder="How many pages do you want to select?">
<button on:click={trySearch}>Search</button>

Products: {products}