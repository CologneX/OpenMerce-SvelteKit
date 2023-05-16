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

	import { browser } from '$app/environment';
	import Logo from '$lib/icons/Logo.svelte';
	import Star from '$lib/icons/Star.svelte';
	let carousel;
	// end for image carousel

	import { register } from 'swiper/element/bundle';

	register();
	const onProgress = (e: any) => {
		const [swiper, progress] = e.detail;
		console.log(progress);
	};
	const onSlideChange = (e: any) => {
		console.log('slide changed');
	};
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
		<div class="h-full w-full">
			<div class=" w-full p-0 sticky top-0 space-y-2">
				{#if browser}
					{#if product.image_urls}
						<swiper-container
							navigation="true"
							slides-per-group={1}
							pagination="true"
							grab-cursor="true"
							on:progress={onProgress}
							on:slidechange={onSlideChange}
						>
							{#each product.image_urls as image}
								<swiper-slide class=" shadow-xl card flex justify-center items-center">
									<picture>
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
									</picture></swiper-slide
								>
							{/each}
						</swiper-container>
					{:else}
						<picture class="aspect-square shadow-xl card flex justify-center items-center">
							<div>
								<Logo />
								<p class="text-center">No Image Found</p>
							</div>
						</picture>
					{/if}
				{/if}
				<div class="flex gap-2">
					{#if product.image_urls}
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
					{/if}
				</div>
			</div>
		</div>
		<div class="grid w-full h-full card">
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
					Weight: {product.weight}
					<br />
					{product.description}
					<br />
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe nisi inventore dolorem enim
					odio minima ipsa voluptate nobis, dignissimos repudiandae ut pariatur sed culpa eveniet! Mollitia
					nesciunt natus ut et itaque, dolore nam tempore incidunt reiciendis non autem adipisci dignissimos
					voluptatibus aspernatur repellendus ratione, officia dicta ducimus. Ab vitae nostrum explicabo
					temporibus recusandae, fuga molestiae. Nobis quis eligendi totam quos molestias rerum molestiae,
					velit earum, culpa qui suscipit. Dolores, adipisci tenetur? Ipsa fugit nisi vel, asperiores
					temporibus vitae molestias exercitationem earum excepturi voluptas eaque! Omnis repellat harum
					officia illum eum accusantium. Repellat nam iusto quia obcaecati velit rerum corporis iure
					repellendus quis totam optio incidunt doloribus sapiente voluptatum, facere nemo eos libero
					accusantium, nihil aliquid, veritatis numquam aut consectetur. Asperiores, quae sequi minus
					quasi necessitatibus, fuga provident non perferendis officiis ab saepe tempora itaque impedit
					ad voluptate nam! Tempora, pariatur sunt excepturi ipsam vero odit earum et recusandae reiciendis
					est inventore dicta id ipsum deserunt labore at. Voluptatem ullam sed suscipit magnam nisi
					accusantium mollitia qui consequuntur, nobis earum possimus cupiditate similique ipsa fugiat?
					Commodi quia cum veniam atque ipsum explicabo voluptates voluptatum nulla sit quas magni corrupti
					nam, facilis quibusdam nemo quidem, iure dolores nobis ratione dicta optio, exercitationem
					deserunt! Corrupti, reprehenderit assumenda natus et molestias animi explicabo officiis? Iste
					commodi odit doloribus a obcaecati at praesentium voluptatibus modi. Omnis quos voluptatibus
					nobis culpa facilis dolores tempore amet vitae et, quaerat reprehenderit numquam quia voluptas
					praesentium quas alias id, iste non. Quaerat culpa reiciendis exercitationem natus, expedita
					est aliquam tempore quo totam. Blanditiis ipsam recusandae suscipit enim corrupti ea doloremque,
					quo accusantium quibusdam iure reiciendis nesciunt beatae ipsum explicabo laboriosam architecto
					placeat dolor nostrum iusto, tenetur fugiat excepturi omnis sapiente! Possimus voluptatem asperiores
					odio! Neque, tempora facere vitae odit voluptatum natus, omnis quibusdam, expedita corporis
					laborum veritatis aut autem reiciendis perferendis magni sit. Beatae assumenda nostrum quae
					ipsa illum. Quasi vero voluptatum aut eos dolore officiis autem impedit, alias quae? Iusto
					rerum aliquid delectus repellat eos, praesentium debitis necessitatibus quis exercitationem
					aliquam, ad impedit laboriosam porro in omnis odio libero quam, voluptatum maxime itaque! Nemo,
					enim consectetur ab consequatur tenetur harum ipsum natus itaque autem! Voluptatibus ratione
					ipsa labore vero laudantium delectus perferendis ipsam repudiandae officia minus architecto
					sed doloribus temporibus, tenetur ad nesciunt? Quos explicabo nisi ex nam, corrupti eligendi.
					Sequi expedita dicta corrupti. Dolores, beatae nisi accusamus minus recusandae voluptatem fugit
					neque tenetur minima aut? Ex architecto odit atque officia in laudantium, officiis ullam tempora,
					exercitationem debitis id sunt reiciendis numquam, magni perspiciatis molestiae nesciunt amet
					unde? Incidunt nam iure soluta, voluptatem esse qui velit debitis nemo itaque tempora exercitationem
					illo quae repellendus ea at dolor voluptas quaerat perferendis quis dolores impedit! Doloribus
					ea, dolorum a tenetur ducimus voluptate repellat, veniam iusto quas voluptatibus tempora earum
					distinctio veritatis unde! Maxime, saepe voluptate corrupti distinctio porro fugiat labore
					natus ab animi dolorum quo dolorem ipsum, rem voluptates vel excepturi aspernatur harum! Laudantium
					eum eveniet voluptatem possimus perspiciatis, deleniti animi provident non adipisci? Dolorum
					ut eius fuga sint rerum animi, optio consequuntur voluptates error, ex sunt officiis harum
					obcaecati, incidunt soluta ipsa delectus tempora suscipit quas natus. Culpa, deleniti dolor
					maiores cupiditate beatae quasi doloribus aliquam ut eligendi incidunt unde vel animi sed itaque
					soluta accusantium laborum! Atque in alias non eaque, sint repellat cum optio! Ullam modi quidem
					impedit voluptatum dolorum facere? Beatae dolor omnis facere tempore numquam ratione eum consectetur
					assumenda qui tempora veniam, necessitatibus cupiditate est recusandae? Harum ut consectetur
					ipsa quo libero obcaecati eius voluptatum sapiente ratione ducimus perferendis labore dicta
					impedit id asperiores quidem nostrum reiciendis provident, nesciunt omnis ad fuga et? Harum
					fugiat quod accusantium ipsam amet culpa, quasi, eaque illum illo nam architecto, delectus
					at. Deleniti voluptate vel, alias laudantium harum necessitatibus, nemo illum explicabo dolorem
					non, inventore cumque beatae repellat nesciunt! Dolores ducimus placeat a accusantium molestiae
					suscipit modi nam dolore saepe unde. Facere necessitatibus, commodi quibusdam laboriosam voluptatibus
					architecto perspiciatis excepturi, impedit odio similique voluptates id illo dicta cumque amet
					reiciendis sequi maxime alias delectus ab accusamus. Quasi exercitationem minima inventore.
					Quo, explicabo officia maiores unde obcaecati dolore modi voluptatem ab. Impedit iusto natus,
					commodi doloribus, cum cupiditate nisi expedita aspernatur, in soluta placeat dolor quas. Molestiae
					dolore autem tempora!
				</div>
			</div>
		</div>
	</div>
	<div id="productReview">
		<div class="logo-cloud grid-cols-1 lg:!grid-cols-3 gap-1">
			<div class="logo-item"><h1>Reviews</h1></div>
			<div class="logo-item" />
			<div class="logo-item">
				<span class="flex"><Star /><Star /><Star /><Star /><Star /></span>
				<span><h1>{product.cumulative_review}</h1></span>
			</div>
		</div>
	</div>
	<footer class="fixed sm:block md:hidden bottom-0 flex gap-2 justify-center w-screen card p-4">
		<button class="btn variant-filled-primary w-1/2">Buy Now</button>
		<button class="btn variant-soft-primary w-1/2">Add to cart</button>
	</footer>
</div>
