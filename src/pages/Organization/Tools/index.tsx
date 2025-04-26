import GeneralModal from '@/components/GeneralModal';
import { setPageSearch } from '@/redux/features/utilSlice';
import { dispatch, useAppSelector } from '@/redux/store';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './tools.scss';
const Tools = () => {
	const [selected, setSelected] = useState<string>('SMTP');
	const {
		organization: { organization },
	} = useAppSelector((state) => state.organization);
	const navigate = useNavigate();
	useEffect(() => {
		dispatch(setPageSearch({ content: '', show: false }));
	}, []);
	const toolsList = [
		{ id: 3, name: 'Landing Pages', link: '/pages' },
		{ id: 1, name: 'SMTP', link: '/smtp' },
		{ id: 2, name: 'Cloud storage', link: '/cloud-storage' },
		// { id: 3, name: "AI chat", link: "/ai-chat" },
		{
			id: 4,
			name: 'AI split testing mailing',
			link: `/organization/${organization}/ai-spliter`,
		},
		{
			id: 5,
			name: 'Email scraping with keyword search',
			link: `/organization/${organization}/email-scrapper`,
		},
		{
			id: 6,
			name: 'Email validation/Verifcation cleaning system',
			link: `/organization/${organization}/email-validation`,
		},
	];
	return (
		<GeneralModal
			title={'Tools'}
			subTitle="A wide range of tool to use"
			width={'700px'}
			height={'400px'}
			handleClose={() => navigate(-1)}
		>
			<div className="Tools-grid">
				{toolsList.map((item) => (
					<Link
						to={item.link}
						key={item.id}
						onClick={() => setSelected(item.name)}
						className={`tool-item ${selected === item.name ? 'active' : ''}`}
					>
						{item.name}
					</Link>
				))}
			</div>
		</GeneralModal>
	);
};

export default Tools;
