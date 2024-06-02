const ProductInterface = "Rodriguez_product";
const InventoryInterface = "Rodriguez_inventory";
const SPCreateTables = "Rodriguez_createTables";
const SPAddProduct = "Rodriguez_addProduct";
const SPAddToInventory = "Rodriguez_addToInventory";
const FGetPriceAndCount = "Rodriguez_getPriceAndCount";

const queries = {
    productTableName: ProductInterface,
    inventoryTableName: InventoryInterface,
    SPcreateTables: SPCreateTables,
    SPaddProduct: SPAddProduct,
    SPAddToInventory: SPAddToInventory,
    FGetPriceAndCount: FGetPriceAndCount,
    testConnection: `select * from ${ProductInterface} join ${InventoryInterface} i on i.product_id = asin;`,
    getProduct: `SELECT * FROM ${ProductInterface};`,
    
    getInventory: `SELECT * FROM ${InventoryInterface};`,
};

module.exports = queries;