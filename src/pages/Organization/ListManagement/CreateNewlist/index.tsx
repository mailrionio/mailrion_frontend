import Button from '@/components/Button';
import ButtonSpinner from '@/components/ButtonSpiner';
import GeneralModal from '@/components/GeneralModal';
import InputField from '@/components/InputField';
import { CreateList, GetListsAPI } from '@/redux/features/ListManagement/services';
import { ChangeEvent, useState } from 'react';

interface props {
	handleClose: () => void;
	orgID: string;
}

const CreateNewlist = ({ handleClose, orgID }: props) => {
	const [listname, setListName] = useState<string>('');
	const [isLoading, setIsloading] = useState<boolean>(false);

	const createList = async (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsloading(true);
		const res = await CreateList(listname, orgID);
		if (res?.status === 200 || res?.status === 201) {
			setIsloading(false);
			await GetListsAPI(orgID);
			handleClose();
		} else {
			setIsloading(false);
			return;
		}
	};
	return (
		<GeneralModal
			title={'Create new list'}
			width={'700px'}
			height={'280px'}
			subTitle="Provide details about this list"
			handleClose={handleClose}
		>
			<form className="new-list" onSubmit={createList}>
				<InputField
					handleChange={(e) => setListName(e.target.value)}
					name={'listname'}
					classes={''}
					type="text"
					value={listname}
					placeholder={'list name'}
					label={'List name'}
					required={true}
				/>
				<div className="btns mt-2 space-between">
					<div />
					{isLoading ? (
						<ButtonSpinner />
					) : (
						<div className="btn items-center">
							<Button
								color="#023047"
								text="Cancel"
								className="outline"
								onClick={handleClose}
							/>
							<Button color="#fff" text="Create list" arrIcon type="submit" />
						</div>
					)}
				</div>
			</form>
		</GeneralModal>
	);
};
export default CreateNewlist;
