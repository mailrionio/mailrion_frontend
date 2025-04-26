/* eslint-disable @typescript-eslint/no-explicit-any */
import downloadIcon from '@/assets/download.svg';
import fileIcon from '@/assets/file.svg';
// import forward from "@/assets/forward.svg";
// import print from "@/assets/print.svg";
// import reply from "@/assets/reply.svg";
// import trash from "@/assets/trash.svg";
import Button from '@/components/Button';
import ButtonSpinner from '@/components/ButtonSpiner';
import GeneralModal from '@/components/GeneralModal';
import PrintPage from '@/components/PrintPage';
import Toast from '@/components/Toast';
import ToolTip from '@/components/ToolTip';
import usePageMetadata from '@/components/UsePageMetadata';
import {
	dateWithTime,
	extractEmail,
	extractName,
	getFirstLetters,
	sanitizeHTMLImages,
} from '@/helpers';
import { setStartReading } from '@/redux/features/mailingSlice';
import { AdminComposeNewMail } from '@/redux/features/mailingSlice/services';
import { dispatch, useAppSelector } from '@/redux/store';
import { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import ReplyPortal from '../ReplyPortal';
import './mail-content.scss';
type Props = {
	mailContent: any;
	mailboxTitle: string;
	startReading: boolean;
	deleteMail: () => void;
	flagMail: () => void;
	unFlagMail: () => void;
	isFlagged: boolean;
};
function MailContent({
	mailContent,
	mailboxTitle,
	deleteMail,
}: // isFlagged,
// startReading,
Props) {
	usePageMetadata({
		title: mailContent?.subject ?? 'Read Mail',
		description: 'View mail content',
	});
	const [startReplying, setStartReplying] = useState<boolean>(false);
	const [showForward, setShowForward] = useState<boolean>(false);
	const [fwdTo, setFwdTo] = useState<string[]>([]);
	const [curEmail, setCurEmail] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const {
		selectedOrganization: { id, primaryMember },
	} = useAppSelector((state) => state.organization);
	const { startReading } = useAppSelector((state) => state.mail);
	console.log(mailContent);

	function ReplyMail() {
		setStartReplying((prev) => !prev);
	}

	const PrintMail = () => {
		window.print();
	};

	const pTag = document.querySelectorAll('p');
	for (const p in pTag) {
		const paragraph = pTag[p] as HTMLElement;
		if (
			paragraph.textContent &&
			paragraph.textContent.includes(`style="max-width:100%">`)
		) {
			paragraph.style.display = 'none';
		}
	}
	const aTags = document.querySelectorAll('a');
	for (const a in aTags) {
		const aTag = aTags[a] as HTMLElement;
		if (
			aTag.textContent &&
			aTag.textContent.includes(
				'Unlicensed copy of the Froala Editor. Use it legally by purchasing a license.'
			)
		) {
			console.log(aTag);
			aTag.style.display = 'none';
		}
	}

	const handleFwdMail = async () => {
		setLoading(true);
		// setShowForward(false);
		if (fwdTo.length === 0) {
			Toast({ type: 'error', message: 'Please enter a valid email address' });
			setLoading(false);
			return;
		} else {
			const formData = new FormData();
			formData.append('to', JSON.stringify(fwdTo));
			formData.append('subject', `Fwd: ${mailContent.subject}`);
			const body = document.querySelector('.forward-mail-body')?.innerHTML;
			formData.append('message', body as any);
			for (let i = 0; i < mailContent?.attachments?.length; i++) {
				const file = mailContent?.attachments[i];
				const fileType = file.name.split('.').pop();
				const fileBlob = new Blob([file], { type: `application/${fileType}` });
				formData.append('attachment[]', fileBlob, file.name);
			}
			const res = await AdminComposeNewMail(
				id as string,
				primaryMember.id,
				formData
			);
			if (res.data?.message === 'messages sent') {
				setShowForward(false);
				setLoading(false);
			} else {
				setLoading(false);
			}
		}
	};

	const ForwardMail = () => {
		return (
			<GeneralModal
				title={`Fwd: ${mailContent.subject}`}
				width={'700px'}
				height={'600px'}
				handleClose={() => setShowForward(false)}
			>
				<div className="forward-mail">
					<div className="forward-mail__head email-list">
						<label htmlFor="to">To:</label>
						{fwdTo.map((email) => (
							<div className="email-item" key={email}>
								{email}
								<div
									className="remove-email"
									onClick={() =>
										setFwdTo((prev) => prev.filter((e) => e !== email))
									}
								>
									<span>x</span>
								</div>
							</div>
						))}
						<input
							type="text"
							placeholder="Separate multiple emails with comma"
							value={curEmail}
							onChange={(e) => setCurEmail(e.target.value)}
							name="to"
							onKeyDown={(e: React.KeyboardEvent) => {
								if (e.key === 'Enter' || e.key === ',') {
									e.preventDefault();
									if (curEmail.trim() !== '') {
										setFwdTo((prev) => [...prev, curEmail]);
										setCurEmail('');
									}
								}
							}}
							autoFocus
						/>
						{/* <MultipleEmailInput onEmailsChange={handleEmailsChange} /> */}
					</div>
					<div className="fwd-btns">
						<div />
						{loading ? (
							<ButtonSpinner />
						) : (
							<div className="btns">
								<Button
									className="outline"
									text="Cancel"
									onClick={() => setShowForward(false)}
								/>
								<Button text="Send" onClick={handleFwdMail} />
							</div>
						)}
					</div>
					<div className="forward-mail-body">
						<div className="forward-mail-body__info">
							<p>--------- Forwarded message ---------</p>
							<p>From: {mailContent.from}</p>
							<p>Date: {dateWithTime(mailContent.date)}</p>
							<p>Subject: {mailContent.subject}</p>
							<p>To: {mailContent.to[0]}</p>
						</div>
						<div
							className="forward-mail__body__message"
							dangerouslySetInnerHTML={{ __html: mailContent?.body }}
						></div>
					</div>
					<div className="mailContent__body__attachment">
						{mailContent?.attachments?.map((file: any) => (
							<div className="file">
								<img src={fileIcon} alt="" />
								<p>{file?.name}</p>
								<img src={downloadIcon} alt="" className="dnl" />
							</div>
						))}
					</div>
				</div>
			</GeneralModal>
		);
	};

	return (
		<div className={`mailContent ${!startReading ? 'closed' : 'full-width'}`}>
			{showForward && <ForwardMail />}
			<div className="back-btn-wrapper ">
				{' '}
				<div
					className="back-btn dont-print"
					onClick={() => dispatch(setStartReading(false))}
				>
					<IoIosArrowBack />
					<h3>{mailboxTitle}</h3>
				</div>
			</div>
			{!mailContent?.uid ? (
				<div className="mailContent__empty">
					<h3>Select mail to view the content.</h3>
				</div>
			) : (
				<>
					{' '}
					<div className="mailContent__header dont-print">
						<div className="mailContent__header__title">
							<h3 className="subject" style={{ fontWeight: '600' }}>
								{mailContent?.subject}
							</h3>
							<p className="date">{dateWithTime(mailContent?.date)}</p>
						</div>
						<div className="mailContent__header__actions">
							<button className="btn btn--primary" onClick={ReplyMail}>
								<svg
									width="15"
									height="16"
									viewBox="0 0 15 16"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className="mr-1"
								>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M6.06694 2.55806C6.311 2.80214 6.311 3.19786 6.06694 3.44194L4.00888 5.5H7.5C10.2614 5.5 12.5 7.73858 12.5 10.5V13C12.5 13.3452 12.2202 13.625 11.875 13.625C11.5298 13.625 11.25 13.3452 11.25 13V10.5C11.25 8.42896 9.57106 6.75 7.5 6.75H4.00888L6.06694 8.80808C6.311 9.05214 6.311 9.44789 6.06694 9.69196C5.82286 9.93602 5.42714 9.93602 5.18306 9.69196L2.05806 6.56694C1.81398 6.32286 1.81398 5.92714 2.05806 5.68306L5.18306 2.55806C5.42714 2.31398 5.82286 2.31398 6.06694 2.55806Z"
										fill="var(--secondary-color)"
									/>
								</svg>
								Reply
							</button>
							<button
								className="btn btn--primary"
								onClick={() => setShowForward(true)}
							>
								Forward
								<svg
									width="15"
									height="16"
									viewBox="0 0 15 16"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className="ml-1"
								>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M9.73631 1L9.02931 1.707L12.7633 5.441H8.14731C3.65531 5.441 0.000305176 9.097 0.000305176 13.589V14.441H1.00031V13.589C1.00031 9.647 4.20631 6.441 8.14731 6.441H12.7633L9.02931 10.176L9.73631 10.883L14.6773 5.941L9.73631 1Z"
										fill="var(--secondary-color)"
									/>
								</svg>
							</button>
							{/* {isFlagged ? (
                <ToolTip
                  content="Unflag mail"
                  classes="btn btn--primary"
                  position="up"
                  handleClick={flagMail}
                >
                  <img src={activeStar} alt="" />
                </ToolTip>
              ) : (
                <ToolTip
                  content="Flag mail"
                  classes="btn btn--primary"
                  position="up"
                  handleClick={unFlagMail}
                >
                  <img src={starred} alt="" />
                </ToolTip>
              )} */}
							<ToolTip
								content="Print all"
								classes="btn btn--primary"
								position="up"
								handleClick={PrintMail}
							>
								<svg
									width="18"
									height="18"
									viewBox="0 0 18 18"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M5.4375 5.25H12.5625V3.75C12.5625 2.25 12 1.5 10.3125 1.5H7.6875C6 1.5 5.4375 2.25 5.4375 3.75V5.25Z"
										stroke="var(--secondary-color)"
										strokeWidth="1.125"
										strokeMiterlimit="10"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M12 11.25V14.25C12 15.75 11.25 16.5 9.75 16.5H8.25C6.75 16.5 6 15.75 6 14.25V11.25H12Z"
										stroke="var(--secondary-color)"
										strokeWidth="1.125"
										strokeMiterlimit="10"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M15.75 7.5V11.25C15.75 12.75 15 13.5 13.5 13.5H12V11.25H6V13.5H4.5C3 13.5 2.25 12.75 2.25 11.25V7.5C2.25 6 3 5.25 4.5 5.25H13.5C15 5.25 15.75 6 15.75 7.5Z"
										stroke="var(--secondary-color)"
										strokeWidth="1.125"
										strokeMiterlimit="10"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M12.75 11.25H11.8425H5.25"
										stroke="var(--secondary-color)"
										strokeWidth="1.125"
										strokeMiterlimit="10"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M5.25 8.25H7.5"
										stroke="var(--secondary-color)"
										strokeWidth="1.125"
										strokeMiterlimit="10"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</ToolTip>
							<ToolTip
								content="Move to trash"
								classes="btn btn--primary"
								position="up"
								handleClick={deleteMail}
							>
								<svg
									width="18"
									height="18"
									viewBox="0 0 18 18"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M15.75 4.48486C13.2525 4.23736 10.74 4.10986 8.235 4.10986C6.75 4.10986 5.265 4.18486 3.78 4.33486L2.25 4.48486"
										stroke="var(--secondary-color)"
										strokeWidth="1.125"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M6.375 3.7275L6.54 2.745C6.66 2.0325 6.75 1.5 8.0175 1.5H9.9825C11.25 1.5 11.3475 2.0625 11.46 2.7525L11.625 3.7275"
										stroke="var(--secondary-color)"
										strokeWidth="1.125"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M14.1375 6.85498L13.65 14.4075C13.5675 15.585 13.5 16.5 11.4075 16.5H6.59255C4.50005 16.5 4.43255 15.585 4.35005 14.4075L3.86255 6.85498"
										stroke="var(--secondary-color)"
										strokeWidth="1.125"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M7.7475 12.375H10.245"
										stroke="var(--secondary-color)"
										strokeWidth="1.125"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M7.125 9.375H10.875"
										stroke="var(--secondary-color)"
										strokeWidth="1.125"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</ToolTip>
						</div>
					</div>
					<div className="mailContent__sender-details">
						<div
							className="sender"
							style={{
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<div
								className="user_img"
								style={{
									backgroundColor: '#FFC542',
									color: 'var(--text-color))',
									fontWeight: 'bold',
									fontSize: '1.5rem',
									borderRadius: '50%',
									width: '35px',
									height: '35px',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								{getFirstLetters(extractName(mailContent.from) || '')}
							</div>
							<div
								className="user__name"
								style={{
									marginLeft: '10px',
									display: 'flex',
									flexWrap: 'wrap',
									alignItems: 'center',
								}}
							>
								<h3>{extractName(mailContent.from)}</h3>
								<span
									style={{
										marginLeft: '10px',
										fontWeight: 'normal',
										color: '#999',
									}}
								>
									{'<'}
									{extractEmail(mailContent.from)}
									{'>'}
								</span>
							</div>
						</div>
						<div className="receiver">
							to:{' '}
							{
								mailContent?.to?.map((email: any) => (
									<span className="receiver_email" key={email}>
										{extractEmail(email) as any},
									</span>
								)) as any
							}
						</div>
					</div>
					<div className="mailContent__body">
						<div className="mailContent_wrapper">
							{/* <div className="subject">
                <p>subject:</p>
                <h3>{mailContent?.subject}</h3>
              </div> */}
							<div
								className="mailContent__body__message"
								dangerouslySetInnerHTML={{
									__html: sanitizeHTMLImages(mailContent?.body),
								}}
								style={{
									maxWidth: '100%',
									maxHeight: '100%',
									overflow: 'hidden',
								}}
							></div>
							<div className="mailContent__body__attachment">
								{mailContent?.attachments?.map((file: any) => (
									<div className="file">
										<img src={fileIcon} alt="" />
										<p>{file?.name}</p>
										<img src={downloadIcon} alt="" className="dnl" />
									</div>
								))}
							</div>
						</div>

						<div className="reply-portal">
							<ReplyPortal
								startReplying={startReplying}
								stopReply={() => setStartReplying(false)}
								mailcontent={mailContent}
								adminID={primaryMember.id}
							/>
						</div>
						<PrintPage content={mailContent?.body} />
					</div>
					{/* {showForward && <ForwardMail />} */}
				</>
			)}
		</div>
	);
}

export default MailContent;
