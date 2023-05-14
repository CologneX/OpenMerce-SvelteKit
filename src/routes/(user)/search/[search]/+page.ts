import type { PageLoad } from './$types';
import type { RouteParams } from './$types';
import { error } from '@sveltejs/kit';
interface ProductParams extends RouteParams {
    productName: string;
}

export const load: PageLoad = async ({ fetch, params }) => {
    const productName = params as ProductParams;
    const getProduct = async () => {
        const response = await fetch(`/api/v1/product?search=${productName.search}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status == 404) {
            throw error(404, {
                message: 'No product found',
            });
        }
        else if (!response.ok) {
            throw error(500, {
                message: 'Unable to fetch products',
            });
        }
        const products = await response.json();
        return products;
    };
    const productData:Products[] = await getProduct();
    return {
        productData: productData
    };
};
export const ssr = false;
export const prerender = false;
