import ButtonSpinner from '@/components/ButtonSpiner';
import DeleteConfirmation from '@/components/DeleteConfirmation';
import GeneralModal from '@/components/GeneralModal';
import ToastMessage from '@/components/Toast';
import { API } from '@/redux/axios/axios';
import {
	DeleteUserAccount,
	UpdateUserAccount,
	UpdateUserAlternateEmail,
} from '@/redux/features/userSlice/service';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import editIcon from '../../../assets/edit.svg';
import Button from '../../../components/Button';
import InputField from '../../../components/InputField';
import { useAppSelector } from '../../../redux/store';
import './user.scss';
const UserSettings = () => {
	const {
		admin: {
			email,
			alternate_email,
			id: adminId,
			name,
			to_be_deleted,
			deletion_date,
		},
	} = useAppSelector((state) => state.user);
	const navigate = useNavigate();
	const [updateUser, setUpdateUser] = useState<{
		name: string;
		email: string;
		alternate_email: string;
		password: string;
		confirmPassword?: string;
	}>({
		name: name || '',
		email: email || '',
		alternate_email: '',
		password: '',
		confirmPassword: '',
	});
	const [editInfo, setEditInfo] = useState<boolean>(false);
	const [togglePassword, setTogglePassword] = useState<boolean>(false);
	const [deleteUser, setDeleteUser] = useState<string>('null');
	const [verifyPass, setVerifyPass] = useState<string>('');
	const [loading, setLoading] = useState<string>('null');
	const { theme } = useAppSelector((state) => state.utils);

	const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUpdateUser({ ...updateUser, [name]: value });
	};

	const handleVerifyIdentity = async (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading('verify');
		if (verifyPass === '') {
			ToastMessage({ type: 'error', message: 'Please enter your password.' });
		} else {
			const res = await API.post('/login', { email, password: verifyPass });
			if (res?.status === 200 || res?.status === 201) {
				setDeleteUser('delete');
				setLoading('null');
			}
		}
	};

	const handleDelUser = async () => {
		setLoading('delete');
		const res = await DeleteUserAccount(adminId);
		if (res?.status === 200 || res?.status === 201) {
			setLoading('null');
			setDeleteUser('null');
			ToastMessage({
				type: 'success',
				message: 'Account deleted successfully.',
			});
			navigate('/login');
		} else {
			setLoading('null');
			setDeleteUser('null');
		}
	};

	const handleUpdateAccount = async (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading('update');
		const { name, email, alternate_email, password, confirmPassword } =
			updateUser;
		if (name === '' || password === '') {
			ToastMessage({
				type: 'error',
				message: 'Please a new name and password',
			});
			setLoading('null');
		} else if (password !== confirmPassword) {
			ToastMessage({ type: 'error', message: 'Passwords do not match.' });
			setLoading('null');
		} else {
			const res = await UpdateUserAccount(adminId, {
				name,
				password,
				password_confirmation: confirmPassword,
			});
			const res2 = await UpdateUserAlternateEmail(email, alternate_email);
			if (res?.status === 200 && res2?.status === 200) {
				ToastMessage({
					type: 'success',
					message: 'Account updated successfully.',
				});
				setEditInfo(false);
				setLoading('null');
			}
			setLoading('null');
		}
		setLoading('null');
	};

	const handleRestoreAccount = async () => {
		const res = await API.post('/creates/users/accounts', {
			email,
			name,
			password: verifyPass,
		});
		if (res?.status === 200 || res?.status === 201) {
			ToastMessage({
				type: 'success',
				message: 'Account restoration scheduled successfully.',
			});
		}
	};

	return (
		<div className="UserSettings padding-round" data-theme={theme}>
			{deleteUser === 'delete' && (
				<DeleteConfirmation
					actionBtnClick={handleDelUser}
					content="Are you sure you want to delete your account? All of your data, including projects, organizations, and account information, will be permanently deleted after 30 days. You can cancel the deletion at any time before then."
					handleClose={() => setDeleteUser('null')}
					isLoading={loading === 'delete' ? true : false}
					title="Delete your account"
					width="500px"
					height="300px"
					deleteBtnText="Schedule deletion in 30 days"
				/>
			)}
			{deleteUser === 'verify-identity' && (
				<GeneralModal
					title="Verify your identity"
					width="500px"
					height="300px"
					handleClose={() => setDeleteUser('null')}
				>
					{loading === 'verify' ? (
						<ButtonSpinner />
					) : (
						<form className="verify-identity" onSubmit={handleVerifyIdentity}>
							<p>
								Enter your password to confirm that you want to delete your
								account.
							</p>
							<InputField
								label="Email"
								placeholder="Enter your email"
								handleChange={() =>
									ToastMessage({
										type: 'error',
										message: 'Email cannot be changed.',
									})
								}
								classes="disabled"
								name={'email'}
								type={'email'}
								value={email}
								required={true}
							/>
							<InputField
								label="Password"
								placeholder="Enter your password"
								handleChange={(e: ChangeEvent<HTMLInputElement>) =>
									setVerifyPass(e.target.value)
								}
								autoComplete="new-password"
								classes=""
								name={'verify-password'}
								type={'password'}
								value={verifyPass}
								required={true}
							/>
							<div className="action-btn space-between">
								<div />
								<div className="btns items-center">
									<Button
										text="Cancel"
										className="outline"
										onClick={() => setDeleteUser('null')}
									/>
									<Button text="Verify" type="submit" />
								</div>
							</div>
						</form>
					)}
				</GeneralModal>
			)}
			<div className="edit-info border-bottom space-between items-center">
				<h3>Edit your information</h3>
				{!editInfo && (
					<div
						className="edit-btn items-center"
						onClick={() => setEditInfo(true)}
					>
						<img src={editIcon} alt="edit" />
						Edit
					</div>
				)}
			</div>
			<form onSubmit={handleUpdateAccount}>
				<InputField
					label="Name"
					placeholder="Enter your name"
					handleChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
					name={'name'}
					classes={editInfo ? '' : 'disabled'}
					disabled={!editInfo}
					value={editInfo ? updateUser.name : name}
					required={false}
				/>
				<InputField
					label="Email"
					placeholder="Enter your email"
					handleChange={() =>
						ToastMessage({
							type: 'error',
							message: 'You cannot change your email here, contact support',
						})
					}
					name={'email'}
					classes={editInfo ? '' : 'disabled'}
					disabled={!editInfo}
					value={editInfo ? updateUser.email : email}
					required={false}
				/>
				<InputField
					label="Alternate email"
					placeholder="Enter your new alternate email"
					handleChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
					name={'alternate_email'}
					classes={editInfo ? '' : 'disabled'}
					disabled={!editInfo}
					value={
						editInfo ? updateUser.alternate_email : (alternate_email as string)
					}
					required={false}
				/>
				<InputField
					label="Password"
					placeholder="Enter new password"
					handleChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
					name={'password'}
					classes={editInfo ? '' : 'disabled'}
					disabled={!editInfo}
					type={togglePassword ? 'text' : 'password'}
					value={editInfo ? updateUser.password : '*********'}
					required={false}
					togglePassword={() => setTogglePassword(!togglePassword)}
				/>
				<InputField
					label="Confirm password"
					placeholder="confirm password"
					handleChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
					name={'confirmPassword'}
					classes={editInfo ? '' : 'disabled'}
					disabled={!editInfo}
					type={togglePassword ? 'text' : 'password'}
					value={
						editInfo ? (updateUser.confirmPassword as string) : '*********'
					}
					required={false}
				/>
				{editInfo && (
					<div className="action-btn space-between">
						<div />
						<div className="btns items-center">
							{loading === 'update' ? (
								<ButtonSpinner />
							) : (
								<>
									{' '}
									<Button
										text="Cancel"
										className="outline"
										onClick={() => setEditInfo(false)}
									/>
									<Button text="Save" type="submit" />
								</>
							)}
						</div>
					</div>
				)}
			</form>
			{to_be_deleted ? (
				<div className="mt-2">
					<p className="text-center">
						Your account is scheduled for deletion on{' '}
						{calculateThirtyDaysLater(deletion_date as string)}
					</p>
					<Button
						text="Cancel deletion"
						className="outline"
						onClick={handleRestoreAccount}
					/>
				</div>
			) : (
				<button
					className="delete-btn"
					onClick={() => setDeleteUser('verify-identity')}
				>
					Delete account
				</button>
			)}
		</div>
	);
};

const calculateThirtyDaysLater = (timestamp: string): string => {
	const originalDate = new Date(timestamp);
	const thirtyDaysLater = new Date(
		originalDate.getTime() + 30 * 24 * 60 * 60 * 1000
	);

	// Format the date as a string in English format
	const formattedDate = thirtyDaysLater.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	return formattedDate;
};

export default UserSettings;
