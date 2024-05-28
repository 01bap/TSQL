import {writable} from "svelte/store";

class globalVar {
    constructor() {
        this.inventoryProduct = writable(null);
    }
    setinventoryProduct(inventoryProduct) {
        this.inventoryProduct = inventoryProduct;
    }
}
const globals = new globalVar();
export default globals; 