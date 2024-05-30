import {writable} from "svelte/store";

class globalVar {
    constructor() {
        this.alertFadeIn = 1;            // In sec
        this.alertLiveTime = 3000;           // In millisec
        this.detailedProduct = writable("");     // Contains asin (Primary)
        this.searching = writable(false);
        this.searchProducts = writable(null);        // Object of returned researched products
        this.searchProduct = writable(null);        // Contains to be stored product as new object
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
    setsearchProduct(searchProduct) {
        this.searchProduct.set(searchProduct);
    }

    globalAlert(errormsg) {
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

        alert.innerHTML = errormsg;

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
}
const globals = new globalVar();
export default globals; 