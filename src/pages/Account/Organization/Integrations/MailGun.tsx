import Button from '@/components/Button';
import InputField from '@/components/InputField';
import SelectField from '@/components/SelectField';
import usePageMetadata from '@/components/UsePageMetadata';
import { useAppSelector } from '@/redux/store';
import { ChangeEvent } from 'react';

const MailGun = () => {
	usePageMetadata({
		title: 'Add Mailgun integration',
		description: 'Add or update your account Mailgun integration',
	});
	const { theme } = useAppSelector((state) => state.utils);

	return (
		<div className="integrations " data-theme={theme}>
			<div className="container-center">
				<div className="items-center direction-col">
					<h1>Setup MailGun Integration</h1>
					<p>Please enter all the necessary information correctly</p>
				</div>
				<form>
					<div className="integration-inputs">
						<div className="">
							<InputField
								handleChange={function (
									e: React.ChangeEvent<HTMLInputElement>
								): void {
									throw new Error('Function not implemented.');
								}}
								name={'account-name'}
								classes={'mr-2'}
								value={''}
								placeholder={'Enter your Aws account name'}
								label={'Account Name'}
								required={true}
							/>
						</div>
						<div className="items-center">
							<InputField
								handleChange={function (
									e: React.ChangeEvent<HTMLInputElement>
								): void {
									throw new Error('Function not implemented.');
								}}
								name={'private-api-key'}
								classes={'mr-2'}
								value={''}
								placeholder={'Enter your private API key'}
								label={'Private API Key'}
								required={true}
							/>
							<InputField
								handleChange={function (
									e: React.ChangeEvent<HTMLInputElement>
								): void {
									throw new Error('Function not implemented.');
								}}
								name={'from-name'}
								classes={''}
								value={''}
								placeholder={'Enter your name'}
								label={'From Name'}
								required={true}
							/>
						</div>
						<div className="items-center">
							<InputField
								handleChange={function (
									e: React.ChangeEvent<HTMLInputElement>
								): void {
									throw new Error('Function not implemented.');
								}}
								name={'from-email'}
								classes={'mr-2'}
								value={''}
								placeholder={'Enter your email'}
								label={'From Email'}
								required={true}
							/>
							<InputField
								handleChange={function (
									e: React.ChangeEvent<HTMLInputElement>
								): void {
									throw new Error('Function not implemented.');
								}}
								name={'reply-to'}
								classes={''}
								value={''}
								placeholder={'optional'}
								label={'Reply to'}
								required={false}
							/>
						</div>
						<div className="items-center">
							<SelectField
								handleChange={function (
									e: ChangeEvent<HTMLSelectElement>
								): void {
									throw new Error('Function not implemented.');
								}}
								name={'domains'}
								value={''}
								label={'Domains'}
								required={false}
								options={['domain 1', 'domain 2']}
							/>
						</div>
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

export default MailGun;
