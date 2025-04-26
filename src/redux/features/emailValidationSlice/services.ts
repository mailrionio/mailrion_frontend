import { IEmailResultsType } from '@/config';
import { API } from '@/redux/axios/axios';
import { dispatch } from '@/redux/store';
import axios from 'axios';
import { setEmailDetails, setIsValidationLoading } from '.';

export const ValidateSingleEmail = async (email: string) => {
	try {
		const res = await API.post('/organizations/tools/emails/verifiers', {
			email: email,
		});
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const ValidateMultipleEmails = async (file: FormData) => {
	try {
		const res = await axios.post('/organizations/tools/emails/cleaners', file, {
			headers: {
				'Content-Type': 'multipart/form-data',
				authorization:
					'Bearer ' + localStorage.getItem('adminToken') ||
					sessionStorage.getItem('adminToken') ||
					'',
			},
		});
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const GetAllValidatedEmails = async () => {
	try {
		const res = await API.get('/excel/clouds/uploads');
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const GetSingleValidatedEmail = async (id: string) => {
	dispatch(setIsValidationLoading(true));
	try {
		const res = await API.get(`/excel/clouds/uploads/${id}`);
		console.log(res);
		dispatch(setEmailDetails(res.data.message as IEmailResultsType));
		dispatch(setIsValidationLoading(false));
		return res;
	} catch (error) {
		console.log(error);
		dispatch(setIsValidationLoading(false));
	}
};

export const DeleteValidatedEmail = async (id: string) => {
	try {
		const res = await API.delete(`/excel/clouds/uploads/trashes/${id}`);
		return res;
	} catch (error) {
		console.log(error);
	}
};
