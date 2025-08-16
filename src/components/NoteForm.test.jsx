/* globals test, vi, expect */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NoteForm from './NoteForm';

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
	const onCreateNote = vi.fn();
	const user = userEvent.setup();

	render(<NoteForm onCreateNote={onCreateNote} />);

	const input = screen.getByPlaceholderText('write note content here');
	const sendButton = screen.getByText('save');

	await user.type(input, 'testing a form...');
	await user.click(sendButton);

	expect(onCreateNote.mock.calls).toHaveLength(1);
	expect(onCreateNote.mock.calls[0][0].content).toBe('testing a form...');
});
