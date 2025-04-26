import Toast from '@/components/Toast';
import axios, { AxiosError } from 'axios';
import { setAdmin, setSubAccountToken } from '../features/userSlice';
import { dispatch } from '../store';
import { RefreshToken } from './refreshToken';

const headers = {
	Authorization: null,
	Accept: 'application/json',
	'Content-Type': 'application/json',
	'Access-Control-Allow-Origin': '*',
};
let retryCount = 0;
// const localAPI = "http://31.220.77.124/api/v1/";
const liveAPI = 'https://api.mailrion.net/api/v1/';
axios.defaults.baseURL = liveAPI;
const axiosInstance = axios.create({
	headers,
	timeout: 180000,
	withCredentials: false,
});
const source = axios.CancelToken.source();

axiosInstance.interceptors.request.use(
	async (config) => {
		config.cancelToken = source.token;

		const adminToken =
			sessionStorage.getItem('mailrionAdminToken') ||
			localStorage.getItem('mailrionAdminToken');
		const subAccountToken =
			sessionStorage.getItem('mailrionSubAccountToken') ||
			localStorage.getItem('mailrionSubAccountToken');
		const token = adminToken || subAccountToken;

		// Exclude token for login endpoint
		if (config.url === '/login') {
			return config;
		}

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		} else {
			const rememberMe = localStorage.getItem('rememberMe');
			if (rememberMe === 'true') {
				const adminToken = localStorage.getItem('mailrionAdminToken');
				const subAccountToken = localStorage.getItem('mailrionSubAccountToken');
				const Token = adminToken || subAccountToken;
				if (adminToken) {
					dispatch(setAdmin(adminToken as string));
				}
				if (subAccountToken) {
					dispatch(setSubAccountToken(subAccountToken as string));
				}
				config.headers.Authorization = `Bearer ${Token}`;
			}
		}

		if (typeof window !== 'undefined') {
			const adminToken =
				sessionStorage.getItem('mailrionAdminToken') ||
				localStorage.getItem('mailrionAdminToken');
			const subAccountToken =
				sessionStorage.getItem('mailrionSubAccountToken') ||
				localStorage.getItem('mailrionSubAccountToken');
			if (token) {
				config.data = {
					...config.data,
					token: token,
				};
			} else {
				config.data = {
					...config.data,
					token: adminToken || subAccountToken,
				};
			}
		}
		return config;
	},
	(err: AxiosError) => Promise.reject(err)
);

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error: AxiosError) {
		if (error.code === 'ERR_NETWORK') {
			Toast({
				type: 'error',
				message:
					"You're not connected, check your network cables and try again.",
			});
		}
		if (error?.response?.status === 401 && retryCount < 1) {
			retryCount++;
			const data = await RefreshToken();

			if (typeof window !== 'undefined') {
				const rememberMe = localStorage.getItem('rememberMe');
				if (rememberMe === 'true') {
					localStorage.setItem('mailrionToken', data.accessToken);
					localStorage.setItem('mailrionRefreshToken', data.refresh_token);
				} else {
					sessionStorage.setItem('mailrionToken', data.accessToken);
				}
				axios.defaults.headers.common['Authorization'] =
					'Bearer ' + data.accessToken;
			}
		} else if (error?.response?.status === 500) {
			// return window.location.replace("/bad-protocol");
			source.cancel('Internal Server Error. Please try again later.');
			// Toast({
			//   type: "error",
			//   message:
			//     "Internal Server Error. Our technical team is looking into that.",
			// });
		} else if (error?.code === 'ECONNABORTED') {
			source.cancel(
				'Request Timeout. Please check your internet connection and try again.'
			);
			Toast({
				type: 'error',
				message:
					'Request Timeout. Please check your internet connection and try again.',
			});
		} else if (error?.response?.status === 403) {
			source.cancel('You are not authorized to access this resource.');
			Toast({
				type: 'error',
				message: 'You are not authorized to access this resource.',
			});
		} else if (error?.response?.status === 422) {
			source.cancel(
				'Unprocessable Entity. Please check your input and try again.'
			);
			// Toast({
			//   type: "error",
			//   message: "Unprocessable Entity. Please check your input and try again.",
			// });
		} else if (error?.code === 'ECONNREFUSED') {
			source.cancel(
				'Connection Refused. Please check your internet connection and try again.'
			);
			Toast({
				type: 'error',
				message:
					'Connection Refused. Please check your internet connection and try again.',
			});
		} else if (error?.code === 'ERR_CONNECTION_CLOSED') {
			source.cancel(
				'Connection Refused. Please check your internet connection and try again.'
			);
			Toast({
				type: 'error',
				message:
					"Connection Refused. Your request wasn't completed, try again.",
			});
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;

export const API = axiosInstance;
