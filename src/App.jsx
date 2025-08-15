import { useState, useEffect } from 'react';
import noteService from './services/notes';
import loginService from './services/login';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
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

	const onCreateNote = async (noteObject) => {
		const returnedNote = await noteService.create(noteObject);
		setNotes((prevNotes) => [...prevNotes, returnedNote]);
	};

	const onLogin = async (username, password) => {
		try {
			const user = await loginService.login({ username, password });

			window.localStorage.setItem(
				'loggedNoteappUser',
				JSON.stringify(user)
			);

			noteService.setToken(user.token);
			setUser(user);
		} catch {
			setErrorMessage('Wrong credentials');
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

	const onToggleFilter = () => {
		setShowAll((prev) => !prev);
	};

	if (!notes) {
		return null;
	}

	return (
		<>
			<h1>Notes</h1>
			<Notification message={errorMessage} />
			{user === null ? (
				<Togglable buttonLabel="login">
					<LoginForm onLogin={onLogin} />
				</Togglable>
			) : (
				<div>
					<p>{user.name} logged-in</p>
					<Togglable buttonLabel="new note">
						<NoteForm onCreateNote={onCreateNote} />
					</Togglable>
				</div>
			)}
			<h2>Notes</h2>
			<Filter
				onToggleFilter={onToggleFilter}
				label={`show ${showAll ? 'important' : 'all'}`}
			/>
			{/* TODO: refactor NoteList to match smart parent / dumb child pattern */}
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
