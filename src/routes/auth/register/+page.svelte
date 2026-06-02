<script>
	import { enhance } from '$app/forms';

	let { form } = $props();
</script>

<div class="page-shell">
	<section class="card">
		<h1>Registrieren</h1>
		<form method="POST" use:enhance>
			{#if form?.message}
				<div class="message" class:error={form?.error}>{form.message}</div>
			{/if}

			<label>
				<span>Vorname</span>
				<input type="text" name="firstName" placeholder="Max" required />
			</label>

			<label>
				<span>Nachname</span>
				<input type="text" name="lastName" placeholder="Mustermann" required />
			</label>

			<label>
				<span>E-Mail</span>
				<input type="email" name="email" placeholder="name@example.com" required />
			</label>

			<label>
				<span>Passwort</span>
				<input type="password" name="password" placeholder="••••••••" required />
			</label>

			<button type="submit">Registrieren</button>
		</form>
	</section>
</div>

<style>
	.page-shell {
		max-width: 400px;
		margin: 2rem auto;
	}
	.card {
		padding: 2rem;
		border: 1px solid var(--border);
		border-radius: 12px;
		background: var(--card-bg);
	}
	h1 {
		font-size: 1.5rem;
		margin-bottom: 1.5rem;
		text-align: center;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	input {
		padding: 0.9rem 1rem;
		border: 1px solid var(--border);
		border-radius: 10px;
		font-size: 1rem;
		background-color: var(--bg);
		color: var(--text);
	}
	button {
		padding: 0.95rem 1rem;
		border: none;
		border-radius: 10px;
		background: var(--primary);
		color: var(--bg);
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
	}
	.message {
		padding: 0.8rem 1rem;
		border-radius: 8px;
		font-size: 0.95rem;
		background: #e8f5e9;
		color: #2e7d32;
		border: 1px solid #4caf50;
	}
	.message.error {
		background: #ffebee;
		color: #c62828;
		border-color: #f44336;
	}
</style>
