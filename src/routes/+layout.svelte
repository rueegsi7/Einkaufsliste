<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';

	let { data } = $props();
</script>

<nav>
	<a href="/" class="brand">LiveSync</a>
	{#if data.user}
		<div class="nav-links">
			<a href="/listen" class="nav-link">Listen</a>
			<form method="POST" action="/auth/logout" use:enhance>
				<button type="submit" class="nav-link">Logout</button>
			</form>
		</div>
	{:else}
		<div class="nav-links">
			<a href="/auth/login" class="nav-link">Login</a>
			<a href="/auth/register" class="nav-link">Registrieren</a>
		</div>
	{/if}
</nav>

<main>
	<slot />
</main>

<style>
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		border-bottom: 1px solid #ddd;
	}

	.brand {
		text-decoration: none;
		color: inherit;
		font-weight: 600;
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.nav-link {
		text-decoration: none;
		color: inherit;
		font-weight: 600;
		background: none;
		border: none;
		cursor: pointer;
		font-size: 1rem;
		font-family: inherit;
	}

	main {
		padding: 1rem;
	}
</style>
