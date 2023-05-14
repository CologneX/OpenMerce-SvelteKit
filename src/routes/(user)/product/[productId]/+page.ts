import type { PageLoad } from './$types';
import type { RouteParams } from './$types';
import { error } from '@sveltejs/kit';
interface ProductParams extends RouteParams {
    productID: string;
}

export const load: PageLoad = async ({ fetch, params }) => {
    const productID = params as ProductParams;
    const getProduct = async () => {
        const response = await fetch(`/api/v1/product?id=${productID.productId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status == 400 || response.status == 404) {
            throw error(400, {
                message: 'Oops, product not found!',
            });
        }
        else if (!response.ok) {
            throw error(response.status, {
                message: `${response.statusText}`,
            });
        }
        const products = await response.json();
        return products;
    };
    const productData = await getProduct();
    return {
        productData: productData
    };
};
export const ssr = false;
