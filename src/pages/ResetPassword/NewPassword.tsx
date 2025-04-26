import Button from '@/components/Button';
import ButtonSpinner from '@/components/ButtonSpiner';
import InputField from '@/components/InputField';
import ToastMessage from '@/components/Toast';
import { useQueryParams } from '@/helpers';
import { resetPassword } from '@/redux/features/userSlice/service';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function ChooseNewPassword() {
	const [newPassword, setNewPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const altEmail = useQueryParams('altEmail');
	const navigate = useNavigate();

	const createNewPassword = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (newPassword.trim() !== confirmPassword.trim()) {
			ToastMessage({ type: 'error', message: 'Passwords do not match' });
			return;
		}

		setIsLoading(true);
		const res = await resetPassword(
			newPassword,
			confirmPassword,
			altEmail as string
		);
		console.log(res);
		if (res?.status === 200) {
			ToastMessage({ type: 'success', message: 'Password reset successful' });
			navigate('/login');
		}
		setIsLoading(false);
	};
	return (
		<div className="input-wrap">
			<p>Enter your new password</p>
			<form onSubmit={createNewPassword}>
				<InputField
					type="password"
					placeholder="Enter your new password"
					handleChange={(e) => setNewPassword(e.target.value)}
					name={'new-password'}
					classes={''}
					value={newPassword}
					label={'New Password'}
					required={true}
				/>
				<InputField
					type="password"
					placeholder="Confirm your new password"
					handleChange={(e) => setConfirmPassword(e.target.value)}
					name={'confirm-password'}
					classes={''}
					value={confirmPassword}
					label={'Confirm Password'}
					required={true}
				/>
				{isLoading ? (
					<ButtonSpinner />
				) : (
					<Button className="fullWidth" text="Reset password" type="submit" />
				)}
			</form>
		</div>
	);
}
