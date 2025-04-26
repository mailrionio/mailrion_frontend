/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/Button';
import ButtonSpinner from '@/components/ButtonSpiner';
import DeleteConfirmation from '@/components/DeleteConfirmation';
import NoItemFound from '@/components/NoItemFound';
import PageHeader from '@/components/PageHeader';
import Pagination from '@/components/Pagination';
import Portalbar from '@/components/Portalbar';
import Toast from '@/components/Toast';
import ToolTip from '@/components/ToolTip';
import usePageMetadata from '@/components/UsePageMetadata';
import {
	baseURL,
	calculatePercentage,
	convertResponseToEntity,
	formatDateAndTime,
	searchData,
	sortData,
} from '@/helpers';
import {
	DeleteValidatedEmail,
	GetAllValidatedEmails,
} from '@/redux/features/emailValidationSlice/services';
import { setPageSearch } from '@/redux/features/utilSlice';
import { dispatch, useAppSelector } from '@/redux/store';
import { SetStateAction, useEffect, useMemo, useState } from 'react';
import { CiCircleMore } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import './result.scss';
interface IEmailResultsType {
	id: string | number;
	name: string;
	good_count: number;
	bad_count: number;
	good_percent: number;
	bad_percent: number;
	date_created: string;
	attributes?: any;
}

const PageSize = 10;
const ValidationResult = () => {
	usePageMetadata({
		title: 'Email Validation Result',
		description: 'This is the result of the email validation our tool did',
	});
	const navigate = useNavigate();
	const { searchQuery } = useAppSelector((state) => state.utils);
	const [resultsData, setResultsData] = useState<IEmailResultsType[]>([]);
	const [loading, setLoading] = useState(false);
	const [selectAll, setSelectAll] = useState(false);
	const [selectedRows, setSelectedRows] = useState<IEmailResultsType[]>([]);
	const [deleteEmail, setDeleteEmail] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		dispatch(setPageSearch({ content: 'Email Validation Result', show: true }));
	}, []);

	// pagination logic to be passed to the pagination component
	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		return resultsData?.slice(firstPageIndex, lastPageIndex);
	}, [currentPage, resultsData]);

	const toggleSelectAll = () => {
		setSelectAll(!selectAll);

		const selectedRows = selectAll ? [] : resultsData.slice();

		setSelectedRows(selectedRows);
	};

	const handleRowChecked = (row: IEmailResultsType) => {
		if (selectedRows.includes(row)) {
			setSelectedRows(
				selectedRows.filter((selectedRow) => selectedRow !== row)
			);
		} else {
			setSelectedRows([...selectedRows, row]);
		}
	};

	const handleRowClick = (rowID: number) => {
		navigate(`/${baseURL()}/email-validation/email-details?email-id=${rowID}`);
	};

	const fetchEmails = async () => {
		setLoading(true);
		const res = await GetAllValidatedEmails();
		const resp: IEmailResultsType[] = convertResponseToEntity(
			res?.data?.message as IEmailResultsType[],
			['id', 'name', 'good_count', 'bad_count', 'attributes', 'date_created']
		);
		setResultsData(resp);
		setLoading(false);
	};

	useEffect(() => {
		fetchEmails();
	}, []);

	return (
		<div className="table-container">
			{selectedRows.length > 0 && (
				<Portalbar
					selectedItems={selectedRows}
					onClearSelection={() => {
						setSelectAll(false);
						setSelectedRows([]);
					}}
					deleteText="Delete"
					onDelete={() => setDeleteEmail(true)}
				/>
			)}
			{deleteEmail && (
				<DeleteConfirmation
					title={'Delete this email'}
					content={
						'Before you delete, consider downloading the file first. Are you sure you want to delete?'
					}
					handleClose={() => {
						setSelectAll(false);
						setSelectedRows([]);
						setDeleteEmail(false);
					}}
					actionBtnClick={async () => {
						let isDeleted = 0;
						for (const row of selectedRows) {
							await DeleteValidatedEmail(row.id as string);
							isDeleted = isDeleted + 1;
						}
						if (isDeleted === selectedRows.length) {
							Toast({
								type: 'success',
								message: `${isDeleted} files deleted successfully`,
							});
							setDeleteEmail(false);
							fetchEmails();
						}
					}}
					isLoading={false}
					width={'400px'}
					height={'250px'}
				/>
			)}
			<PageHeader title="Email Clean Result">
				<Button
					text="New Validation"
					to={`/${baseURL()}/email-validation`}
					arrIcon
				/>
			</PageHeader>
			{loading ? (
				<ButtonSpinner />
			) : (
				<>
					{resultsData?.length > 0 ? (
						<table>
							<thead>
								<tr>
									<th>
										<input
											type="checkbox"
											checked={selectAll}
											onChange={toggleSelectAll}
											className="mr-1"
										/>
										ID
									</th>
									<th>Filename</th>
									<th>Date</th>
									<th>Clean</th>
									<th>Dirty</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{sortData(
									searchData(currentTableData, searchQuery, 'name'),
									(item) => new Date(item.date_created),
									new Date()
								).map((row) => (
									<tr key={row.id}>
										<td className="result-id">
											<input
												type="checkbox"
												checked={selectedRows.includes(row)}
												onChange={() => handleRowChecked(row)}
												className="mr-1"
											/>

											{row.id}
										</td>
										<td
											className="result-filename"
											style={{
												display: 'flex',
												alignItems: 'center',
												cursor: 'pointer',
											}}
											onClick={() => handleRowClick(row.id as number)}
										>
											<span className="icon">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
												>
													<path
														opacity="0.4"
														d="M10.75 2.44836C11.44 1.85836 12.57 1.85836 13.27 2.44836L14.85 3.80836C15.15 4.06836 15.71 4.27836 16.11 4.27836H17.81C18.87 4.27836 19.74 5.14836 19.74 6.20836V7.90836C19.74 8.29836 19.95 8.86836 20.21 9.16836L21.57 10.7484C22.16 11.4384 22.16 12.5684 21.57 13.2684L20.21 14.8484C19.95 15.1484 19.74 15.7084 19.74 16.1084V17.8084C19.74 18.8684 18.87 19.7384 17.81 19.7384H16.11C15.72 19.7384 15.15 19.9484 14.85 20.2084L13.27 21.5684C12.58 22.1584 11.45 22.1584 10.75 21.5684L9.17 20.2084C8.87 19.9484 8.31 19.7384 7.91 19.7384H6.18C5.12 19.7384 4.25 18.8684 4.25 17.8084V16.0984C4.25 15.7084 4.04 15.1484 3.79 14.8484L2.44 13.2584C1.86 12.5684 1.86 11.4484 2.44 10.7584L3.79 9.16836C4.04 8.86836 4.25 8.30836 4.25 7.91836V6.19836C4.25 5.13836 5.12 4.26836 6.18 4.26836H7.91C8.3 4.26836 8.87 4.05836 9.17 3.79836L10.75 2.44836Z"
														fill="var(--primary-color)"
													/>
													<path
														d="M10.7898 15.1752C10.5898 15.1752 10.3998 15.0952 10.2598 14.9552L7.83981 12.5352C7.54981 12.2452 7.54981 11.7652 7.83981 11.4752C8.12981 11.1852 8.60981 11.1852 8.89981 11.4752L10.7898 13.3652L15.0898 9.06516C15.3798 8.77516 15.8598 8.77516 16.1498 9.06516C16.4398 9.35516 16.4398 9.83516 16.1498 10.1252L11.3198 14.9552C11.1798 15.0952 10.9898 15.1752 10.7898 15.1752Z"
														fill="var(--primary-color)"
													/>
												</svg>
											</span>
											<span>{row.name}</span>
										</td>
										<td>
											{formatDateAndTime(row.date_created as string).date}|
											{formatDateAndTime(row.date_created as string).time}
										</td>
										<td className="result-clean">
											{row.good_count} |{' '}
											{calculatePercentage(
												Number(row.good_count),
												Number(row.good_count) + Number(row.bad_count)
											)}
											%
											<br />
										</td>
										<td className="result-bad">
											{row.bad_count} |{' '}
											{calculatePercentage(
												Number(row.bad_count),
												Number(row.good_count) + Number(row.bad_count)
											)}
											%
										</td>

										<td className="action-icons">
											{/* <ToolTip
                        classes="icon"
                        position="up"
                        content="Click to download the file"
                        handleClick={() => {
                          const link = document.createElement("a");
                          link.href = row.good_email_cloud_url;
                          link.download = row.file_name;
                          link.click();
                        }}
                      >
                        <FcDownload color="var(--secondary-color)" />
                      </ToolTip>{" "} */}
											<ToolTip
												position="up"
												content="Click to view details"
												handleClick={() => handleRowClick(row.id as number)}
											>
												<CiCircleMore color="var(--secondary-color)" />
											</ToolTip>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<NoItemFound content="No results available" />
					)}
				</>
			)}
			<Pagination
				className="pagination-bar"
				currentPage={currentPage}
				totalCount={resultsData?.length}
				pageSize={PageSize}
				onPageChange={(page: SetStateAction<number>) => setCurrentPage(page)}
			/>
		</div>
	);
};

export default ValidationResult;
