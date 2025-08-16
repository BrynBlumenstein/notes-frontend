/* globals describe, beforeEach, test, expect */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Togglable from './Togglable';

describe('<Togglable />', () => {
	beforeEach(() => {
		render(
			<Togglable>
				<div>togglable content</div>
			</Togglable>
		);
	});

	test('renders its children', async () => {
		await screen.findAllByText('togglable content');
	});

	test('at start the children are not displayed', () => {
		const element = screen.getByTestId('togglable-content');
		expect(element).toHaveStyle('display: none');
	});

	test('after clicking the show button, the children are displayed', async () => {
		const user = userEvent.setup();
		const button = screen.getByTestId('show-button');
		await user.click(button);

		const element = screen.getByTestId('togglable-content');
		expect(element).not.toHaveStyle('display: none');
	});

    test('toggled content can be hidden', async () => {
        const user = userEvent.setup();
        const showButton = screen.getByTestId('show-button');
		await user.click(showButton);
        const hideButton = screen.getByTestId('hide-button');
        await user.click(hideButton);

        const element = screen.getByTestId('togglable-content');
        expect(element).toHaveStyle('display: none');
    });
});
