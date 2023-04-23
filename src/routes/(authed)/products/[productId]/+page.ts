interface items {
    id: string;
    name: string;
    price: number;
    quantity: number;
    rating: number;
}
const itemsList: items[] = [
    {
        id: '1',
        name: 'Mario Gay',
        price: 69,
        quantity: 420,
        rating: 0
    },
    {
        id: '2',
        name: 'Milk',
        price: 3.5,
        quantity: 1,
        rating: 5
    }
];
export const load = ({ params }) => {
    const item = itemsList.find((item) => item.id === params.productId);
    console.log(item);
    return {
        productData: item
    };
}
