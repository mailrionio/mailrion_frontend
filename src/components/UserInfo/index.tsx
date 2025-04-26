import { FC } from 'react';
import { Link } from 'react-router-dom';
import { getFirstLetters } from '../../helpers';
import './userinfo.scss';
interface IuserProps {
	image?: string;
	name: string;
	email: string;
	cc?: string;
	to?: string;
}

const UserInfo: FC<IuserProps> = ({ image, to, name, email, cc }) => {
	return (
		<Link to={to ? to : '/account-settings'} className="userInfo">
			<div className="user_img">
				{image === undefined || image === '' ? (
					getFirstLetters(name)
				) : (
					<img src={image} alt={name} />
				)}
			</div>
			<div className="user__name">
				<h3
					style={{
						fontWeight: 'bold',
					}}
				>
					{name && name}
				</h3>
				<p>{email && email}</p>
				{cc && <span>cc: {cc}</span>}
			</div>
		</Link>
	);
};

export default UserInfo;
