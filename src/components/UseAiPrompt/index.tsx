/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import GeneralModal from '../GeneralModal';
import './aiPrompt.scss';
// import { IoSend } from 'react-icons/io'
import { handleCopy } from '@/helpers';
import { AIGenerator } from '@/redux/features/userSlice/service';
import { BsFillSendFill } from 'react-icons/bs';
import { IoMdSend } from 'react-icons/io';
import Button from '../Button';
import ButtonSpinner from '../ButtonSpiner';
type props = {
	title: string;
	samples: string[];
	promptType: string;
	onClose: () => void;
	handleUse: (value: string) => void;
};
const UseAiPrompt = ({ onClose, samples, title, promptType, handleUse}: props) => {
	const [prompt, setPrompt] = useState<string>('');
	const [generateLoading, setGenerateLoading] = useState<boolean>(false);
	const [generated, setGenerated] = useState<string[]>([]);

	const handleGeneratePrompts = async (value: string) => {
		setGenerateLoading(true);
		const res = (await AIGenerator(`${value} for ${promptType}`)) as any;
		if (res.status === 200) {
			const aiText = res.data.ai.replace(/^"|"$/g, ''); // Remove quotes
			setGenerated((prev) => [...prev, aiText]);
		}
		setGenerateLoading(false);
	};

	return (
		<GeneralModal
			title={'Use our powerful AI generator'}
			subTitle={title}
			width="650px"
			height={'560px'}
			handleClose={onClose}
		>
			<div className="use-ai-prompt">
				<div className="use-ai-body">
					<ul className="generator">
						{generated.length <= 0 ? (
							<>
								{samples.length > 0 && (
									<>
										{' '}
										<div className="use-ai-prompt__header">
											<p>Try:</p>
										</div>
										<div className="samples">
											{samples.map((s) => (
												<div
													className="sample"
													onClick={() => {
														handleGeneratePrompts(s);
													}}
													key={s}
												>
													{s}
												</div>
											))}
										</div>
									</>
								)}
							</>
						) : (
							<>
								{generated.map((g, i) => (
									<li className="generated" key={i}>
										{g}
										<div
											className="copy"
											onClick={() => {
												handleCopy(g);
											}}
										>
											<Button text='use' onClick={() => handleUse(g)} />
										</div>
									</li>
								))}
							</>
						)}
					</ul>
				</div>
				<div className="use-ai-prompt__input customInput">
					<input
						type="text"
						name="prompt"
						value={prompt}
						placeholder="describe your prompt"
						onChange={(e) => setPrompt(e.target.value)}
					/>
					<div
						className="send-img"
						onClick={() => handleGeneratePrompts(prompt)}
					>
						{/* <img src={sendIcon} alt='send button'/> */}
						<>
							{generateLoading ? (
								<ButtonSpinner />
							) : !prompt.trim() ? (
								<IoMdSend className="not-typing" />
							) : (
								<BsFillSendFill className="typing" />
							)}
						</>
					</div>
				</div>
			</div>
		</GeneralModal>
	);
};

export default UseAiPrompt;
