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
        name: 'Blue T-Shirt',
        price: 200000,
        quantity: 10,
        rating: 4.5
    },
    {
        id: '2',
        name: 'Red Sneakers',
        price: 500000,
        quantity: 5,
        rating: 4
    },
    {
        id: '3',
        name: 'Black Jeans',
        price: 300000,
        quantity: 8,
        rating: 3.5
    },
    {
        id: '4',
        name: 'Leather Belt',
        price: 150000,
        quantity: 15,
        rating: 4
    },
    {
        id: '5',
        name: 'Casual Watch',
        price: 250000,
        quantity: 12,
        rating: 4.5
    },
    {
        id: '6',
        name: 'Leather Wallet',
        price: 100000,
        quantity: 20,
        rating: 3.5
    },
    {
        id: '7',
        name: 'Aviator Sunglasses',
        price: 350000,
        quantity: 3,
        rating: 4
    },
    {
        id: '8',
        name: 'Hoodie Jacket',
        price: 400000,
        quantity: 7,
        rating: 4.5
    },
    {
        id: '9',
        name: 'Running Shoes',
        price: 600000,
        quantity: 4,
        rating: 4
    },
    {
        id: '10',
        name: 'Smartphone Case',
        price: 75000,
        quantity: 30,
        rating: 3.5
    },
    {
        id: '11',
        name: 'Sports Water Bottle',
        price: 120000,
        quantity: 18,
        rating: 4
    },
    {
        id: '12',
        name: 'Travel Backpack',
        price: 800000,
        quantity: 2,
        rating: 4.5
    },
    {
        id: '13',
        name: 'Wireless Headphones',
        price: 900000,
        quantity: 1,
        rating: 4
    },
    {
        id: '14',
        name: 'Fitness Tracker',
        price: 350000,
        quantity: 6,
        rating: 4.5
    },
    {
        id: '15',
        name: 'Reusable Face Mask',
        price: 25000,
        quantity: 40,
        rating: 3.5
    }
];
export const load = ({ params }) => {
    // should fetch detailed data from the server and return it here, but for now since the server doesnt exist yet, we'll just return the data from the list
    const item = itemsList.find((item) => item.id === params.productId);
    console.log(item);
    return {
        productData: item
    };
}
