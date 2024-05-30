import axios from "axios";

export async function searchProducts(product, country, page) {
    const options = {
        method: 'GET',
        url: 'https://real-time-amazon-data.p.rapidapi.com/search',
        params: {
            query: product,
            country: country,
            page: page,
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
        return response.data;
    } catch (error) {
        console.error(error);
    }
}