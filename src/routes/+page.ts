import type { PageLoad } from "./$types";

export const load = (async ({ fetch }) => {
    const getAllProducts = async () => {
        const response = await fetch('/api/v1/product', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const products = await response.json();
        return products;
    };
    const productData = await getAllProducts();

    return {
        productData
    };
}) satisfies PageLoad;