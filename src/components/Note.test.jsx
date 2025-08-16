/* globals test, expect, vi */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Note from './Note';

test('renders content', () => {
	const note = {
		content: 'Component testing is done with react-testing-library',
		important: true
	};

	render(<Note note={note} />);

	const element = screen.getByTestId('note');

    // screen.debug();
	// screen.debug(element);

	expect(element).toHaveTextContent(
		'Component testing is done with react-testing-library'
	);
});

test('clicking the toggle importance button calls event handler once', async () => {
	const note = {
		content: 'Component testing is done with react-testing-library',
		important: true
	};

    const mockHandler = vi.fn();

    render(<Note note={note} toggleImportance={mockHandler} />);

    const user = userEvent.setup();
    const button = screen.getByTestId('importance-button');
    await user.click(button);

    expect(mockHandler.mock.calls).toHaveLength(1);
});
