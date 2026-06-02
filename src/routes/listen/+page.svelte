<script>
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';

	let { data } = $props();
	let renameListId = $state(null);
	let inviteListId = $state(null);

	onMount(() => {
		const interval = setInterval(() => {
			invalidateAll();
		}, 2000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<div class="page-shell">
	<h1>Deine Einkaufslisten</h1>

	<div class="lists">
		{#each data.lists as list (list._id)}
			<div class="list-item">
				<a href="/listen/{list._id}" class="list-link">
					<div class="list-name">{list.title}</div>
					<div class="list-meta">{list.itemCount} offene Artikel</div>
					{#if list.isShopping}
						<div class="shopping-status">{list.shoppingBy} kauft gerade ein...</div>
					{/if}
				</a>
				<div class="list-footer">
					<div class="members">
						{#each list.members as member}
							<div class="avatar-small">{member.initials}</div>
						{/each}
					</div>
					<div class="list-actions">
						<button onclick={() => (inviteListId = list._id)}>Einladen</button>
						<button onclick={() => (renameListId = list._id)}>Umbenennen</button>
						<form action="?/deleteList" method="POST" use:enhance>
							<input type="hidden" name="listId" value={list._id} />
							<button type="submit">Löschen</button>
						</form>
					</div>
				</div>
			</div>
		{/each}
		<section class="create-section list-item">
			<h2 class="list-name">Neue Liste erstellen</h2>
			<form method="POST" action="?/create" use:enhance>
				<input type="text" name="title" placeholder="z.B. Wocheneinkauf" required />
				<button type="submit">Neue Liste erstellen</button>
			</form>
		</section>
	</div>

	{#if data.lists.length === 0}
		<div class="empty-state">
			<p>Du hast noch keine Listen erstellt.</p>
		</div>
	{/if}

	{#if renameListId}
		<div
			class="modal-backdrop"
			onclick={() => (renameListId = null)}
			onkeydown={(e) => e.key === 'Escape' && (renameListId = null)}
			role="button"
			tabindex="0"
		>
			<div class="modal" onclick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
				<h2>Liste umbenennen</h2>
				<form
					action="?/renameList"
					method="POST"
					use:enhance={() => {
						renameListId = null;
						return async ({ update }) => {
							await update();
						};
					}}
				>
					<input type="hidden" name="listId" value={renameListId} />
					<input type="text" name="title" placeholder="Neuer Name" required />
					<button type="submit">Speichern</button>
				</form>
			</div>
		</div>
	{/if}

	{#if inviteListId}
		<div
			class="modal-backdrop"
			onclick={() => (inviteListId = null)}
			onkeydown={(e) => e.key === 'Escape' && (inviteListId = null)}
			role="button"
			tabindex="0"
		>
			<div class="modal" onclick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
				<h2>Nutzer einladen</h2>
				<form
					action="?/inviteUser"
					method="POST"
					use:enhance={() => {
						inviteListId = null;
						return async ({ update }) => {
							await update();
						};
					}}
				>
					<input type="hidden" name="listId" value={inviteListId} />
					<input type="email" name="email" placeholder="E-Mail des Nutzers" required />
					<button type="submit">Einladen</button>
				</form>
			</div>
		</div>
	{/if}
</div>

<style>
	.page-shell {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
	.lists {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1rem;
	}
	.list-item {
		background: var(--card-bg);
		border: 1px solid var(--border);
		border-radius: 12px;
		display: flex;
		flex-direction: column;
	}
	.list-link {
		padding: 1rem;
		text-decoration: none;
		color: var(--text);
		flex-grow: 1;
	}
	.list-name {
		font-weight: 600;
		font-size: 1.2rem;
	}
	.list-meta {
		font-size: 0.9rem;
		opacity: 0.7;
	}
	.shopping-status {
		font-size: 0.8rem;
		color: var(--primary);
	}
	.list-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem 1rem;
		border-top: 1px solid var(--border);
	}
	.members {
		display: flex;
		gap: 0.25rem;
	}
	.avatar-small {
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background-color: var(--primary);
		color: var(--bg);
		font-size: 0.7rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.list-actions button,
	.list-actions form button {
		background: none;
		border: none;
		cursor: pointer;
		font-size: 0.8rem;
		color: var(--text);
		opacity: 0.7;
		padding: 0;
		font-weight: normal;
	}
	.list-actions form {
		margin: 0;
	}
	.create-section {
		padding: 1rem;
		gap: 1rem;
		justify-content: space-between;
	}
	.create-section h2 {
		margin: 0;
	}
	.create-section form {
		margin-top: auto;
		width: 100%;
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
	.modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.7);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.modal {
		background: var(--card-bg);
		padding: 2rem;
		border-radius: 10px;
		border: 1px solid var(--border);
	}
</style>

