
interface items {
    id: string;
    name: string;
    price: number;
    rating: number;
}
const itemsList: items[] = [
    {
        id: '1',
        name: 'Blue T-Shirt',
        price: 200000,
        rating: 4.5
    },
    {
        id: '2',
        name: 'Red Sneakers',
        price: 500000,
        rating: 4
    },
    {
        id: '3',
        name: 'Black Jeans',
        price: 300000,
        rating: 3.5
    },
    {
        id: '4',
        name: 'Leather Belt',
        price: 150000,
        rating: 4
    },
    {
        id: '5',
        name: 'Casual Watch',
        price: 250000,
        rating: 4.5
    },
    {
        id: '6',
        name: 'Leather Wallet',
        price: 100000,
        rating: 3.5
    },
    {
        id: '7',
        name: 'Aviator Sunglasses',
        price: 350000,
        rating: 4
    },
    {
        id: '8',
        name: 'Hoodie Jacket',
        price: 400000,
        rating: 4.5
    },
    {
        id: '9',
        name: 'Running Shoes',
        price: 600000,
        rating: 4
    },
    {
        id: '10',
        name: 'Smartphone Case',
        price: 75000,
        rating: 3.5
    },
    {
        id: '11',
        name: 'Sports Water Bottle',
        price: 120000,
        rating: 4
    },
    {
        id: '12',
        name: 'Travel Backpack',
        price: 800000,
        rating: 4.5
    },
    {
        id: '13',
        name: 'Wireless Headphones',
        price: 900000,
        rating: 4
    },
    {
        id: '14',
        name: 'Fitness Tracker',
        price: 350000,
        rating: 4.5
    },
    {
        id: '15',
        name: 'Reusable Face Mask',
        price: 25000,
        rating: 3.5
    }
];
export const load = () => {
    return {
        productsList: itemsList
    };
}
