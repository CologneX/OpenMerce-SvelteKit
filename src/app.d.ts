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
}

declare class Products {
	id: string;
	name: string;
	price: number;
	quantity: number;
	rating: number;
	image: string;
}

declare class ProductDetail {
	id: string;
	name: string;
	price: number;
	quantity: number;
	rating: number;
	images_url: string;
	description: string;
}