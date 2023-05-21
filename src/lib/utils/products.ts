import type { ProductDetail } from "../../app";

export const getProductsMain = async () => {
    const getProduct = await fetch('/api/v1/product', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!getProduct.ok) {
        throw new Error('Something went wrong!');
    }

    const productsData = await getProduct.json();
    return productsData[0].products;
};


export const getProductDetails = async (param: string) => {
    const response = await fetch(`/api/v1/product?id=${param}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 400 || response.status == 404) {
        throw new Error('Product not found');
    } else if (!response.ok) {
        throw new Error('Something went wrong!');
    }
    const productData: ProductDetail = await response.json();
    return productData;
};