import type { Freight } from "../../app";

export const checkDeliveryRate = async (productId: string, areaId: number) => {
    const response = await fetch(`/api/v1/freight-rates`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            product_id: productId,
            area_id: areaId
        })
    });
    const data: Freight = await response.json();
    console.log(data);
    return data;
};