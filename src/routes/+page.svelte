<title>Center</title>

<div id="background1" class="background"
	class:background-display={nowSwitchBackground === 'background1'}
	class:background-hidden={nowSwitchBackground === 'background1'}
	style="background-image: url('{data.background1.url}');">
</div>
<div
	id="background2" class="background"
	class:background-display={nowSwitchBackground !== 'background2'}
	class:background-hidden={nowSwitchBackground === 'background2'}
	style="background-image: url('{data.background2.url}');">
</div>

<div class="text-content text-center font-bold font-big-blue-term font-shadow home-title auto-hidden">
	<p class="text-3xl">Welcome to you06's Home.</p>
	<p class="text-2xl">
		this page exhibits my photography, 
		refresh or click <span class="inline-icon icon-shadow"><Fa icon={faChevronRight} /></span> to show another.
	</p>
</div>

<div class="text-content photo-controller auto-hidden">
	<div class="text-center">
		<button type="button" class="photo-controller-icon inline-icon icon-shadow" on:click={loadNewBackground}>
			<Fa icon={faChevronRight} />
		</button>
	</div>
</div>

<script>
	import Fa from 'svelte-fa'
	import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
	import { request } from '$lib/endpoint'

	/** @type {import('./$types').PageData} */
	export let data

	let onloadRandomBackground = false
	let nowSwitchBackground = 'background2'

	function loadNewBackground() {
		if (onloadRandomBackground) {
			return
		}
		onloadRandomBackground = true
		request('background', {
			bypass_urls: [data.background1.url, data.background2.url]
		}).then(function (resp) {
			console.log(`load new background: ${resp.rows[0].url}`)
			let image = new Image();
			image.addEventListener('load', function() {
				if (nowSwitchBackground === 'background1') {
					data.background1 = resp.rows[0]
				} else {
					data.background2 = resp.rows[0]
				}

				setTimeout(function() {
					if (nowSwitchBackground === 'background1') {
						nowSwitchBackground = 'background2'
					} else {
						nowSwitchBackground = 'background1'
					}
					onloadRandomBackground = false
				}, 500)
				image.remove()
			})
			image.src = resp.rows[0].url
		}).catch(function (err) {
			console.error(err)
			onloadRandomBackground = false
		})
	}
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
		background-position: 50% 50%;
		background-size: cover;
		background-color: #666;
	}

	.photo-controller {
		position: fixed;
		bottom: 0;
		width: 100%;
		padding-bottom: 50px;
	}

	.photo-controller-icon {
		font-size: 4em;
		cursor: pointer;
		color: #fff;
	}

	.inline-icon {
		display: inline-block !important;
		vertical-align: text-bottom;
	}

	.home-title {
		color: #fff;
		position: fixed;
		width: 100%;
		top: calc(50% - 5rem);
	}

	.font-shadow {
		text-shadow: #111 0 0 10px;
	}

	.icon-shadow {
		-webkit-filter: drop-shadow(0px 0px 10px rgba(16, 16, 16, 1));
		filter: drop-shadow(0px 0px 10px rgba(16, 16, 16, 1));
	}

	.auto-hidden {
		-webkit-animation: hideAnimation 2s forwards; 
    	animation: hideAnimation 2s forwards;
	}

	.auto-hidden:hover {
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

	.text-content {
		z-index: 300;
	}

	.background-display {
		z-index: 200;
	}

	.background-hidden {
		z-index: 100;
		opacity: 0;
	}
</style>
