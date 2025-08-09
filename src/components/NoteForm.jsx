import { useState } from 'react';
import noteService from '../services/notes';

const NoteForm = ({ notes, setNotes }) => {
	const [newNote, setNewNote] = useState('');

	const handleNoteChange = (event) => {
		setNewNote(event.target.value);
	};

	const addNote = (event) => {
		event.preventDefault();
		const noteObject = {
			content: newNote,
			important: Math.random() < 0.5
		};
		noteService.create(noteObject).then((returnedNote) => {
			// setNotes((prevNotes) => [...prevNotes, returnedNote]);
			setNotes(notes.concat(returnedNote));
			setNewNote('');
		});
	};
	return (
		<form onSubmit={addNote}>
			<input value={newNote} onChange={handleNoteChange} />
			<button type="submit">Submit</button>
		</form>
	);
};
export default NoteForm;
