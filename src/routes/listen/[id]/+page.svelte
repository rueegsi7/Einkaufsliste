<script>
	let { data } = $props();
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
				<input type="text" name="shop" placeholder="z.B. Coop" required />
			</label>

			<button type="submit">Hinzufügen</button>
		</form>
	</section>

	<section class="items-section">
		<div class="item-group">
			<h2>Noch zu besorgen</h2>
			{#if data.items.filter((item) => !item.isBought).length === 0}
				<p class="empty-text">Keine Artikel vorhanden.</p>
			{:else}
				{#each data.items.filter((item) => !item.isBought) as item}
					<div class="item-row">
						<div>
							<div class="item-name">{item.name}</div>
							<div class="item-shop">{item.shop}</div>
						</div>
						<div class="item-actions">
							<form method="POST" action="?/toggleItem">
								<input type="hidden" name="itemId" value={item.id} />
								<button type="submit">Abhaken</button>
							</form>
							<form method="POST" action="?/deleteItem">
								<input type="hidden" name="itemId" value={item.id} />
								<button type="submit" class="delete">Löschen</button>
							</form>
						</div>
					</div>
				{/each}
			{/if}
		</div>

		<div class="item-group">
			<h2>Im Einkaufswagen</h2>
			{#if data.items.filter((item) => item.isBought).length === 0}
				<p class="empty-text">Noch keine Artikel im Einkaufswagen.</p>
			{:else}
				{#each data.items.filter((item) => item.isBought) as item}
					<div class="item-row">
						<div>
							<div class="item-name">{item.name}</div>
							<div class="item-shop">{item.shop}</div>
						</div>
						<div class="item-actions">
							<form method="POST" action="?/toggleItem">
								<input type="hidden" name="itemId" value={item.id} />
								<button type="submit">Zurücklegen</button>
							</form>
							<form method="POST" action="?/deleteItem">
								<input type="hidden" name="itemId" value={item.id} />
								<button type="submit" class="delete">Löschen</button>
							</form>
						</div>
					</div>
				{/each}
			{/if}
		</div>
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

	.create-section,
	.items-section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
		border: 1px solid #ddd;
		border-radius: 12px;
		background: #fff;
	}

	h2 {
		font-size: 1.1rem;
		margin: 0;
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

	button.delete {
		background: #d32f2f;
	}

	button.delete:hover {
		background: #b71c1c;
	}

	button:hover {
		opacity: 0.95;
	}

	.items-section {
		padding: 0;
	}

	.item-group {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		padding: 1rem;
		border-bottom: 1px solid #eee;
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

	.item-shop {
		font-size: 0.9rem;
		color: #666;
	}

	.item-actions {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.empty-text {
		color: #777;
		font-size: 0.95rem;
	}
</style>