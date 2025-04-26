import { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import coverPhoto from '../../assets/cover.png';
import Button from '../../components/Button';
import ButtonSpinner from '../../components/ButtonSpiner';
import InputField from '../../components/InputField';
import Toast from '../../components/Toast';
import HeadingEffect from '../../components/TransitionEffects/Heading';
import usePageMetadata from '../../components/UsePageMetadata';
import { LoginAdmin } from '../../redux/features/userSlice/service';
import { useAppSelector } from '../../redux/store';
import './login.scss';
interface loginType {
	email: string;
	password: string;
}

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [checkbox, setCheckbox] = useState<boolean>(false);
	const { isLoading } = useAppSelector((state) => state.user);
	const handleCheckboxChange = () => {
		setCheckbox((prev) => !prev);
		localStorage.setItem('rememberMe', JSON.stringify(!checkbox));
	};
	const navigate = useNavigate();
	usePageMetadata({
		title: 'Welcome back, Login to your account',
		description: 'let’s level up your organization, together',
	});
	const [inputFields, setInputFields] = useState<loginType>({
		email: '',
		password: '',
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInputFields((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();

		let valid = false;
		if (!inputFields.email.trim()) {
			Toast({ type: 'error', message: 'Please enter your email' });
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
		} else {
			valid = true;
		}
		if (valid) {
			const fields = {
				email: inputFields.email,
				password: inputFields.password,
			};
			const res = await LoginAdmin(fields);
			if (res.status === 200) {
				setInputFields({
					email: '',
					password: '',
				});

				if (localStorage.getItem('redirect')) {
					navigate(localStorage.getItem('redirect_link') as string);
				} else {
					navigate('/organizations');
				}
			}
		}
	};
	return (
		<div className="login-container">
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
						<p>Welcome back 👋</p>
						<HeadingEffect>
							<h2>Let’s level up your organization, together</h2>
						</HeadingEffect>
					</div>
				</div>
				<div className="inputWrapper">
					<form onSubmit={handleSubmit}>
						<InputField
							handleChange={handleChange}
							name={'email'}
							classes={''}
							type="email"
							value={inputFields.email}
							placeholder={'Enter your email'}
							disabled={isLoading}
							label={'Email'}
							required={true}
							togglePassword={() => setShowPassword(!showPassword)}
						/>
						<InputField
							handleChange={handleChange}
							name={'password'}
							classes={''}
							type={showPassword ? 'text' : 'password'}
							value={inputFields.password}
							disabled={isLoading}
							placeholder={'Enter your password'}
							label={'Password'}
							required={true}
							togglePassword={() => setShowPassword(!showPassword)}
						/>
						<div className="remember-forgot">
							<div className="checkbox">
								<input
									type="checkbox"
									checked={checkbox}
									onChange={handleCheckboxChange}
								/>
								<label>Remember me</label>
							</div>
							<div className="forgotPass">
								Forgot Password? <Link to="/reset-password">Reset</Link>
							</div>
						</div>
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
								<Button text={'Login'} className="fullWidth" type="submit" />
							)}
						</div>
					</form>
					<div className="registered">
						Don't have an account? <Link to="/signup">create account</Link>
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

export default Login;
