export const prerender = false;

// export const load = async ({ fetch, params }) => {
//     const getProduct = async () => {
//         const response = await fetch(`/api/v1/product?id=${params.productId}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });
//         if (response.status == 400 || response.status == 404) {
//         } else if (!response.ok) {
//             throw error(response.status, {
//                 message: `${response.statusText}`
//             });
//         }
//         const productData: ProductDetail = await response.json();
//         return productData;
//     };
//     getProduct().then((productData) => {
//         product = productData;
//     });
// };