<script>
	import { enhance } from '$app/forms';

	let { data } = $props();
	let renameListId = $state(null);
	let inviteListId = $state(null);
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
							<button on:click={() => (inviteListId = list._id)}>Einladen</button>
							<button on:click={() => (renameListId = list._id)}>Umbenennen</button>
							<form action="?/deleteList" method="POST" use:enhance>
								<input type="hidden" name="listId" value={list._id} />
								<button type="submit">Löschen</button>
							</form>
						</div>
					</div>
				</li>
			{/each}
		</ul>
	{/if}

	{#if renameListId}
		<div class="modal-backdrop" on:click={() => (renameListId = null)}>
			<div class="modal" on:click|stopPropagation>
				<h2>Liste umbenennen</h2>
				<form action="?/renameList" method="POST" use:enhance={() => {
					renameListId = null;
					return async ({ update }) => {
						await update();
					};
				}}>
					<input type="hidden" name="listId" value={renameListId} />
					<input type="text" name="title" placeholder="Neuer Name" required />
					<button type="submit">Speichern</button>
				</form>
			</div>
		</div>
	{/if}

	{#if inviteListId}
		<div class="modal-backdrop" on:click={() => (inviteListId = null)}>
			<div class="modal" on:click|stopPropagation>
				<h2>Nutzer einladen</h2>
				<form action="?/inviteUser" method="POST" use:enhance={() => {
					inviteListId = null;
					return async ({ update }) => {
						await update();
					};
				}}>
					<input type="hidden" name="listId" value={inviteListId} />
					<input type="email" name="email" placeholder="E-Mail des Nutzers" required />
					<button type="submit">Einladen</button>
				</form>
			</div>
		</div>
	{/if}

	<section class="create-section">
		<h2>Neue Liste erstellen</h2>
		<form method="POST" action="?/create" use:enhance>
			<input type="text" name="title" placeholder="z.B. Wocheneinkauf" required />
			<button type="submit">Neue Liste erstellen</button>
		</form>
	</section>
</div>

<style>
	/* General Styles */
	.page-shell {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
	h1 {
		font-size: 1.5rem;
		margin: 0;
	}
	h2 {
		font-size: 1.1rem;
		margin: 0 0 1rem 0;
	}

	/* Lists */
	.lists {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.list-item {
		background: #fff;
		border: 1px solid #ddd;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
	}
	.list-link {
		padding: 1rem;
		text-decoration: none;
		color: inherit;
	}
	.list-name {
		font-weight: 600;
	}
	.shopping-status {
		font-size: 0.8rem;
		color: #28a745;
	}
	.list-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem 1rem;
		border-top: 1px solid #eee;
	}
	.members {
		display: flex;
		gap: 0.25rem;
	}
	.avatar-small {
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background-color: #eee;
		font-size: 0.7rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.list-actions {
		display: flex;
		gap: 0.5rem;
	}
	.list-actions button {
		background: none;
		border: none;
		cursor: pointer;
		font-size: 0.8rem;
		color: #666;
	}

	/* Modals */
	.modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.modal {
		background: #fff;
		padding: 2rem;
		border-radius: 10px;
	}

	/* Forms */
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
	input[type='text'],
	input[type='email'] {
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
</style>

