/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { LuMail } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import verified from '../../../assets/verified.svg';
import SearchInput from '../../../components/SearchInput/index';
// import starredIcon from "./icons/starred.svg";
import { getURLPaths } from '@/helpers';
import { setStartReading } from '@/redux/features/mailingSlice';
import { FaPlus } from 'react-icons/fa';
import ButtonSpinner from '../../../components/ButtonSpiner';
import {
	FetchSingleOrganization,
	GetOrganizationMembers,
} from '../../../redux/features/OrganizationSlice/services';
import { dispatch, useAppSelector } from '../../../redux/store';
import './sidebar.scss';

interface Props {
	children?: React.ReactNode;
	closeSidebar: () => void;
	toggleSidebar: boolean;
}

function Sidebar({ closeSidebar, toggleSidebar, children }: Props) {
	// const { id } = useParams<{ id: string }>();
	const {
		organization,
		// members,
		isLoading,
		selectedOrganization: { id },
	} = useAppSelector((state) => state.organization);
	const { mailCount } = useAppSelector((state) => state.mail);
	const { theme } = useAppSelector((state) => state.utils);
	const { pathname } = getURLPaths();
	console.log(pathname);

	// const navigate = useNavigate();

	useEffect(() => {
		const fetchOrgMembers = async () => {
			await GetOrganizationMembers(id as string);
		};
		fetchOrgMembers();
	}, [id]);

	useEffect(() => {
		FetchSingleOrganization(id);
	}, [id]);

	// const addMember = () => {
	//   navigate(
	//     `/account-settings?tab=Organization&selectOrg=${organization.hostname}&orgId=${id}&action=add-member#25Cpz5`
	//   );
	// };

	return (
		<div
			className={`admin OrganizationSidebar ${
				toggleSidebar ? 'showSidebar' : ''
			} `}
			data-theme={theme}
		>
			<div className="sidebarBlurred" onClick={closeSidebar} />
			<div className={'organization_header'}>
				<div className="overflow-items">
					<div className="items-center border-bottom">
						<Link to="/organizations">
							<div className="add_icon">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
								>
									<path
										d="M9.57 5.92969L3.5 11.9997L9.57 18.0697"
										stroke="var(--secondary-color)"
										strokeWidth="1.5"
										strokeMiterlimit="10"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M20.4999 12H3.66992"
										stroke="var(--secondary-color)"
										strokeWidth="1.5"
										strokeMiterlimit="10"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
						</Link>
						<div className="organization-info">
							{isLoading ? (
								<ButtonSpinner />
							) : (
								<div className="header">
									<div className="org_logo">
										{/* {} */}
										<img src={organization?.logo} alt="" />
									</div>
									<div className="org_name">
										<div className="name">
											{organization?.organization}
											{organization?.verified_date !== null && (
												<img src={verified} alt="" />
											)}
										</div>
										<span>{organization?.hostname}</span>
									</div>
								</div>
							)}
						</div>
					</div>
					<div className="hide-on-desktop">
						<div className={'organization_header_logo_vs_closeIcon'}>
							<span className="SidebarSearch">
								<SearchInput />
							</span>
						</div>
					</div>
					<div className="compose">
						<Link
							to={`/organization/${organization?.organization}/compose-new-mail`}
							className={'composeLink'}
							onClick={() => localStorage.removeItem('drafts')}
						>
							<FaPlus className="add_icon" />
							<p className="composeLink__name">Compose</p>
						</Link>
					</div>
					<div className={'navLinks'}>
						<Link
							to={`/organization/${organization?.organization}/inbox`}
							onClick={() => dispatch(setStartReading(false))}
							className={
								pathname === `/inbox` || pathname === `/dashboard`
									? `active navLink`
									: `inactive navLink`
							}
						>
							<div
								className={
									pathname === `/inbox` || pathname === `/dashboard`
										? `active navLink-inside`
										: `inactive navLink-inside`
								}
							>
								<div className="details">
									<div className="navLink__icon">
										<LuMail className="organization_sidebarIcon_mail" />
									</div>
									<p className="navLink__name">Inbox</p>
								</div>
								{mailCount > 0 && <div className="count">{mailCount}</div>}
							</div>
						</Link>
						{/* <Link
              to={`/organization/${organization?.organization}/starred`}
              onClick={() => dispatch(setStartReading(false))}
              className={
                pathname === `/organization/${organization?.organization}/starred`
                  ? `active navLink`
                  : `inactive navLink`
              }
            >
              <div
                className={
                  pathname === `/organization/${organization?.organization}/starred`
                    ? `active navLink-inside`
                    : `inactive navLink-inside`
                }
              >
                <div className="details">
                  <div className="navLink__icon">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.2976 2.63248L11.6176 5.27248C11.7976 5.63998 12.2776 5.99248 12.6826 6.05998L15.0751 6.45748C16.6051 6.71248 16.9651 7.82248 15.8626 8.91748L14.0026 10.7775C13.6876 11.0925 13.5151 11.7 13.6126 12.135L14.1451 14.4375C14.5651 16.26 13.5976 16.965 11.9851 16.0125L9.74255 14.685C9.33755 14.445 8.67005 14.445 8.25755 14.685L6.01505 16.0125C4.41005 16.965 3.43505 16.2525 3.85505 14.4375L4.38755 12.135C4.48505 11.7 4.31255 11.0925 3.99755 10.7775L2.13755 8.91748C1.04255 7.82248 1.39505 6.71248 2.92505 6.45748L5.31755 6.05998C5.71505 5.99248 6.19505 5.63998 6.37505 5.27248L7.69505 2.63248C8.41505 1.19998 9.58505 1.19998 10.2976 2.63248Z"
                        stroke="var(--secondary-color)"
                        strokeWidth="1.125"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="navLink__name">Starred</p>
                </div>
              </div>
            </Link> */}
						<Link
							to={`/organization/${organization?.organization}/sent`}
							onClick={() => dispatch(setStartReading(false))}
							className={
								pathname === `/sent` ? `active navLink` : `inactive navLink`
							}
						>
							<div
								className={
									pathname === `/sent`
										? `active navLink-inside`
										: `inactive navLink-inside`
								}
							>
								<div className="details">
									<div className="navLink__icon">
										<svg
											width="18"
											height="18"
											viewBox="0 0 18 18"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M5.55001 4.74012L11.9175 2.61762C14.775 1.66512 16.3275 3.22512 15.3825 6.08262L13.26 12.4501C11.835 16.7326 9.49501 16.7326 8.07001 12.4501L7.44001 10.5601L5.55001 9.93012C1.26751 8.50512 1.26751 6.17262 5.55001 4.74012Z"
												stroke="var(--secondary-color)"
												strokeWidth="1.125"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M7.58252 10.2374L10.2675 7.54492"
												stroke="var(--secondary-color)"
												strokeWidth="1.125"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</div>
									<p className="navLink__name">Sent</p>
								</div>
							</div>
						</Link>
						<Link
							to={`/organization/${organization?.organization}/drafts`}
							onClick={() => dispatch(setStartReading(false))}
							className={
								pathname === `/drafts` ? `active navLink` : `inactive navLink`
							}
						>
							<div
								className={
									pathname === `/drafts`
										? `active navLink-inside`
										: `inactive navLink-inside`
								}
							>
								<div className="details">
									<div className="navLink__icon">
										<svg
											width="18"
											height="18"
											viewBox="0 0 18 18"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M16.5 7.5V11.25C16.5 15 15 16.5 11.25 16.5H6.75C3 16.5 1.5 15 1.5 11.25V6.75C1.5 3 3 1.5 6.75 1.5H10.5"
												stroke="var(--secondary-color)"
												strokeWidth="1.125"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M16.5 7.5H13.5C11.25 7.5 10.5 6.75 10.5 4.5V1.5L16.5 7.5Z"
												stroke="var(--secondary-color)"
												strokeWidth="1.125"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M5.25 9.75H9.75"
												stroke="var(--secondary-color)"
												strokeWidth="1.125"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M5.25 12.75H8.25"
												stroke="var(--secondary-color)"
												strokeWidth="1.125"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</div>
									<p className="navLink__name">Drafts</p>
								</div>
							</div>
						</Link>
						<Link
							to={`/organization/${organization?.organization}/spam`}
							onClick={() => dispatch(setStartReading(false))}
							className={
								pathname === `/spam` ? `active navLink` : `inactive navLink`
							}
						>
							<div
								className={
									pathname === `/spam`
										? `active navLink-inside`
										: `inactive navLink-inside`
								}
							>
								<div className="details">
									<div className="navLink__icon">
										<svg
											width="18"
											height="18"
											viewBox="0 0 18 18"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M9 5.8125V9.75"
												stroke="var(--secondary-color)"
												strokeWidth="1.125"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M15.81 6.43503V11.565C15.81 12.405 15.36 13.185 14.6325 13.6125L10.1775 16.185C9.45002 16.605 8.55 16.605 7.815 16.185L3.36 13.6125C2.6325 13.1925 2.1825 12.4125 2.1825 11.565V6.43503C2.1825 5.59503 2.6325 4.81499 3.36 4.38749L7.815 1.815C8.5425 1.395 9.44252 1.395 10.1775 1.815L14.6325 4.38749C15.36 4.81499 15.81 5.58753 15.81 6.43503Z"
												stroke="var(--secondary-color)"
												strokeWidth="1.125"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M9 12.1504V12.2254"
												stroke="var(--secondary-color)"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</div>
									<p className="navLink__name">Spam</p>
								</div>
							</div>
						</Link>
						<Link
							to={`/organization/${organization?.organization}/trash`}
							onClick={() => dispatch(setStartReading(false))}
							className={
								pathname === `//trash` ? `active navLink` : `inactive navLink`
							}
						>
							<div
								className={
									pathname === `/trash`
										? `active navLink-inside`
										: `inactive navLink-inside`
								}
							>
								<div className="details">
									<div className="navLink__icon">
										<svg
											width="18"
											height="18"
											viewBox="0 0 18 18"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M15.75 4.48486C13.2525 4.23736 10.74 4.10986 8.235 4.10986C6.75 4.10986 5.265 4.18486 3.78 4.33486L2.25 4.48486"
												stroke="var(--secondary-color)"
												strokeWidth="1.125"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M6.375 3.7275L6.54 2.745C6.66 2.0325 6.75 1.5 8.0175 1.5H9.9825C11.25 1.5 11.3475 2.0625 11.46 2.7525L11.625 3.7275"
												stroke="var(--secondary-color)"
												strokeWidth="1.125"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M14.1375 6.85498L13.65 14.4075C13.5675 15.585 13.5 16.5 11.4075 16.5H6.59255C4.50005 16.5 4.43255 15.585 4.35005 14.4075L3.86255 6.85498"
												stroke="var(--secondary-color)"
												strokeWidth="1.125"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M7.74744 12.375H10.2449"
												stroke="var(--secondary-color)"
												strokeWidth="1.125"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M7.125 9.375H10.875"
												stroke="var(--secondary-color)"
												strokeWidth="1.125"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</div>
									<p className="navLink__name">Trash</p>
								</div>
							</div>
						</Link>
						{/* <Link
							to={`/organization/${organization?.organization}/teamchat`}
							className={
								pathname === `/teamchat` ? `active navLink` : `inactive navLink`
							}
						>
							<div
								className={
									pathname === `/teamchat`
										? `active navLink-inside`
										: `inactive navLink-inside`
								}
							>
								<div className="details">
									<div className="navLink__icon">
										<svg
											width="18"
											height="18"
											viewBox="0 0 18 18"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M13.485 8.09251V11.0925C13.485 11.2875 13.4775 11.475 13.455 11.655C13.2825 13.68 12.09 14.685 9.8925 14.685H9.59251C9.40501 14.685 9.225 14.775 9.1125 14.925L8.21251 16.125C7.81501 16.6575 7.17 16.6575 6.7725 16.125L5.87249 14.925C5.77499 14.7975 5.5575 14.685 5.3925 14.685H5.09251C2.70001 14.685 1.5 14.0925 1.5 11.0925V8.09251C1.5 5.89501 2.51251 4.70251 4.53001 4.53001C4.71001 4.50751 4.89751 4.5 5.09251 4.5H9.8925C12.285 4.5 13.485 5.70001 13.485 8.09251Z"
												stroke="var(--secondary-color)"
												strokeWidth="1.125"
												strokeMiterlimit="10"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M16.485 5.09251V8.09251C16.485 10.2975 15.4725 11.4825 13.455 11.655C13.4775 11.475 13.485 11.2875 13.485 11.0925V8.09251C13.485 5.70001 12.285 4.5 9.89252 4.5H5.09253C4.89753 4.5 4.71003 4.50751 4.53003 4.53001C4.70253 2.51251 5.89503 1.5 8.09253 1.5H12.8925C15.285 1.5 16.485 2.70001 16.485 5.09251Z"
												stroke="var(--secondary-color)"
												strokeWidth="1.125"
												strokeMiterlimit="10"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M10.1216 9.9375H10.1284"
												stroke="var(--secondary-color)"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M7.49662 9.9375H7.50337"
												stroke="var(--secondary-color)"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M4.87162 9.9375H4.87837"
												stroke="var(--secondary-color)"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</div>
									<p className="navLink__name">Team chat</p>
								</div>
							</div>
						</Link> */}
						<Link
							to={`/organization/${organization?.organization}/list-management`}
							className={
								pathname === `/list-management`
									? `active navLink`
									: `inactive navLink`
							}
						>
							<div
								className={
									pathname === `/list-management`
										? `active navLink-inside`
										: `inactive navLink-inside`
								}
							>
								<div className="details">
									<div className="navLink__icon">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="18"
											height="18"
											viewBox="0 0 18 18"
											fill="none"
										>
											<path
												d="M15.75 15.1875H8.25C7.9425 15.1875 7.6875 14.9325 7.6875 14.625C7.6875 14.3175 7.9425 14.0625 8.25 14.0625H15.75C16.0575 14.0625 16.3125 14.3175 16.3125 14.625C16.3125 14.9325 16.0575 15.1875 15.75 15.1875Z"
												fill="var(--secondary-color)"
											/>
											<path
												d="M15.75 9.9375H8.25C7.9425 9.9375 7.6875 9.6825 7.6875 9.375C7.6875 9.0675 7.9425 8.8125 8.25 8.8125H15.75C16.0575 8.8125 16.3125 9.0675 16.3125 9.375C16.3125 9.6825 16.0575 9.9375 15.75 9.9375Z"
												fill="var(--secondary-color)"
											/>
											<path
												d="M15.75 4.6875H8.25C7.9425 4.6875 7.6875 4.4325 7.6875 4.125C7.6875 3.8175 7.9425 3.5625 8.25 3.5625H15.75C16.0575 3.5625 16.3125 3.8175 16.3125 4.125C16.3125 4.4325 16.0575 4.6875 15.75 4.6875Z"
												fill="var(--secondary-color)"
											/>
											<path
												d="M2.99996 5.43758C2.85746 5.43758 2.71496 5.38508 2.60246 5.27258L1.85246 4.52258C1.63496 4.30508 1.63496 3.94508 1.85246 3.72758C2.06996 3.51008 2.42996 3.51008 2.64746 3.72758L2.99996 4.08008L4.85246 2.22758C5.06996 2.01008 5.42996 2.01008 5.64746 2.22758C5.86496 2.44508 5.86496 2.80508 5.64746 3.02258L3.39746 5.27258C3.28496 5.38508 3.14246 5.43758 2.99996 5.43758Z"
												fill="var(--secondary-color)"
											/>
											<path
												d="M2.99996 10.6876C2.85746 10.6876 2.71496 10.6351 2.60246 10.5226L1.85246 9.77258C1.63496 9.55508 1.63496 9.19508 1.85246 8.97758C2.06996 8.76008 2.42996 8.76008 2.64746 8.97758L2.99996 9.33008L4.85246 7.47758C5.06996 7.26008 5.42996 7.26008 5.64746 7.47758C5.86496 7.69508 5.86496 8.05508 5.64746 8.27258L3.39746 10.5226C3.28496 10.6351 3.14246 10.6876 2.99996 10.6876Z"
												fill="var(--secondary-color)"
											/>
											<path
												d="M2.99996 15.9376C2.85746 15.9376 2.71496 15.8851 2.60246 15.7726L1.85246 15.0226C1.63496 14.8051 1.63496 14.4451 1.85246 14.2276C2.06996 14.0101 2.42996 14.0101 2.64746 14.2276L2.99996 14.5801L4.85246 12.7276C5.06996 12.5101 5.42996 12.5101 5.64746 12.7276C5.86496 12.9451 5.86496 13.3051 5.64746 13.5226L3.39746 15.7726C3.28496 15.8851 3.14246 15.9376 2.99996 15.9376Z"
												fill="var(--secondary-color)"
											/>
										</svg>
									</div>
									<p className="navLink__name">List management</p>
								</div>
							</div>
						</Link>
						<Link
							to={`/organization/${organization?.organization}/campaigns`}
							className={
								pathname.includes('campaign')
									? `active navLink`
									: `inactive navLink`
							}
						>
							<div
								className={
									pathname.includes('campaign')
										? `active navLink-inside`
										: `inactive navLink-inside`
								}
							>
								<div className="details">
									<div className="navLink__icon">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="17"
											height="18"
											viewBox="0 0 17 18"
											fill="none"
										>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M1.77081 7.0932L10.5471 4.80457V13.1955L6.97635 12.2144C7.03566 13.0956 6.38767 13.8659 5.5094 13.9583C4.61493 13.8616 3.96243 13.0667 4.04173 12.1705V11.5606L1.77081 10.9068V7.0932Z"
												stroke="var(--secondary-color)"
												strokeWidth="1.0625"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M15.2291 9.11121C15.5225 9.11121 15.7604 8.87335 15.7604 8.57996C15.7604 8.28657 15.5225 8.04871 15.2291 8.04871V9.11121ZM13.9088 8.04871C13.6154 8.04871 13.3776 8.28657 13.3776 8.57996C13.3776 8.87335 13.6154 9.11121 13.9088 9.11121V8.04871ZM13.3041 12.7293C13.5102 12.9381 13.8465 12.9402 14.0554 12.7341C14.2642 12.528 14.2663 12.1917 14.0602 11.9829L13.3041 12.7293ZM13.128 11.0387C12.9219 10.8298 12.5856 10.8277 12.3768 11.0338C12.1679 11.24 12.1658 11.5763 12.3719 11.7851L13.128 11.0387ZM14.0613 5.17806C14.2677 4.96943 14.2657 4.63306 14.0571 4.42677C13.8485 4.22049 13.5121 4.22239 13.3058 4.43102L14.0613 5.17806ZM12.3722 5.37523C12.1659 5.58387 12.1678 5.92023 12.3765 6.12652C12.5851 6.33281 12.9215 6.33091 13.1277 6.12227L12.3722 5.37523ZM11.0783 13.1955C11.0783 12.9021 10.8405 12.6642 10.5471 12.6642C10.2537 12.6642 10.0158 12.9021 10.0158 13.1955H11.0783ZM10.0158 13.9583C10.0158 14.2517 10.2537 14.4896 10.5471 14.4896C10.8405 14.4896 11.0783 14.2517 11.0783 13.9583H10.0158ZM10.0158 4.80454C10.0158 5.09794 10.2537 5.33579 10.5471 5.33579C10.8405 5.33579 11.0783 5.09794 11.0783 4.80454H10.0158ZM11.0783 4.04167C11.0783 3.74827 10.8405 3.51042 10.5471 3.51042C10.2537 3.51042 10.0158 3.74827 10.0158 4.04167H11.0783ZM1.23956 7.09317C1.23956 7.38657 1.47741 7.62442 1.77081 7.62442C2.06421 7.62442 2.30206 7.38657 2.30206 7.09317H1.23956ZM2.30206 6.33029C2.30206 6.03689 2.06421 5.79904 1.77081 5.79904C1.47741 5.79904 1.23956 6.03689 1.23956 6.33029H2.30206ZM1.23956 11.6697C1.23956 11.9631 1.47741 12.201 1.77081 12.201C2.06421 12.201 2.30206 11.9631 2.30206 11.6697H1.23956ZM2.30206 10.9068C2.30206 10.6134 2.06421 10.3756 1.77081 10.3756C1.47741 10.3756 1.23956 10.6134 1.23956 10.9068H2.30206ZM4.15725 11.0421C3.87087 10.9783 3.58699 11.1587 3.52319 11.4451C3.45939 11.7315 3.63983 12.0154 3.92621 12.0792L4.15725 11.0421ZM6.86083 12.733C7.1472 12.7967 7.4311 12.6163 7.49493 12.3299C7.55868 12.0436 7.37826 11.7597 7.09188 11.6958L6.86083 12.733ZM15.2291 8.04871H13.9088V9.11121H15.2291V8.04871ZM14.0602 11.9829L13.128 11.0387L12.3719 11.7851L13.3041 12.7293L14.0602 11.9829ZM13.3058 4.43102L12.3722 5.37523L13.1277 6.12227L14.0613 5.17806L13.3058 4.43102ZM10.0158 13.1955V13.9583H11.0783V13.1955H10.0158ZM11.0783 4.80454V4.04167H10.0158V4.80454H11.0783ZM2.30206 7.09317V6.33029H1.23956V7.09317H2.30206ZM2.30206 11.6697V10.9068H1.23956V11.6697H2.30206ZM3.92621 12.0792L6.86083 12.733L7.09188 11.6958L4.15725 11.0421L3.92621 12.0792Z"
												fill="var(--secondary-color)"
											/>
										</svg>
									</div>
									<p className="navLink__name">Campaigns</p>
								</div>
							</div>
						</Link>
						<Link
							to={`/organization/${organization?.organization}/tools`}
							className={
								pathname === `/tools` ? `active navLink` : `inactive navLink`
							}
						>
							<div
								className={
									pathname === `/tools`
										? `active navLink-inside`
										: `inactive navLink-inside`
								}
							>
								<div className="details">
									<div className="navLink__icon">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 16 16"
											fill="none"
										>
											<path
												d="M13 6.81333V12.6667C13 14 12.6667 14.6667 11 14.6667H5C3.33333 14.6667 3 14 3 12.6667V6.81333"
												stroke="var(--secondary-color)"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M3.33331 1.33334H12.6666C14 1.33334 14.6666 2 14.6666 3.33334V4.66667C14.6666 6 14 6.66667 12.6666 6.66667H3.33331C1.99998 6.66667 1.33331 6 1.33331 4.66667V3.33334C1.33331 2 1.99998 1.33334 3.33331 1.33334Z"
												stroke="var(--secondary-color)"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M6.78668 9.33334H9.21335"
												stroke="var(--secondary-color)"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</div>
									<p className="navLink__name">Tools</p>
								</div>
							</div>
						</Link>
					</div>
					<div className={'organization__bottom'}>
						{/* <div className="team-members">
              <div className="team-members__title">
                Team members{" "}
                {organization.members.length > 0 && (
                  <span className="count">{organization.members.length}</span>
                )}{" "}
              </div>
              {isLoading ? (
                <ButtonSpinner />
              ) : (
                <div className="team-members__list">
                  {members.length > 4
                    ? members
                        .slice(0, 4)
                        .map((member) => (
                          <GenerateImage
                            className="img"
                            key={member.id}
                            name={member.name}
                            bgColorList={[
                              "#205e58",
                              "#F2994A",
                              "#EB5757",
                              "#037fff",
                            ]}
                          />
                        ))
                    : members.map((member) => (
                        <GenerateImage
                          className="img"
                          name={member.name}
                          key={member.id}
                          bgColorList={[
                            "#205e58",
                            "#F2994A",
                            "#EB5757",
                            "#037fff",
                          ]}
                        />
                      ))}{" "}
                  {members.length > 4 && (
                    <span className="more-members">+{members.length - 4}</span>
                  )}
                </div>
              )}
              <div className="add-members" onClick={addMember}>
                <FaPlus className="add" />
                <p>Add new members</p>
              </div>
            </div> */}
					</div>
				</div>
			</div>
			<div className="children">{children}</div>
		</div>
	);
}

export default Sidebar;
