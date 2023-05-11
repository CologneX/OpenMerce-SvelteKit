import type { PageLoad } from './$types';
import type { RouteParams } from './$types';

interface ProductParams extends RouteParams {
    productID: string;
}

export const load: PageLoad = async ({ fetch, params }) => {
    const productID  = params as ProductParams;

    const getProduct = async () => {
        const response = await fetch(`/api/v1/product?id=${productID.productId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const products = await response.json();
        return products;
    };
    const productData = await getProduct();
    return {
        productData: productData
    };
};
