/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonSpinner from '@/components/ButtonSpiner';
import NoItemFound from '@/components/NoItemFound';
import Portalbar from '@/components/Portalbar';
import ToastMessage from '@/components/Toast';
import { IDocument } from '@/config';
import {
	convertResponseToEntity,
	formatDateAndTime,
	searchData,
	truncateText,
} from '@/helpers';
import {
	DeleteDocumentPermanently,
	GetAllTrashedDocuments,
	RestoreFromTrash,
} from '@/redux/features/CloudStorageSlice/services';
import { useAppSelector } from '@/redux/store';
import { useEffect, useState } from 'react';
import { MdOutlineRestore } from 'react-icons/md';
import ToolTip from '../../../../components/ToolTip';
import HeadingEffect from '../../../../components/TransitionEffects/Heading';
import docs from '../icons/docs.svg';
import folder from '../icons/folder.svg';
import image from '../icons/image.svg';
import pdf from '../icons/pdf.svg';
import video from '../icons/video.svg';
import '../storage.scss';

const Trashed = () => {
	const [document, setDocument] = useState<IDocument | null>(null);
	const [documents, setDocuments] = useState<IDocument[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const { searchQuery } = useAppSelector((state) => state.utils);
	const [selectedItems, setSelectedItems] = useState<IDocument[]>([]);

	const fetchDocs = async () => {
		setIsLoading(true);
		const res = await GetAllTrashedDocuments();
		console.log(res);
		// const convertedType: IDocument[] = res?.message.map((doc: any) => {
		//   return {
		//     id: doc.id,
		//     name: doc.attributes.name,
		//     type: doc.attributes.type,
		//     size: doc.attributes.size,
		//     cloud_url: doc.attributes.cloud_url,
		//     created_on: doc.attributes.date_created,
		//   };
		// });
		const convertedType: IDocument[] = convertResponseToEntity(
			res?.message as IDocument[],
			['id', 'name', 'type', 'size', 'cloud_url', 'created_on']
		);
		setDocuments(convertedType);
		setIsLoading(false);
	};

	useEffect(() => {
		fetchDocs();
	}, []);

	// const toggleMoreOptions = (clickedDocument: IDocument) => {
	// 	setDocument((prevDocument) =>
	// 		prevDocument?.id === clickedDocument.id ? null : clickedDocument
	// 	);
	// };

	const handleSelectItem = (clickedDocument: IDocument) => {
		if (selectedItems.find((item) => item.id === clickedDocument.id)) {
			setSelectedItems((prevItems) =>
				prevItems.filter((item) => item.id !== clickedDocument.id)
			);
		} else {
			setSelectedItems((prevItems) => [...prevItems, clickedDocument]);
		}
	};

	const handleDeletePermanently = async () => {
		let deleted = 0;
		for (const doc of selectedItems) {
			await DeleteDocumentPermanently(doc.id);
			deleted++;
		}
		if (deleted > 0 || deleted === selectedItems.length) {
			ToastMessage({ type: 'success', message: 'File(s) permanently deleted' });
			setSelectedItems([]);
			fetchDocs();
		}
	};

	// const handleRestore = async (item: IDocument) => {
	// 	// set to selecteditem first
	// 	setSelectedItems([item]);
	// 	let restored = 0;
	// 	for (const doc of selectedItems) {
	// 		await RestoreFromTrash(doc.id);
	// 		restored++;
	// 	}
	// 	if (restored > 0 || restored === selectedItems.length) {
	// 		ToastMessage({
	// 			type: 'success',
	// 			message: 'File(s) restored successfully',
	// 		});
	// 		setSelectedItems([]);
	// 		fetchDocs();
	// 	}
	// };

	// function ToggleMoreActions({ item }: { item: IDocument }) {
	// 	return (
	// 		<div className="more-options">
	// 			<p className="more-options__item" onClick={() => handleRestore(item)}>
	// 				Restore
	// 			</p>
	// 			{/* <p className="more-options__item del" onClick={() => handleDeletePermanently(item)}>
	// 				Delete forever
	// 			</p> */}
	// 		</div>
	// 	);
	// }
	// function ToggleMoreActions() {
	//   return (
	//     <PopupMenu>
	//       <p className="more-options__item" onClick={handleRestore}>
	//         Restore
	//       </p>
	//       <p className="more-options__item del" onClick={handleDeletePermanently}>
	//         Delete forever
	//       </p>
	//     </PopupMenu>
	//   );
	// }
	return (
		<div className="Files">
			{document !== null && (
				<div className="overlay" onClick={() => setDocument(null)} />
			)}
			{isLoading ? (
				<ButtonSpinner />
			) : (
				<>
					{' '}
					<div className="Files__header">
						<HeadingEffect>
							{' '}
							<h3>Recently deleted</h3>
						</HeadingEffect>
					</div>
					<Portalbar
						selectedItems={selectedItems}
						onDelete={handleDeletePermanently}
						deleteText="Delete forever"
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
									>
										{/* {file.id === document?.id && (
											<ToggleMoreActions item={file} />
										)} */}
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
													<h3>{truncateText(name, 20)}</h3>
												</div>
												<div className="file_name_more">
													<ToolTip
														classes="more"
														content="Click to recover this file"
														position="up"
														handleClick={async () => {
															await RestoreFromTrash(file.id);
															ToastMessage({
																type: 'success',
																message: 'File restored successfully',
															});
															fetchDocs();
														}}
													>
														{/* <img src={moreIcon} alt="" className="moreIcon" /> */}
														<MdOutlineRestore />
													</ToolTip>
												</div>
											</div>
											<div className="fileCard__content">
												{type === 'pdf' ? (
													<div className="preview-wraper">
														<img src={pdf} alt="" />
													</div>
												) : type === 'avi' ||
												  type === 'mp4' ||
												  type === '3gp' ||
												  type === 'gif' ||
												  type === 'mov' ||
												  type === 'webm' ? (
													<div className="preview-wraper">
														<img src={video} alt="" />
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
														<img src={cloud_url} alt="" />
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
						<NoItemFound content="Documents you have deleted will appear here." />
					)}
				</>
			)}
		</div>
	);
};

export default Trashed;
