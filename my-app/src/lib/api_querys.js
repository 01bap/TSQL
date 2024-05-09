export function test() {
    console.log("Hi2");
}

export async function getInventory() {
    try {
        let data;
        const response = await fetch('http://localhost:3000/api/getInventory');
        if (response.ok) {
            data = await response.json();
            console.log("Data:", data,data.name)
            if(data.name == "RequestError") {
                console.log(data.originalError.info.message)
                createInventory();
            }
        } else {
            console.error('Failed to fetch data:', response.statusText);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}
export async function createInventory() {
    try {
        let data;
        const response = await fetch('http://localhost:3000/api/createInventory');
        if (response.ok) {
            data = await response.json();
            console.log("Data:", data)
        } else {
            console.error('Failed to fetch data:', response.statusText);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}