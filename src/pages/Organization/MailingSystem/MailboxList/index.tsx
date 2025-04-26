/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonSpinner from '@/components/ButtonSpiner';
import NoItemFound from '@/components/NoItemFound';
import Portalbar from '@/components/Portalbar';
import SearchInput from '@/components/SearchInput';
import ToastMessage from '@/components/Toast';
import ToolTip from '@/components/ToolTip';
import HeadingEffect from '@/components/TransitionEffects/Heading';
import usePageMetadata from '@/components/UsePageMetadata';
import {
	baseURL,
	extractName,
	formatTimeOrDate,
	getFirstLetters,
} from '@/helpers';
import { setMailCount, setStartReading } from '@/redux/features/mailingSlice';
import {
	DeleteMailForever,
	GetAdminMails,
	MarkMailAsRead,
	MoveMultipleMailToTrash,
} from '@/redux/features/mailingSlice/services';
import { setGlobalLoader, setPageSearch } from '@/redux/features/utilSlice';
import { dispatch, useAppSelector } from '@/redux/store';
import React, { useEffect, useState } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './mailbox-list.scss';
interface MailboxListProps {
	title: string;
	selectedMailId: string;
	onSelectMail: any;
	onDeleteMail: any;
	startReading: boolean;
	startDeleting: boolean;
	setStartDeleting: (value: boolean) => void;
	handleStartReading: () => void;
}

const MailboxList: React.FC<MailboxListProps> = ({
	title,
	selectedMailId,
	onSelectMail,
	// startReading,
	handleStartReading,
	startDeleting,
}) => {
	const [mails, setMails] = useState<any[]>([]);
	const { mailCount } = useAppSelector((state) => state.mail);
	usePageMetadata({
		title: `${title} ${
			title === 'Inbox' ? `${mailCount > 0 ? `(${mailCount})` : ''}` : ''
		} | Mailrion`,
		description: 'Create and manage your organizations here',
	});
	useEffect(() => {
		dispatch(setPageSearch({ content: `${title} mails`, show: true }));
	}, [title]);
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [filter, setFilter] = useState<string>('All');
	const handleSelectMail = (mailObject: any) => {
		onSelectMail(mailObject);
	};
	const { searchQuery } = useAppSelector((state) => state.utils);
	const {
		selectedOrganization: { id: orgID, primaryMember },
	} = useAppSelector((state) => state.organization);
	const { startReading } = useAppSelector((state) => state.mail);
	const [mailCheckedList, setMailCheckedList] = useState<string[]>([]);
	const { theme } = useAppSelector((state) => state.utils);
	const [currentPage, setCurrentPage] = useState(1);

	// search logic
	const handleSearch = (mails: any[]) => {
		return mails?.filter(
			(mail) =>
				mail.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
				mail.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
				mail.body.toLowerCase().includes(searchQuery.toLowerCase())
		);
	};

	// pagination logic
	const itemsPerPage = 50;
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	let sortedMails;
	if (mails && mails.length > 0) {
		sortedMails = mails?.sort((a, b) => {
			const dateA = new Date(a.date);
			const dateB = new Date(b.date);
			return dateB.getTime() - dateA.getTime();
		});
	}
	const searchedAndSortedMails = handleSearch(sortedMails as any);
	const totalPages = Math.ceil(mails?.length / itemsPerPage);
	const totalFilteredAndSortedMails = searchedAndSortedMails?.length;
	const paginatedSearchedAndSortedMails: any[] = searchedAndSortedMails?.slice(
		startIndex,
		endIndex
	);

	// pagination handlers
	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};
	const handleNextPage = () => {
		if (currentPage <= totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	// reset pagination on each title change
	useEffect(() => {
		setCurrentPage(1);
	}, [title, mails]);

	// useEffect(() => {
	// }, [startReading]);

	const fetchMails = async () => {
		setIsLoading(true);

		let mailboxType = 'INBOX';

		switch (title) {
			case 'Inbox':
			case 'Starred':
			case 'Sent':
			case 'Spam':
			case 'Drafts':
			case 'Trash':
			case 'Archive':
				mailboxType = title;
				break;
			default:
				break;
		}

		try {
			const res = await GetAdminMails(
				orgID as string,
				primaryMember.id,
				mailboxType
			);
			setMails(res?.box);
			if (title === 'Inbox') {
				dispatch(setMailCount(res?.box?.length));
			}
		} catch (error) {
			// Handle error
		} finally {
			setIsLoading(false);
		}
	};
	const fetchMailsInBackground = async () => {
		let mailboxType = 'INBOX';

		switch (title) {
			case 'Inbox':
			case 'Starred':
			case 'Sent':
			case 'Spam':
			case 'Drafts':
			case 'Trash':
			case 'Archive':
				mailboxType = title;
				break;
			default:
				break;
		}

		try {
			const res = await GetAdminMails(
				orgID as string,
				primaryMember.id,
				mailboxType
			);
			setMails(res?.box);
			if (title === 'Inbox') {
				dispatch(setMailCount(res?.box?.length));
			}
			console.log(res);
		} catch (error) {
      console.log(error);
		}
	};

	useEffect(() => {
		fetchMails();
		if (startDeleting) {
			fetchMails();
		}
	}, [title, startDeleting]);

	const handleFilter = (filter: string) => {
		switch (filter) {
			case 'All':
				fetchMails();
				break;
			case 'Unread':
				setMails(mails.filter((mail) => mail.unread === true));
				break;
			case 'Past 7 days':
				setMails(
					mails.filter(
						(mail) =>
							new Date(mail.date).getTime() <=
							new Date().getTime() - 7 * 24 * 60 * 60 * 1000
					)
				);
				break;
			default:
				fetchMails();
				break;
		}
	};

	const handleMarkAsRead = async (mail: any) => {
		if (!mail.unread) return;
		const res = await MarkMailAsRead(
			orgID as string,
			primaryMember.id as string,
			mail?.uid
		);
		if (res) {
			fetchMailsInBackground();
		}
	};

	const getChecked = (e: any) => {
		let checkedList = [...mailCheckedList];
		if (e.target.checked) {
			checkedList = [...mailCheckedList, e.target.value];
		} else {
			checkedList = mailCheckedList.filter((item) => item !== e.target.value);
		}
		setMailCheckedList(checkedList);
	};

	const handleMoveMultipleMailToTrash = async () => {
		let mailboxType = 'INBOX';

		switch (title) {
			case 'Inbox':
			case 'Starred':
			case 'Sent':
			case 'Spam':
			case 'Drafts':
			case 'Trash':
			case 'Archive':
				mailboxType = title;
				break;
			default:
				break;
		}

		try {
			await MoveMultipleMailToTrash(
				primaryMember.id,
				orgID as string,
				mailboxType,
				mailCheckedList
			);
			fetchMails();
			setMailCheckedList([]);
			if (title === 'Inbox') {
				dispatch(setMailCount(mails?.length));
			}
			// remove the read=true from the url
			dispatch(setStartReading(false));
		} catch (error) {
			// Handle error
		}
		window.history.replaceState(null, 'Mailrion', window.location.pathname);
	};

	const updateLoaderMessage = (deleted: number, mails: any[]) => {
		dispatch(
			setGlobalLoader({
				loading: true,
				message: `(${deleted} of ${mails.length}) deleted`,
			})
		);
	};

	const handleDeleteAllSpam = async () => {
		if (mails.length === 0) return;
		let deleted = 0;
		ToastMessage({
			type: 'info',
			message: 'Deleting all spam this may take a while',
		});
		updateLoaderMessage(deleted, mails);
		for (const mailId of mails) {
			try {
				await DeleteMailForever(primaryMember.id, orgID, 'Spam', mailId);
				deleted++;
				await new Promise((resolve) => setTimeout(resolve, 1000));
				updateLoaderMessage(deleted, mails);
			} catch (error) {
				// Handle error
			}
		}
		if (deleted !== 0) {
			dispatch(setGlobalLoader({ loading: false, message: '' }));
			fetchMails();
			setMailCheckedList([]);
			dispatch(setStartReading(false));
			ToastMessage({ type: 'success', message: 'All spam deleted' });
		}
		window.history.replaceState(null, 'Mailrion', window.location.pathname);
	};

	const handleDeleteAllTrash = async () => {
		if (mails.length === 0) return;
		let deleted = 0;
		ToastMessage({
			type: 'info',
			message: `Deleting all trash mails, this may take a while`,
		});
		updateLoaderMessage(deleted, mails);
		for (const mailId of mails) {
			try {
				await DeleteMailForever(primaryMember.id, orgID, 'Trash', mailId?.uid);
				deleted++;
				await new Promise((resolve) => setTimeout(resolve, 1000));
				updateLoaderMessage(deleted, mails);
			} catch (error) {
				// Handle error
			}
		}
		if (deleted !== 0) {
			dispatch(setGlobalLoader({ loading: false, message: '' }));
			fetchMails();
			setMailCheckedList([]);
			dispatch(setStartReading(false));
			ToastMessage({ type: 'success', message: 'All trash mail deleted' });
		}
		window.history.replaceState(null, 'Mailrion', window.location.pathname);
	};

	const handleDeleteMailForever = async () => {
		let deleted = 0;
		ToastMessage({
			type: 'info',
			message: `Deleteing ${mailCheckedList.length} mails`,
		});
		updateLoaderMessage(deleted, mailCheckedList);
		for (const mailId of mailCheckedList) {
			try {
				await DeleteMailForever(primaryMember.id, orgID, 'Trash', mailId);
				deleted++;
				await new Promise((resolve) => setTimeout(resolve, 1000));
				updateLoaderMessage(deleted, mailCheckedList);
			} catch (error) {
				// Handle error
			}
		}
		if (deleted !== 0) {
			dispatch(setGlobalLoader({ loading: false, message: '' }));
			fetchMails();
			setMailCheckedList([]);
			dispatch(setStartReading(false));
			ToastMessage({ type: 'success', message: `${deleted} mails deleted` });
		}
		window.history.replaceState(null, 'Mailrion', window.location.pathname);
	};

	const handleMailClick = (mail: any) => {
		if (title === 'Drafts') {
			localStorage.setItem('drafts', JSON.stringify(mail));
			localStorage.setItem('draftId', mail.uid);
			navigate(`/${baseURL()}/compose-new-mail`);
		} else {
			handleStartReading();
			handleSelectMail(mail);
			handleMarkAsRead(mail);
			dispatch(setStartReading(true));
			navigate(`/${baseURL()}/${title.toLocaleLowerCase()}`);
		}
	};

	return (
		<div
			className={`mailbox-list dont-print ${
				startReading ? 'half-width' : 'full-width'
			}`}
			data-theme={theme}
		>
			{title === 'Spam' ? (
				<Portalbar
					selectedItems={mailCheckedList}
					deleteText={'Move to trash'}
					onDelete={handleMoveMultipleMailToTrash}
					onClearSelection={() => setMailCheckedList([])}
				/>
			) : title === 'Trash' ? (
				<Portalbar
					selectedItems={mailCheckedList}
					deleteText={'Delete forever'}
					onDelete={handleDeleteMailForever}
					onClearSelection={() => setMailCheckedList([])}
				/>
			) : (
				<Portalbar
					selectedItems={mailCheckedList}
					deleteText={'Move to trash'}
					onDelete={handleMoveMultipleMailToTrash}
					onClearSelection={() => setMailCheckedList([])}
				/>
			)}

			<div>
				<div className="header">
					<div className="title">
						<HeadingEffect>
							<h2>{title}</h2>
						</HeadingEffect>
					</div>
					{title === 'Inbox' && mailCount > 0 && (
						<div className="count">{mailCount}</div>
					)}
					{title === 'Starred' && mailCount > 0 && (
						<div className="count">{mailCount}</div>
					)}
				</div>
				<div className="mobile-search">
					<SearchInput />
				</div>
				<div className="filter-wrap">
					<div className="filter-options">
						<div className="filter-elements">
							{title === 'Inbox' && (
								<>
									<div
										className={`filter-option ${
											filter === 'All' ? 'active' : ''
										}`}
										onClick={() => {
											setFilter('All');
											handleFilter('All');
										}}
									>
										All
									</div>
									<div
										className={`filter-option ${
											filter === 'Unread' ? 'active' : ''
										}`}
										onClick={() => {
											setFilter('Unread');
											handleFilter('Unread');
										}}
									>
										Unread
									</div>
									<div
										className={`filter-option ${
											filter === 'Past 7 days' ? 'active' : ''
										}`}
										onClick={() => {
											setFilter('Past 7 days');
											handleFilter('Past 7 days');
										}}
									>
										Past 7 days
									</div>
								</>
							)}
							{title !== 'Inbox' && (
								<>
									<div
										className={`filter-option ${
											filter === 'All' ? 'active' : ''
										}`}
										onClick={() => {
											setFilter('All');
											handleFilter('All');
										}}
									>
										All
									</div>
									<div
										className={`filter-option ${
											filter === 'Past 7 days' ? 'active' : ''
										}`}
										onClick={() => {
											setFilter('Past 7 days');
											handleFilter('Past 7 days');
										}}
									>
										Past 7 days
									</div>
								</>
							)}
						</div>
					</div>
					<ToolTip
						content="refresh"
						position="up"
						classes="mr-1"
						handleClick={fetchMails}
					>
						{' '}
						<FiRefreshCcw style={{ cursor: 'pointer' }} />
					</ToolTip>
				</div>
				{mails?.length > 0 && (
					<div className="mail-list-pagination">
						<p>
							{startIndex + 1} -{' '}
							{Math.min(endIndex, totalFilteredAndSortedMails)} of{' '}
							{totalFilteredAndSortedMails}
						</p>
						<div className="controls">
							<ToolTip
								disable={currentPage === 1 ? true : false}
								classes={`${currentPage === 1 ? 'disabled-btn' : ''}`}
								content={'previous'}
								position={'up'}
								handleClick={handlePrevPage}
							>
								<button disabled={currentPage === 1}>{'<'}</button>
							</ToolTip>
							<p>{currentPage}</p>
							<ToolTip
								disable={currentPage >= totalPages ? true : false}
								classes={`${currentPage >= totalPages ? 'disabled-btn' : ''}`}
								content={'next'}
								position={'up'}
								handleClick={handleNextPage}
							>
								<button disabled={currentPage === totalPages}>{'>'}</button>
							</ToolTip>
						</div>
					</div>
				)}
				{/* {mailCheckedList.length > 0 && (
          <div className="delete-multi-mail">
            <p className="selected-count">
              {mailCheckedList.length} File(s) Selected
            </p>
            {title === "Trash" ? (
              <div className="del-btn" onClick={() => console.log("")}>
                Delete forever
              </div>
            ) : (
              <div className="del-btn" onClick={handleDeleteMultipleMail}>
                Move to trash
              </div>
            )}
          </div>
        )} */}
				{isLoading ? (
					<ButtonSpinner />
				) : (
					<>
						{' '}
						{title === 'Spam' && (
							<div className="mailbox-list-notice">
								<div className="mailbox-list-notice__wrapper">
									<p>
										Messages that have been in Spam more than 30 days will be
										automatically deleted, Click on only trusted links
									</p>
									<div
										className="notice-btn"
										onClick={() => handleDeleteAllSpam()}
									>
										Delete all spam
									</div>
								</div>
							</div>
						)}
						{title === 'Trash' && (
							<div className="mailbox-list-notice">
								<div className="mailbox-list-notice__wrapper">
									<p>
										Messages that have been in Trash more than 30 days will be
										automatically deleted
									</p>
									<div
										className="notice-btn"
										onClick={() => handleDeleteAllTrash()}
									>
										Delete all{' '}
									</div>
								</div>
							</div>
						)}
						<div className="mail-list">
							{paginatedSearchedAndSortedMails?.length > 0 ? (
								<>
									{' '}
									{paginatedSearchedAndSortedMails?.map((mailbox) => {
										// const textonly = mailbox.body.replace(/<[^>]+>/g, "");

										return (
											<div className="mail-wrapper" key={mailbox?.uid}>
												<input
													type="checkbox"
													value={mailbox.uid}
													name="checkbox"
													onChange={getChecked}
													id="checkbox"
												/>
												<div
													className={`mail ${
														Number(selectedMailId) === Number(mailbox.uid)
															? 'selected'
															: ''
													}`}
													key={mailbox.uid}
													onClick={() => handleMailClick(mailbox)}
												>
													<div className="mail-sender">
														<div className="sender-info">
															<div className="sender-img">
																{mailbox?.image ? (
																	<img
																		src={mailbox?.image}
																		alt={mailbox?.from}
																	/>
																) : (
																	getFirstLetters(
																		extractName(mailbox?.from as string) as any
																	)
																)}
																{/* <img src={dummyAvg} alt="" /> */}
															</div>
															<div className="sender-name">
																<p>{extractName(mailbox?.from)}</p>
																{/* <h3>{truncateText(mailbox?.subject, 30)}</h3> */}
															</div>
														</div>
														<div className="mail-date">
															{formatTimeOrDate(mailbox?.date)}
														</div>
													</div>
													<div
														className={`mail-content ${
															mailbox.unread ? 'unread' : ''
														}`}
													>
														{/* {startReading ? (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: truncateText(textonly, 100),
                                }}
                              />
                            ) : (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: truncateText(textonly, 250),
                                }}
                              />
                            )} */}
														{mailbox?.subject}
													</div>
												</div>
											</div>
										);
									})}
								</>
							) : (
								<NoItemFound
									content={`
                      No mails in ${title} yet
                    `}
								/>
							)}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default MailboxList;
