/* eslint-disable @typescript-eslint/no-explicit-any */
// MailingSystem.tsx
import Toast from '@/components/Toast';
import usePageMetadata from '@/components/UsePageMetadata';
import {
	DeleteMailForever,
	FlagMail,
	MoveMultipleMailToTrash,
	UnFlagMail,
} from '@/redux/features/mailingSlice/services';
import { useAppSelector } from '@/redux/store';
import React, { useEffect, useState } from 'react';
import MailContent from './MailContent';
import MailboxList from './MailboxList';
import './mailboxsystem.scss';
interface MailingSystemProps {
	mailboxTitle: string;
}

const MailingSystem: React.FC<MailingSystemProps> = ({ mailboxTitle }) => {
	usePageMetadata({
		title: 'Mailbox | Mailrion',
		description: 'Create and manage your organization mails here',
	});
	const [selectedMail, setSelectedMail] = useState<any>({});
	const [startReading, setStartReading] = useState<boolean>(false);
	const [startDeleting, setStartDeleting] = useState<boolean>(false);
	const [isflagged, setIsFlagged] = useState<boolean>(false);
	const {
		selectedOrganization: { id: orgID, primaryMember },
	} = useAppSelector((state) => state.organization);

	const handleSelectMail = (mail: any) => {
		setSelectedMail(mail);
		setIsFlagged(mail?.flagged);
	};
	const handleStartReading = () => {
		setStartReading(true);
	};

	const handleDeleteMail = async () => {
		// setStartReading(false);
		setSelectedMail({});

		switch (mailboxTitle) {
			case 'Inbox':
				setStartDeleting(true);
				await MoveMultipleMailToTrash(
					primaryMember.id,
					orgID as string,
					'INBOX',
					[selectedMail.uid]
				);
				setStartDeleting(false);
				break;
			case 'Starred':
				await MoveMultipleMailToTrash(
					primaryMember.id,
					orgID as string,
					'Starred',
					[selectedMail.uid]
				);
				break;
			case 'Sent':
				setStartDeleting(true);
				await MoveMultipleMailToTrash(
					primaryMember.id,
					orgID as string,
					'Sent',
					[selectedMail.uid]
				);
				setStartDeleting(false);

				break;
			case 'Spam':
				setStartDeleting(true);

				await MoveMultipleMailToTrash(
					primaryMember.id,
					orgID as string,
					'Spam',
					[selectedMail.uid]
				);
				setStartDeleting(false);

				break;
			case 'Drafts':
				setStartDeleting(true);

				await MoveMultipleMailToTrash(
					primaryMember.id,
					orgID as string,
					'Drafts',
					[selectedMail.uid]
				);
				setStartDeleting(false);
				break;
			case 'Trash':
				setStartDeleting(true);

				await DeleteMailForever(
					primaryMember.id,
					orgID,
					'Trash',
					selectedMail.uid
				);
				setStartDeleting(false);
				break;
			case 'Archive':
				setStartDeleting(true);

				await MoveMultipleMailToTrash(
					primaryMember.id,
					orgID as string,
					'Archive',
					[selectedMail.uid]
				);
				setStartDeleting(false);
				break;
			default:
				setStartDeleting(true);

				await MoveMultipleMailToTrash(
					primaryMember.id,
					orgID as string,
					'INBOX',
					[selectedMail.uid]
				);
				setStartDeleting(false);
				break;
		}
	};

	useEffect(() => {
		if (startDeleting) {
			handleDeleteMail();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [startDeleting]);

	const handleFlagMail = async () => {
		const res = await FlagMail(primaryMember.id, orgID, selectedMail?.uid);
		console.log(res);

		if (res.status === 200) {
			setIsFlagged(true);
			Toast({ type: 'success', message: res.data?.message });
		}
		// window.location.reload();
	};
	const handleUnFlagMail = async () => {
		const res = await UnFlagMail(primaryMember.id, orgID, selectedMail?.uid);

		if (res.status === 200) {
			Toast({ type: 'success', message: 'Message UnFlagged' });
			setIsFlagged(false);
		}
		// window.location.reload();
	};

	return (
		<div className="mailing-system">
			<MailboxList
				title={mailboxTitle}
				selectedMailId={selectedMail?.uid}
				onSelectMail={handleSelectMail}
				handleStartReading={handleStartReading}
				onDeleteMail={handleDeleteMail}
				startDeleting={startDeleting}
				setStartDeleting={setStartDeleting}
				startReading={startReading}
			/>
			<MailContent
				mailContent={selectedMail}
				startReading={startReading}
				mailboxTitle={mailboxTitle}
				deleteMail={handleDeleteMail}
				flagMail={handleFlagMail}
				unFlagMail={handleUnFlagMail}
				isFlagged={isflagged}
			/>
		</div>
	);
};

export default MailingSystem;
