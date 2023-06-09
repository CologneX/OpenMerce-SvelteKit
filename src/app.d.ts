// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type DateInput from "date-picker-svelte/DateInput.svelte";

// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	interface Error {
		message: string;
	}
	// interface Platform {}
};

declare interface Products {
	id: string;
	name: string;
	price: number;
	rating: number;
	image: string;
	sold: number;
};
declare interface ProductsCheckout {
	id: string;
	name: string;
	price: number;
	rating: number;
	image: string;
	sold: number;
	quantity: number;
};

declare interface ProductsMain {
	category_id: number;
	category_name: string;
	category_desc: string;
	products: Products[];
}

declare interface ProductDetail {
	id: string;
	name: string;
	description: string;
	price: number;
	weight: number;
	category_name: string;
	cumulative_review: number;
	image_urls: string[] | null;
	dimension: string;
	stock: number;
};

declare interface MainBanner {
	id: number;
	image_url: string;
	href: string;
}
declare interface CartProducts {
	id: string;
	name: string;
	price: number;
	quantity: number;
	image: string;
	checked: boolean;
	curr_stock: number
}

declare interface LoginUser {
	email: string;
	password: string;
	remember_me: boolean;
}
declare interface RegisterUser {
	name: string;
	email: string;
	password: string;
	code: string;
	first_name: string;
	last_name: string;
	birth_date: string;
	gender: string;
}
declare interface BannerMain {
	id: number;
	image_url: string;
	href: string;
}
declare interface LoginForm {
	email: string;
	password: string;
	remember_me: boolean;
}
declare interface RegisterPhaseOne {
	email: string;
}
declare interface RegisterPhaseTwo {
	email: string;
	code: number;
}

declare interface RegisterPhaseThree {
	email: string;
	password: string;
	first_name: string;
	last_name: string;
	birth_date: DateInput;
	gender: string;
}

declare interface UserBasicInfo {
	first_name: string;
	last_name: string;
}

declare interface CartCount {
	count: number;
}


declare interface AddToCart {
	id: string;
	quantity: number;
}

declare interface CategoryMain {
	id: number;
	name: string;
	description: string;
	homepage_visibility: boolean;
}

declare interface FreightDetail {
	product_code: string;
	product_name: string;
	courier_name: string;
	etd: string;
	rates: number;
}

declare interface Freight {
	[key: string]: FreightDetail[]
}


declare interface AddressDetail {
	id: string;
	label: string;
	full_address: string;
	note: string;
	recipient_name: string;
	phone_number: string;
	shipping_area: string;
	area_id: number;
	postal_code: string;
}

declare interface AddressType {
	id: string;
	label: string;
	full_address: string;
	note: string;
	recipient_name: string;
	phone_number: string;
}

declare interface AddressDefault {
	id: number;
	name: string;
	address_id: string | null;
}


declare interface AddAddress {
	label: string;
	full_address: string;
	note: string;
	recipient_name: string;
	phone_number: string;
	shipping_area: number;
	postal_code: string;
}

declare interface OrderDetail {
	id: number;
	status: string;
	status_description: string;
	created_at: string;
	item_list: ItemListOrderDetail[];
	courier: string;
	tracking_code: string;
	address_detail: OrderAddressDetail;
	item_cost: number;
	shipping_cost: number;
	total_cost: number;
	payment_type: string;
	payment_url: string | null;


}

declare interface ItemListOrderDetail {

	order_id: number;
	id: string;
	name: string;
	price: number;
	image: string;
	quantity: number;
	reviewed: boolean;



}

declare interface OrderAddressDetail {
	recipient_name: string;
	phone_number: string;
	full_address: string;
	shipping_area: string;
}

declare interface GetProfile {

	email: string;
	phone_number: string;
	first_name: string;
	last_name: string;
	birth_date: string;
	gender: string;
}