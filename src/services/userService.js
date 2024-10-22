import axios from 'axios';

export async function getUserDetails(token) {
    const response = await axios.get('/ecommerce/user/details', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
}
