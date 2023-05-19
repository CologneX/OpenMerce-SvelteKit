export const getBannerMain = async () => {
    const res = await fetch('/api/v1/home-banner', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!res.ok) {
        throw new Error('Something went wrong!');
    }
    const data: BannerMain[] = await res.json();
    return data;
};