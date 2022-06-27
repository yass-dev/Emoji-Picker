import './EmojiPicker.css';
import emojis_data from './emojis-data.json';

function EmojiItem({emoji, onClick})
{
	const handleClick = e =>
	{
		e.preventDefault();
		onClick(emoji);
	}
	return (
		<button onClick={handleClick}>
			{ emoji }
		</button>
	)
}

function EmojiCategory(props)
{
	const category_emojis = Object.values(emojis_data[props.category]);
	const emojis = category_emojis.map(emoji =>
	{
		return (<EmojiItem emoji={emoji} key={`emoji_${emoji}`} onClick={props.onEmojiClick}/>)
	});
	return (
		<div className="category">
			<span>{ props.category }</span>
			<div className="emojis_container">
				{emojis}
			</div>
		</div>
	);
}

export default function EmojiPicker({onEmojiClick, show_arrow = true})
{
	const categories = Object.keys(emojis_data).map(category => <EmojiCategory category={category} onEmojiClick={onEmojiClick} key={`category_${category}`}/>);

	return (
		<div className="emoji_picker">
			<div className="picker_container">
				{categories}
			</div>
			{show_arrow && <div className="bottom_arrow" v-if="show_arrow"></div>}
		</div>
	)
}