import Button from '@/components/Button';
import InputField from '@/components/InputField';
import SelectField from '@/components/SelectField';
import usePageMetadata from '@/components/UsePageMetadata';
import { useAppSelector } from '@/redux/store';
import { ChangeEvent } from 'react';

const Smtp = () => {
	usePageMetadata({
		title: 'Add SMTP integration',
		description: 'Add or update your account SMTP integration',
	});
	const { theme } = useAppSelector((state) => state.utils);

	return (
		<div className="integrations " data-theme={theme}>
			<div className="container-center">
				<div className="items-center direction-col">
					<h1>Setup SMTP Integration</h1>
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
								placeholder={'Enter SMTP name'}
								label={'Name'}
								required={true}
							/>
							<InputField
								handleChange={function (
									e: React.ChangeEvent<HTMLInputElement>
								): void {
									throw new Error('Function not implemented.');
								}}
								name={'host'}
								classes={''}
								value={''}
								placeholder={'Outgoing mail server domain'}
								label={'SMTP Host'}
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
								name={'encryption'}
								value={''}
								label={'Encryption'}
								required={true}
								options={['none', 'sha256', 'standard encryption']}
							/>
							<InputField
								handleChange={function (
									e: React.ChangeEvent<HTMLInputElement>
								): void {
									throw new Error('Function not implemented.');
								}}
								name={'port'}
								classes={''}
								value={''}
								placeholder={'for example: 456'}
								label={'SMTP Port'}
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
								name={'username'}
								classes={'mr-2'}
								value={''}
								placeholder={'for example: user@domain'}
								label={'SMTP Username'}
								required={true}
							/>
							<InputField
								handleChange={function (
									e: React.ChangeEvent<HTMLInputElement>
								): void {
									throw new Error('Function not implemented.');
								}}
								name={'password'}
								classes={''}
								value={''}
								placeholder={'password'}
								label={'SMTP Password'}
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
								placeholder={'do not include domain'}
								label={'SMTP From Email'}
								required={true}
							/>
							<SelectField
								handleChange={function (
									e: ChangeEvent<HTMLSelectElement>
								): void {
									throw new Error('Function not implemented.');
								}}
								name={'domain'}
								value={''}
								label={'Domain'}
								required={false}
								options={['domain 1', 'domain 2']}
							/>
						</div>
						<div className="items-center">
							<InputField
								handleChange={function (
									e: React.ChangeEvent<HTMLInputElement>
								): void {
									throw new Error('Function not implemented.');
								}}
								name={'smtp-reply-email'}
								classes={'mr-2'}
								value={''}
								placeholder={"Enter email where you'd like to replies to"}
								label={'SMTP Reply To Email'}
								required={true}
							/>
							<InputField
								handleChange={function (
									e: React.ChangeEvent<HTMLInputElement>
								): void {
									throw new Error('Function not implemented.');
								}}
								name={'hourly-send-limit'}
								classes={''}
								value={''}
								placeholder={'leave blank for unlimited'}
								label={'Hourly Sending Limit'}
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
								name={'daily-sending-limit'}
								classes={'mr-2'}
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

export default Smtp;
