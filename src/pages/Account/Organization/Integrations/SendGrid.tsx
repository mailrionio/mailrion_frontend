import Button from '@/components/Button';
import InputField from '@/components/InputField';
import usePageMetadata from '@/components/UsePageMetadata';
import { useAppSelector } from '@/redux/store';

const SendGrid = () => {
	usePageMetadata({
		title: 'Add SendGrid integration',
		description: 'Add or update your account sendgrid integration',
	});
	const { theme } = useAppSelector((state) => state.utils);

	return (
		<div className="integrations " data-theme={theme}>
			<div className="container-center">
				<div className="items-center direction-col">
					<h1>Setup SendGrid Integration</h1>
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
								name={'username'}
								classes={'mr-2'}
								value={''}
								placeholder={'Enter your username'}
								label={'Username'}
								required={true}
							/>
							<InputField
								handleChange={function (
									e: React.ChangeEvent<HTMLInputElement>
								): void {
									throw new Error('Function not implemented.');
								}}
								name={'api-key'}
								classes={''}
								value={''}
								placeholder={'Enter your API Key'}
								label={'API Key'}
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
								name={'from-name'}
								classes={'mr-2'}
								value={''}
								placeholder={'Enter your name'}
								label={'From name'}
								required={true}
							/>
							<InputField
								handleChange={function (
									e: React.ChangeEvent<HTMLInputElement>
								): void {
									throw new Error('Function not implemented.');
								}}
								name={'from-email'}
								classes={''}
								value={''}
								placeholder={'Enter your email'}
								label={'From email'}
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
								name={'from-to'}
								classes={''}
								value={''}
								placeholder={'optional'}
								label={'From to'}
								required={false}
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

export default SendGrid;
