<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { error } from '@sveltejs/kit';
	const param = $page.params.productId;
	let product: ProductDetail = {
		id: '',
		name: '',
		description: '',
		price: 0,
		image_urls: [],
		cumulative_review: 0,
		weight: 0,
		category_name: ''
	};
	onMount(() => {
		const getProduct = async () => {
			const response = await fetch(`/api/v1/product?id=${param}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (response.status == 400 || response.status == 404) {
				throw error(400, {
					message: 'Oops, product not found!'
				});
			} else if (!response.ok) {
				throw error(response.status, {
					message: `${response.statusText}`
				});
			}
			const productData: ProductDetail = await response.json();
			return productData;
		};
		getProduct().then((productData) => {
			product = productData;
		});
	});

	// for image carousel
	import Carousel from 'svelte-carousel';
	import { browser } from '$app/environment';
	import Logo from '$lib/icons/Logo.svelte';
	let carousel;
	// end for image carousel
</script>

<svelte:head>
	<title>{product.name}</title>
	<meta name="description" content={product.name} />

	<meta
		name="keywords"
		content="OpenMerce, E-Commerce, Open-Source ECommerce, Svelte, SvelteKit, OpenMerce Register, Register, {product.name}"
	/>
	<meta name="author" content="OpenMerce" />
</svelte:head>
<div class="h-fit w-full grid grid-rows-2">
	<div class="grid md:grid-cols-2 sm:grid-cols-1 w-full h-full">
		<div class=" w-full p-0 md:pt-7 space-y-2">
			{#if browser}
				<Carousel bind:this={carousel} infinite={false} arrows={false} dots={false}>
					{#if product.image_urls}
						{#each product.image_urls as image}
							<picture class=" shadow-xl card flex justify-center items-center">
								{#if image}
									<img
										src="/usercontent/{image}"
										alt="{image}'s image"
										class="aspect-square object-contain"
									/>
								{:else}
									<div>
										<Logo />
										<p class="text-center">No Image Found</p>
									</div>
								{/if}
							</picture>
						{/each}
					{:else}
						<picture class="aspect-square shadow-xl card flex justify-center items-center">
							<div>
								<Logo />
								<p class="text-center">No Image Found</p>
							</div>
						</picture>
					{/if}
				</Carousel>
			{/if}
			<div class="flex gap-2">
				{#each product.image_urls as image}
					<button type="button" class="border-primary-500 border-2 rounded-md">
						<picture class=" shadow-xl card flex justify-center items-center w-20">
							{#if image}
								<img
									src="/usercontent/{image}"
									alt="{image}'s image"
									class="aspect-square object-contain"
								/>
							{:else}
								<div>
									<Logo />
									<p class="text-center">No Image Found</p>
								</div>
							{/if}
						</picture></button
					>
				{/each}
			</div>
		</div>

		<div class="grid w-full h-full">
			<div class="md:pt-4 md:pl-4 space-y-4">
				<h4 id="productDetail">
					{product.name}
				</h4>
				<h3
					class="font-bold bg-gradient-to-br from-primary-500 box-decoration-clone bg-clip-text text-transparent to-secondary-500"
				>
					{product.price.toLocaleString('id-ID', {
						style: 'currency',
						currency: 'IDR',
						minimumFractionDigits: 0
					})}
				</h3>

				<div class="md:flex gap-2 hidden">
					<button class="btn variant-filled-primary">Buy Now</button>
					<button class="btn variant-soft-primary">Add to cart</button>
				</div>

				<div class="card" id="productDescription">
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, repudiandae ducimus!
					Autem incidunt omnis, exercitationem at atque voluptas harum, libero quisquam vel nemo
					rerum id voluptatum aliquam natus molestiae repellendus sequi nesciunt saepe molestias
					dolores officiis. Accusamus sed obcaecati dolor magnam, nobis adipisci quasi nemo
					possimus, velit corporis quibusdam, officiis voluptates perspiciatis voluptate quis
					doloribus. Quo at, aliquam nisi iusto nemo quisquam incidunt id. Est fugiat deleniti sint
					tempora aliquam! Omnis voluptatum similique obcaecati molestiae quos minima ipsum, totam
					modi, suscipit dolorum mollitia nam earum aperiam ducimus incidunt, officiis vero repellat
					maiores ab assumenda nemo? Nulla accusamus, rerum sed excepturi aliquam soluta reiciendis
					deserunt aut cum enim, neque vel magnam expedita natus laboriosam dolore voluptas nesciunt
					quam ex laborum! Quibusdam necessitatibus illo porro, cum nostrum, dicta distinctio, odio
					consequatur quasi exercitationem unde. Vitae aliquam similique rerum vel est nemo
					reiciendis minus, facere, modi ad, quam deserunt dicta. Labore quam in unde, ipsam iste
					qui reprehenderit laudantium ducimus aspernatur possimus, vel excepturi! Praesentium quasi
					dignissimos odit maxime corporis! Impedit repellendus, illo, obcaecati quod eveniet sequi
					nulla molestias, veniam hic aliquam quis dolores laudantium porro accusamus eligendi a
					nostrum voluptas fugit? Eaque nulla ipsam molestiae dolorem quae sequi voluptatibus omnis
					cupiditate modi, esse amet explicabo et voluptatum sint consequatur accusamus inventore
					corrupti eos voluptas sunt animi. Nemo et accusantium fuga in voluptate excepturi. Eaque,
					autem maxime. Labore, itaque molestias ullam ut cumque nostrum deserunt corporis soluta
					officiis illum! Cum laborum, dolor aperiam necessitatibus, molestiae voluptatibus
					obcaecati illo, vel nesciunt quaerat iusto eaque praesentium. Exercitationem, quae, eius
					assumenda, iure sunt totam aspernatur error maiores hic voluptate quam optio fugit aliquid
					quaerat consequatur. Quo eligendi a nemo quos accusamus accusantium est quam sed ut amet
					cupiditate, ipsa velit perferendis nobis expedita, illum deserunt. Aliquam est suscipit
					reprehenderit atque corrupti odio dolor illum iure similique id odit voluptas repudiandae
					ab, saepe perspiciatis dolorem nesciunt minus quasi nostrum perferendis, magnam incidunt
					temporibus pariatur dolorum. Impedit, consequuntur numquam doloremque inventore cum
					placeat harum quis. Est repellat blanditiis sequi alias. Optio, incidunt. Reiciendis,
					dolorum cum sit architecto quisquam amet quidem nulla nostrum ducimus nisi deserunt
					expedita eum facere magnam explicabo aliquid accusamus praesentium corporis dolores et
					facilis sint quae ea. Ad dignissimos mollitia sequi eaque dolorum minus nam obcaecati
					numquam commodi quas vel repellendus neque id eligendi dolorem omnis nemo, quam ullam
					voluptas blanditiis corrupti distinctio delectus quia error. Omnis et perspiciatis,
					reprehenderit nam aspernatur, ducimus obcaecati repellat debitis architecto a asperiores
					amet molestias aperiam ad suscipit consequuntur nihil, veritatis ab optio soluta commodi
					ut? Nihil pariatur reiciendis numquam assumenda provident molestias fuga? Libero neque
					eveniet, tempore odio at numquam officiis facilis facere modi distinctio totam laborum
					quia minima est perspiciatis fugit similique nostrum, dolorum accusantium ullam doloremque
					obcaecati ad, possimus impedit? Natus, dolorem alias labore maxime iure ipsa libero
					praesentium? Quia odit excepturi iure quae optio alias, sed repellendus praesentium totam
					ea nostrum eos tenetur porro non ducimus molestiae nihil! Ducimus consequuntur quisquam
					obcaecati quod possimus, dolores modi placeat, ab quia aspernatur culpa quas provident
					aut. Quibusdam?
				</div>
			</div>
		</div>
	</div>
	<div class="card border-2 h-fit" id="productReview">Rating</div>
	<footer class="fixed sm:block md:hidden bottom-0 flex gap-2 justify-center w-screen card p-4">
		<button class="btn variant-filled-primary w-1/2">Buy Now</button>
		<button class="btn variant-soft-primary w-1/2">Add to cart</button>
	</footer>
</div>
