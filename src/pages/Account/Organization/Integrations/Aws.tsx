import Button from '@/components/Button';
import InputField from '@/components/InputField';
import usePageMetadata from '@/components/UsePageMetadata';
import { useAppSelector } from '@/redux/store';

const Aws = () => {
	usePageMetadata({
		title: 'Add AWS integration',
		description: 'Add or update your account AWS integration',
	});
	const { theme } = useAppSelector((state) => state.utils);

	return (
		<div className="integrations " data-theme={theme}>
			<div className="container-center">
				<div className="items-center direction-col">
					<h1>Setup AWS Integration</h1>
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
								name={'from-name'}
								classes={''}
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
								name={'reply-to'}
								classes={'mr-2'}
								value={''}
								placeholder={'optional'}
								label={'Reply to'}
								required={false}
							/>
							<InputField
								handleChange={function (
									e: React.ChangeEvent<HTMLInputElement>
								): void {
									throw new Error('Function not implemented.');
								}}
								name={'hostname'}
								classes={''}
								value={''}
								placeholder={'Hostname'}
								label={'Hostname'}
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
								name={'access-key'}
								classes={'mr-2'}
								value={''}
								placeholder={'Enter access API key ID'}
								label={'Access key ID'}
								required={true}
							/>
							<InputField
								handleChange={function (
									e: React.ChangeEvent<HTMLInputElement>
								): void {
									throw new Error('Function not implemented.');
								}}
								name={'secret-access-key'}
								classes={'mr-2'}
								value={''}
								placeholder={'Enter secret access key'}
								label={'Secret Access Key'}
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
								name={'sending-delay'}
								classes={'mr-2'}
								value={''}
								placeholder={'Leave blank for no delay'}
								label={'Send delay (in miliseconds)'}
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

export default Aws;
