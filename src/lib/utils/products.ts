import type { ProductDetail, Products, ProductsMain } from "../../app";
import { refreshTokenUser } from "./refreshToken";
import { triggerToast } from "./toast";

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
    else if (getProduct.ok) {
        const productsData: ProductsMain[] = await getProduct.json();
        if (productsData == null) {
            throw new Error('No products found');
        } else {
            return productsData;
        }
    }
    return [];
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
    else if (response.ok) {
        const productData: ProductDetail = await response.json();
        return productData;
    }
};

export const getProductSearch = async (param: string) => {
    const response = await fetch(`/api/v1/product?search=${param}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 400 || response.status == 404) {
        throw new Error('Product not found');
    } else if (!response.ok) {
        throw new Error('Something went wrong');
    }
    const productData: Products[] = await response.json();
    return productData;
};



export const handleGetReview = async (productID:string) => {
    const response = await fetch(`/api/v1/customer/order-review`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            order_id: orderID,
            rating: rating,
            review: review
        })
    });
    if(response.status === 401){
        await refreshTokenUser();
        const responseAgain = await fetch(`/api/v1/customer/order-review`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_id: orderID,
                rating: rating,
                review: review
            })
        });
        if(responseAgain.ok){
            triggerToast('Review posted', 'variant-soft');
            modalStore.close();
        } else {
            triggerToast('Error posting review', 'variant-soft-error');
        }
    }
};
