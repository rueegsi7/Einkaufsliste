<script>
	import { enhance } from '$app/forms';

	let loginMessage = '';
	let registerMessage = '';
</script>

<div class="page-shell">
	<section class="card">
		<h1>Login</h1>
		<form method="POST" action="?/login" use:enhance>
			{#if loginMessage}
				<div class="message error">{loginMessage}</div>
			{/if}

			<label>
				<span>E-Mail</span>
				<input type="email" name="email" placeholder="name@example.com" required />
			</label>

			<label>
				<span>Passwort</span>
				<input type="password" name="password" placeholder="••••••••" required />
			</label>

			<button type="submit">Anmelden</button>
		</form>
	</section>

	<section class="card">
		<h1>Registrieren</h1>
		<form method="POST" action="?/register" use:enhance>
			{#if registerMessage}
				<div class="message">{registerMessage}</div>
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
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		padding: 1rem;
	}

	.card {
		padding: 1rem;
		border: 1px solid #ddd;
		border-radius: 12px;
		background: #fff;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
	}

	h1 {
		font-size: 1.25rem;
		margin-bottom: 1rem;
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

	input {
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
