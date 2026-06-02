<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';

	let { data } = $props();

	let initials = $derived(
		(data.user?.firstName?.charAt(0).toUpperCase() ?? '') +
			(data.user?.lastName?.charAt(0).toUpperCase() ?? '')
	);
</script>

<nav>
	<a href="/listen" class="nav-link">Listen</a>
	{#if data.user}
		<div class="nav-links">
			<div class="user-info">
				<div class="avatar">{initials}</div>
				<span>{data.user.firstName} {data.user.lastName}</span>
			</div>
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

	.user-info {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.avatar {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background-color: #eee;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
	}

	main {
		padding: 1rem;
	}
</style>
