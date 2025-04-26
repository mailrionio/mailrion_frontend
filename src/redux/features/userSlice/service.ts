/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	setAdmin,
	setAdminToken,
	setIsloading,
	setSubAccount,
	setSubAccountToken,
} from '.';
import Toast from '../../../components/Toast';
import { ILogin, IRegister, IuserType } from '../../../config';
import { API } from '../../axios/axios';
import { dispatch } from '../../store';

export const SignupUser = async (data: IRegister) => {
	dispatch(setIsloading(true));
	try {
		const response = await API.post('/creates/users/accounts', data);
		dispatch(setIsloading(false));
		Toast({ type: 'success', message: 'Accounted created successfully' });
		return response;
	} catch (error: any) {
		dispatch(setIsloading(false));
		console.log(error);
		if (error.response.data.message.email[0]) {
			Toast({ type: 'error', message: error.response.data.message.email[0] });
		} else if (error.response.data.message.password[0]) {
			Toast({
				type: 'error',
				message: error.response.data.message.password[0],
			});
		} else if (error.response.data.message.name[0]) {
			Toast({ type: 'error', message: error.response.data.message.name[0] });
		} else {
			Toast({ type: 'error', message: error.response.data.message });
		}
		return error;
	}
};

export const LoginAdmin = async (data: ILogin) => {
	dispatch(setIsloading(true));
	try {
		const response = await API.post('/login', data);
		dispatch(setIsloading(false));
		console.log(response);
		const userRes: IuserType = {
			id: response.data.user.id,
			name: response.data.user.attributes.name,
			email: response.data.user.attributes.email,
			alternate_email: response.data.user.attributes.alternate_email,
			to_be_deleted: response.data.user.attributes.marked_for_delete
				? true
				: false,
			deletion_date: response.data.user.attributes.marked_for_delete,
		};
		const rememberMe = localStorage.getItem('rememberMe');

		if (rememberMe === 'true') {
			// sessionStorage.setItem("mailrionAdminToken", response.data.accessToken);
			localStorage.setItem('mailrionAdminToken', response.data.accessToken);
			localStorage.setItem('admin', JSON.stringify(userRes));
		} else {
			sessionStorage.setItem('mailrionAdminToken', response.data.accessToken);
			sessionStorage.setItem('admin', JSON.stringify(userRes));
		}
		dispatch(setAdminToken(response.data.accessToken));
		dispatch(setAdmin(userRes));
		Toast({ type: 'success', message: 'Login successfully, welcome aboard' });

		return response;
	} catch (error: any) {
		dispatch(setIsloading(false));
		console.log(error);
		if (
			error.response?.data?.message ===
			'Call to a member function createToken() on null'
		) {
			Toast({
				type: 'error',
				message: 'No user with this account found, reload and try again',
			});
		} else if (error.response && error.response?.data.message) {
			Toast({ type: 'error', message: error.response.data.message });
		} else if (error.response?.data.email[0]) {
			Toast({ type: 'error', message: error.response.data.email[0] });
		} else if (error.response?.data.password[0]) {
			Toast({
				type: 'error',
				message: error.response?.data.password[0],
			});
		} else {
			Toast({ type: 'error', message: 'An error occurred, reload the page' });
		}
		return error;
	}
};

export const LoginSubUser = async (data: ILogin) => {
	dispatch(setIsloading(true));
	try {
		const response = await API.post('/login', data);
		dispatch(setIsloading(false));
		const userRes: IuserType = {
			id: response.data.user.id,
			name: response.data.user.attributes.name,
			email: response.data.user.attributes.email,
			organization: {
				id: response.data.organization[0].id,
				...response.data.organization[0].attributes,
			},
		};
		const rememberMe = localStorage.getItem('rememberMe');
		if (rememberMe) {
			// sessionStorage.setItem(
			//   "mailrionSubAccountToken",
			//   response.data.accessToken
			// );
			localStorage.setItem(
				'mailrionSubAccountToken',
				response.data.accessToken
			);
			localStorage.setItem('subAccount', JSON.stringify(userRes));
		} else {
			sessionStorage.setItem(
				'mailrionSubAccountToken',
				response.data.accessToken
			);
			sessionStorage.setItem('subAccount', JSON.stringify(userRes));
		}
		dispatch(setSubAccountToken(response.data.accessToken));
		dispatch(setSubAccount(userRes));
		Toast({ type: 'success', message: 'Login successfully, welcome aboard' });
		return response;
	} catch (error: any) {
		dispatch(setIsloading(false));
		console.log(error);
		if (error.code === 'ERR_NETWORK') {
			Toast({ type: 'error', message: 'Network Error' });
		} else if (error.response && error.response.data.message) {
			Toast({ type: 'error', message: error.response.data.message });
		} else if (error.response.data.email[0]) {
			Toast({ type: 'error', message: error.response.data.email[0] });
		} else if (error.response.data.password[0]) {
			Toast({
				type: 'error',
				message: error.response.data.password[0],
			});
		} else {
			Toast({ type: 'error', message: 'An error occurred' });
		}
		return error;
	}
};

export const AIGenerator = async (prompt: string) => {
	try {
		const res = await API.post('/users/ai/generators', {
			prompt: prompt,
			// _token: data.token,
		});
		// console.log(res);

		return res;
	} catch (error) {
		console.log(error);
		return error;
	}
};
export const LogoutUser = () => {
	dispatch(setAdminToken(''));
	dispatch(setSubAccountToken(''));
	dispatch(setAdmin({}));
	dispatch(setSubAccount({}));
	localStorage.clear();
	sessionStorage.clear();
};

export const startPasswordReset = async (email: any) => {
	try {
		const res = await API.post('/initiates/password/reset', { email });
		return res;
	} catch (error) {
		console.log(error);
		// return error;
	}
};
export const verifyOTP = async (code: string, email: string) => {
	try {
		const res = await API.post('/verifies/password/codes', { code, email });
		return res;
	} catch (error: any) {
		console.log(error);
		Toast({
			type: 'error',
			message: 'Code did not match, try again or resend code.',
		});
		// return error;
	}
};

export const resetPassword = async (
	newPassword: string,
	confirmPassword: string,
	alternate_email: string
) => {
	try {
		const res = await API.post('resets/password', {
			password: newPassword,
			password_confirmation: confirmPassword,
			email: alternate_email,
		});
		return res;
	} catch (error) {
		console.log(error);

		// return error;
	}
};

export const DeleteUserAccount = async (id: any) => {
	try {
		const res = await API.delete(`/deletes/users/accounts/${id}`);
		return res;
	} catch (error: any) {
		console.log(error);
		Toast({ type: 'error', message: error.response.data.message });
		// return error;
	}
};

export const UpdateUserAccount = async (user_id: any, data: any) => {
	try {
		const res = await API.post(`accounts/settings/${user_id}/update`, data);
		return res;
	} catch (error: any) {
		console.log(error);
		Toast({ type: 'error', message: error.response.data.message });
		// return error;
	}
};

export const UpdateUserAlternateEmail = async (
	primaryEmail: string,
	alternate_email: string
) => {
	try {
		const res = await API.post(`/updates/alternate/email`, {
			email: primaryEmail,
			alternate_email: alternate_email,
		});
		return res;
	} catch (error: any) {
		Toast({ type: 'error', message: error.response.data.message });
		// return error;
	}
};
