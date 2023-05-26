

<input
	type="text"
	min="0"
	class="input"
	bind:value={selectedStock}
	on:input={() => {
		if (selectedStock > productDetail.stock) {
			selectedStock = productDetail.stock;
		} else if (selectedStock < 0) {
			selectedStock = 0;
		}
	}}
	on:keypress={(e) => {
		if (e.key.match(/[^0-9]/g)) {
			e.preventDefault();
		}
	}}
/>
