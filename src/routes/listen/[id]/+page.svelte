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
		padding: 1rem;
	}

	h1 {
		font-size: 1.5rem;
		margin: 0;
	}

	.create-section {
		padding: 1rem;
		border: 1px solid #ddd;
		border-radius: 12px;
		background: #fff;
	}

	.items-section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	h2 {
		font-size: 1.1rem;
		margin: 0;
	}

	h3 {
		font-size: 1rem;
		margin: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
	}

	.start-shopping {
		font-size: 0.8rem;
		padding: 0.3rem 0.6rem;
		border-radius: 6px;
		background: #eee;
		text-decoration: none;
		color: #333;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		font-size: 0.95rem;
	}

	input[type='text'] {
		padding: 0.9rem 1rem;
		border: 1px solid #ccc;
		border-radius: 10px;
		font-size: 1rem;
	}

	button {
		padding: 0.85rem 1rem;
		border: none;
		border-radius: 10px;
		background: #0f62fe;
		color: #fff;
		font-size: 0.95rem;
		font-weight: 600;
		cursor: pointer;
	}

	.shop-group {
		padding: 1rem;
		border: 1px solid #ddd;
		border-radius: 12px;
		background: #fff;
	}

	.item-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		padding: 0.75rem 0;
		border-bottom: 1px solid #f0f0f0;
	}

	.item-row:last-child {
		border-bottom: none;
	}

	.item-name {
		font-weight: 600;
	}

	.empty-text {
		color: #777;
		font-size: 0.95rem;
		text-align: center;
		padding: 1rem;
	}
</style>