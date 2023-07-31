<template>
	<div class="h-full">
		<div class="picker">
			<div ref="target" class="picker-window"></div>
			<ul v-for="column in visibleColumns" :key="column.name" :class="column.name">
				<li v-for="value in column.values" :key="value.value" :ref="value.target">
					<template v-if="typeof value.value === 'number'">{{ value.value }}</template>
					<template v-else>{{ value.text }}<span v-if="value.suffix">{{ value.suffix }}</span></template>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">

import { computed, onMounted, ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const columns = [
	{
		name: 'picker-day',
		values: [
			{ value: 'july-1', text: 'Tue Jul', suffix: '1' },
			{ value: 'july-2', text: 'Tue Jul', suffix: '2' },
			{ value: 'july-3', text: 'Tue Jul', suffix: '3' },
			{ value: 'july-4', text: 'Tue Jul', suffix: '4' },
			{ value: 'july-5', text: 'Tue Jul', suffix: '5' },
			{ value: 'july-6', text: 'Tue Jul', suffix: '6' },
			{ value: 'july-7', text: 'Tue Jul', suffix: '7' },
			{ value: 'july-8', text: 'Tue Jul', suffix: '8' },
			{ value: 'july-9', text: 'Tue Jul', suffix: '9' },
			{ value: 'july-10', text: 'Tue Jul 10' },

		]
	},
	{
		name: 'picker-hour',
		values: Array.from({ length: 12 }, (_, i) => i + 1)
	},
	{
		name: 'picker-minute',
		values: Array.from({ length: 12 }, (_, i) => i * 5)
	},
]

const visibleColumns = columns.map(column => {
	return {
		...column,
		values: column.values.map(value => {
			return {
				...(typeof value === 'number' ? { value } : value),
				target: ref(null)
			}
		})
	}
})

const visibleTargets = visibleColumns.flatMap(column => column.values.map(value => computed(() => Array.isArray(value.target) ? value.target[0] : value.target)))

const target = ref(null)

useIntersectionObserver(
	visibleTargets,
	(allElements, observerElement) => {
		allElements.forEach(e => {
			debugger;
			if (e.isIntersecting) {
				e.target.classList.add('bg-green-500')
				return
			} else {
				e.target.classList.remove('bg-green-500')
				e.target.classList.add('bg-pink-500')
			}
		})
	},
	{
		threshold: 0.5,
		root: target,
	},
)

</script>

<style scoped lang="scss">
@mixin hideScrollbars {
	-ms-overflow-style: none; // IE 10+

	&::-webkit-scrollbar {
		display: none;
	}
}

$blue: darken(cornflowerblue, 10);
$cool-gray: #eff1f1;
$factory-yellow: #f3e033;

* {
	box-sizing: border-box;
}

body {
	padding: 5%;
	padding-top: 30vh;
	text-align: center;
	background: black;
	font-family: 'San Francisco Text', sans-serif;

}

.picker-window {
	position: absolute;
	border-top: 1px solid darken($cool-gray, 10);
	border-bottom: 1px solid darken($cool-gray, 10);
	height: 1.4em;
	left: 0;
	top: 50%;
	transform: translateY(-65%);
	width: 100%;
	pointer-events: none;
	// background: red;
}

.picker {
	display: inline-grid;
	box-shadow: 0 .5vw 2vw -5px rgba(black, .2);
	border-radius: 15px;
	position: relative;
	border-top: 2rem solid white;
	border-bottom: 2rem solid white;
	padding-left: 1rem;
	padding-right: 1rem;
	background: white;
	grid-template-columns: repeat(4, fit-content(500px));
	font-size: calc(.5rem + 2.4vw);
	position: relative;
	font-feature-settings: "tnum";
	font-weight: 400;

	&:before,
	&:after {
		content: '';
		position: absolute;
		width: 100%;
		height: 2.2em;
		pointer-events: none;
	}

	&:before {
		top: -.2em;
		background: linear-gradient(white, rgba(white, .7))
	}

	&:after {
		bottom: -.2em;
		height: 2.4em;
		background: linear-gradient(rgba(white, .7), white)
	}

	ul {
		@include hideScrollbars();
		max-height: 4em;
		overflow-y: scroll;
		margin-right: 1em;
		scroll-snap-type: y mandatory;
		padding-bottom: 3em;
		padding-top: 3em;
	}

	li {
		scroll-snap-align: center;
		height: 1.4em;
		text-align: right;
		word-spacing: .2em;
	}
}

.picker-day {
	padding-right: .5em;

	span {
		padding-left: .56em;
	}
}

button {
	display: inline-block;
	appearance: none;
	border: 1px solid $blue;
	background: transparent;
	color: $blue;
	border-radius: 15px;
	font-weight: 500;
	padding: 1rem;
	font-size: 1.1rem;
	font-family: 'San Francisco Text', sans-serif;
	cursor: pointer;
	letter-spacing: .01em;
}
</style>
