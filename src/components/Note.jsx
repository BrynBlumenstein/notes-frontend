const Note = ({ note, toggleImportance, removeNote }) => {
	const label = note.important ? 'make not important' : 'make important';

	return (
		<li className='note' data-testid="note">
			{note.content}
			<button onClick={toggleImportance} data-testid="importance-button">{label}</button>
			<button onClick={removeNote}>remove note</button>
		</li>
	);
};

export default Note;
