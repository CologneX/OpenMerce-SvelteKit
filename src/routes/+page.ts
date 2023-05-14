// import { error } from "@sveltejs/kit";
// import type { PageLoad } from "./$types";
// export const load: PageLoad = (async ({ fetch }) => {
//     const getAllProducts = async () => {
//         const response = await fetch('/api/v1/product', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });
//         if (!response.ok) {
//             throw error(500, {
//                 message: 'Unable to fetch products'
//             });
//         }
//         const products = await response.json();
//         return products;
//     };
//     const response = await getAllProducts();
//     return {
//         productData: response
//     };
// }) satisfies PageLoad;