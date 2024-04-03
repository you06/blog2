<title>Center</title>

<div class="background-background">
	<div id="background1" class="background"
		class:background-show={background1Show}
		class:background-display={background1Display}
		class:background-hidden={!background1Display}>
		<img src="{data.background1.url}" alt="{data.background1.description}" class="background-cover-image" use:onloadBackgound id="background1-img"/>
	</div>
	<div
		id="background2" class="background"
		class:background-show={background2Show}
		class:background-display={background2Display}
		class:background-hidden={!background2Display}>
		<img src="{data.background2.url}" alt="{data.background2.description}" class="background-cover-image" use:onloadBackgound id="background2-img"/>
	</div>
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

	const debug = false
	let onloadRandomBackground = false
	let nowSwitchBackground = 'background2'
	let background1Display = true
	let background2Display = false
	let background1Show = false
	let background2Show = false

	function onloadBackgound(el) {
		let init = true
		el.addEventListener('load', () => {
			if (debug) {
				console.log(`background loaded: ${el.id} ${el.src}`)
			}
			// ignore first event
			if (init) {
				init = false
				return
			}
			let one2two = nowSwitchBackground === 'background2'
			if (one2two) {
				nowSwitchBackground = 'background1'
				background2Show = true
			} else {
				nowSwitchBackground = 'background2'
				background1Show = true
			}

			setTimeout(() => {
				if (one2two) {
					background1Display = false
					background2Display = true
					background2Show = false
				} else {
					background2Display = false
					background1Display = true
					background1Show = false
				}
				onloadRandomBackground = false
			}, 750)
		})
	}

	function loadNewBackground() {
		if (onloadRandomBackground) {
			return
		}
		onloadRandomBackground = true
		if (debug) {
			console.log(`trigger load new background`, `["${data.background1.url}", "${data.background2.url}"]`)
		}
		request('background', {
			bypass_url1: data.background1.url,
			bypass_url2: data.background2.url
		}).then(function (resp) {
			if (debug) {
				console.log(`load new background: ${resp.rows[0].url}`)
			}
			if (nowSwitchBackground === 'background1') {
				data.background1 = resp.rows[0]
			} else {
				data.background2 = resp.rows[0]
			}
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
		z-index: 150;
		opacity: 0;
	}

	.background-background {
		position: fixed;
		left: 0;
		top: 0;
		height:100%;
		width:100%;
		background-color: #666;
	}

	.background-cover-image {
		height: 100%;
		width: 100%;
		object-fit: cover;
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
		opacity: 1;
	}

	.background-show {
		z-index: 201 !important;
		-webkit-animation: showAnimation 0.7s forwards; 
		animation: showAnimation 0.7s forwards;
	}

	.background-hidden {
		z-index: 100;
		opacity: 0;
	}
</style>
