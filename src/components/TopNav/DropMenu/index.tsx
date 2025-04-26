import DarkTheme from '@/components/DarkTheme';
import { Link } from 'react-router-dom';
import { LogoutUser } from '../../../redux/features/userSlice/service';
import { dispatch, useAppSelector } from '../../../redux/store';
import UserInfo from '../../UserInfo';
import './dropmenu.scss';

interface props {
	open: boolean;
}
function DropDownMenu({ open }: props) {
	const { admin } = useAppSelector((state) => state.user);
	const logout = () => {
		dispatch(LogoutUser);
	};
	return (
		<div className={`dropdown-menu ${open ? 'open' : ''}`}>
			<div className="animate-height">
				<UserInfo name={admin.name} email={admin.email} />
				<Link to="/account-settings" className="account-settings">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 18 18"
						fill="none"
					>
						<path
							d="M9.09004 9.58437C9.03754 9.57687 8.97004 9.57687 8.91004 9.58437C7.59004 9.53937 6.54004 8.45938 6.54004 7.13188C6.54004 5.77438 7.63504 4.67188 9.00004 4.67188C10.3575 4.67188 11.46 5.77438 11.46 7.13188C11.4525 8.45938 10.41 9.53937 9.09004 9.58437Z"
							stroke="var(--secondary-color)"
							strokeWidth="1.125"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M14.0551 14.5349C12.7201 15.7574 10.9501 16.4999 9.00007 16.4999C7.05007 16.4999 5.28007 15.7574 3.94507 14.5349C4.02007 13.8299 4.47007 13.1399 5.27257 12.5999C7.32757 11.2349 10.6876 11.2349 12.7276 12.5999C13.5301 13.1399 13.9801 13.8299 14.0551 14.5349Z"
							stroke="var(--secondary-color)"
							strokeWidth="1.125"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z"
							stroke="var(--secondary-color)"
							strokeWidth="1.125"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					<p>Account settings</p>
				</Link>
				<ul className="dropdown-list">
					<div className="list-item">
						<Link to="#">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 18 18"
								fill="none"
							>
								<path
									d="M14.9774 7.5H2.97742V13.5C2.97742 15.75 3.72742 16.5 5.97742 16.5H11.9774C14.2274 16.5 14.9774 15.75 14.9774 13.5V7.5Z"
									stroke="var(--secondary-color)"
									strokeWidth="1.125"
									strokeMiterlimit="10"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M16.125 5.25V6C16.125 6.825 15.7275 7.5 14.625 7.5H3.375C2.2275 7.5 1.875 6.825 1.875 6V5.25C1.875 4.425 2.2275 3.75 3.375 3.75H14.625C15.7275 3.75 16.125 4.425 16.125 5.25Z"
									stroke="var(--secondary-color)"
									strokeWidth="1.125"
									strokeMiterlimit="10"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M8.72996 3.75008H4.58996C4.33496 3.47258 4.34246 3.04508 4.61246 2.77508L5.67746 1.71008C5.95496 1.43258 6.41246 1.43258 6.68996 1.71008L8.72996 3.75008Z"
									stroke="var(--secondary-color)"
									strokeWidth="1.125"
									strokeMiterlimit="10"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M13.4025 3.75008H9.26245L11.3025 1.71008C11.58 1.43258 12.0375 1.43258 12.315 1.71008L13.38 2.77508C13.65 3.04508 13.6575 3.47258 13.4025 3.75008Z"
									stroke="var(--secondary-color)"
									strokeWidth="1.125"
									strokeMiterlimit="10"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M6.70496 7.5V11.355C6.70496 11.955 7.36496 12.3075 7.86746 11.985L8.57246 11.52C8.82746 11.355 9.14996 11.355 9.39746 11.52L10.065 11.97C10.56 12.3 11.2275 11.9475 11.2275 11.3475V7.5H6.70496Z"
									stroke="var(--secondary-color)"
									strokeWidth="1.125"
									strokeMiterlimit="10"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							<p>Bonus</p>
						</Link>
					</div>
					<div className="list-item">
						{' '}
						<Link to="/reseller">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 18 18"
								fill="none"
							>
								<path
									d="M5.16003 13.613V12.0605"
									stroke="var(--secondary-color)"
									strokeWidth="1.125"
									strokeLinecap="round"
								/>
								<path
									d="M9 13.6128V10.5078"
									stroke="var(--secondary-color)"
									strokeWidth="1.125"
									strokeLinecap="round"
								/>
								<path
									d="M12.84 13.6123V8.94727"
									stroke="var(--secondary-color)"
									strokeWidth="1.125"
									strokeLinecap="round"
								/>
								<path
									d="M12.84 4.38672L12.495 4.79172C10.5825 7.02672 8.01753 8.60922 5.16003 9.32172"
									stroke="var(--secondary-color)"
									strokeWidth="1.125"
									strokeLinecap="round"
								/>
								<path
									d="M10.6425 4.38672H12.84V6.57672"
									stroke="var(--secondary-color)"
									strokeWidth="1.125"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M6.75 16.5H11.25C15 16.5 16.5 15 16.5 11.25V6.75C16.5 3 15 1.5 11.25 1.5H6.75C3 1.5 1.5 3 1.5 6.75V11.25C1.5 15 3 16.5 6.75 16.5Z"
									stroke="var(--secondary-color)"
									strokeWidth="1.125"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							<p>Reseller</p>
						</Link>
					</div>
					<div className="list-item">
						<Link to="/help/tutorials">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 18 18"
								fill="none"
							>
								<path
									d="M4.42493 12.75H13.5674C14.9924 12.75 15.7424 12 15.7424 10.575V1.5H2.24243V10.575C2.24993 12 2.99993 12.75 4.42493 12.75Z"
									stroke="var(--secondary-color)"
									strokeWidth="1.125"
									strokeMiterlimit="10"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M1.5 1.5H16.5"
									stroke="var(--secondary-color)"
									strokeWidth="1.125"
									strokeMiterlimit="10"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M6 16.5L9 15V12.75"
									stroke="var(--secondary-color)"
									strokeWidth="1.125"
									strokeMiterlimit="10"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M12 16.5L9 15"
									stroke="var(--secondary-color)"
									strokeWidth="1.125"
									strokeMiterlimit="10"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M5.625 8.25L7.9875 6.2775C8.175 6.12 8.4225 6.165 8.55 6.375L9.45 7.875C9.5775 8.085 9.825 8.1225 10.0125 7.9725L12.375 6"
									stroke="var(--secondary-color)"
									strokeWidth="1.125"
									strokeMiterlimit="10"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							<p>Tutorials</p>
						</Link>
					</div>
					<div className="list-item">
						{' '}
						<Link to="/help/resources">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 18 18"
								fill="none"
							>
								<path
									d="M16.5 12.5543V3.50179C16.5 2.60179 15.765 1.93429 14.8725 2.00929H14.8275C13.2525 2.14429 10.86 2.94679 9.525 3.78679L9.3975 3.86929C9.18 4.00429 8.82 4.00429 8.6025 3.86929L8.415 3.75679C7.08 2.92429 4.695 2.12929 3.12 2.00179C2.2275 1.92679 1.5 2.60179 1.5 3.49429V12.5543C1.5 13.2743 2.085 13.9493 2.805 14.0393L3.0225 14.0693C4.65 14.2868 7.1625 15.1118 8.6025 15.8993L8.6325 15.9143C8.835 16.0268 9.1575 16.0268 9.3525 15.9143C10.7925 15.1193 13.3125 14.2868 14.9475 14.0693L15.195 14.0393C15.915 13.9493 16.5 13.2743 16.5 12.5543Z"
									stroke="var(--secondary-color)"
									strokeWidth="1.125"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M9 4.11719V15.3672"
									stroke="var(--secondary-color)"
									strokeWidth="1.125"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M5.8125 6.36719H4.125"
									stroke="var(--secondary-color)"
									strokeWidth="1.125"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M6.375 8.61719H4.125"
									stroke="var(--secondary-color)"
									strokeWidth="1.125"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							<p>Resources</p>
						</Link>
					</div>
					<div className="list-item">
						<Link to="/white-label">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 18 18"
								fill="none"
							>
								<path
									d="M12.615 1.5H5.38499C3.78749 1.5 2.48999 2.805 2.48999 4.395V14.9625C2.48999 16.3125 3.45749 16.8825 4.64249 16.23L8.30249 14.1975C8.69249 13.98 9.32249 13.98 9.70499 14.1975L13.365 16.23C14.55 16.89 15.5175 16.32 15.5175 14.9625V4.395C15.51 2.805 14.2125 1.5 12.615 1.5Z"
									stroke="var(--secondary-color)"
									strokeWidth="1.125"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M7.1925 8.25L8.3175 9.375L11.3175 6.375"
									stroke="var(--secondary-color)"
									strokeWidth="1.125"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							<p>White label</p>
						</Link>
					</div>
					<div className="list-item">
						<Link to="#">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 18 18"
								fill="none"
							>
								<path
									d="M12.75 13.8223H9.75L6.41249 16.0423C5.91749 16.3723 5.25 16.0198 5.25 15.4198V13.8223C3 13.8223 1.5 12.3223 1.5 10.0723V5.57227C1.5 3.32227 3 1.82227 5.25 1.82227H12.75C15 1.82227 16.5 3.32227 16.5 5.57227V10.0723C16.5 12.3223 15 13.8223 12.75 13.8223Z"
									stroke="var(--secondary-color)"
									strokeWidth="1.125"
									strokeMiterlimit="10"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M8.99998 8.51953V8.36206C8.99998 7.85206 9.315 7.58205 9.63 7.36455C9.9375 7.15455 10.245 6.88456 10.245 6.38956C10.245 5.69956 9.68998 5.14453 8.99998 5.14453C8.30998 5.14453 7.755 5.69956 7.755 6.38956"
									stroke="var(--secondary-color)"
									strokeWidth="1.125"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M8.99662 10.3125H9.00337"
									stroke="var(--secondary-color)"
									strokeWidth="1.125"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							<p>Help centre</p>
						</Link>
					</div>
				</ul>
				<div className="theme-accessbility">
					<p>Theme</p>
					<DarkTheme />
				</div>

				<div className="logout" onClick={logout}>
					Logout
					<svg
						width="800px"
						height="800px"
						viewBox="0 -0.5 25 25"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M11.75 9.874C11.75 10.2882 12.0858 10.624 12.5 10.624C12.9142 10.624 13.25 10.2882 13.25 9.874H11.75ZM13.25 4C13.25 3.58579 12.9142 3.25 12.5 3.25C12.0858 3.25 11.75 3.58579 11.75 4H13.25ZM9.81082 6.66156C10.1878 6.48991 10.3542 6.04515 10.1826 5.66818C10.0109 5.29121 9.56615 5.12478 9.18918 5.29644L9.81082 6.66156ZM5.5 12.16L4.7499 12.1561L4.75005 12.1687L5.5 12.16ZM12.5 19L12.5086 18.25C12.5029 18.25 12.4971 18.25 12.4914 18.25L12.5 19ZM19.5 12.16L20.2501 12.1687L20.25 12.1561L19.5 12.16ZM15.8108 5.29644C15.4338 5.12478 14.9891 5.29121 14.8174 5.66818C14.6458 6.04515 14.8122 6.48991 15.1892 6.66156L15.8108 5.29644ZM13.25 9.874V4H11.75V9.874H13.25ZM9.18918 5.29644C6.49843 6.52171 4.7655 9.19951 4.75001 12.1561L6.24999 12.1639C6.26242 9.79237 7.65246 7.6444 9.81082 6.66156L9.18918 5.29644ZM4.75005 12.1687C4.79935 16.4046 8.27278 19.7986 12.5086 19.75L12.4914 18.25C9.08384 18.2892 6.28961 15.5588 6.24995 12.1513L4.75005 12.1687ZM12.4914 19.75C16.7272 19.7986 20.2007 16.4046 20.2499 12.1687L18.7501 12.1513C18.7104 15.5588 15.9162 18.2892 12.5086 18.25L12.4914 19.75ZM20.25 12.1561C20.2345 9.19951 18.5016 6.52171 15.8108 5.29644L15.1892 6.66156C17.3475 7.6444 18.7376 9.79237 18.75 12.1639L20.25 12.1561Z"
							fill="red"
						/>
					</svg>
				</div>
			</div>
		</div>
	);
}

export default DropDownMenu;
