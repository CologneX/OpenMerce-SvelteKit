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
        name: 'Bread',
        price: 2.5,
        quantity: 1,
        rating: 4
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
