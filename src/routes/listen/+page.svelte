<script>
	import { enhance } from '$app/forms';

	let { data } = $props();
	let createMessage = '';
</script>

<div class="page-shell">
	<h1>Deine Einkaufslisten</h1>

	{#if data.lists.length === 0}
		<div class="empty-state">
			<p>Du hast noch keine Listen erstellt.</p>
		</div>
	{:else}
		<ul class="lists">
			{#each data.lists as list (list._id)}
				<li class="list-item">
					<a href="/listen/{list._id}">
						<div class="list-name">{list.title}</div>
						<div class="list-meta">{list.itemCount} Artikel</div>
					</a>
				</li>
			{/each}
		</ul>
	{/if}

	<section class="create-section">
		<h2>Neue Liste erstellen</h2>
		<form method="POST" action="?/create" use:enhance>
			{#if createMessage}
				<div class="message">{createMessage}</div>
			{/if}

			<input
				type="text"
				name="title"
				placeholder="z.B. Wocheneinkauf"
				required
			/>
			<button type="submit">Neue Liste erstellen</button>
		</form>
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

	h2 {
		font-size: 1.1rem;
		margin: 0 0 1rem 0;
	}

	.empty-state {
		text-align: center;
		padding: 2rem 1rem;
		background: #f5f5f5;
		border-radius: 10px;
		color: #666;
	}

	.lists {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.list-item {
		background: #fff;
		border: 1px solid #ddd;
		border-radius: 10px;
		overflow: hidden;
	}

	.list-item a {
		display: block;
		padding: 1rem;
		text-decoration: none;
		color: inherit;
		transition: background-color 0.2s;
	}

	.list-item a:hover {
		background-color: #f9f9f9;
	}

	.list-name {
		font-weight: 600;
		font-size: 1rem;
		margin-bottom: 0.25rem;
	}

	.list-meta {
		font-size: 0.85rem;
		color: #999;
	}

	.create-section {
		padding: 1rem;
		border: 1px solid #ddd;
		border-radius: 10px;
		background: #fafafa;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	input[type='text'] {
		padding: 0.9rem 1rem;
		border: 1px solid #ccc;
		border-radius: 10px;
		font-size: 1rem;
	}

	button {
		padding: 0.95rem 1rem;
		border: none;
		border-radius: 10px;
		background: #0f62fe;
		color: #fff;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
	}

	button:hover {
		background: #0d5ce1;
	}

	.message {
		padding: 0.8rem 1rem;
		border-radius: 8px;
		background: #e8f5e9;
		color: #2e7d32;
		border: 1px solid #4caf50;
		font-size: 0.95rem;
	}
</style>
