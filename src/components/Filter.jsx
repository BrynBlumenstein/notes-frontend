const Filter = ({ showAll, setShowAll }) => (
	<button onClick={() => setShowAll(!showAll)}>
		show {showAll ? 'important' : 'all'}
	</button>
);

export default Filter;
