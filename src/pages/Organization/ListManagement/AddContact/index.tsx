/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/Button';
import ButtonSpinner from '@/components/ButtonSpiner';
import { SelectSingleFile } from '@/components/DragNdrop';
import GeneralModal from '@/components/GeneralModal';
import Toast from '@/components/Toast';
import HeadingEffect from '@/components/TransitionEffects/Heading';
import usePageMetadata from '@/components/UsePageMetadata';
import {
	AddContactsManually,
	AddContactsViaExcel,
} from '@/redux/features/ListManagement/services';
import { useAppSelector } from '@/redux/store';
import { useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { Link, useNavigate, useParams } from 'react-router-dom';

interface Contact {
	name: string;
	email: string;
}
const AddContact = () => {
	usePageMetadata({
		title: `Add contact to list | Mailrion`,
		description: 'Expand your contact databases',
	});
	const { id } = useParams<string>();
	const navigate = useNavigate();
	const [contactFields, setContactFields] = useState<Contact[]>([
		{ name: '', email: '' },
	]);
	const [isLoading, setIsloading] = useState<boolean>(false);
	const { selectedLists } = useAppSelector((state) => state.listManagement);
	const [selectedCSV, setSelectedCSV] = useState<File>(undefined as any);
	const [useCSV, setUseCSV] = useState<boolean>(false);

	const handleContactChange = (
		index: number,
		field: keyof Contact,
		value: string
	) => {
		const newContactFields = [...contactFields];
		newContactFields[index][field] = value;

		if (
			index === contactFields.length - 1 &&
			newContactFields[index].name.trim() !== '' &&
			newContactFields[index].email.trim() !== ''
		) {
			newContactFields.push({ name: '', email: '' });
		}

		setContactFields(newContactFields);
	};

	const addContactManually = async () => {
		setIsloading(true);
		const hasEmptyFields =
			contactFields[0].name.trim() === '' &&
			contactFields[0].email.trim() === '';

		if (hasEmptyFields) {
			Toast({ type: 'error', message: 'Input fields are required' });
			setIsloading(false);
			return;
		}

		const validContacts = contactFields.filter(
			(contact) => contact.name.trim() !== '' && contact.email.trim() !== ''
		);
		let successfulAdditions = 0;

		for (const contact of validContacts) {
			for (const selectedList of selectedLists) {
				const listId = selectedList.id;

				// Make an API request to add the contact to the selected list
				const res = await AddContactsManually(
					contact.name,
					contact.email,
					listId
				);

				if (res?.status === 200 || res?.status === 201) {
					successfulAdditions++;
				}

				await new Promise((resolve) => setTimeout(resolve, 1000));
			}
		}

		if (successfulAdditions !== 0) {
			Toast({
				type: 'success',
				message: `${successfulAdditions} Contact(s) added to list(s) database`,
			});

			setIsloading(false);
			navigate(`/organization/${id}/list-management`);
		}
	};

	const handleAddContactsViaCSV = async () => {
		setIsloading(true);
		if (selectedCSV === undefined) {
			Toast({ type: 'error', message: 'Please select an file' });
			setIsloading(false);
			return;
		}
		let successfulAdditions = 0;
		for (const list of selectedLists) {
			const formData = new FormData();
			formData.append('excel', selectedCSV);
			formData.append('lists', list.id);
			const res = await AddContactsViaExcel(formData);

			if (res?.status === 200 || res?.status === 201) {
				successfulAdditions++;
			}
			{
				setIsloading(false);
				setSelectedCSV(undefined as any);
			}

			await new Promise((resolve) => setTimeout(resolve, 1000));
		}
		if (successfulAdditions !== 0) {
			Toast({
				type: 'success',
				message: `contacts added to ${successfulAdditions} list(s) database`,
			});

			setIsloading(false);
			setSelectedCSV({} as File);
			navigate(`/organization/${id}/list-management`);
		}
		setIsloading(false);
		setSelectedCSV(undefined as any);
	};
	return (
		<div className="add-contact">
			{useCSV && (
				<GeneralModal
					title={'Upload excel file'}
					width={'600px'}
					height={'400px'}
					handleClose={() => {
						setUseCSV(false);
						setSelectedCSV({} as File);
						setIsloading(false);
					}}
				>
					<p>
						Upload an excel file containing the contacts you want to add to your
						list(s)
					</p>
					<p
						style={{
							color: 'var(--primary-color)',
							fontSize: '12px',
							fontWeight: 'bold',
							marginBottom: '10px',
						}}
					>
						Note: The file must have the following columns: Name, Email, and
						Custom field used as placeholder.
					</p>
					<SelectSingleFile
						onFileSelected={setSelectedCSV}
						accept=".csv,.xls,.xlsx"
					/>
					{selectedCSV !== undefined && (
						<div className="btns mt-1 padding-round">
							<div />
							{isLoading ? (
								<ButtonSpinner />
							) : (
								<div className="btn flex-items items-center">
									<Button
										color="#023047"
										text="Cancel"
										className="outline"
										onClick={() => {
											setUseCSV(false);
											setSelectedCSV({} as File);
										}}
									/>
									<Button
										color="#fff"
										text="Save"
										onClick={handleAddContactsViaCSV}
									/>
								</div>
							)}
						</div>
					)}
				</GeneralModal>
			)}
			<div className="border-bottom padding-round">
				<HeadingEffect>
					<h1
						style={{
							// color: "#101828",
							display: 'flex',
							alignItems: 'center',
							fontSize: '24px',
							marginBottom: '8px',
							fontWeight: 600,
						}}
					>
						<Link to={`/organization/${id}/list-management`}>
							<BsArrowLeft />
						</Link>
						Add contact
					</h1>
				</HeadingEffect>
				<p>Expand your contact database</p>
			</div>
			<div className="contact-fields padding-round" style={{ height: '100%' }}>
				{contactFields.map((contact, index) => (
					<div className="field items-center" key={index}>
						<div
							className="div"
							style={{
								width: '100%',
								margin: '5px',
								// marginRight: "5px",
							}}
						>
							<label
								style={{ color: 'var(--text-color)' }}
								htmlFor={`name${index}`}
							>
								Name {index + 1}
							</label>
							<input
								type="text"
								value={contact.name || ''}
								placeholder={`Enter name ${index + 1}`}
								onChange={(e) =>
									handleContactChange(index, 'name', e.target.value)
								}
								required
								style={{
									height: '40px',
									padding: '10px',
									borderRadius: '5px',
									border: '1px solid #ccc',
									outline: 'none',
									width: '100%',
									marginBottom: '5px',
								}}
							/>
						</div>
						<div
							className="div"
							style={{
								width: '100%',
								margin: '5px',
							}}
						>
							<label
								style={{ color: 'var(--text-color)' }}
								htmlFor={`email${index}`}
							>
								Email {index + 1}
							</label>
							<input
								type="email"
								value={contact.email || ''}
								placeholder={`Enter email ${index + 1}`}
								onChange={(e) =>
									handleContactChange(index, 'email', e.target.value)
								}
								required
								style={{
									height: '40px',
									padding: '10px',
									borderRadius: '5px',
									border: '1px solid #ccc',
									outline: 'none',
									width: '100%',
									marginBottom: '5px',
								}}
							/>
						</div>
						{contactFields.length > 1 && (
							<div
								className="remove-btn"
								onClick={() => {
									const newContactFields = [...contactFields];
									newContactFields.splice(index, 1);
									setContactFields(newContactFields);
								}}
								style={{
									cursor: 'pointer',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									height: '20px',
									width: '20px',
									borderRadius: '50%',
									padding: '16px',
									marginLeft: '10px',
									marginTop: '10px',
									color: '#fff',
									backgroundColor: '#FB8500',
								}}
							>
								X
							</div>
						)}
					</div>
				))}
			</div>
			<div className="btns mt-1 padding-round">
				<h3>How do you want to add contacts?</h3>
				{isLoading ? (
					<ButtonSpinner />
				) : (
					<div className="btn items-center">
						<Button
							color="#023047"
							text="One by one"
							className="outline"
							onClick={addContactManually}
						/>
						<Button
							color="#fff"
							text="Upload a file"
							onClick={() => setUseCSV(true)}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default AddContact;
