import { API } from '@/redux/axios/axios';

export const SearchPlaces = async (data: {
	location: string;
	state: string;
	city: string;
}) => {
	try {
		const res = await API.post('/organizations/tools/scrappers', data);
		return res;
	} catch (error) {
		console.log(error);
	}
};
