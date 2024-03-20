<title>Center</title>

<div class="background" style="background: url('{data.background.url}') 50% 50% / cover;">
	<div class="text-center font-bold home-title font-big-blue-term font-shadow">
		<p class="text-3xl">Welcome to you06's Home.</p>
		<p class="text-2xl">this page exhibits my photography, refresh to show another.</p>
	</div>
</div>

<script>
	/** @type {import('./$types').PageData} */
	export let data
</script>

<style lang="postcss">
	:global(html) {
	   background-color: theme(colors.gray.100);
	}

	.background {
		position: fixed;
		left: 0;
		top: 0;
		height:100%;
		width:100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.home-title {
		color: #fff;

		-webkit-animation: hideAnimation 3s forwards; 
    	animation: hideAnimation 3s forwards;
	}
	
	.home-title:hover {
		opacity: 1;
		-webkit-animation: showAnimation 0.3s forwards; 
    	animation: showAnimation 0.3s forwards;
	}

	@keyframes hideAnimation {
		0%   {opacity: 1;}
		90%  {opacity: 1;}
		100% {opacity: 0;}
	}
	@-webkit-keyframes hideAnimation {
		0%   {opacity: 1;}
		90%  {opacity: 1;}
		100% {opacity: 0;}
	}
	@keyframes showAnimation {
		0%   {opacity: 0;}
		100% {opacity: 1;}
	}
	@-webkit-keyframes showAnimation {
		0%   {opacity: 0;}
		100% {opacity: 1;}
	}
</style>
