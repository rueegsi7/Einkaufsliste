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
							<button onclick={() => moveToCart(item, index)}>
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
							<button class="in-cart" onclick={() => moveBackToBuy(item, index)}>
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
	.shopping-layout {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		margin: 2rem 0;
	}
	@media (min-width: 600px) {
		.shopping-layout {
			grid-template-columns: 1fr 1fr;
		}
	}
	.shopping-list {
		background: var(--card-bg);
		padding: 1rem;
		border-radius: 12px;
		border: 1px solid var(--border);
	}
	.shopping-list ul {
		list-style: none;
		padding: 0;
	}
	.shopping-list li button {
		width: 100%;
		text-align: left;
		padding: 1rem;
		border: 1px solid var(--border);
		border-radius: 8px;
		margin-bottom: 0.5rem;
		background: var(--bg);
		color: var(--text);
		cursor: pointer;
		font-size: 1rem;
	}
	.shopping-list li button.in-cart {
		background-color: #427b58; /* A green from Everforest palette */
		border-color: #427b58;
		color: var(--bg);
	}
	.finish-button {
		width: 100%;
		padding: 1rem;
		font-size: 1.2rem;
		background-color: var(--primary);
		color: var(--bg);
		border: none;
		border-radius: 8px;
		cursor: pointer;
	}
</style>
