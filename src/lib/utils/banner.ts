import type { MainBanner } from "../../app";

export const getBannerMain = async () => {
    const response = await fetch('/api/v1/home-banner', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const data: MainBanner[] = await response.json();
        return data;
    }
    else if (!response.ok) {
        throw new Error('Something went wrong!');
    }
    return [];

};