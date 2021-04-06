import axios from 'axios';

import globalHeaders from './config';

const getProducts = (queryParams) => {
    return axios.get(`${process.env.API_URL}catalog/products${queryParams ? queryParams : ""}`, {
        headers: globalHeaders
    })
}

export default getProducts;