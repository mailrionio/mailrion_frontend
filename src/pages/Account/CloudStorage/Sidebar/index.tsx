import { useAppSelector } from '@/redux/store';
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import SearchInput from '../../../../components/SearchInput';
import HeadingEffect from '../../../../components/TransitionEffects/Heading';
import { useQueryParams } from '../../../../helpers';
import UploadFile from '../UploadFile';
import './sidebar.scss';

interface Props {
	children?: React.ReactNode;
	closeSidebar: () => void;
	toggleSidebar: boolean;
}

function Sidebar({ closeSidebar, toggleSidebar, children }: Props) {
	const { theme } = useAppSelector((state) => state.utils);
	const checkURL = useQueryParams('checkpoint');
	const navigate = useNavigate();

	const [uploadFile, setUploadFile] = useState(false);

	return (
		<div
			className={`account-sidebar ${toggleSidebar ? 'showSidebar' : ''} `}
			data-theme={theme}
		>
			{uploadFile && (
				<UploadFile
					handleClose={() => {
						setUploadFile(false);
						window.location.reload();
					}}
				/>
			)}
			<div className="sidebarBlurred" onClick={closeSidebar} />
			<div className={'organization_header'}>
				<div className="overflow-items">
					<div className={'organization_itemsFlex'}>
						<div className="organization-info storage-name">
							<div onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
								<div className="add_icon">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="var(--secondary-color)"
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
							</div>
							<HeadingEffect>
								<h3>Cloud Storage</h3>
							</HeadingEffect>
						</div>
						<div className="hide-on-desktop">
							<div className={'organization_header_logo_vs_closeIcon'}>
								<span className="SidebarSearch">
									<SearchInput />
								</span>
								<svg
									className={'SidebarcloseIcon'}
									onClick={closeSidebar}
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
										fill="var(--secondary-color)"
									/>
								</svg>
							</div>
						</div>
						<div className="uploadBtn">
							<div className="btn" onClick={() => setUploadFile(true)}>
								{' '}
								<FaPlus className="add_icon" />
								<p>Upload new file</p>
							</div>
						</div>
						<div className={'navLinks'}>
							<Link
								to={`/cloud-storage?checkpoint=all-files`}
								className={
									checkURL === `all-files`
										? `active navLink`
										: `inactive navLink`
								}
							>
								<div
									className={
										checkURL === `all-files`
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
													d="M16.5 8.25V12.75C16.5 15.75 15.75 16.5 12.75 16.5H5.25C2.25 16.5 1.5 15.75 1.5 12.75V5.25C1.5 2.25 2.25 1.5 5.25 1.5H6.375C7.5 1.5 7.7475 1.83 8.175 2.4L9.3 3.9C9.585 4.275 9.75 4.5 10.5 4.5H12.75C15.75 4.5 16.5 5.25 16.5 8.25Z"
													stroke="var(--secondary-color)"
													strokeWidth="1.5"
													strokeMiterlimit="10"
												/>
											</svg>
										</div>
										<p className="navLink__name">All files</p>
									</div>
								</div>
							</Link>
							{/* <Link
                to={`/cloud-storage?checkpoint=starred`}
                className={
                  pathname === `/cloud-storage?checkpoint=starred`
                    ? `active navLink`
                    : `inactive navLink`
                }
              >
                <div
                  className={
                    pathname === `/cloud-storage?checkpoint=starred`
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
								to={`/cloud-storage?checkpoint=trash`}
								className={
									checkURL === `trash` ? `active navLink` : `inactive navLink`
								}
							>
								<div
									className={
										checkURL === `trash`
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
													d="M15.75 4.48438C13.2525 4.23687 10.74 4.10938 8.235 4.10938C6.75 4.10938 5.265 4.18438 3.78 4.33438L2.25 4.48438"
													stroke="var(--secondary-color)"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
												<path
													d="M6.375 3.7275L6.54 2.745C6.66 2.0325 6.75 1.5 8.0175 1.5H9.9825C11.25 1.5 11.3475 2.0625 11.46 2.7525L11.625 3.7275"
													stroke="var(--secondary-color)"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
												<path
													d="M14.1375 6.85547L13.65 14.408C13.5675 15.5855 13.5 16.5005 11.4075 16.5005H6.59249C4.49999 16.5005 4.43249 15.5855 4.34999 14.408L3.86249 6.85547"
													stroke="var(--secondary-color)"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
												<path
													d="M7.7475 12.375H10.245"
													stroke="var(--secondary-color)"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
												<path
													d="M7.125 9.375H10.875"
													stroke="var(--secondary-color)"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</div>
										<p className="navLink__name">Trash</p>
									</div>
								</div>
							</Link>
						</div>
					</div>
					<div className={'organization__bottom storage'}>
						<div className="storage__img">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
							>
								<path
									d="M6 6.25V8.25"
									stroke="var(--secondary-color)"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M10 6.25V8.25"
									stroke="var(--secondary-color)"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
									stroke="var(--secondary-color)"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M6 16V18"
									stroke="var(--secondary-color)"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M10 16V18"
									stroke="var(--secondary-color)"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M14 7.25H18"
									stroke="var(--secondary-color)"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M14 17H18"
									stroke="var(--secondary-color)"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M2 12H22"
									stroke="var(--secondary-color)"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
						<div className="storage__info">
							<h3>Storage</h3>
							<div className="storage__info__progress-bar"></div>
							<p>
								<span>8.32GB</span> of 32GB used
							</p>
							<div className="storage__info__btn">Upgrade</div>
						</div>
					</div>
				</div>
			</div>
			<div className="children">{children}</div>
		</div>
	);
}

export default Sidebar;
