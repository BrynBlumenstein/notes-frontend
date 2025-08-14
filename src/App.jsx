import { useState, useEffect } from 'react';
import noteService from './services/notes';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import NoteForm from './components/NoteForm';
import Filter from './components/Filter';
import NoteList from './components/NoteList';
import Footer from './components/Footer';

const App = () => {
	const [notes, setNotes] = useState(null);
	const [showAll, setShowAll] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);
	const [user, setUser] = useState(null);

	useEffect(() => {
		noteService.getAll().then((initialNotes) => {
			setNotes(initialNotes);
		});
	}, []);

	useEffect(() => {
		const loggedUserJSON = localStorage.getItem('loggedNoteappUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			noteService.setToken(user.token);
		}
	}, []);

	if (!notes) {
		return null;
	}

	return (
		<>
			<h1>Notes</h1>
			<Notification message={errorMessage} />
			{user === null ? (
				<LoginForm
					setErrorMessage={setErrorMessage}
					setUser={setUser}
				/>
			) : (
				<div>
					<p>{user.name} logged-in</p>
					<NoteForm notes={notes} setNotes={setNotes} />
				</div>
			)}
			<h2>Notes</h2>
			<Filter showAll={showAll} setShowAll={setShowAll} />
			<NoteList
				notes={notes}
				setNotes={setNotes}
				showAll={showAll}
				setErrorMessage={setErrorMessage}
			/>
			<Footer />
		</>
	);
};

export default App;
