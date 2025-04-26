/* eslint-disable @typescript-eslint/no-explicit-any */
import HeadingEffect from '@/components/TransitionEffects/Heading';
import usePageMetadata from '@/components/UsePageMetadata';
import { useQueryParams } from '@/helpers';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MultipleEmailVerifier } from './MultipleEmailVerifier';
import SingleEmailValidation from './SingleEmailValidation';
import './email-validate.scss';
const EmailValidation = () => {
	usePageMetadata({
		title: 'Email Validation',
		description:
			"Validate your organization's email using our email validation tool",
	});
	const { id } = useParams<{ id: string }>();
	const selectedQuery = useQueryParams('selected');
	const [selected, setSelected] = useState<string>(selectedQuery || '');

	return (
		<div className="email-validation">
			<div className="header space-between border-bottom">
				<HeadingEffect>
					<h1>Email Validation & Verification Cleaning system</h1>
				</HeadingEffect>
			</div>
			{selected === '' ? (
				<div className="choose-option">
					<h3>How do you want to verify email?</h3>
					<div className="option">
						<div
							className="option-item"
							onClick={() => setSelected('single-verifier')}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 18 18"
								fill="none"
							>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M14.2502 15.75C15.9071 15.75 17.2502 14.4069 17.2502 12.75V6.01701C17.2505 6.00554 17.2505 5.99404 17.2502 5.98253V5.25C17.2502 3.59315 15.9071 2.25 14.2502 2.25H3.7502C2.09335 2.25 0.750199 3.59315 0.750199 5.25V5.98253C0.749933 5.99405 0.749934 6.00554 0.750199 6.01701V12.75C0.750199 14.4069 2.09334 15.75 3.7502 15.75H14.2502ZM2.2502 12.75C2.2502 13.5784 2.92177 14.25 3.7502 14.25H14.2502C15.0786 14.25 15.7502 13.5784 15.7502 12.75V7.10777L10.1144 9.36211C9.39914 9.6482 8.60126 9.6482 7.88603 9.36211L2.2502 7.10777V12.75ZM9.55729 7.96939L15.7502 5.49223V5.25C15.7502 4.42157 15.0786 3.75 14.2502 3.75H3.7502C2.92177 3.75 2.2502 4.42157 2.2502 5.25V5.49223L8.44311 7.96939C8.80073 8.11244 9.19967 8.11244 9.55729 7.96939Z"
									fill="var(--secondary-color)"
								/>
							</svg>
							<div className="option-item__text">
								<h4>Single email</h4>
								<span>Validation cost 1 Credit per Email</span>
							</div>
						</div>
						<div
							className="option-item"
							onClick={() => setSelected('multiple-verifier')}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 18 18"
								fill="none"
							>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M5.25 2.25C4.42157 2.25 3.75 2.92157 3.75 3.75V14.25C3.75 15.0784 4.42157 15.75 5.25 15.75H6.75C7.16421 15.75 7.5 16.0858 7.5 16.5C7.5 16.9142 7.16421 17.25 6.75 17.25H5.25C3.59315 17.25 2.25 15.9069 2.25 14.25V3.75C2.25 2.09315 3.59315 0.75 5.25 0.75H10.1962C11.0865 0.75 11.9308 1.14547 12.5008 1.82945L15.0547 4.89406C15.504 5.4332 15.75 6.1128 15.75 6.81461V14.25C15.75 15.9069 14.4069 17.25 12.75 17.25H11.25C10.8358 17.25 10.5 16.9142 10.5 16.5C10.5 16.0858 10.8358 15.75 11.25 15.75H12.75C13.5784 15.75 14.25 15.0784 14.25 14.25V7.5H12.75C11.0931 7.5 9.75 6.15685 9.75 4.5V2.25H5.25ZM13.9023 5.85434C13.9411 5.9009 13.9769 5.94955 14.0095 6H12.75C11.9216 6 11.25 5.32843 11.25 4.5V2.68256C11.2844 2.7165 11.3173 2.75224 11.3485 2.78972L13.9023 5.85434Z"
									fill="var(--secondary-color)"
								/>
								<path
									d="M9.49827 10.6894C9.21411 10.4369 8.78589 10.4369 8.50173 10.6894L7.37673 11.6894C7.06714 11.9646 7.03925 12.4387 7.31444 12.7483C7.55519 13.0191 7.94812 13.0744 8.25 12.8997V16.5C8.25 16.9142 8.58579 17.25 9 17.25C9.41421 17.25 9.75 16.9142 9.75 16.5V12.8997C10.0519 13.0744 10.4448 13.0191 10.6856 12.7483C10.9607 12.4387 10.9329 11.9646 10.6233 11.6894L9.49827 10.6894Z"
									fill="var(--secondary-color)"
								/>
							</svg>
							<div className="option-item__text">
								<h4>Multiple email</h4>
								<p>Upload your CSV Excel file to begin</p>
							</div>
						</div>
						<Link
							className="option-item"
							to={`/organization/${id}/email-validation/all-results`}
						>
							<div className="option-item__text">
								<h4>View all validations</h4>
								<p>View all your email validation history</p>
							</div>
						</Link>
					</div>
				</div>
			) : selected === 'single-verifier' ? (
				<SingleEmailValidation handleClose={() => setSelected('')} />
			) : (
				selected === 'multiple-verifier' && (
					<MultipleEmailVerifier handleclose={() => setSelected('')} />
				)
			)}
		</div>
	);
};

export default EmailValidation;
