/* eslint-disable @typescript-eslint/no-explicit-any */
import attachFile from '@/assets/attachment.svg';
import trash from '@/assets/trashWhite.svg';
import Button from '@/components/Button';
import ButtonSpinner from '@/components/ButtonSpiner';
import TextEditor from '@/components/TextEditor';
import { extractEmail } from '@/helpers';
import { AdminComposeNewMail } from '@/redux/features/mailingSlice/services';
import { useAppSelector } from '@/redux/store';
import { useEffect, useRef, useState } from 'react';
import './reply-portal.scss';
type Props = {
	startReplying: boolean;
	stopReply: () => void;
	mailcontent: any;
	adminID: string;
};
function ReplyPortal({
	startReplying,
	stopReply,
	mailcontent,
	adminID,
}: Props) {
	const textRef = useRef<HTMLTextAreaElement>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const {
		selectedOrganization: { id: orgID },
	} = useAppSelector((state) => state.organization);
	const [files, setFiles] = useState<File[]>([]);
	const [body, setBody] = useState<string>('');
	// const [selectFile, setSelectFile] = useState<boolean>(false);

	useEffect(() => {
		if (startReplying) {
			textRef.current?.focus();
			textRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}, [startReplying]);

	const handleReply = async () => {
		setLoading(true);
		const formData = new FormData();
		formData.append('to', JSON.stringify([extractEmail(mailcontent?.from)]));
		formData.append('subject', `Re: ${mailcontent?.subject}`);
		// const body = textRef.current?.value;
		// console.log(body);

		formData.append('message', body as any);
		for (let i = 0; i < files.length; i++) {
			formData.append('attachment[]', files[i]);
		}
		const res = await AdminComposeNewMail(
			orgID as string,
			adminID as string,
			formData
		);
		if (res) {
			stopReply();
			setLoading(false);
			setFiles([]);
		}
	};

	return (
		<>
			{
				<div className={`Replyportal ${startReplying ? 'slide-up' : ''}`}>
					<div className="reply-container">
						<div className="close-line" onClick={stopReply}>
							<div className="close-line__line"></div>
						</div>
						<div className="reply-container__wrapper">
							<div className="reply-container__wrapper__header">
								<p>Reply</p>
								<div className="replier_name">{mailcontent?.from}</div>
								<div className="trash-btn" onClick={stopReply}>
									<img src={trash} alt="" />
								</div>
							</div>
							<div className="reply-container__wrapper__body">
								<div className="reply-container__wrapper__body__message">
									<TextEditor
										onChange={(content) => setBody(content)}
										value={body}
										// height="280px"
									/>
									{files.length > 0 && (
										<div
											className="files"
											style={{
												display: 'flex',
												alignItems: 'center',
												gap: '10px',
												flexWrap: 'wrap',
											}}
										>
											{files.map((file) => (
												<div className="file" key={file.name}>
													<span>{file.name}</span>
													<span
														style={{
															color: 'red',
															cursor: 'pointer',
															marginLeft: '10px',
														}}
														onClick={() => {
															setFiles((prevFiles) =>
																prevFiles.filter(
																	(prevFile) => prevFile !== file
																)
															);
														}}
													>
														X
													</span>
												</div>
											))}
										</div>
									)}{' '}
								</div>
								{loading ? (
									<ButtonSpinner />
								) : (
									<div className="reply-btn-options" style={{ zIndex: '6' }}>
										{/* <div
                      className="reply-btn-options__btn"
                      onClick={handleReply}
                    >
                      Send
                      <img src={sendIcon} alt="" />
                      </div> */}
										<Button text="send" arrIcon onClick={handleReply} />
										<div className="reply-btn-options__option">
											{/* <div className="reply-btn-options__option__btn">
                        <img src={textIcon} alt="" />
                      </div> */}
											<div className="reply-btn-options__option__btn">
												<input
													type="file"
													id="fileinsert"
													style={{ display: 'none' }}
													multiple
													onChange={(e) => {
														if (e.target.files) {
															setFiles((prevFiles) => [
																...prevFiles,
																...Array.from(e.target.files || []),
															]);
														}
													}}
												/>
												<label
													htmlFor="fileinsert"
													// onClick={() => setSelectFile(!selectFile)}
												>
													<img src={attachFile} alt="" />
												</label>
											</div>
											{/* <div className="reply-btn-options__option__btn">
                        <img src={memojiIcon} alt="" />
                      </div> */}
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			}
		</>
	);
}

export default ReplyPortal;
