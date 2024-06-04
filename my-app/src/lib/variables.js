import {writable} from "svelte/store";

class globalVar {
    constructor() {
        // Constants
        this.alertFadeIn = 1;            // In sec
        this.alertLiveTime = 3000;           // In millisec
        this.recall = 30000;            // In millisec (Interval to check the db)
        this.update = false;
        // Variables
        this.inventory = writable(new Array());     // Contains the list of the inventory
        this.detailedProduct = writable("");     // Contains asin (Primary)
        this.searching = writable(false);
        this.searchProducts = writable(null);        // Object of returned researched products
        this.country = writable(null);          // Stores country seperatly for other api
        this.searchProduct = writable(null);        // Contains to be stored product as new object
        this.newProduct = writable(false);       // For first initialization
    }
    setinventory(inventory) {
        this.inventory.set(inventory);
    }
    setdetailedProduct(detailedProduct) {
        this.detailedProduct.set(detailedProduct);
    }
    setsearching(searching) {
        this.searching.set(searching);
    }
    setsearchProducts(searchProducts) {
        this.searchProducts.set(searchProducts);
    }
    setcountry(country) {
        this.country.set(country);
    }
    setsearchProduct(searchProduct) {
        this.searchProduct.set(searchProduct);
    }
    setnewProduct(newProduct) {
        this.newProduct.set(newProduct);
        this.update = newProduct;
    }

    getProductObject(asin, title, price, currency, country, previewLn) {
        const productObject = Object.create(PRODUCT);
        productObject.init(asin, title, price, currency, (country == null) ? this.country : country, previewLn);
        return productObject;
    }
    globalAlert(msg) {
        try {
            document.getElementById("globalAlertMessage").remove();
        } catch (error) {
        }
        const body = document.querySelector("body");
        const alert = document.createElement("div");

        alert.id = "globalAlertMessage";

        alert.style.position = "fixed";
        alert.style.top = "0";
        alert.style.left = "50%";
        alert.style.transform = "translateX(-50%) translateY(-100%)";
        alert.style.display = "grid";
        alert.style.placeItems = "center";
        alert.style.height = "100px";
        alert.style.maxHeight = "20%";
        alert.style.width = "300px";
        alert.style.maxWidth = "80%";
        alert.style.border = "2px solid black";
        alert.style.borderRadius = "1em";
        alert.style.padding = "5px";
        alert.style.backgroundColor = "rgba(200, 10, 10, 0.8)";
        alert.style.transition = `transform ${this.alertFadeIn}s`;

        alert.innerHTML = msg;

        body.appendChild(alert);

        setTimeout(() => {
            alert.style.transform = "translateX(-50%) translateY(25%)";
        }, 10);
        setTimeout(() => {
            alert.style.transform = "translateX(-50%) translateY(-100%)";
            setTimeout(() => {
                alert.remove();
            }, this.alertFadeIn * 1000 + 10);
        }, this.alertLiveTime);
    }
    checkDatabase() {
        setTimeout(() => {
            if(!this.update)
                this.setnewProduct(true);
            this.checkDatabase();
        }, this.recall);
    }
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

const globals = new globalVar();
export default globals; 