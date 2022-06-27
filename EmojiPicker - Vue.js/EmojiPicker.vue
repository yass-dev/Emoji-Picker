<script>

/**
 * Emoji Picker
 * Load emojis and  categories from the json file 'emojis-data.json'
 * Events:
 *  - 'emoji_click' event is fires when the user clicks on an emoji. The emoji is sent as event payload.
 * Props:
 * 	- 'show_arrow' boolean to show or not the arrow at the bottom of the picker. True by default.
 */

import data from './emojis-data.json';

export default {
	props:
	{
		show_arrow:
		{
			type: Boolean,
			required: false,
			default: true
		}
	},
	computed:
	{
		categories()
		{
			return Object.keys(data);
		},

		category_emojis: () => (category) =>
		{
			return Object.values(data[category]);
		}
	},
	methods:
	{
		handleEmojiClick(e, emoji)
		{
			e.preventDefault();
			this.$emit('emoji_click', emoji);
		}
	}
}
</script>

<template>
	<div class="emoji_picker">
		<div class="picker_container">
			<div class="category" v-for="category in categories" :key="`category_${category}`">
				<span>{{ category }}</span>
				<div class="emojis_container">
					<button @click="handleEmojiClick($event, emoji)" v-for="(emoji, index) in category_emojis(category)" :key="`emoji_${index}`">
						{{ emoji }}
					</button>
				</div>
			</div>
		</div>
		<div class="bottom_arrow" v-if="show_arrow"></div>
	</div>
</template>

<style scoped>

.emoji_picker
{
	position: relative;
	display: flex;
	flex-direction: column;
	width: 20rem;
	height: 20rem;
	max-width: 100%;
}

.emoji_picker,
.bottom_arrow
{
	box-shadow: 0 0 5px 1px rgba(0, 0, 0, .0975);
}

.emoji_picker,
.picker_container
{
	border-radius: 0.5rem;
	background: white;
}

.picker_container
{
	position: relative;
	padding: 1rem;
	overflow: auto;
	z-index: 1;
}

.category
{
	display: flex;
	flex-direction: column;
	margin-bottom: 1rem;
	color: rgb(169, 169, 169);
}

.emojis_container
{
	display: flex;
	flex-wrap: wrap;
}

.category button
{
	margin: 0.5rem;
	margin-left: 0;
	background: inherit;
	border: none;
	font-size: 1.75rem;
	padding: 0;
}

.bottom_arrow
{
	position: absolute;
	left: 50%;
	bottom: 0;
	width: 0.75rem;
	height: 0.75rem;
	transform: translate(-50%, 50%) rotate(45deg);
	background: white;
}

</style>