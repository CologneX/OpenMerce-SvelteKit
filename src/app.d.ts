// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	interface Error {
		message: string;
	}
	// interface Platform {}
};

declare class Products {
	id: string;
	name: string;
	price: number;
	quantity: number;
	rating: number;
	image: string;
};

declare class ProductDetail {
	id: string;
	name: string;
	description: string;
	price: number;
	weight: number;
	category_name: string;
	cumulative_review: number;
	image_urls: string[];
};

declare class MainBanner {
	id: number;
	image_url: string;
	href: string;
}
declare class CartProducts {
	id: string;
	name: string;
	price: number;
	quantity: number;
	image: string;
	checked: boolean;
}

declare class LoginUser {
	email: string;
	password: string;
	remember_me: boolean;
}

declare class RegisterUser {
	name: string;
	email: string;
	password: string;
	code: string;
	first_name: string;
	last_name: string;
	birth_date: string;
	gender: string;
}

