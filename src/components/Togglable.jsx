import { useState, useImperativeHandle } from 'react';

const Togglable = ({ buttonLabel, ref, children }) => {
	const [visible, setVisible] = useState(false);

	const hideWhenVisible = {
		display: visible ? 'none' : ''
	};

	const showWhenVisible = {
		display: visible ? '' : 'none'
	};

	const toggleVisiblity = () => {
		setVisible(!visible);
	};

	useImperativeHandle(ref, () => ({
		toggleVisiblity
	}));

	return (
		<div>
			<div style={hideWhenVisible}>
				<button onClick={toggleVisiblity} data-testid="show-button">{buttonLabel}</button>
			</div>
			<div style={showWhenVisible} data-testid="togglable-content">
				{children}
				<button onClick={toggleVisiblity} data-testid="hide-button">cancel</button>
			</div>
		</div>
	);
};

export default Togglable;
