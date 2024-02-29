<h1>Welcome to Blog2</h1>

{#each data.posts as post}
<div>
    <a href='./post/{post.id}'>This is {post.id}</a>
</div>
{/each}

<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>
