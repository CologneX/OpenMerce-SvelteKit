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

