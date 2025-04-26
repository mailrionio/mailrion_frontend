import Button from '@/components/Button';
import ButtonSpinner from '@/components/ButtonSpiner';
import InputField from '@/components/InputField';
import { useTimer } from '@/components/Timer';
import ToastMessage from '@/components/Toast';
import { useQueryParams } from '@/helpers';
import {
	startPasswordReset,
	verifyOTP,
} from '@/redux/features/userSlice/service';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type props = {
	activePage: (active: string) => void;
};
export function EnterOTP({ activePage }: props) {
	const [otp, setOtp] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const navigate = useNavigate();

	const altEmail = useQueryParams('altEmail');
	const count = useTimer({
		initialCount: 30,
		mode: 'countdown',
		// onComplete: () => alert('Countdown finished!'),
	});

	const handleVerifyOTP = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!otp.trim()) return;
		setIsLoading(true);
		const res = await verifyOTP(otp, altEmail as string);
		setIsLoading(false);
		ToastMessage({ type: 'success', message: 'OTP verified successfully' });
		activePage('create-new-password');
		navigate(`reset-password?next=create-new-password&altEmail=${altEmail}`);
		console.log(res);
	};
	return (
		<div className="input-wrap">
			<p>Enter the OTP sent to your alternate email</p>
			<form onSubmit={handleVerifyOTP}>
				<InputField
					type="text"
					placeholder="
            123456"
					handleChange={(e) => setOtp(e.target.value)}
					name={'otp'}
					classes={''}
					value={otp}
					label={'Enter OTP'}
					required={true}
				/>
				<p
					style={{
						fontSize: '16px',
						marginTop: '10px',
					}}
				>
					Code did not work or didnt come?{' '}
					{count >= 1 ? (
						<b>resend OTP in {count}</b>
					) : (
						<b
							onClick={async () => {
								setIsLoading(true);
								await startPasswordReset(altEmail as string);
								setIsLoading(false);
								ToastMessage({
									type: 'error',
									message: 'OTP sent again! Please also check spam folder',
								});
							}}
							style={{ textDecoration: 'underline', cursor: 'pointer' }}
						>
							resend
						</b>
					)}
				</p>

				{isLoading ? (
					<ButtonSpinner />
				) : (
					<Button className="fullWidth" text="Verify OTP" type="submit" />
				)}
			</form>
		</div>
	);
}
