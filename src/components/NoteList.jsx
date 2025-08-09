import Note from './Note';
import noteService from '../services/notes';

const NoteList = ({ notes, setNotes, showAll, setErrorMessage }) => {
	const notesToShow = showAll
		? notes
		: notes.filter((note) => note.important);

	const toggleImportanceOf = (note) => {
		const changedNote = { ...note, important: !note.important };

		noteService
			.update(note.id, changedNote)
			.then((returnedNote) =>
				setNotes(
					notes.map((n) => (n.id === note.id ? returnedNote : n))
				)
			)
			.catch(() => {
				setErrorMessage(
					`the note '${note.content}' was already removed from server`
				);
				setTimeout(() => {
					setErrorMessage(null);
				}, 5000);
				setNotes(notes.filter((n) => n.id !== note.id));
			});
	};

	const remove = (note) =>
		noteService
			.remove(note.id)
			.catch(() => {
				setErrorMessage(
					`the note '${note.content}' was already removed from server`
				);
				setTimeout(() => {
					setErrorMessage(null);
				}, 5000);
			})
			.finally(() => setNotes(notes.filter((n) => n.id !== note.id)));

	return (
		<ul>
			{notesToShow.map((note) => (
				<Note
					key={note.id}
					note={note}
					toggleImportance={() => toggleImportanceOf(note)}
					removeNote={() => remove(note)}
				/>
			))}
		</ul>
	);
};

export default NoteList;
