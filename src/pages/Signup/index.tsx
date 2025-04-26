import { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import coverPhoto from '../../assets/cover.png';
import Button from '../../components/Button';
import ButtonSpinner from '../../components/ButtonSpiner';
import InputField from '../../components/InputField';
import Toast from '../../components/Toast';
import HeadingEffect from '../../components/TransitionEffects/Heading';
import usePageMetadata from '../../components/UsePageMetadata';
import { IRegister } from '../../config';
import { SignupUser } from '../../redux/features/userSlice/service';
import { useAppSelector } from '../../redux/store';
import './signup.scss';

const personalEmailRegex =
	/@(gmail|outlook|hotmail|live|yahoo|icloud|aol)\.com$/i;
const businessEmailRegex = /@.*\.(com|net|org|co\.uk|de|fr|jp)$/i;

function categorizeEmail(email: string) {
	if (personalEmailRegex.test(email)) {
		return 'Personal Email';
	} else if (businessEmailRegex.test(email)) {
		return 'Business Email';
	} else {
		return 'Unknown Email Type';
	}
}

const Signup = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [inputFields, setInputFields] = useState<IRegister>({
		name: '',
		email: '',
		alternate_email: '',
		password: '',
		confirmPassword: '',
	});

	const { isLoading } = useAppSelector((state) => state.user);

	usePageMetadata({
		title: 'Signup | Mailrion',
		description: 'Create a new account, to get started',
	});

	const [errors, setErrors] = useState<IRegister>({
		name: '',
		email: '',
		alternate_email: '',
		password: '',
		confirmPassword: '',
	});

	const navigate = useNavigate();

	const validateForm = () => {
		const temp = { ...errors };
		temp.name = !inputFields.name.trim()
			? 'Please enter your full name'
			: inputFields.name.length < 5
			? 'Full name must be at least 5 characters long'
			: '';
		temp.email = !inputFields.email.trim()
			? 'Please enter your primary email'
			: categorizeEmail(inputFields.email) === 'Personal Email'
			? 'You can only use a business email here'
			: '';
		temp.alternate_email = !inputFields.alternate_email.trim()
			? 'Please enter your alternate email'
			: '';
		temp.password = !inputFields.password.trim()
			? 'Please enter your password'
			: inputFields.password.length < 8
			? 'Password must be at least 8 characters long'
			: !/(?=.*[A-Z])/.test(inputFields.password)
			? 'Password must contain at least one uppercase letter'
			: '';
		temp.confirmPassword = !inputFields.confirmPassword
			? 'Please confirm your password'
			: inputFields.confirmPassword !== inputFields.password
			? 'Password does not match'
			: '';

		setErrors(temp);

		// Check if there are no error messages and all fields are valid
		const isValid =
			Object.values(temp).every((x) => x === '') &&
			inputFields.password !== '' &&
			inputFields.confirmPassword !== '' &&
			inputFields.confirmPassword === inputFields.password;

		return isValid;
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputFields({
			...inputFields,
			[e.target.name]: e.target.value,
		});
		validateForm();
	};

	const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		let valid = false;
		if (!inputFields.name.trim()) {
			Toast({ type: 'error', message: 'Please enter your full name' });
			valid = false;
			return;
		} else if (inputFields.name.length < 5) {
			Toast({
				type: 'error',
				message: 'Full name must be at least 5 characters long',
			});
			valid = false;
			return;
		} else if (!inputFields.email.trim()) {
			Toast({ type: 'error', message: 'Please enter your primary email' });
			valid = false;
			return;
		} else if (categorizeEmail(inputFields.email) === 'Personal Email') {
			Toast({ type: 'error', message: 'You can only use your business here' });
			valid = false;
			return;
		} else if (!inputFields.alternate_email.trim()) {
			Toast({ type: 'error', message: 'Please enter your alternate email' });
			valid = false;
			return;
		} else if (!inputFields.password.trim()) {
			Toast({ type: 'error', message: 'Please enter your password' });
			valid = false;
			return;
		} else if (inputFields.password.length < 8) {
			Toast({
				type: 'error',
				message: 'Password must be at least 8 characters long',
			});
			valid = false;
			return;
		} else if (!/(?=.*[A-Z])/.test(inputFields.password)) {
			Toast({
				type: 'error',
				message: 'Password must contain at least one uppercase letter',
			});
			valid = false;
			return;
		} else if (!inputFields.confirmPassword) {
			Toast({ type: 'error', message: 'Please confirm your password' });
			valid = false;
			return;
		} else if (inputFields.confirmPassword !== inputFields.password) {
			Toast({ type: 'error', message: 'Password does not match' });
			valid = false;
			return;
		} else {
			valid = true;
		}
		if (valid) {
			const fields = {
				name: inputFields.name,
				email: inputFields.email,
				alternate_email: inputFields.alternate_email,
				password: inputFields.password,
			};
			const res = await SignupUser(fields);
			if (res.status === 201 && res.data) {
				setInputFields({
					name: '',
					email: '',
					alternate_email: '',
					password: '',
					confirmPassword: '',
				});
				setTimeout(() => {
					navigate('/login');
				}, 3000);
			}
		}
	};
	return (
		<div className="signup-container">
			<div className="left-section">
				<div className="cover-photo">
					<img src={coverPhoto} alt="cover" />
				</div>
			</div>
			<div className="inputSection">
				<div className="title-section">
					<Link to="/" className="logo">
						<img src="/Mailrion/Logo-main.png" alt="logo" />
					</Link>
					<div className="txt-sample">
						<HeadingEffect>
							<h2>Let’s level up your organization, together</h2>
						</HeadingEffect>
						<p>Roll the Carpet 👋</p>
					</div>
				</div>
				<div className="inputWrapper">
					<form onSubmit={handleSubmit}>
						<InputField
							handleChange={handleChange}
							name={'name'}
							classes={''}
							type="text"
							value={inputFields.name}
							placeholder={'Enter full name'}
							label={'Name'}
							disabled={isLoading}
							required={true}
						/>
						<InputField
							handleChange={handleChange}
							name={'email'}
							classes={''}
							disabled={isLoading}
							type="email"
							value={inputFields.email}
							placeholder={'Enter your primary email'}
							label={'Primary Email'}
							required={true}
						/>
						<InputField
							handleChange={handleChange}
							name={'alternate_email'}
							classes={''}
							disabled={isLoading}
							type="email"
							value={inputFields.alternate_email as string}
							placeholder={'Enter your alternate email'}
							label={'Alternate Email'}
							required={true}
						/>
						<InputField
							handleChange={handleChange}
							name={'password'}
							classes={''}
							type={showPassword ? 'text' : 'password'}
							value={inputFields.password}
							placeholder={'Enter your password'}
							label={'Password'}
							required={true}
							disabled={isLoading}
							togglePassword={() => setShowPassword(!showPassword)}
						/>
						<InputField
							handleChange={handleChange}
							name={'confirmPassword'}
							classes={''}
							type={showPassword ? 'text' : 'password'}
							value={inputFields.confirmPassword || ''}
							placeholder={'Confirm your password'}
							label={'Confirm Password'}
							disabled={isLoading}
							required={true}
							togglePassword={() => setShowPassword(!showPassword)}
						/>

						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							{isLoading ? (
								<ButtonSpinner />
							) : (
								<Button
									text={'Create Account'}
									className="fullWidth"
									type="submit"
								/>
							)}
						</div>
					</form>
					<div className="registered">
						Already have an account? <Link to="/login">Login</Link>
					</div>
				</div>
				<p className="terms">
					By continuing, you agree to our <a>Terms & Conditions.</a> Please read
					our <a>Privacy Policy</a> to learn more about the way we use your
					information.
				</p>
			</div>
		</div>
	);
};

export default Signup;
