/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonSpinner from '@/components/ButtonSpiner';
import GeneralModal from '@/components/GeneralModal';
import NoItemFound from '@/components/NoItemFound';
import Portalbar from '@/components/Portalbar';
import ToastMessage from '@/components/Toast';
import { IDocument } from '@/config';
import {
	formatDateAndTime,
	getFileTypeFromURL,
	handleCopy,
	searchData,
	truncateText,
	useQueryParams,
} from '@/helpers';
import {
	GetAllDocuments,
	MoveDocumentToTrash,
} from '@/redux/features/CloudStorageSlice/services';
import { useAppSelector } from '@/redux/store';
import { useEffect, useState } from 'react';
import { FaPlayCircle } from 'react-icons/fa';
import moreIcon from '../../../../assets/moreIcon.svg';
import ToolTip from '../../../../components/ToolTip';
import HeadingEffect from '../../../../components/TransitionEffects/Heading';
import docs from '../icons/docs.svg';
import folder from '../icons/folder.svg';
import image from '../icons/image.svg';
import pdf from '../icons/pdf.svg';
import video from '../icons/video.svg';
import '../storage.scss';

const AllFiles = () => {
	const docURL = useQueryParams('modal-id');
	console.log(docURL);

	const docName = useQueryParams('name');
	const fileType = getFileTypeFromURL(docURL as string);
	const [document, setDocument] = useState<IDocument | null>(null);
	const [documents, setDocuments] = useState<IDocument[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const { searchQuery } = useAppSelector((state) => state.utils);
	const [selectedItems, setSelectedItems] = useState<IDocument[]>([]);
	const [showPlayVidModal, setShowPlayVidModal] = useState(false);
	const [queries, setQueries] = useState<{
		docURL: string;
		docName: string;
	}>(
		{} as {
			docURL: string;
			docName: string;
		}
	);

	const fetchDocs = async () => {
		setIsLoading(true);
		const res = await GetAllDocuments();
		console.log(res);
		const convertedType: IDocument[] = res?.message.map((doc: any) => {
			return {
				id: doc.id,
				name: doc.attributes.name,
				type: doc.attributes.type,
				size: doc.attributes.size,
				cloud_url: doc.attributes.cloud_url,
				created_on: doc.attributes.date_created,
			};
		});
		setDocuments(convertedType);
		setIsLoading(false);
	};

	useEffect(() => {
		fetchDocs();
	}, []);

	const toggleMoreOptions = (clickedDocument: IDocument) => {
		setDocument((prevDocument) =>
			prevDocument?.id === clickedDocument.id ? null : clickedDocument
		);
	};

	const handleSelectItem = (clickedDocument: IDocument) => {
		if (selectedItems.find((item) => item.id === clickedDocument.id)) {
			setSelectedItems((prevItems) =>
				prevItems.filter((item) => item.id !== clickedDocument.id)
			);
		} else {
			setSelectedItems((prevItems) => [...prevItems, clickedDocument]);
		}
	};

	const handleDownload = () => {
		window.open(document?.cloud_url as string, '_blank');
	};

	const handleMoveToTrash = async () => {
		let deleted = 0;
		for (const doc of selectedItems) {
			await MoveDocumentToTrash(doc.id);
			deleted++;
		}
		if (deleted > 0 || deleted === selectedItems.length) {
			ToastMessage({ type: 'success', message: 'File(s) moved to trash' });
			setSelectedItems([]);
			fetchDocs();
		}
	};

	useEffect(() => {
		setQueries({
			docURL: docURL as string,
			docName: docName as string,
		});
		if (docURL !== null && docName !== null) {
			setShowPlayVidModal(true);
		}
	}, [docName, docURL]);

	function PlayModal() {
		return (
			<GeneralModal
				width="800px"
				height="600px"
				title={queries?.docName as string}
				// subTitle={truncateText(playViDetails.description, 151)}
				handleClose={() => {
					window.history.replaceState(null, '', '/cloud-storage');
					setShowPlayVidModal(false);
				}}
			>
				{fileType === 'image' ? (
					<div className="image-preview">
						<img
							src={queries.docURL as string}
							alt={queries.docName as string}
						/>
					</div>
				) : fileType === 'video' ? (
					<div className="video-preview">
						{fileType === 'video' ? (
							<video
								width="100%"
								height="100%"
								className="mt-2"
								controls
								autoPlay
								src={queries.docURL as string}
							/>
						) : (
							<iframe
								width="100%"
								height="100%"
								src={queries.docURL as string}
								title="YouTube video player"
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							></iframe>
						)}
					</div>
				) : null}
			</GeneralModal>
		);
	}

	function ToggleMoreActions() {
		return (
			<div className="more-options">
				<p
					className="more-options__item"
					onClick={() => {
						handleCopy(
							`${window.location.origin}/cloud-storage?modal-id=${document?.cloud_url}&name=${document?.name}`
						);
					}}
				>
					Share
				</p>
				<p
					className="more-options__item"
					onClick={() => handleCopy(document?.cloud_url as string)}
				>
					Copy link
				</p>
				<p className="more-options__item" onClick={handleDownload}>
					Download
				</p>
				{/* <p className="more-options__item del" onClick={handleMoveToTrash}>
					Move to trash
				</p> */}
			</div>
		);
	}
	return (
		<div className="Files">
			{document !== null && (
				<div className="overlay" onClick={() => setDocument(null)} />
			)}
			{showPlayVidModal && <PlayModal />}
			{isLoading ? (
				<ButtonSpinner />
			) : (
				<>
					{' '}
					<div className="Files__header">
						<HeadingEffect>
							<h3>All Files</h3>
						</HeadingEffect>
					</div>
					<Portalbar
						selectedItems={selectedItems}
						onDelete={handleMoveToTrash}
						deleteText="Move to trash"
						onClearSelection={() => {
							setSelectedItems([]);
						}}
					/>
					{documents.length > 0 ? (
						<div className="Files__content">
							{searchData(documents, searchQuery, 'name').map((file) => {
								const { name, type, created_on, cloud_url } = file;
								return (
									<div
										className={`card ${
											selectedItems.find((selected) => selected.id === file.id)
												? 'active'
												: ''
										}`}
										key={file.id}
										// onClick={() => handleSelectItem(file)}
									>
										{file.id === document?.id && <ToggleMoreActions />}
										<div className="fileCard">
											<div className="fileCard__header">
												<input
													type="checkbox"
													checked={
														selectedItems.find(
															(selected) => selected.id === file.id
														)
															? true
															: false
													}
													onChange={() => handleSelectItem(file)}
												/>
												<div className="logo-name">
													<div className="file_logo">
														{type === 'pdf' ? (
															<img src={pdf} alt="" />
														) : type === 'avi' ||
														  type === 'mp4' ||
														  type === '3gp' ||
														  type === 'gif' ||
														  type === 'mov' ||
														  type === 'webm' ? (
															<img src={video} alt="" />
														) : type === 'folder' ? (
															<img src={folder} alt="" />
														) : type === 'img' ||
														  type === 'jpg' ||
														  type === 'png' ||
														  type === 'jpeg' ||
														  type === 'svg' ||
														  type === 'gif' ||
														  type === 'webp' ? (
															<img src={image} alt="" />
														) : type === 'docx' ||
														  type === 'xls' ||
														  type === 'xlsx' ? (
															<img src={docs} alt="" />
														) : null}
													</div>
													<h3>{truncateText(name, 28)}</h3>
												</div>
												<div className="file_name_more">
													<ToolTip
														classes="more"
														content="More options"
														position="up"
														handleClick={() => {
															toggleMoreOptions(file);
														}}
													>
														<img src={moreIcon} alt="" className="moreIcon" />
													</ToolTip>
												</div>
											</div>
											<div className="fileCard__content">
												{type === 'pdf' ? (
													<div className="preview-wraper">
														<object
															data={cloud_url}
															type="application/pdf"
															width="100%"
															height="100%"
														></object>
													</div>
												) : type === 'avi' ||
												  type === 'mp4' ||
												  type === '3gp' ||
												  type === 'gif' ||
												  type === 'mov' ||
												  type === 'webm' ? (
													<div className="preview-wraper">
														<FaPlayCircle
															style={{
																fontSize: '50px',
																// color: '#fff',
																cursor: 'pointer',
																position: 'absolute',
																top: '50%',
																left: '50%',
																transform: 'translate(-50%, -50%)',
																zIndex: 3,
															}}
															onClick={() => {
																setQueries({
																	docURL: cloud_url,
																	docName: name,
																});
																setShowPlayVidModal(true);
																window.history.replaceState(
																	null,
																	'',
																	`/cloud-storage?modal-id=${cloud_url}&name=${name}`
																);
															}}
														/>
														<video
															src={cloud_url}
															width="100%"
															height="100%"
														></video>
													</div>
												) : type === 'folder' ? (
													<img src={folder} alt="" />
												) : type === 'img' ||
												  type === 'jpg' ||
												  type === 'png' ||
												  type === 'jpeg' ||
												  type === 'svg' ||
												  type === 'gif' ||
												  type === 'webp' ? (
													<div className="preview-wraper">
														<img
															src={cloud_url}
															alt=""
															onClick={() => {
																setShowPlayVidModal(true);
																// setPreviewDoc(file);
																window.history.replaceState(
																	null,
																	'',
																	`/cloud-storage?modal-id=${
																		file.cloud_url as string
																	}&name=${file.name}`
																);
															}}
														/>
													</div>
												) : type === 'docx' ||
												  type === 'xls' ||
												  type === 'xlsx' ? (
													<div className="preview-wraper">
														<img src={docs} alt="" />
													</div>
												) : null}
											</div>
											<div className="fileCard__footer">
												<p>
													created on{' '}
													<span className="date">
														{formatDateAndTime(created_on)?.date}
													</span>{' '}
												</p>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					) : (
						<NoItemFound content="Files in your storage bucket will appear here." />
					)}
				</>
			)}
		</div>
	);
};

export default AllFiles;
