<script>
	let { data } = $props();

	let shops = $derived([...new Set(data.items.map((item) => item.shop))]);

	let itemsByShop = $derived(
		data.items.reduce((acc, item) => {
			if (!acc[item.shop]) {
				acc[item.shop] = [];
			}
			acc[item.shop].push(item);
			return acc;
		}, {})
	);
</script>

<div class="page-shell">
	<h1>{data.listTitle}</h1>

	{#if data.isShopping}
		<div class="shopping-status">{data.shoppingBy} kauft gerade ein...</div>
	{/if}

	<section class="create-section">
		<h2>Artikel hinzufügen</h2>
		<form method="POST" action="?/addItem">
			<label>
				<span>Artikel</span>
				<input type="text" name="name" placeholder="z.B. Milch" required />
			</label>

			<label>
				<span>Laden</span>
				<input type="text" name="shop" list="shops-list" placeholder="z.B. Coop" required />
				<datalist id="shops-list">
					{#each shops as shop}
						<option value={shop}></option>
					{/each}
				</datalist>
			</label>

			<button type="submit">Hinzufügen</button>
		</form>
	</section>

	<section class="items-section">
		{#if Object.keys(itemsByShop).length === 0}
			<p class="empty-text">Keine Artikel vorhanden.</p>
		{:else}
			{#each Object.entries(itemsByShop) as [shop, items]}
				<div class="shop-group">
					<h3>
						{shop}
						<form method="POST" action="?/startShopping">
							<input type="hidden" name="shop" value={shop} />
							<button type="submit" class="start-shopping">Einkauf starten</button>
						</form>
					</h3>
					{#each items as item}
						<div class="item-row">
							<div class="item-name">{item.name}</div>
						</div>
					{/each}
				</div>
			{/each}
		{/if}
	</section>
</div>

<style>
	.page-shell {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
	.create-section {
		padding: 1.5rem;
		border: 1px solid var(--border);
		border-radius: 12px;
		background: var(--card-bg);
	}
	.items-section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.shop-group {
		padding: 1rem;
		border: 1px solid var(--border);
		border-radius: 12px;
		background: var(--card-bg);
	}
	h3 {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}
	.start-shopping {
		font-size: 0.9rem;
		padding: 0.4rem 0.8rem;
		border-radius: 8px;
		background: var(--primary);
		text-decoration: none;
		color: var(--bg);
		border: none;
		cursor: pointer;
	}
	input {
		padding: 0.9rem 1rem;
		border: 1px solid var(--border);
		border-radius: 10px;
		font-size: 1rem;
		background-color: var(--bg);
		color: var(--text);
	}
	button[type='submit'] {
		padding: 0.95rem 1rem;
		border: none;
		border-radius: 10px;
		background: var(--primary);
		color: var(--bg);
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
	}
	.item-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem 0;
	}
	.item-name {
		font-weight: 600;
	}
	.shopping-status {
		font-size: 0.9rem;
		color: var(--primary);
		margin-top: 0.25rem;
	}
</style>