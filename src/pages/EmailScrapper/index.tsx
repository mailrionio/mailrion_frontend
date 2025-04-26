/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/Button';
import ButtonSpinner from '@/components/ButtonSpiner';
import InputField from '@/components/InputField';
import PageHeader from '@/components/PageHeader';
import ToastMessage from '@/components/Toast';
import usePageMetadata from '@/components/UsePageMetadata';
import { SearchPlaces } from '@/redux/features/Emailscrapper/services';
import { ChangeEvent, useState } from 'react';
import DataList from './DataList';
import Filters from './Filters';
import './email-scrapper.scss';

const EmailScrapper = () => {
	usePageMetadata({
		title: 'Email scraping with location search',
		description: 'Try out our powerful email scraping tool',
	});
	// const filters = useQueryParams('filter');
	const [loading, setLoading] = useState<boolean>(false);
	const [inputs, setInputs] = useState<{
		location: string;
		state: string;
		city: string;
	}>({
		location: '',
		state: '',
		city: '',
	});
	const [data, setData] = useState<any[]>([]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInputs((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setData([]);
		if (!inputs.location || !inputs.state || !inputs.city)
			return ToastMessage({ type: 'error', message: 'Please fill all fields' });
		const res = await SearchPlaces(inputs);
		console.log(res);

		if (res?.status === 200 || res?.status === 201) {
			setData(res?.data?.message);
			setInputs({ location: '', state: '', city: '' });
		}
		setLoading(false);
	};

	return (
		<div className="Email-scrapper">
			<PageHeader
				title="Email scraping with location search"
				backLink={-1}
				useBackArrow
			/>
			<form className="search-inputs" onSubmit={handleSubmit}>
				<h3>Search for business leads and places on the go...</h3>
				<p>
					Find business leads from different platform, You can enter any
					location a place to search e.g restaurants, hotels,schools etc. State
					and city are required to get accurate results.
				</p>
				<div className="inputs">
					<InputField
						placeholder="e.g: Restaurant, Hotels, etc"
						label="location"
						type="text"
						name="location"
						value={inputs.location}
						handleChange={handleChange}
						classes={''}
						required={true}
					/>
					<InputField
						value={inputs.state}
						handleChange={handleChange}
						name={'state'}
						classes={''}
						placeholder={'e.g: Rivers'}
						label={'State'}
						required={true}
					/>
					<InputField
						value={inputs.city}
						handleChange={handleChange}
						name={'city'}
						classes={''}
						placeholder={'e.g: Portharcourt'}
						label={'City'}
						required={true}
					/>
				</div>
				{loading ? (
					<ButtonSpinner />
				) : (
					<Button text="Search lead" type="submit" />
				)}
			</form>
			{data.length > 0 && (
				<div className="scraping-result">
					<Filters />
					<DataList data={data} />
				</div>
			)}
		</div>
	);
};

export default EmailScrapper;
