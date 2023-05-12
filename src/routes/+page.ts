
import { error } from "@sveltejs/kit";
export const load = (async ({ fetch }) => {
    const getAllProducts = async () => {
        const response = await fetch('/api/v1/product', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw error(500, {
                message: 'Unable to fetch products'
            });
        }
        const products = await response.json();
        return products;
    };
    const response = await getAllProducts();
    return {
        productData: response
    };
});