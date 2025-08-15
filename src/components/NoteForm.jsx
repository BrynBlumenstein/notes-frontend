import { useState } from 'react';

const NoteForm = ({ onCreateNote }) => {
	const [newNote, setNewNote] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();
		await onCreateNote({
			content: newNote,
			important: Math.random() < 0.5
		});

		setNewNote('');
	};

	return (
		<div>
			<h2>create a new note</h2>

			<form onSubmit={handleSubmit}>
				<input
					value={newNote}
					onChange={({ target }) => setNewNote(target.value)}
				/>
				<button type="submit">save</button>
			</form>
		</div>
	);
};

export default NoteForm;
