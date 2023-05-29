import type { Freight } from "../../app";

export const checkDeliveryRate = async (productId: string, areaId: number) => {
    const response = await fetch(`/api/v1/freight-rates?product_id=${productId}&area_id=49100`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.status === 404) {
        throw new Error('No freight rates found');
    }
    else if (response.status === 200) {
        const data: Freight[] = await response.json();
        let maxRate:number = -Infinity;
        let minRate:number = Infinity;

        for (const key in data) {
            for (const item of data[key]) {
                if (item.rates > maxRate) {
                    maxRate = item.rates;
                }
                if (item.rates < minRate) {
                    minRate = item.rates;
                }
            }
        }
        return [data, maxRate, minRate];
    }
    return [];
};