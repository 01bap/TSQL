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