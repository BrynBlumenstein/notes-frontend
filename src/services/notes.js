import axios from 'axios';
const baseUrl = '/api/notes';

const extractData = (request) => request.then((response) => response.data);

const getAll = () => extractData(axios.get(baseUrl));

const create = (newObject) => extractData(axios.post(baseUrl, newObject));

const update = (id, newObject) =>
	extractData(axios.put(`${baseUrl}/${id}`, newObject));

const remove = (id) => extractData(axios.delete(`${baseUrl}/${id}`))

export default { getAll, create, update, remove };
