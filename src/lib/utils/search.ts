import type { Products } from "../../app";

export const searchDropdown = async (search: string) => {
    const response = await fetch(`/api/v1/product?search=${search}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.status === 404) {
        throw new Error('Product not Found!');
    }
    const searchData: Products[] = await response.json();
    return searchData;

   
    
}