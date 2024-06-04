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
            // 'x-rapidapi-key': '14723d6096mshaee9cfdbf0e668fp17c31cjsnf5f49d821370',
            'x-rapidapi-key': 'f6eddbf3bdmshd2e2292b8f9ba46p158432jsn5aaa5813618a',
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
export async function searchProducts2(product, country, page) {
    const options = {
        method: 'GET',
        url: 'https://real-time-product-search.p.rapidapi.com/search',
        params: {
          q: product,
          country: country,
          page: page,
          limit: '30',
          sort_by: 'BEST_MATCH',
          product_condition: 'ANY',
          min_rating: 'ANY'
        },
        headers: {
          'x-rapidapi-key': '14723d6096mshaee9cfdbf0e668fp17c31cjsnf5f49d821370',
          'x-rapidapi-host': 'real-time-product-search.p.rapidapi.com'
        }
    };
      
    try {
        const response = await axios.request(options);
        return {response: response.data, extra: country};
        //return {data:"Test",extra:3};
    } catch (error) {
        console.error(error);
    }
}