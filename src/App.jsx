import { useState, useEffect } from 'react';
import noteService from './services/notes';
import Filter from './components/Filter';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import Notification from './components/Notification';
import Footer from './components/Footer';

const App = () => {
	const [notes, setNotes] = useState(null);
	const [showAll, setShowAll] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		noteService.getAll().then((initialNotes) => {
			setNotes(initialNotes);
		});
	}, []);

	if (!notes) {
		return null;
	}

	return (
		<>
			<h1>Notes</h1>
			<Notification message={errorMessage} />
			<Filter showAll={showAll} setShowAll={setShowAll} />
			<NoteList
				notes={notes}
				setNotes={setNotes}
				showAll={showAll}
				setErrorMessage={setErrorMessage}
			/>
			<NoteForm notes={notes} setNotes={setNotes} />
			<Footer />
		</>
	);
};

export default App;
