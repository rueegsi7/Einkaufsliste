<script>
	import { enhance } from '$app/forms';
	let { data } = $props();

	let toBuy = $state([...data.items]);
	let inCart = $state([]);

	function moveToCart(item, index) {
		inCart.push(item);
		toBuy.splice(index, 1);
	}

	function moveBackToBuy(item, index) {
		toBuy.push(item);
		inCart.splice(index, 1);
	}
</script>

<div class="page-shell">
	<h1>Einkauf bei {data.shop}</h1>

	<div class="shopping-layout">
		<section class="shopping-list">
			<h2>Noch zu besorgen</h2>
			{#if toBuy.length === 0}
				<p>Alles im Wagen!</p>
			{:else}
				<ul>
					{#each toBuy as item, index}
						<li>
							<button on:click={() => moveToCart(item, index)}>
								{item.name}
							</button>
						</li>
					{/each}
				</ul>
			{/if}
		</section>

		<section class="shopping-list">
			<h2>Im Einkaufswagen</h2>
			{#if inCart.length === 0}
				<p>Noch nichts im Wagen.</p>
			{:else}
				<ul>
					{#each inCart as item, index}
						<li>
							<button class="in-cart" on:click={() => moveBackToBuy(item, index)}>
								{item.name}
							</button>
						</li>
					{/each}
				</ul>
			{/if}
		</section>
	</div>

	<form method="POST" action="?/finishShopping" use:enhance>
		{#each inCart as item}
			<input type="hidden" name="itemIds[]" value={item.id} />
		{/each}
		<button type="submit" class="finish-button">Einkauf abschliessen</button>
	</form>
</div>

<style>
	.page-shell {
		padding: 1rem;
	}
	.shopping-layout {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		margin: 2rem 0;
	}
	.shopping-list ul {
		list-style: none;
		padding: 0;
	}
	.shopping-list li button {
		width: 100%;
		text-align: left;
		padding: 1rem;
		border: 1px solid #ddd;
		border-radius: 8px;
		margin-bottom: 0.5rem;
		background: #fff;
		cursor: pointer;
		font-size: 1rem;
	}
	.shopping-list li button.in-cart {
		background-color: #e8f5e9;
		border-color: #4caf50;
	}
	.finish-button {
		width: 100%;
		padding: 1rem;
		font-size: 1.2rem;
		background-color: #28a745;
		color: white;
		border: none;
		border-radius: 8px;
		cursor: pointer;
	}
</style>
