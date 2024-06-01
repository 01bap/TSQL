export function test() {
    console.log("Hello World");
}

export async function getInventory() {
    try {
        // let data;
        const response = await fetch('http://localhost:3000/api/getInventory');
        if (response.ok) {
            return await response.json();
            // console.log("Data:", data,data.name)
            // if(data.name == "RequestError") {
            //     console.log(data.originalError.info.message)
            //     createInventory();
            // }
        } else {
            console.error('Failed to fetch data:', response.statusText);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
    return -1;
}

export async function testSP() {
    try {
        const response = await fetch('http://localhost:3000/api/testSP');
        if (response.ok) {
            return await response.json();
        } else {
            console.error('Failed to fetch data:', response.statusText);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
    return -1;
}

// REAL
export async function testConnection() {
    try {
        const response = await fetch('http://localhost:3000/api/testConnection');
        if(!response.ok)
            throw "No connection to database!";
            
        const stream = await response.json();
        if(stream.code != "EREQUEST") 
            throw "Database is up to date!";

        const response2 = await fetch('http://localhost:3000/api/createTables');
        const stream2 = await response2.json();
        return stream2[0].message;
    } catch (error) {
        console.info(error);
        return error;
    }
}
export async function addProduct(asin, title, price, currency, country, previewLn) {
    try {
        const _title = encodeURIComponent(title);
        const query = `http://localhost:3000/api/addProduct?asin=${asin}&title=${_title}&price=${price}&currency=${currency}&country=${country}&previewLn=${previewLn}`;
        const response = await fetch(query);
        if(response.ok) {
            const stream = await response.json();
            return stream[0].message;
        }
    } catch (error) {
        console.error(error);
    }
}
export async function getProducts() {
    try {
        const response = await fetch("http://localhost:3000/api/getProducts");
        if(response.ok)
            return await response.json();
    } catch (error) {
        console.error(error);
    }
}