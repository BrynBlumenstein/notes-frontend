import axios from 'axios';
const baseUrl = '/api/notes';

let token = null;

const setToken = (newToken) => {
	token = `Bearer ${newToken}`;
};

const extractData = async (request) => {
	const response = await request;
	return response.data;
};

const getAll = async () => await extractData(axios.get(baseUrl));

const create = async (newObject) => {
	const config = {
		headers: { Authorization: token }
	};

	const data = await extractData(axios.post(baseUrl, newObject, config));
	return data;
};

const update = async (id, newObject) =>
	await extractData(axios.put(`${baseUrl}/${id}`, newObject));

const remove = async (id) =>
	await extractData(axios.delete(`${baseUrl}/${id}`));

export default { getAll, create, update, remove, setToken };
