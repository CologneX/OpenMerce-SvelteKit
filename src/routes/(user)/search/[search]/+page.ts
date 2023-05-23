export const prerender = false;

// import type { PageLoad } from "./$types";

// export const load: PageLoad = (async ({ fetch, params }) => {
//     const getSearch = await fetch(`/api/v1/product?search=${params.search}`,{
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json"
//         }

//     })
//     const search = await getSearch.json();
//     return {
//         status: 200,
//         body: {
//             search
// }) satisfies PageLoad;