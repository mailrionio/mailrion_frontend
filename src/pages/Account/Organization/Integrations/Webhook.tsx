import Button from '@/components/Button';
import InputField from '@/components/InputField';
import SelectField from '@/components/SelectField';
import usePageMetadata from '@/components/UsePageMetadata';
import { useAppSelector } from '@/redux/store';
import { ChangeEvent, useState } from 'react';

interface Contact {
	name: string;
	email: string;
}

const Webhook = () => {
	usePageMetadata({
		title: 'Add Webhooks integration',
		description: 'Add or update your account webhook integration',
	});
	const { theme } = useAppSelector((state) => state.utils);
	const [contactFields, setContactFields] = useState<Contact[]>([
		{ name: '', email: '' },
	]);

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

	return (
		<div className="integrations" data-theme={theme}>
			<div className="container-center">
				<div className="items-center direction-col">
					<h1>Setup Webhooks Integration</h1>
					<p>Please enter all the necessary information correctly</p>
				</div>
				<form>
					<div className="integration-inputs">
						<div className="items-center">
							<InputField
								handleChange={function (
									e: React.ChangeEvent<HTMLInputElement>
								): void {
									throw new Error('Function not implemented.');
								}}
								name={'name'}
								classes={'mr-2'}
								value={''}
								placeholder={'Enter webhook name'}
								label={'Name'}
								required={true}
							/>
							<InputField
								handleChange={function (
									e: React.ChangeEvent<HTMLInputElement>
								): void {
									throw new Error('Function not implemented.');
								}}
								name={'request-url'}
								classes={''}
								value={''}
								placeholder={'Enter your URL'}
								label={'Request URL'}
								required={true}
							/>
						</div>
						<div className="items-center">
							<SelectField
								handleChange={function (
									e: ChangeEvent<HTMLSelectElement>
								): void {
									throw new Error('Function not implemented.');
								}}
								classes="mr-2"
								name={'request-method'}
								value={''}
								label={'Request Method'}
								required={true}
								options={['POST', 'GET', 'PUT', 'DELETE']}
							/>
							<SelectField
								handleChange={function (
									e: ChangeEvent<HTMLSelectElement>
								): void {
									throw new Error('Function not implemented.');
								}}
								name={'request-format'}
								value={''}
								label={'Request Format'}
								required={false}
								options={['JSON', 'XML']}
							/>
						</div>
						<div className="items-center">
							<SelectField
								handleChange={function (
									e: ChangeEvent<HTMLSelectElement>
								): void {
									throw new Error('Function not implemented.');
								}}
								classes="mr-2"
								name={'request-header'}
								value={''}
								label={'Request Header'}
								required={false}
								options={['No Header', 'Include Header']}
							/>
							<SelectField
								handleChange={function (
									e: ChangeEvent<HTMLSelectElement>
								): void {
									throw new Error('Function not implemented.');
								}}
								name={'request-body'}
								value={''}
								label={'Request Body'}
								required={false}
								options={['All body', 'Single body']}
							/>
						</div>

						<div className="direction-col">
							{contactFields.map((contact, index) => (
								<div
									className="items-center"
									key={index}
									style={{ position: 'relative' }}
								>
									{/* <div
										// className="div"
										style={{
											width: '100%',
											margin: '5px',
											marginRight: '15px',
										}}
									>
										<label
											style={{ color: 'var(--text-color)' }}
											htmlFor={`name${index}`}
										>
											Field Name {index + 1}
										</label>
										<input
											type="text"
											value={contact.name || ''}
											placeholder={`Enter field name ${index + 1}`}
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
									</div> */}
									<InputField
										handleChange={(e) =>
											handleContactChange(index, 'name', e.target.value)
										}
										name={`name${index}`}
										classes={'mr-2'}
										value={contact.name || ''}
										placeholder={`Enter field name ${index + 1}`}
										label={`Field Name ${index + 1}`}
										required={true}
									/>
									{/* <div
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
											Field Email {index + 1}
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
												width: '90%',
												marginBottom: '5px',
											}}
										/>
									</div> */}
									<InputField
										handleChange={(e) =>
											handleContactChange(index, 'email', e.target.value)
										}
										name={`name${index}`}
										classes={''}
										value={contact.email || ''}
										placeholder={`Enter field name ${index + 1}`}
										label={`Field Name ${index + 1}`}
										required={true}
									/>
									{contactFields.length > 1 && (
										<div
											className="remove-btn"
											onClick={() => {
												const newContactFields = [...contactFields];
												newContactFields.splice(index, 1);
												setContactFields(newContactFields);
											}}
											style={{
												position: 'absolute',
												right: '10px',
												bottom: '3px',
												cursor: 'pointer',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												height: '10px',
												width: '10px',
												borderRadius: '50%',
												padding: '16px',
												color: 'red',
												backgroundColor: 'white',
											}}
										>
											X
										</div>
									)}
								</div>
							))}
						</div>
						{/* <div className="items-center">
						<InputField
							handleChange={function (
								e: React.ChangeEvent<HTMLInputElement>
							): void {
								throw new Error('Function not implemented.');
							}}
							name={'daily-sending-limit'}
							classes={'mr-1'}
							value={''}
							placeholder={'leave blank for unlimited'}
							label={'Daily Sending Limit'}
							required={true}
						/>
						<InputField
							handleChange={function (
								e: React.ChangeEvent<HTMLInputElement>
							): void {
								throw new Error('Function not implemented.');
							}}
							name={'send-delay'}
							classes={''}
							value={''}
							placeholder={'leave blank for no delay'}
							label={'Send Delay'}
							required={true}
						/>
					</div> */}
					</div>
					<div className="action-btns space-between mt-2">
						<div />
						<div className="items-center">
							<Button
								text="Cancel"
								className="outline"
								to={'/account-settings'}
							/>
							<Button text="Add Integration" type="submit" />
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Webhook;
