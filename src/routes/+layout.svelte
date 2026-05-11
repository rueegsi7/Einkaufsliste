<script lang="ts">
	import { page } from '$app/stores';
</script>

<nav>
	<a href="/" class="brand">LiveSync</a>
	<a href="/listen" class="nav-link">Listen</a>
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

	.brand,
	.nav-link {
		text-decoration: none;
		color: inherit;
		font-weight: 600;
	}

	main {
		padding: 1rem;
	}
</style>
