const InventoryInterface = "Rodriguez_Inventory";
const ProductInterface = "Rodriguez_Product";

const queries = {
    createInventory: `CREATE TABLE ${InventoryInterface} (
        id          int not null PRIMARY KEY,
        pid         int not null FOREIGN KEY REFERENCES ${ProductInterface} (id),
        timeStamp   smalldatetime not null,
    );`,        // Creating Tables remotly is not allowed
    getInventory: `SELECT * FROM ${InventoryInterface};`,
    createProduct: `CREATE TABLE ${ProductInterface} (
        id          int not null PRIMARY KEY,
        name        varchar,
        timeStamp   smalldatetime not null,
    );`,        // Creating Tables remotly is not allowed
    getProduct: `SELECT * FROM ${ProductInterface};`,
};

module.exports = queries;