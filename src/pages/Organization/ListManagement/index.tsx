import dottedIcon from '@/assets/dotted.svg';
import Button from '@/components/Button';
import ButtonSpinner from '@/components/ButtonSpiner';
import DeleteConfirmation from '@/components/DeleteConfirmation';
import Toast from '@/components/Toast';
import HeadingEffect from '@/components/TransitionEffects/Heading';
import usePageMetadata from '@/components/UsePageMetadata';
import { IList } from '@/config';
import { baseURL, formatDateAndTime, searchData, sortData } from '@/helpers';
import { setSelectedList } from '@/redux/features/ListManagement';
import { DeleteList, GetListsAPI } from '@/redux/features/ListManagement/services';
import { setPageSearch } from '@/redux/features/utilSlice';
import { dispatch, useAppSelector } from '@/redux/store';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoItemFound from '../../../components/NoItemFound/index';
import CreateNewlist from './CreateNewlist';

import Pagination from '@/components/Pagination';
import './list-management.scss';

interface props {
	row: IList;
}

const itemsPerPage = 10;
const ListManagement = () => {
	usePageMetadata({
		title: 'List Management | Mailrion',
		description: 'Create and manage your lists here',
	});

	const {
		selectedOrganization: { id },
	} = useAppSelector((state) => state.organization);
	const navigate = useNavigate();
	const [selectAll, setSelectAll] = useState(false);
	const [selectedRows, setSelectedRows] = useState<IList[]>([]);
	const [showCreateList, setShowCreateList] = useState(false);
	const [activeList, setActiveList] = useState<IList | null>({
		created_date: '',
		id: '',
		organization: '',
		number_of_contacts: 0,
		title: '',
	});
	const { theme, searchQuery } = useAppSelector((state) => state.utils);
	const { lists } = useAppSelector((state) => state.listManagement);
	const [isLoading, setIsloading] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [openDeleteList, setOpenDeleteList] = useState<boolean>(false);
	const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
	useEffect(() => {
		dispatch(setPageSearch({ content: 'List management', show: true }));
	}, []);
	const toggleSelectAll = () => {
		setSelectAll(!selectAll);

		const selectedRows = selectAll ? [] : lists.slice();

		setSelectedRows(selectedRows);
	};

	const handleRowClick = (row: IList) => {
		if (selectedRows.includes(row)) {
			setSelectedRows(
				selectedRows.filter((selectedRow) => selectedRow !== row)
			);
		} else {
			setSelectedRows([...selectedRows, row]);
		}
	};

	const toggleMoreOptions = (row: IList) => {
		setActiveList((prevListId) => (prevListId?.id === row.id ? null : row));
	};

	const fetchLists = async () => {
		setIsloading(true);
		await GetListsAPI(id as string);
		setIsloading(false);
	};
	useEffect(() => {
		fetchLists();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [window.location.pathname, id]);

	const addContactToList = () => {
		if (selectedRows.length < 1) {
			Toast({ type: 'error', message: 'Select a list to proceed' });
			return;
		}
		dispatch(setSelectedList(selectedRows));
		navigate(`/${baseURL()}/add-contact-to-list`);
	};

	// pagination logic to be passed to the pagination component
	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * itemsPerPage;
		const lastPageIndex = firstPageIndex + itemsPerPage;
		return lists.slice(firstPageIndex, lastPageIndex);
	}, [currentPage, lists]);

	let deleteCount = 0;

	const handleDeleteList = async () => {
		setDeleteLoading(true);
		for (const list of selectedRows) {
			const res = await DeleteList(list.id);
			if (res?.status === 200 || res?.status === 201) deleteCount++;

			await new Promise((resolve) => setTimeout(resolve, 1000));
		}
		if (deleteCount > 0) {
			setDeleteLoading(false);
			setOpenDeleteList(false);
			Toast({
				type: 'success',
				message: `${deleteCount} lists deleted successfully`,
			});
			setSelectedRows([]);
			fetchLists();
		} else {
			setDeleteLoading(false);
			setOpenDeleteList(false);
			Toast({
				type: 'error',
				message: `something went wrong, try again`,
			});
			setSelectedRows([]);
		}
	};

	const RenderMoreOptions = ({ row }: props) => {
		return (
			<div
				className="more-options more-card"
				style={{
					right: '9.5rem',
				}}
			>
				<p
					onClick={() => {
						dispatch(setSelectedList([row]));
						navigate(`/${baseURL()}/add-contact-to-list`);
					}}
				>
					Add contacts
				</p>
				<p>Make default</p>
				<p
					onClick={() => {
						dispatch(setSelectedList([row]));
						navigate(`/${baseURL()}/list-contacts`);
					}}
				>
					Show contacts
				</p>
				<p
					onClick={() => {
						dispatch(setSelectedList([row]));
						navigate(`/${baseURL()}/new-campaign`);
					}}
				>
					Send message
				</p>
			</div>
		);
	};

	return (
		<div className="list-management" data-theme={theme}>
			{showCreateList && (
				<CreateNewlist
					handleClose={() => setShowCreateList(false)}
					orgID={id}
				/>
			)}
			{openDeleteList && (
				<DeleteConfirmation
					title={'Delete list?'}
					content={'Are you sure you want to delete this list?'}
					subtitle="This can't be undone"
					handleClose={() => setOpenDeleteList(false)}
					actionBtnClick={handleDeleteList}
					isLoading={deleteLoading}
					width="400px"
					height="250px"
				/>
			)}
			{activeList !== null && (
				<div
					className="overlay"
					onClick={() => {
						setActiveList(null);
					}}
				></div>
			)}
			<div className="header space-between border-bottom">
				<HeadingEffect>
					<h1>List management</h1>
				</HeadingEffect>
				<div className="btn-actions">
					<Button
						color="#fff"
						plusIcon
						text="Create new list"
						onClick={() => setShowCreateList(true)}
					/>
					<Button
						// color="#023047"
						className="outline"
						text="Add contacts"
						onClick={addContactToList}
					/>
				</div>
			</div>
			<div className="filters border-bottom padding-round">
				<div className="filter-options ">
					<div className="filter-elements">
						<div className="filter-option active">All ({lists.length})</div>
						{/* <div className="filter-option">Contacts</div> */}
					</div>
				</div>
			</div>
			{selectedRows.length > 0 && (
				<div className="bulkselect">
					<strong>{`${selectedRows.length} File(s) Selected`}</strong>
					<div
						onClick={() => setOpenDeleteList(true)}
						className={`bulkselect_children`}
					>
						<p>Delete</p>
					</div>
				</div>
			)}

			<div className="list-data padding-round">
				<div className="lists">
					{' '}
					{isLoading ? (
						<ButtonSpinner />
					) : (
						<>
							{lists.length > 0 ? (
								<>
									<table className="list-management-table">
										<thead>
											<tr>
												<th
													style={{
														display: 'flex',
														alignItems: 'center',
													}}
												>
													<input
														type="checkbox"
														checked={selectAll}
														onChange={toggleSelectAll}
													/>
													Name
												</th>
												<th>Date Created</th>
												<th>Number of Contacts</th>
												<th></th>
											</tr>
										</thead>
										<tbody>
											{searchData(
												sortData(
													currentTableData,
													(item) => new Date(item.created_date),
													new Date()
												),
												searchQuery,
												'title'
											).map((item, index) => (
												<tr
													key={index}
													className={index % 2 === 0 ? 'even-row' : 'odd-row'}
													style={{
														backgroundColor: selectedRows.includes(item)
															? 'red'
															: 'blue',
													}}
												>
													{activeList?.id === item.id && (
														<RenderMoreOptions row={item} />
													)}
													<td
														style={{
															color: '#101828',
															display: 'flex',
															alignItems: 'center',
														}}
													>
														<input
															type="checkbox"
															checked={selectedRows.includes(item)}
															onChange={() => handleRowClick(item)}
														/>
														{item.title}
													</td>
													<td>{formatDateAndTime(item.created_date).date}</td>
													<td>{item.number_of_contacts}</td>
													<td onClick={() => toggleMoreOptions(item)}>
														<button className="action-btn">
															<img src={dottedIcon} alt="" />
														</button>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</>
							) : (
								<NoItemFound content="Lists you have created will appear here!" />
							)}
						</>
					)}
				</div>
			</div>
			<Pagination
				className="pagination-bar"
				currentPage={currentPage}
				totalCount={lists.length}
				pageSize={itemsPerPage}
				onPageChange={setCurrentPage}
			/>
		</div>
	);
};

export default ListManagement;
