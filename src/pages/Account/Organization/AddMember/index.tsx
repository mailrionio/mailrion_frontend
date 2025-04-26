import { useAppSelector } from '@/redux/store';
import { ChangeEvent, useState } from 'react';
import Button from '../../../../components/Button';
import ButtonSpinner from '../../../../components/ButtonSpiner';
import Checkbox from '../../../../components/CheckBox';
import GeneralModal from '../../../../components/GeneralModal';
import InputField from '../../../../components/InputField';
import Toast from '../../../../components/Toast';
import {
	AddMemberToOrg,
	MakePrimaryEmail,
	ToggleMemberStatus,
} from '../../../../redux/features/OrganizationSlice/services';

interface props {
	orgId: string;
	orgHost: string;
	handleClose: () => void;
}
const AddMember = ({ handleClose, orgId, orgHost }: props) => {
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [togglePassword, setTogglePassword] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [makeAdmin, setMakeAdmin] = useState<boolean>(false);
	const [alt_email, setAlt_email] = useState<string>('');
	const { members } = useAppSelector((state) => state.organization);

	const handleAddMember = async (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		if (!name || !email || !password || !alt_email) {
			Toast({ type: 'error', message: 'All fields are required' });
			setLoading(false);
			return;
		}
		if (password.length < 8) {
			Toast({
				type: 'error',
				message: 'Password should be at least 8 characters long',
			});
			setLoading(false);
			return;
		}

		const memberData = {
			name,
			email: `${email}@${orgHost}`,
			alternate_email: alt_email,
			password,
		};

		const addMemberRes = await AddMemberToOrg(memberData, orgId);
		// Check the result of the first API call
		if (addMemberRes?.status === 201) {
			if (makeAdmin) {
				await MakePrimaryEmail({
					email: `${email}@${orgHost}`,
					alternate_email: alt_email,
					status: 1,
				}).then(async (res) => {
					if (res?.status === 200) {
						// set back other emails in that organization members to 0
						for (const member of members) {
							const memberInfo = {
								email: member.email,
								status: '0',
							};
							await ToggleMemberStatus(memberInfo);
						}
					}
				});
			}

			handleClose();
		} else {
			setLoading(false);
		}

		setLoading(false);
	};

	return (
		<GeneralModal
			title="Add team member"
			subTitle="Member details"
			width="600px"
			height={'450px'}
			handleClose={handleClose}
		>
			<form onSubmit={handleAddMember}>
				<InputField
					handleChange={(e) => setName(e.target.value)}
					name="name"
					classes={''}
					value={name}
					placeholder="Member name"
					label="Name"
					required={true}
					type="text"
				/>
				<div
					className="usermail"
					style={{
						marginTop: '10px',
					}}
				>
					<label
						htmlFor=""
						style={{
							marginBottom: '5px',
							color: '#344054',
							fontSize: '14px',
							fontWeight: '500',
							lineHeight: '20px',
						}}
					>
						Email
					</label>
					<div
						className="input-wrapper"
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							border: '1px solid #E0E0E0',
							borderRadius: '4px',
							padding: '12px 10px',
							height: '40px',
						}}
					>
						<input
							style={{
								border: 'none',
								outline: 'none',
								width: '40%',
								fontSize: '14px',
								fontWeight: '500',
								lineHeight: '20px',
							}}
							type="text"
							name="email"
							id=""
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Member email"
							required
							autoComplete="off"
						/>
						<span
							style={{
								color: '#344054',
								fontSize: '14px',
								fontWeight: '500',
								lineHeight: '20px',
							}}
						>
							@{orgHost}
						</span>
					</div>
				</div>
				<InputField
					handleChange={(e) => setAlt_email(e.target.value)}
					name="alt_email"
					classes={''}
					value={alt_email}
					placeholder="Member name"
					label="Alternate Email"
					required={true}
					type="text"
				/>
				<InputField
					handleChange={(e) => setPassword(e.target.value)}
					name="password"
					classes={''}
					value={password}
					placeholder="Member password"
					label="Password"
					required={true}
					type={togglePassword ? 'text' : 'password'}
					togglePassword={() => setTogglePassword(!togglePassword)}
				/>
				<div className="make-admin items-center mt-1">
					<Checkbox
						checkedState={makeAdmin}
						onChange={() => setMakeAdmin(true)}
						htmlfor="makeAdmin"
					/>
					<label className="ml-1 color-primary" htmlFor="makeAdmin">
						Make primary email
					</label>
				</div>
				<div
					className="member-btns"
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<div />
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<Button text="Cancel" className="outline" onClick={handleClose} />
						{loading ? (
							<ButtonSpinner />
						) : (
							<Button text="Done" className="" type="submit" />
						)}
					</div>
				</div>
			</form>
		</GeneralModal>
	);
};

export default AddMember;
