import { useState } from 'react';

const LoginForm = ({ onLogin }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();
		await onLogin(username, password);

		setUsername('');
		setPassword('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="Username">username</label>
				<input
					type="text"
					value={username}
					name="Username"
					onChange={({ target }) => {
						setUsername(target.value);
					}}
				/>
			</div>
			<div>
				<label htmlFor="Password">password</label>
				<input
					type="text"
					value={password}
					name="Password"
					onChange={({ target }) => {
						setPassword(target.value);
					}}
				/>
			</div>
			<button type="submit">login</button>
		</form>
	);
};

export default LoginForm;
