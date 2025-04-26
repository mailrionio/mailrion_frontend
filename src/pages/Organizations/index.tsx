/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Toast from '@/components/Toast';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import verified from '../../assets/verified.svg';
import ButtonSpinner from '../../components/ButtonSpiner';
import GenerateImage from '../../components/GenerateImage';
import ToolTip from '../../components/ToolTip';
import HeadingEffect from '../../components/TransitionEffects/Heading';
import usePageMetadata from '../../components/UsePageMetadata';
import { IMember, IOrganization } from '../../config';
import { formatDateAndTime, getTimeOfDay } from '../../helpers';
import {
	FetchOrganizations,
	ToggleOrganizationStatus,
} from '../../redux/features/OrganizationSlice/services';
import { dispatch, useAppSelector } from '../../redux/store';
import AddMember from '../Account/Organization/AddMember';
import CreateNewOrganization from './CreateOrganization';
import VerifyOrganization from './VerifyOrganization';
import deskIcon from './imgs/desk.svg';
// import frowsIcon from "./imgs/frows.svg";
import { setSelectedOrganization } from '@/redux/features/OrganizationSlice';
import { setGlobalLoader, setPageSearch } from '@/redux/features/utilSlice';
import moreIcon from './imgs/moreIcon.svg';
import newIcon from './imgs/newIcon.svg';
import './organizations.scss';

function Organizations() {
	const [openModal, setOpenModal] = useState<boolean>(false);
	const { admin: user } = useAppSelector((state) => state.user);
	const { searchQuery } = useAppSelector((state) => state.utils);
	const [organizations, setOrganizations] = useState<IOrganization[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [toggleVerifyModal, setToggleVerifyModal] = useState<boolean>(false);
	const [activeOrgId, setActiveOrgId] = useState<string>('');
	const [openAddMember, setOpenAddMember] = useState(false);
	const [selectedOrgId, setSelectedOrgId] = useState('');
	const [selectedOrgName, setSelectedOrgName] = useState('');
	const [selectedOrgHost, setSelectedOrgHost] = useState<string>('');
	// const [toggleLoading, setToggleLoading] = useState<boolean>(false);
	const { theme } = useAppSelector((state) => state.utils);

	const navigate = useNavigate();

	const timeOfDay = getTimeOfDay();
	usePageMetadata({
		title: 'Organizations',
		description: 'Create and manage your organizations here',
	});

	useEffect(() => {
		dispatch(setPageSearch({ content: 'Organizations', show: true }));
	}, []);

	const toggleModal = () => {
		setOpenModal(!openModal);
	};

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

	const fetch = async () => {
		setLoading(true);
		const response = await FetchOrganizations();
		const organizationData = convertResponseToOrganization(
			response.data.accounts
		);
		console.log(organizationData);

		setOrganizations(organizationData);
		setLoading(false);
	};

	const searchOrgs = (orgs: IOrganization[]) => {
		return orgs.filter((org) =>
			org.organization?.toLowerCase().includes(searchQuery.toLowerCase())
		);
	};

	useEffect(() => {
		fetch();
	}, []);

	const toggleMoreOptions = (
		orgId: string,
		orgName: string,
		orgHost: string
	) => {
		setActiveOrgId((prevId) => (prevId === orgId ? '' : orgId));
		setSelectedOrgName(orgName);
		setSelectedOrgHost(orgHost);
	};
	const RenderMoreOptions = () => {
		return (
			<div className="more-options more-card">
				<p
					onClick={() => {
						navigate(
							`/account-settings?tab=Organization&selectOrg=${selectedOrgHost}&orgId=${activeOrgId}#members25f`
						);
						setSelectedOrgId(activeOrgId as string);
						setSelectedOrgName(selectedOrgName);
					}}
				>
					View team members
				</p>
				<p
					onClick={() => {
						navigate(
							`/account-settings?tab=Organization&selectOrg=${selectedOrgHost}&orgId=${activeOrgId}&action=add-member#25Cpz5`
						);
						setSelectedOrgId(activeOrgId as string);
						setSelectedOrgName(selectedOrgName);
					}}
				>
					Add team member
				</p>
				{/* <p>Add primary email</p> */}
				{selectedOrgName !== 'Mailrion' && (
					<p onClick={() => setToggleVerifyModal(true)}>Verify domain</p>
				)}
				{selectedOrgName !== 'Mailrion' && (
					<p
						className="del"
						onClick={() => {
							navigate(
								`/account-settings?tab=Organization&selectOrg=${selectedOrgHost}#25Cpz5`
							);
							setSelectedOrgId(activeOrgId as string);
							setSelectedOrgName(selectedOrgName);
						}}
					>
						Delete organization
					</p>
				)}
			</div>
		);
	};

	// const handleDeleteOrg = async () => {
	//   setDeleteLoading(true);
	//   const response = await DeleteOrganization(selectedOrgId);
	//   if (response.status === 200) {
	//     const newOrgs = organizations.filter((org) => org.id !== selectedOrgId);
	//     setOrganizations(newOrgs);
	//     fetch();
	//   }
	//   setDeleteLoading(false);
	//   setOpenDeleteORg(false);
	// };

	// const RenderDeleteOrgDialog = () => {
	//   return (
	//     <GeneralModal
	//       title={"Delete your organization"}
	//       width={"500px"}
	//       height={"350px"}
	//       handleClose={() => setOpenDeleteORg(false)}
	//     >
	//       <div className="delete-org-dialog">
	//         <div className="delete-org-dialog__content">
	//           <p>Are you sure you want to delete this organization?</p>
	//           <h2>{selectedOrgName}</h2>
	//           <p>
	//             All if its data such as: <b>mailbox</b>, <b>sub accounts</b>, and{" "}
	//             <b>campaigns</b> will be deleted.
	//           </p>
	//           <div className="delete-org-dialog__content__btns">
	//             <Button
	//               text="cancel"
	//               className="outline"
	//               onClick={() => setOpenDeleteORg(false)}
	//             />
	//             {deleteLoading ? (
	//               <ButtonSpinner />
	//             ) : (
	//               <Button text="delete" onClick={handleDeleteOrg} />
	//             )}
	//           </div>
	//         </div>
	//       </div>
	//     </GeneralModal>
	//   );
	// };

	// const renderAddMember = (id: string, orgname: string, orgHost: string) => {
	//   setSelectedOrgId(id);
	//   setSelectedOrgName(orgname);
	//   setSelectedOrgHost(orgHost);
	//   setOpenAddMember(true);
	// };

	const setDefaultOrg = async (id: string, orgName: string) => {
		dispatch(
			setGlobalLoader({ loading: true, message: `Switching to ${orgName}` })
		);

		// Find the clicked organization and the user's member information
		const clickedOrg = organizations.find((org) => org.id === id);
		console.log(clickedOrg?.members.find((member) => member.default !== '1'));

		if (!clickedOrg?.members.some((member) => member.default === '1')) {
			dispatch(setGlobalLoader({ loading: false }));
			Toast({
				type: 'error',
				message:
					"Holdup, seems like you haven't added any primary member to this organization yet. Add a primary member or go to settings to make a member primary.",
			});
			return;
		} else {
			// first check is the org id is already set as default in the frontend; if yes, return, else continue
			const isAlreadyDefault = organizations.some(
				(org) => org.id === id && org.default === 1
			);

			// Find the clicked org whose email already has a default set to 1
			const memberAlreadyPrimary = clickedOrg?.members.find(
				(member) => member.default === '1'
			);

			console.log(memberAlreadyPrimary);
			localStorage.setItem(
				'selectedOrganization',
				JSON.stringify({
					id,
					default: 1,
					primaryMember: {
						id: memberAlreadyPrimary?.id as string,
						default: memberAlreadyPrimary?.default as string,
						email: memberAlreadyPrimary?.email as string,
						name: memberAlreadyPrimary?.name as string,
					},
				})
			);
			dispatch(
				setSelectedOrganization({
					id,
					default: 1,
					primaryMember: {
						id: memberAlreadyPrimary?.id as string,
						default: memberAlreadyPrimary?.default as string,
						email: memberAlreadyPrimary?.email as string,
						name: memberAlreadyPrimary?.name as string,
					},
				})
			);
			if (isAlreadyDefault) {
				dispatch(setGlobalLoader({ loading: false }));
				navigate(`/organization/${orgName}/dashboard`);
				return;
			} else {
				// Find the organization that currently has default: 1
				const previousDefaultOrg = organizations.find(
					(org) => org.default === 1
				);

				// Set the clicked organization as default in the backend
				const data = {
					account: id,
					status: 1,
				};
				const res1 = await ToggleOrganizationStatus(data);
				let res2 = null;

				// Update the previous default organization's status to 0 in the backend
				if (previousDefaultOrg) {
					const prevDefaultData = {
						account: previousDefaultOrg.id,
						status: 0,
					};
					res2 = await ToggleOrganizationStatus(prevDefaultData);
				}

				if (res1?.status === 200 && res2?.status === 200) {
					dispatch(setGlobalLoader({ loading: false }));
					navigate(`/organization/${orgName}/dashboard`);
				} else {
					Toast({
						type: 'error',
						message: 'Error switching to your organization, try again later.',
					});
				}
			}
		}
	};

	return (
		<div className="Organizations" data-theme={theme}>
			{activeOrgId !== '' && (
				<div className="overlay" onClick={() => setActiveOrgId('')} />
			)}
			{openModal && <CreateNewOrganization handleclose={toggleModal} />}
			{/* {openDeleteORg && <RenderDeleteOrgDialog />} */}
			{openAddMember && (
				<AddMember
					orgId={selectedOrgId}
					orgHost={selectedOrgHost}
					handleClose={() => setOpenAddMember(false)}
				/>
			)}
			{toggleVerifyModal && (
				<VerifyOrganization
					orgID={activeOrgId as string}
					handleclose={() => setToggleVerifyModal(false)}
					domain={selectedOrgHost}
				/>
			)}
			{/* {toggleLoading && <GlassmorphismLoader />} */}
			<div className="Organizations__main">
				<div className="title">
					Good {timeOfDay} 👋
					<HeadingEffect>
						<h1>{user.name}</h1>
					</HeadingEffect>
				</div>
				<div className="organizations-count">
					<div className="orgCount">
						<h2>Organizations</h2>
						{organizations.length > 0 && <span>{organizations.length}</span>}
					</div>
					<div className="create-new">
						<div onClick={toggleModal} className="create">
							<FaPlus className="add_icon" />
							<p>Create new organization</p>
						</div>
						<img src={deskIcon} alt="" className="active" />
						{/* <img src={frowsIcon} alt="" /> */}
					</div>
				</div>
				<p className="manage">Create and manage your organizations here</p>
				<div className="orgs flex-wrap">
					<div className="card create-cardbtnIcon">
						<div className="icon">
							<img src={newIcon} alt="" />
						</div>
						<div className="newWrapper">
							<div className="new-btn" onClick={toggleModal}>
								<FaPlus className="add_icon" />
								<p>New organization</p>
							</div>
						</div>
						<div />
					</div>

					{loading ? (
						<ButtonSpinner />
					) : (
						<>
							{searchOrgs(organizations).map((org) => {
								const {
									hostname,
									logo,
									organization,
									verified_date,
									created_date,
								} = org;
								return (
									<div className="card" key={org.id}>
										<ToolTip
											content="Click the organization name to access all features"
											position="top"
										>
											<div className="orgCard">
												{org.id === activeOrgId && <RenderMoreOptions />}
												<div className="orgCard__header">
													<div className="org_logo">
														<img src={logo} alt="" />
													</div>
													<div className="org_name_more">
														<div
															// to={`/organizations/${org.id}/dashboard`}
															className="org_name"
															onClick={() =>
																setDefaultOrg(org.id, org.organization)
															}
														>
															<div className="name">
																<p>{organization}</p>
																{verified_date !== null && (
																	<img src={verified} alt="" />
																)}
															</div>
															<span>{hostname}</span>
														</div>
														<ToolTip
															content="More options"
															position="up"
															classes=""
															handleClick={() => {
																toggleMoreOptions(
																	org.id,
																	organization,
																	hostname
																);
															}}
														>
															<div className="more">
																<img
																	src={moreIcon}
																	alt=""
																	className="moreIcon"
																/>
															</div>
														</ToolTip>
													</div>
												</div>
												<div className="orgCard__content">
													<ToolTip
														classes="add_member"
														handleClick={() =>
															// renderAddMember(org.id, organization, hostname)
															navigate(
																`/account-settings?tab=Organization&selectOrg=${hostname}&orgId=${org.id}&action=add-member#25Cpz5`
															)
														}
														content="Add team member"
														position="up"
													>
														<FaPlus className="add_icon" />
													</ToolTip>
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
										</ToolTip>
									</div>
								);
							})}
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default Organizations;
