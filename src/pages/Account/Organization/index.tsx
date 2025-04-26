/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/Button';
import ButtonSpinner from '@/components/ButtonSpiner';
import DeleteConfirmation from '@/components/DeleteConfirmation';
import GeneralModal from '@/components/GeneralModal';
import GenerateImage from '@/components/GenerateImage';
import InputField from '@/components/InputField';
import RadioInput from '@/components/RadioInput';
import Toast from '@/components/Toast';
import { IMember, IOrganization } from '@/config';
import { useQueryParams } from '@/helpers';
import AddMember from '@/pages/Account/Organization/AddMember';
import { API } from '@/redux/axios/axios';
import {
	DeleteOrganization,
	ToggleMemberStatus,
} from '@/redux/features/OrganizationSlice/services';
import { useAppSelector } from '@/redux/store';
import { ChangeEvent, useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
// import aws from './icons/aws.svg';
// import google from './icons/google.svg';
// import mailgun from './icons/mailgun.svg';
// import oracle from './icons/oracle.svg';
// import sendgrid from './icons/sendgrid.svg';
// import smtp from './icons/smtp.svg';
// import webhook from './icons/webhook.svg';
// import yotpo from './icons/yotpo.svg';
import NoItemFound from '@/components/NoItemFound';
import SelectField from '@/components/SelectField';
import ToastMessage from '@/components/Toast';
import aws from './icons/aws.svg';
import google from './icons/google.svg';
import mailgun from './icons/mailgun.svg';
import oracle from './icons/oracle.svg';
import sendgrid from './icons/sendgrid.svg';
import smtp from './icons/smtp.svg';
import webhook from './icons/webhook.svg';
import './organization.scss';

interface OrganizationSettingsProps {
	organization: IOrganization;
}

const OrganizationSettings = ({ organization }: OrganizationSettingsProps) => {
	const {
		admin: { email },
	} = useAppSelector((state) => state.user);
	const navigate = useNavigate();
	const [signImage, setSignImage] = useState<any>(null);
	const [deleteOrg, setDeleteOrg] = useState<string>('null');
	const { theme } = useAppSelector((state) => state.utils);
	const [loading, setLoading] = useState<string>('null');
	const [verifyPass, setVerifyPass] = useState<string>('');
	const [integrationModal, setIntegrationModal] = useState<string>('');
	const [makePrimary, setMakePrimary] = useState<{
		newPimaryMember: IMember;
		oldPrimaryMember: IMember;
		toggle: boolean;
	}>({
		newPimaryMember: {} as IMember,
		oldPrimaryMember: {} as IMember,
		toggle: false,
	});
	const [queries, setQueries] = useState<{
		addmemberQ: string;
		orgID: string;
		orgName: string;
	}>(
		{} as {
			addmemberQ: string;
			orgID: string;
			orgName: string;
		}
	);

	const addmemberQ = useQueryParams('action');
	const orgID = useQueryParams('orgId');
	const orgName = useQueryParams('selectOrg');
	useEffect(() => {
		setQueries({ addmemberQ, orgID, orgName } as unknown as any);
	}, []);
	// console.log(queries, 'queries');
	// console.log(organization, 'organization');

	const handleSignImage = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;
		const file = e.target.files[0];

		// Check file size
		if (file.size > 2 * 1024 * 1024) {
			Toast({
				type: 'error',
				message: 'Image size should be less than 2MB.',
			});
			return;
		}

		// Create a promise to wait for the image to load
		const loadImage = (file: File) => {
			return new Promise<HTMLImageElement>((resolve, reject) => {
				const img = new Image();
				img.onload = () => resolve(img);
				img.onerror = () => reject();
				img.src = URL.createObjectURL(file);
			});
		};

		// Load the image and perform validation
		loadImage(file)
			.then((img: HTMLImageElement) => {
				// Check image dimensions
				if (img.width > 512 || img.height > 512) {
					Toast({
						type: 'error',
						message: 'Image dimensions should be less than 512x512.',
					});
					return;
				}
				setSignImage(file);
			})
			.catch(() => {
				Toast({
					type: 'error',
					message: 'Failed to load the image.',
				});
			});
	};

	const handleVerifyIdentity = async (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading('verify');
		if (verifyPass === '') {
			Toast({ type: 'error', message: 'Please enter your password.' });
		} else {
			const res = await API.post('/login', { email, password: verifyPass });
			if (res?.status === 200 || res?.status === 201) {
				setDeleteOrg('delete');
				setLoading('null');
			}
		}
	};

	const handleDelOrg = async () => {
		setLoading('deelete');
		const res = await DeleteOrganization(organization?.id);
		if (res.status === 200 || res.status === 201) {
			navigate('/');
			setDeleteOrg('null');
			setLoading('null');
		} else {
			setLoading('null');
			setDeleteOrg('null');
		}
	};

	// console.log(makePrimary);

	// const callAddIntegration = (item: string) => {
	// 	switch (item) {
	// 		case 'SMTP':
	// 			setIntegrationModal('SMTP');
	// 			break;
	// 		case 'Webhook':
	// 			setIntegrationModal('Webhook');
	// 			break;
	// 		case 'AWS':
	// 			setIntegrationModal('AWS');
	// 			break;
	// 		case 'Mailgun':
	// 			setIntegrationModal('Mailgun');
	// 			break;
	// 		case 'Sendgrid':
	// 			setIntegrationModal('Sendgrid');
	// 			break;
	// 		case 'Google Analytics':
	// 			setIntegrationModal('Google Analytics');
	// 			break;
	// 		case 'Oracle':
	// 			setIntegrationModal('Oracle');
	// 			break;
	// 		default:
	// 			break;
	// 	}
	// };

	// function AddIntegration() {
	// 	return (
	// 		<GeneralModal
	// 			title={`Setup ${integrationModal} Integration`}
	// 			width={'1000px'}
	// 			height={'600px'}
	// 			handleClose={() => setIntegrationModal('null')}
	// 		>
	// 			{integrationModal === 'null' ? undefined : integrationModal ===
	// 			  'SMTP' ? (
	// 				<Smtp />
	// 			) : undefined}
	// 		</GeneralModal>
	// 	);
	// }

	const ConfirmNakePrimary = () => {
		return (
			<GeneralModal
				title={'Privileges'}
				width={'450px'}
				height={'250px'}
				handleClose={() => setMakePrimary({ ...makePrimary, toggle: false })}
			>
				<p>
					Are you sure you want to make this member{' '}
					<b>"{makePrimary.newPimaryMember.name}" </b>, the primary member of
					this organization?
				</p>
				<div className="action-btn space-between mt-2">
					<Button
						text="No, cancel"
						className="outline"
						onClick={() => setMakePrimary({ ...makePrimary, toggle: false })}
					/>
					<Button
						text="Yes, proceed"
						onClick={async () => {
							const res = await ToggleMemberStatus({
								email: makePrimary.newPimaryMember.email,
								status: '1',
							});

							if (res?.status === 200) {
								setMakePrimary({
									newPimaryMember: {} as IMember,
									oldPrimaryMember: {} as IMember,
									toggle: false,
								});
								ToastMessage({
									type: 'success',
									message: 'Member made primary.',
								});
								// await ToggleMemberStatus({
								// 	email: makePrimary.oldPrimaryMember.email,
								// 	status: '0',
								// });
								window.location.reload();
							}
						}}
					/>
				</div>
			</GeneralModal>
		);
	};

	return (
		<div className="OrganizationSettings" data-theme={theme}>
			{deleteOrg === 'delete' && (
				<DeleteConfirmation
					actionBtnClick={handleDelOrg}
					content="Deleting your organization will permanently delete all your data and cannot be undone."
					handleClose={() => setDeleteOrg('null')}
					isLoading={loading === 'delete' ? true : false}
					title="Delete organization"
					width="500px"
					height="300px"
				/>
			)}
			{queries.addmemberQ === 'add-member' && (
				<AddMember
					orgId={queries.orgID as string}
					orgHost={queries.orgName as string}
					handleClose={() => {
						setQueries({ ...queries, addmemberQ: 'null' });
						navigate(-1);
					}}
				/>
			)}
			{deleteOrg === 'verify-identity' && (
				<GeneralModal
					title="Verify your identity"
					width="500px"
					height="350px"
					handleClose={() => setDeleteOrg('null')}
				>
					{loading === 'verify' ? (
						<ButtonSpinner />
					) : (
						<form className="verify-identity" onSubmit={handleVerifyIdentity}>
							<p>
								Enter your password to confirm that you want to delete this
								organization.
							</p>
							<InputField
								label="Email"
								placeholder="Enter your email"
								handleChange={() =>
									Toast({ type: 'error', message: 'Email cannot be changed.' })
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
										onClick={() => setDeleteOrg('null')}
									/>
									<Button text="Verify" type="submit" />
								</div>
							</div>
						</form>
					)}
				</GeneralModal>
			)}

			{makePrimary.toggle && <ConfirmNakePrimary />}

			{/* {integrationModal !== 'null' && <AddIntegration />} */}

			<section className="team-member" id="#members25f">
				<h3 className="primary-color">Team Members</h3>
				<p>
					Here is the list of members added to this organization, you can set a
					member as primary or delete the member from the organization.
				</p>
				<div className="access">
					{organization?.members?.length > 0 ? (
						<>
							{' '}
							{organization?.members?.map((user) => {
								const { id, name, email } = user;
								return (
									<div className="user border-bottom" key={id}>
										<div className="user__info">
											{' '}
											<div className="user__info__avatar">
												<GenerateImage
													name={name}
													bgColor={`#${Math.floor(
														Math.random() * 16777215
													).toString(16)}`}
													color={`#${Math.floor(
														Math.random() * 16777215
													).toString(16)}`}
												/>
											</div>
											<div className="user__info__name">
												<h4>{name}</h4>
												<p>{email}</p>
												<p>
													Primary member: {user?.default === '1' ? 'Yes' : 'No'}
												</p>
											</div>
										</div>
										<div className="revoke-btn">
											{user?.default !== '1' && (
												<Button
													text="Make primary"
													className="outline"
													onClick={() =>
														setMakePrimary({
															newPimaryMember: user,
															oldPrimaryMember: organization.members.find(
																(member) => member.default === '1'
															) as IMember,
															toggle: true,
														})
													}
												/>
											)}
										</div>
									</div>
								);
							})}
						</>
					) : (
						<NoItemFound content="No member found" />
					)}
				</div>
			</section>

			<div className="org-domain">
				<h3 className="primary-color">Organization Domain</h3>
				<div className="select">
					<label htmlFor="domain">Domain</label>
					<div className="select-input">
						<p>{organization?.hostname}</p>
					</div>
				</div>
				{/* <p>verify</p> */}
			</div>

			<div className="integration">
				<h3 className="primary-color">Integrations</h3>
				<label htmlFor="">Default</label>
				<div className="default-list items-center">
					<select className="" name="default" id="default">
						<option value="slack">Slack</option>
						<option value="slack">Slack</option>
						<option value="slack">Slack</option>
					</select>
					<Button type="submit" className="outline" text="Set as default" />
				</div>
				<div className="mt-2">
					<div className="assign-list items-center " style={{ width: '400px' }}>
						<SelectField
							handleChange={function (e: ChangeEvent<HTMLSelectElement>): void {
								throw new Error('Function not implemented.');
							}}
							name={'assign-list'}
							value={''}
							label={'Assign To List'}
							required={false}
							options={['List 1']}
						/>
						<div className="lists">
							{/* <select className="select-input" name="" id="">
								<option value="slack">Slack</option>
								<option value="slack">Slack</option>
								<option value="slack">Slack</option>
							</select> */}{' '}
							<br />
						</div>
					</div>
				</div>
			</div>
			<div className="integration-providers grid-items">
				{[
					{
						name: 'SMTP',
						logo: smtp,
						link: 'smtp',
					},
					{
						name: 'Webhook',
						logo: webhook,
						link: 'webhook',
					},
					{
						name: 'AWS',
						logo: aws,
						link: 'aws',
					},
					{
						name: 'Mailgun',
						logo: mailgun,
						link: 'mailgun',
					},
					{
						name: 'Sendgrid',
						logo: sendgrid,
						link: 'sendgrid',
					},
					{
						name: 'Google Analytics',
						logo: google,
						link: 'google-analytics',
					},

					{
						name: 'Oracle',
						logo: oracle,
						link: 'oracle',
					},
					// {
					// 	name: 'Zapier',
					// 	logo: zapier,
					// },
					// {
					// 	name: 'Yotpo',
					// 	logo: yotpo,
					// },
				].map((item, index) => (
					<Link
						to={`/account-settings/integration/${item.link}`}
						key={index}
						className="integration-providers__item"
						// onClick={() => callAddIntegration(item.name)}
					>
						<div className="info">
							<img src={item.logo} alt={item.name} />
							<p>{item.name}</p>
						</div>
						<FaPlus className="add_icon" />
					</Link>
				))}
			</div>

			<div className="notification">
				<h3 className="primary-color">Notification</h3>
				<div className="items-center space-between">
					<h4>Push notification</h4>
					<RadioInput
						checked={false}
						onChange={function (): void {
							throw new Error('Function not implemented.');
						}}
					/>
				</div>
			</div>
			<div className="mail-signature">
				<h3 className="primary-color">Mail signature</h3>
				<div className="flex-items">
					<div className="sign-banner">
						<label htmlFor="">Signature banner</label>
						<div className="sign-banner__input">
							{signImage ? (
								<img src={URL.createObjectURL(signImage)} alt="" />
							) : (
								<>
									<input
										type="file"
										name=""
										id="signID"
										hidden
										onChange={handleSignImage}
									/>
									<label htmlFor="signID">
										<FaPlus className="add_icon" />
									</label>

									<p>512px by 512px</p>
								</>
							)}
						</div>
					</div>
					<div className="sign-info">
						<InputField
							placeholder=""
							handleChange={function (e: ChangeEvent<HTMLInputElement>): void {
								throw new Error('Function not implemented.');
							}}
							name={'signature'}
							classes={''}
							value={''}
							label={'Signature'}
							required={false}
						/>
					</div>
				</div>
			</div>
			<div className="delete" id="25Cpz5">
				<h3 className="primary-color">Delete Organization</h3>
				<Button
					text="Delete Organization"
					className="outline del-org"
					onClick={() => setDeleteOrg('verify-identity')}
					disabled={organization?.organization === 'Mailrion' ? true : false}
				/>
			</div>
		</div>
	);
};

export default OrganizationSettings;
