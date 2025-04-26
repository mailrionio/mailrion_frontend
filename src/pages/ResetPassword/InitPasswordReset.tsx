import Button from '@/components/Button';
import ButtonSpinner from '@/components/ButtonSpiner';
import InputField from '@/components/InputField';
import ToastMessage from '@/components/Toast';
import usePageMetadata from '@/components/UsePageMetadata';
import { startPasswordReset } from '@/redux/features/userSlice/service';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type props = {
	activePage: (active: string) => void;
};
export function InitPasswordReset({ activePage }: props) {
	usePageMetadata({
		title: 'Reset Password',
		description: 'Reset your password',
	});
	const navigate = useNavigate();
	const [initEmail, setInitEmail] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const initPassReset = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		if (!initEmail.trim()) return;
		setIsLoading(true);
		const res = await startPasswordReset(initEmail);
		setIsLoading(false);
		console.log(res);
		ToastMessage({ type: 'success', message: 'We have sent you a reset link' });
		activePage('verify-otp'); // Change the active tab to verify-otp page when the email is sent successfully.
		navigate(`/reset-password?next=verify-otp&altEmail=${initEmail}`);
	};
	return (
		<div>
			<div className="input-wrap">
				<p>Enter your alternate email to begin password reset procedure.</p>
				<form onSubmit={initPassReset}>
					<InputField
						type="email"
						placeholder="example@mailrion.io"
						handleChange={(e) => setInitEmail(e.target.value)}
						name={'initEmail'}
						classes={''}
						value={initEmail}
						label={'Alternate Email'}
						required={true}
					/>
					{isLoading ? (
						<ButtonSpinner />
					) : (
						<Button
							className="fullWidth"
							text="Send a reset link"
							type="submit"
						/>
					)}
				</form>
			</div>
		</div>
	);
}
