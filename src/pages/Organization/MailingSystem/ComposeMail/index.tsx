/* eslint-disable @typescript-eslint/no-explicit-any */
import attachFile from '@/assets/file.svg';
import idea from '@/assets/idea.svg';
import sendIcon from '@/assets/send.svg';
import Button from '@/components/Button';
import ButtonSpinner from '@/components/ButtonSpiner';
import MultipleEmailInput from '@/components/MultipleEmailInput';
import TextEditor from '@/components/TextEditor';
import Toast from '@/components/Toast';
import UseAiPrompt from '@/components/UseAiPrompt';
import usePageMetadata from '@/components/UsePageMetadata';
import { baseURL, extractEmail } from '@/helpers';
import {
	AdminComposeNewMail,
	DeleteMailForever,
	SaveMailasDraft,
} from '@/redux/features/mailingSlice/services';
import { setPageSearch } from '@/redux/features/utilSlice';
import { dispatch, useAppSelector } from '@/redux/store';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import { useCallback, useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import './compose-mail.scss';

function ComposeMail() {
	usePageMetadata({
		title: `Blast new mail`,
		description: 'Create new mail, mail that drives sales and engagement',
	});
	useEffect(() => {
		dispatch(setPageSearch({ content: ``, show: false }));
	}, []);
	const drafts = JSON.parse(localStorage.getItem('drafts') as string) as any;
	const draftId = JSON.parse(localStorage.getItem('draftId') as string) as any;
	const [to, setTo] = useState<string[]>(drafts?.to ? drafts?.to : []);
	const [cc, setCc] = useState<string[]>(drafts?.cc ? drafts?.cc : []);
	const [bcc, setBcc] = useState<string[]>(drafts?.bcc ? drafts?.bcc : []);
	const [subject, setSubject] = useState(
		drafts?.subject ? drafts?.subject : ''
	);
	const [body, setBody] = useState(drafts?.body ? drafts?.body : '');
	const [isLoading, setIsLoading] = useState(false);
	// const [pickEmoji, setEmojiPicker] = useState(false);
	const [files, setFiles] = useState<File[]>([]);
	const [selectFile, setSelectFile] = useState<boolean>(false);
	const {
		selectedOrganization: { id: orgID, primaryMember },
	} = useAppSelector((state) => state.organization);
	const [usePrompt, setUsePrompt] = useState<boolean>(false);
	const [lastSavedContent, setLastSavedContent] = useState('');
	const navigate = useNavigate();

	const handleSend = async (e: any) => {
		setIsLoading(true);
		console.log('to', to);

		if (to.length === 0 || !subject.trim() || body === '<p><br></p>') {
			e.preventDefault();
			Toast({ type: 'error', message: 'Please fill all fields' });
			setIsLoading(false);
			e.stopPropagation();
			return;
		}

		const formData = new FormData();
		formData.append('to', JSON.stringify(to.map((e) => extractEmail(e))));
		formData.append('subject', subject);
		formData.append('message', body);
		formData.append(
			'cc',
			cc.length > 0 ? JSON.stringify(cc.map((e) => extractEmail(e))) : ''
		);
		formData.append(
			'bcc',
			bcc.length > 0 ? JSON.stringify(bcc.map((e) => extractEmail(e))) : ''
		);

		for (let i = 0; i < files.length; i++) {
			formData.append('attachment[]', files[i]);
		}
		const res = await AdminComposeNewMail(
			orgID as string,
			primaryMember.id,
			formData
		);
		if (res.status === 200) {
			// setCc("");
			if (draftId) {
				await DeleteMailForever(primaryMember.id, orgID, 'Drafts', draftId);
				localStorage.removeItem('draftId');
			}
			setIsLoading(false);
			navigate(`/${baseURL()}/sent`, {
				replace: true,
			});
		} else {
			setIsLoading(false);
		}
		setIsLoading(false);
	};

	// const handleInsertEmoji = (emoji: any) => {
	//   setBody((prevBody: any) => `${prevBody}${emoji?.emoji}`);
	// };

	const saveDraft = useCallback(async () => {
		// Existing code for saveDraft function
		setIsLoading(true);

		if (to.length === 0 || !subject.trim() || body === '<p><br></p>') {
			Toast({ type: 'error', message: 'Please fill all fields' });
			setIsLoading(false);
			return;
		}

		const formData = new FormData();
		formData.append('to', JSON.stringify(to));
		formData.append('subject', subject);
		formData.append('message', body);
		formData.append('cc', JSON.stringify(to));
		formData.append('bcc', JSON.stringify(to));
		for (let i = 0; i < files.length; i++) {
			formData.append('attachment[]', files[i]);
		}

		if (body !== lastSavedContent) {
			// Make API call to save the draft

			const res = await SaveMailasDraft(
				orgID as string,
				primaryMember.id,
				formData
			);

			if (res.status === 200) {
				setIsLoading(false);
				setFiles([]);
				setSelectFile(false);
			} else {
				setIsLoading(false);
			}

			setLastSavedContent(body);
		} else {
			Toast({ type: 'info', message: 'No new changes to save' });
			setIsLoading(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		to,
		subject,
		body,
		lastSavedContent,
		files,
		orgID,
		primaryMember.id,
		cc,
		bcc,
	]);

	return (
		<div className="compose-mail">
			{usePrompt && (
				<UseAiPrompt
					onClose={() => setUsePrompt(false)}
					title="Generate an email subject for a promotional email"
					promptType="subject"
					samples={[
						'Promotion Email subject',
						'Product Launch Announcement Email subject',
						'Webinar Invitation Email subject',
						'Thank You Email subject',
					]}
					handleUse={(value) => {
						setSubject(value);
						setUsePrompt(false);
					}}
				/>
			)}
			<h2>Compose mail</h2>
			<div className="compose-mail__form">
				<div className="left">
					<div className="recipient">Recipient:</div>
					<div className="subject">Subject:</div>
					<div className="body"></div>
				</div>
				<div className="right">
					<div className="recipient">
						<MultipleEmailInput
							onEmailsChange={(emails: string[]) => setTo(emails)}
						/>
						<div className="cc">
							<b>CC:</b>
							{/* <input
								type="text"
								value={cc}
								placeholder="example2@mailrion.com"
								onChange={(e) => setCc(e.target.value)}
							/> */}
							<MultipleEmailInput
								onEmailsChange={(emails: string[]) => setCc(emails)}
							/>
						</div>
						<div className="cc">
							<b>BCC:</b>
							{/* <input
								type="text"
								value={bcc}
								placeholder="example2@mailrion.com"
								onChange={(e) => setBcc(e.target.value)}
							/> */}
							<MultipleEmailInput
								onEmailsChange={(emails: string[]) => setBcc(emails)}
							/>
						</div>
					</div>
					<div className="subject items-center space-between">
						<input
							type="text"
							required
							placeholder="mailrion HQ"
							value={subject}
							onChange={(e) => setSubject(e.target.value)}
						/>
						<div className="use-ai" onClick={() => setUsePrompt(true)}>
							Ai subject generator
							<img src={idea} alt="" />
						</div>
					</div>
					<div className="body">
						<TextEditor onChange={(content) => setBody(content)} value={body} />
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
													prevFiles.filter((prevFile) => prevFile !== file)
												);
											}}
										>
											X
										</span>
									</div>
								))}
							</div>
						)}
					</div>
					<div className="compose-btn-options">
						{isLoading ? (
							<ButtonSpinner />
						) : (
							<>
								<div
									className={`compose-btn-options__btn ${
										!to && !subject && !body ? 'isDisabled' : ''
									}`}
									onClick={handleSend}
								>
									Send
									<img src={sendIcon} alt="" />
								</div>
								<Button
									type="button"
									disabled={!to && !subject && !body}
									text="Save as draft"
									className="outline"
									onClick={saveDraft}
								/>
							</>
						)}
						<div className="compose-btn-options__option">
							<div className="compose-btn-options__option__btn">
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
									onClick={() => setSelectFile(!selectFile)}
								>
									<img src={attachFile} alt="" />
								</label>
							</div>
							<div
								className="emoji-picker"
								style={{
									position: 'absolute',
									bottom: '50px',
									zIndex: 3,
								}}
							>
								{/* {pickEmoji && <EmojiPicker onEmojiClick={handleInsertEmoji} />} */}
							</div>
							{/* <div
                className="compose-btn-options__option__btn"
                onClick={() => setEmojiPicker(!pickEmoji)}
              >
                <img src={memojiIcon} alt="" />
              </div> */}
						</div>
						{/* {selectFile && (
              <div className="files">
                <DragNdrop onFilesSelected={setFiles} width="300px" />
              </div>
            )} */}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ComposeMail;
