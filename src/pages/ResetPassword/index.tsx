import HeadingEffect from '@/components/TransitionEffects/Heading';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { InitPasswordReset } from './InitPasswordReset';
import { ChooseNewPassword } from './NewPassword';
import { EnterOTP } from './Otp';
import './reset-password.scss';

// const steps = [
// 	{
// 		label: 'Init',
// 		step: 1,
// 	},
// 	{
// 		label: 'Verify OTP',
// 		step: 2,
// 	},
// 	{
// 		label: 'create new password',
// 		step: 3,
// 	},
// ];

// const [activeStep, setActiveStep] = useState(1);

// const nextStep = () => {
// 	setActiveStep(activeStep + 1);
// };

// const prevStep = () => {
// 	setActiveStep(activeStep - 1);
// };

// const totalSteps = steps.length;

// const width = `${(100 / (totalSteps - 1)) * (activeStep - 1)}%`;
// switch (checkpoint as string) {
// 	case 'verify-otp':
// 		nextStep();
// 		break;
// 	case 'create-new-password':
// 		prevStep();
// 		break;
// 	default:
// 		break;
// }

// function ProgressSteps() {
// 	return (
// 		<div className="MainContainer">
// 			<div className="StepContainer" style={{ width: width }}>
// 				{steps.map(({ step, label }) => (
// 					<div className="StepWrapper" key={step}>
// 						<div
// 							className={`StepStyle ${
// 								activeStep > step ? 'completed' : 'incomplete'
// 							}`}
// 							style={{
// 								border: `${activeStep > step ? '#4A154B' : '#F3E7F3'}`,
// 							}}
// 						>
// 							{activeStep > step ? (
// 								<div className="CheckMark">L</div>
// 							) : (
// 								<span className="StepCount">{step}</span>
// 							)}
// 						</div>
// 						<div className="StepsLabelContainer">
// 							<span className="StepLabel" key={step}>
// 								{label}
// 							</span>
// 						</div>
// 					</div>
// 				))}
// 			</div>
// 			{/* <div className="ButtonsContainer">
// 				<Button
// 					onClick={prevStep}
// 					disabled={activeStep === 1}
// 					text="Previous"
// 				/>
// 				<Button
// 					onClick={nextStep}
// 					disabled={activeStep === totalSteps}
// 					text="Next"
// 				/>
// 			</div> */}
// 		</div>
// 	);
// }
const ResetPassword = () => {
	const [currentPage, setCurrentPage] = useState('init');

	const componentToRender = () => {
		switch (currentPage) {
			case 'verify-otp':
				return <EnterOTP activePage={(active) => setCurrentPage(active)} />;
			case 'create-new-password':
				return <ChooseNewPassword />;
			default:
				return (
					<InitPasswordReset activePage={(active) => setCurrentPage(active)} />
				);
		}
	};

	return (
		<div className="reset-pass">
			<div className="reset-pass-con">
				<Link to="/" className="logo">
					<img src="/Mailrion/Logo-main.png" alt="logo" />
				</Link>
				<HeadingEffect>
					<h1>Reset your password</h1>
				</HeadingEffect>
				{componentToRender()}
			</div>
		</div>
	);
};

export default ResetPassword;
