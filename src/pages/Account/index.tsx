/* eslint-disable @typescript-eslint/no-explicit-any */
import verified from '@/assets/verified.svg';
import ButtonSpinner from '@/components/ButtonSpiner';
import GeneralModal from '@/components/GeneralModal';
import GenerateImage from '@/components/GenerateImage';
import Toast from '@/components/Toast';
import ToolTip from '@/components/ToolTip';
import usePageMetadata from '@/components/UsePageMetadata';
import { IMember, IOrganization } from '@/config';
import { formatDateAndTime } from '@/helpers';
import { FetchOrganizations } from '@/redux/features/OrganizationSlice/services';
import { useEffect, useState } from 'react';
import { FaCopy, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import UserInfo from '../../components/UserInfo';
import { useAppSelector } from '../../redux/store';
import OrganizationSettings from './Organization';
import UserSettings from './User';
import './account.scss';
const Account = () => {
	usePageMetadata({
		title: 'Account Settings',
		description: 'Manage your account settings',
	});
	const {
		admin: { email, name },
	} = useAppSelector((state) => state.user);
	const searchParams = new URLSearchParams(window.location.search);
	const tabQuery = searchParams.get('tab');
	const selectOrgQuery = searchParams.get('selectOrg');
	const [selected, setSelected] = useState(tabQuery ? tabQuery : 'Me');
	const [organizations, setOrganizations] = useState<IOrganization[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [selectedOrg, setSelectedOrg] = useState<IOrganization>(
		{} as IOrganization
	);
	const [showOrgModal, setShowOrgModal] = useState<boolean>(false);
	const { theme } = useAppSelector((state) => state.utils);

	const convertResponseToOrganization = (data: any[]): IOrganization[] => {
		const organizations: IOrganization[] = data.map((item) => {
			const members: IMember[] = item.attributes.members.map((member: any) => ({
				id: member.id,
				name: member.attributes.name,
				email: member.attributes.email,
				default: member.attributes.default,
			}));

			return {
				id: item.id,
				organization: item.attributes.organization,
				hostname: item.attributes.hostname,
				default: item.attributes.default,
				logo: item.attributes.logo,
				created_date: item.attributes.created_date,
				verified_date: item.attributes.verified_date,
				members: members,
			};
		});

		return organizations;
	};

	// console.log(email, name);

	useEffect(() => {
		const fetchOrganizations = async () => {
			setLoading(true);
			const response = await FetchOrganizations();
			const organizationData = convertResponseToOrganization(
				response.data.accounts
			);
			setOrganizations(organizationData);
			setLoading(false);
		};

		fetchOrganizations();
	}, []);

	useEffect(() => {
		const org = organizations.find((org) => org.hostname === selectOrgQuery);
		console.log(org);
		setSelectedOrg(org ? org : ({} as IOrganization));
	}, [organizations, selectOrgQuery]);

	function SelectOrg() {
		return (
			<GeneralModal
				title={'Select organization'}
				subTitle="Please choose the organization you want to manage"
				width={'700px'}
				height={'500px'}
				handleClose={() => {
					// queryParams("tab");
					setSelectedOrg({} as IOrganization);
					setSelected('Me');
					setShowOrgModal(false);
				}}
			>
				<div className="select-org grid-items">
					{' '}
					{loading ? (
						<ButtonSpinner />
					) : (
						<>
							{organizations.map((org) => {
								const {
									hostname,
									logo,
									organization,
									verified_date,
									created_date,
								} = org;
								return (
									<div className="card" key={org.id}>
										<div
											className="orgCard"
											onClick={() => {
												setSelectedOrg(org);
												// queryParams("tab");
												// queryParams("selectOrg", organization);
												setShowOrgModal(false);
											}}
										>
											<div className="orgCard__header">
												<div className="org_logo">
													<img src={logo} alt="" />
												</div>
												<div className="org_name_more">
													<div className="org_name">
														<div className="name">
															<p>{organization}</p>
															{verified_date !== null && (
																<img src={verified} alt="" />
															)}
														</div>
														<span>{hostname}</span>
													</div>
												</div>
											</div>
											<div className="orgCard__content">
												{org.members.length > 3 ? (
													<>
														{org.members?.slice(0, 3).map((member) => {
															return (
																<GenerateImage
																	name={member.name}
																	key={member.id}
																	bgColorList={[
																		'#205e58',
																		'#F2994A',
																		'#037fff',
																	]}
																/>
															);
														})}
													</>
												) : (
													<>
														{org.members.map((member) => {
															return (
																<GenerateImage
																	name={member.name}
																	key={member.id}
																	bgColorList={[
																		'#205e58',
																		'#F2994A',
																		'#037fff',
																	]}
																/>
															);
														})}
													</>
												)}
												{org.members?.length > 3 && (
													<div className="member_count">
														<FaPlus className="add_icon" />{' '}
														{org.members?.length - 3}
													</div>
												)}
											</div>
											<div className="orgCard__footer">
												<p>
													created on{' '}
													<span className="date">
														{formatDateAndTime(created_date)?.date}
													</span>{' '}
												</p>
												<p>{formatDateAndTime(created_date)?.time}</p>
											</div>
										</div>
									</div>
								);
							})}
						</>
					)}
				</div>
			</GeneralModal>
		);
	}

	const copyLoginLink = () => {
		const link = `${window.location.origin}/${selectedOrg?.hostname}/login`;
		navigator.clipboard.writeText(link);
		Toast({ type: 'success', message: 'Link copied successfully' });
	};

	return (
		<div className="AccountSettings" data-theme={theme}>
			<div className="AccountSettings__content">
				{showOrgModal && <SelectOrg />}
				{/* <Plans /> */}
				<div className="user-plans border-bottom padding-round space-between items-center">
					<div className="space-between items-center">
						<Link to={'/organizations'}>
							<h3 className="back-btn items-center">
								<span className="back-btn__icon">
									<svg
										width="8"
										height="14"
										viewBox="0 0 8 14"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M7 13L1 6.93015L6.86175 1"
											stroke="var(--primary-color)"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</span>
								<span
									className="back-btn__text color-primary"
									style={{ marginLeft: '5px', paddingBottom: '3px' }}
								>
									Back
								</span>
							</h3>
						</Link>
						<div className="user-det ml-1">
							<UserInfo
								image={selectedOrg.id ? selectedOrg.logo : ''}
								name={
									selectedOrg.organization ? selectedOrg.organization : name
								}
								email={selectedOrg.id ? selectedOrg.hostname : email}
							/>
							{selectedOrg.id && (
								<ToolTip
									content="
              This is the link you can share with your team members to join your organization.
              
                "
									position="right"
									handleClick={copyLoginLink}
								>
									<p className="copy-login-link mt-1">
										<span className="copy-login-link__icon">
											<FaCopy className="copy" />
										</span>
									</p>
								</ToolTip>
							)}
						</div>
					</div>
					<div className="plan-card padding-round items-center space-between">
						<div className="plan-card__title">
							<h3>Plan</h3>
							<p>Free</p>
						</div>
						<div className="plan-card__btn">Plans</div>
					</div>
				</div>
				<div className="user-settings padding-round space-between border-bottom items-center">
					<div className="user-settings__title">
						<h3>Account Settings</h3>
					</div>
					<div className="user-settings__switch">
						<div className="filter-options">
							<div className="filter-elements">
								{['Me', 'Organization'].map((item) => (
									<div
										key={item}
										onClick={() => {
											setSelected(item);
											if (item === 'Organization') {
												// queryParams("tab", item);
												setShowOrgModal(true);
											}
											if (item === 'Me') {
												// queryParams("tab", item);
												setSelectedOrg({} as IOrganization);
												setShowOrgModal(false);
											}
										}}
										className={`filter-option ${
											selected === item ? 'active' : ''
										}`}
									>
										{item}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
				<div className="account-body padding-round">
					{selected === 'Me' ? (
						<UserSettings />
					) : selected === 'Organization' ? (
						<OrganizationSettings organization={selectedOrg} />
					) : (
						<UserSettings />
					)}
				</div>
			</div>
		</div>
	);
};

export default Account;
