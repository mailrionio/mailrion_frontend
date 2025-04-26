import PageHeader from '@/components/PageHeader';
import ToolTip from '@/components/ToolTip';
import { useQueryParams } from '@/helpers';
import { FcDownload } from 'react-icons/fc';
import ChartJS from '../Chartjs';

const EmailAnalytics = () => {
	const myData = [
		{ x: '', y: 65 },
		{ x: '', y: 30 },
		{ x: '', y: 10 },
	];
	const dirty = [
		{ x: '', y: 65 },
		{ x: '', y: 20 },
		{ x: '', y: 10 },
		{ x: '', y: 10 },
		{ x: '', y: 10 },
		{ x: '', y: 10 },
		{ x: '', y: 10 },
	];

	const styles = {
		padding: {
			padding: '10px 16px',
		},
		title: {
			color: 'var(--text-color)',
			fontSize: '16px',
			fontWeight: '600',
			lineHeight: '33px',
			letterSpacing: '-0.32px',
		},
		subtitle: {
			color: 'var(--secondary-color)',
			fontSize: '14px',
			fontWeight: '400',
			lineHeight: '20px',
			marginBottom: '1rem',
		},
		flexItems: {
			display: 'flex',
			justifyContent: 'space-between',
			marginBottom: '2rem',
		},
	};

	return (
		<div className="email-analytics">
			<PageHeader
				title={`Analytics for email #${useQueryParams('email-id')}`}
				backLink={-1}
				useBackArrow
			/>
			<div className="analytics-details" style={styles.padding}>
				<div className="summary" style={styles.flexItems}>
					<div className="summary-item">
						<h3 style={styles.title}>Total Summary</h3>
						<p style={styles.subtitle}>
							Check the quality of your list, know whether our system found it
							good or bad quality
						</p>
						<table className="table-priority-2">
							<thead>
								<tr>
									<th>Types</th>
									<th>Count</th>
									<th>Percentage</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Clean</td>
									<td
										style={{
											color: '#04972D',
										}}
									>
										{/* {emailDetails.attributes?.good_email_count} */}
									</td>
									<td>
										{/* {calculatePercentage(
											Number(emailDetails.attributes?.good_email_count),
											Number(emailDetails.attributes?.good_email_count) +
												Number(emailDetails.attributes?.bad_email_count)
										)} */}
										%
									</td>

									<td className="action-btn">
										<ToolTip
											classes="icon"
											position="up"
											content={`Click to download the good file`}
											handleClick={() => {
												// const link = document.createElement("a");
												// link.href =
												//   emailDetails.attributes.good_excel_upload_file_url;
												// link.download = emailDetails.attributes.file_name;
												// link.click();
												// window.open(
												// 	emailDetails.attributes?.good_excel_upload_file_url
												// );
											}}
										>
											<FcDownload color="var(--secondary-color)" />
										</ToolTip>{' '}
										{/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                  >
                    <path
                      d="M17.2071 13.7071L13.2071 17.7071C12.8166 18.0976 12.1834 18.0976 11.7929 17.7071L7.79289 13.7071C7.40237 13.3166 7.40237 12.6834 7.79289 12.2929C8.18342 11.9024 8.81658 11.9024 9.20711 12.2929L11.5 14.5858V3C11.5 2.44771 11.9477 2 12.5 2C13.0523 2 13.5 2.44771 13.5 3V14.5858L15.7929 12.2929C16.1834 11.9024 16.8166 11.9024 17.2071 12.2929C17.5976 12.6834 17.5976 13.3166 17.2071 13.7071Z"
                      fill="var(--secondary-color)"
                    />
                    <path
                      d="M4.5 17.5C4.5 16.9477 4.05228 16.5 3.5 16.5C2.94772 16.5 2.5 16.9477 2.5 17.5V19C2.5 21.2091 4.29086 23 6.5 23H18.5C20.7091 23 22.5 21.2091 22.5 19V17.5C22.5 16.9477 22.0523 16.5 21.5 16.5C20.9477 16.5 20.5 16.9477 20.5 17.5V19C20.5 20.1046 19.6046 21 18.5 21H6.5C5.39543 21 4.5 20.1046 4.5 19V17.5Z"
                      fill="var(--secondary-color)"
                    />
                  </svg>
                  Download{" "}
                  <span style={{ textTransform: "capitalize" }}>
                    {emailDetails.attributes.file_name.split(".")[1]}{" "}
                  </span> */}
									</td>
								</tr>
								<tr>
									<td>Bad</td>
									<td
										style={{
											color: 'red',
										}}
									>
										{/* {emailDetails.attributes?.bad_email_count} */}
									</td>
									<td>
										{/* {calculatePercentage(
											Number(emailDetails.attributes?.bad_email_count),
											Number(emailDetails.attributes?.good_email_count) +
												Number(emailDetails.attributes?.bad_email_count)
										)} */}
										%
									</td>

									<td className="action-btn">
										<ToolTip
											classes="icon"
											position="up"
											content={`Click to download the bad file`}
											// handleClick={() => {
											// 	const link = document.createElement('a');
											// 	link.href =
											// 		emailDetails.attributes?.bad_excel_upload_file_url;
											// 	link.download = emailDetails?.attributes.file_name;
											// 	link.click();
											// }}
										>
											<FcDownload color="var(--secondary-color)" />
										</ToolTip>{' '}
										{/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                  >
                    <path
                      d="M17.2071 13.7071L13.2071 17.7071C12.8166 18.0976 12.1834 18.0976 11.7929 17.7071L7.79289 13.7071C7.40237 13.3166 7.40237 12.6834 7.79289 12.2929C8.18342 11.9024 8.81658 11.9024 9.20711 12.2929L11.5 14.5858V3C11.5 2.44771 11.9477 2 12.5 2C13.0523 2 13.5 2.44771 13.5 3V14.5858L15.7929 12.2929C16.1834 11.9024 16.8166 11.9024 17.2071 12.2929C17.5976 12.6834 17.5976 13.3166 17.2071 13.7071Z"
                      fill="var(--secondary-color)"
                    />
                    <path
                      d="M4.5 17.5C4.5 16.9477 4.05228 16.5 3.5 16.5C2.94772 16.5 2.5 16.9477 2.5 17.5V19C2.5 21.2091 4.29086 23 6.5 23H18.5C20.7091 23 22.5 21.2091 22.5 19V17.5C22.5 16.9477 22.0523 16.5 21.5 16.5C20.9477 16.5 20.5 16.9477 20.5 17.5V19C20.5 20.1046 19.6046 21 18.5 21H6.5C5.39543 21 4.5 20.1046 4.5 19V17.5Z"
                      fill="var(--secondary-color)"
                    />
                  </svg>
                  Download{" "}
                  <span style={{ textTransform: "capitalize" }}>
                    {emailDetails.attributes.file_name.split(".")[1]}{" "}
                  </span> */}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<ChartJS
						data={myData}
						colorPallete={[
							{ name: 'Clean', color: '#04972D' },
							{ name: 'Dirty', color: '#FFECE5' },
							// { name: 'Uknown', color: '#FFECE5' },
						]}
					/>
				</div>
				<div className="clean" style={styles.flexItems}>
					<div className="clean-item">
						<h3 style={styles.title}>Email Cleaniness Analytics</h3>
						<p style={styles.subtitle}>
							The details about the quality of the list data found by the list
							cleaning process
						</p>
						<table className="table-priority-2">
							<thead>
								<tr>
									<th>Types</th>
									<th>Count</th>
									<th>Percentage</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>High quality</td>
									<td
										style={{
											color: '#cc400c',
										}}
									>
										{/* {emailDetails.attributes?.good_email_count} */}
									</td>
									<td>
										{/* {calculatePercentage(
											Number(emailDetails.attributes?.good_email_count),
											Number(emailDetails.attributes?.good_email_count) +
												Number(emailDetails.attributes?.bad_email_count)
										)} */}
										%
									</td>

									<td className="action-btn">
										<ToolTip
											classes="icon"
											position="up"
											content={`Click to download the good file`}
											handleClick={() => {
												// const link = document.createElement("a");
												// link.href =
												//   emailDetails.attributes.good_excel_upload_file_url;
												// link.download = emailDetails.attributes.file_name;
												// link.click();
												// window.open(
												// 	emailDetails.attributes?.good_excel_upload_file_url
												// );
											}}
										>
											<FcDownload color="var(--secondary-color)" />
										</ToolTip>{' '}
										{/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                  >
                    <path
                      d="M17.2071 13.7071L13.2071 17.7071C12.8166 18.0976 12.1834 18.0976 11.7929 17.7071L7.79289 13.7071C7.40237 13.3166 7.40237 12.6834 7.79289 12.2929C8.18342 11.9024 8.81658 11.9024 9.20711 12.2929L11.5 14.5858V3C11.5 2.44771 11.9477 2 12.5 2C13.0523 2 13.5 2.44771 13.5 3V14.5858L15.7929 12.2929C16.1834 11.9024 16.8166 11.9024 17.2071 12.2929C17.5976 12.6834 17.5976 13.3166 17.2071 13.7071Z"
                      fill="var(--secondary-color)"
                    />
                    <path
                      d="M4.5 17.5C4.5 16.9477 4.05228 16.5 3.5 16.5C2.94772 16.5 2.5 16.9477 2.5 17.5V19C2.5 21.2091 4.29086 23 6.5 23H18.5C20.7091 23 22.5 21.2091 22.5 19V17.5C22.5 16.9477 22.0523 16.5 21.5 16.5C20.9477 16.5 20.5 16.9477 20.5 17.5V19C20.5 20.1046 19.6046 21 18.5 21H6.5C5.39543 21 4.5 20.1046 4.5 19V17.5Z"
                      fill="var(--secondary-color)"
                    />
                  </svg>
                  Download{" "}
                  <span style={{ textTransform: "capitalize" }}>
                    {emailDetails.attributes.file_name.split(".")[1]}{" "}
                  </span> */}
									</td>
								</tr>
								<tr>
									<td>Medium qaulity</td>
									<td
										style={{
											color: 'red',
										}}
									>
										{/* {emailDetails.attributes?.bad_email_count} */}
									</td>
									<td>
										{/* {calculatePercentage(
											Number(emailDetails.attributes?.bad_email_count),
											Number(emailDetails.attributes?.good_email_count) +
												Number(emailDetails.attributes?.bad_email_count)
										)} */}
										%
									</td>

									<td className="action-btn">
										<ToolTip
											classes="icon"
											position="up"
											content={`Click to download the bad file`}
											// handleClick={() => {
											// 	const link = document.createElement('a');
											// 	link.href =
											// 		emailDetails.attributes?.bad_excel_upload_file_url;
											// 	link.download = emailDetails?.attributes.file_name;
											// 	link.click();
											// }}
										>
											<FcDownload color="var(--secondary-color)" />
										</ToolTip>{' '}
										{/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                  >
                    <path
                      d="M17.2071 13.7071L13.2071 17.7071C12.8166 18.0976 12.1834 18.0976 11.7929 17.7071L7.79289 13.7071C7.40237 13.3166 7.40237 12.6834 7.79289 12.2929C8.18342 11.9024 8.81658 11.9024 9.20711 12.2929L11.5 14.5858V3C11.5 2.44771 11.9477 2 12.5 2C13.0523 2 13.5 2.44771 13.5 3V14.5858L15.7929 12.2929C16.1834 11.9024 16.8166 11.9024 17.2071 12.2929C17.5976 12.6834 17.5976 13.3166 17.2071 13.7071Z"
                      fill="var(--secondary-color)"
                    />
                    <path
                      d="M4.5 17.5C4.5 16.9477 4.05228 16.5 3.5 16.5C2.94772 16.5 2.5 16.9477 2.5 17.5V19C2.5 21.2091 4.29086 23 6.5 23H18.5C20.7091 23 22.5 21.2091 22.5 19V17.5C22.5 16.9477 22.0523 16.5 21.5 16.5C20.9477 16.5 20.5 16.9477 20.5 17.5V19C20.5 20.1046 19.6046 21 18.5 21H6.5C5.39543 21 4.5 20.1046 4.5 19V17.5Z"
                      fill="var(--secondary-color)"
                    />
                  </svg>
                  Download{" "}
                  <span style={{ textTransform: "capitalize" }}>
                    {emailDetails.attributes.file_name.split(".")[1]}{" "}
                  </span> */}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<ChartJS
						data={myData}
						colorPallete={[
							{ name: 'High quality', color: '#FA9874' },
							{ name: 'Medium quality', color: '#EB5017' },
							// { name: 'Uknown', color: '#FFECE5' },
						]}
					/>
				</div>
				<div className="dirty" style={styles.flexItems}>
					<div className="dirty-item">
						<h3 style={styles.title}>Email Dirty Analytics</h3>
						<p style={styles.subtitle}>
							The details about the quality of the list data found by the list
							cleaning process
						</p>
						<table className="table-priority-2">
							<thead>
								<tr>
									<th>Types</th>
									<th>Count</th>
									<th>Percentage</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Role-based Email</td>
									<td
										style={{
											color: '#04972D',
										}}
									>
										{/* {emailDetails.attributes?.good_email_count} */}
									</td>
									<td>
										{/* {calculatePercentage(
											Number(emailDetails.attributes?.good_email_count),
											Number(emailDetails.attributes?.good_email_count) +
												Number(emailDetails.attributes?.bad_email_count)
										)} */}
										%
									</td>

									<td className="action-btn">
										<ToolTip
											classes="icon"
											position="up"
											content={`Click to download the good file`}
											handleClick={() => {
												// const link = document.createElement("a");
												// link.href =
												//   emailDetails.attributes.good_excel_upload_file_url;
												// link.download = emailDetails.attributes.file_name;
												// link.click();
												// window.open(
												// 	emailDetails.attributes?.good_excel_upload_file_url
												// );
											}}
										>
											<FcDownload color="var(--secondary-color)" />
										</ToolTip>{' '}
										{/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                  >
                    <path
                      d="M17.2071 13.7071L13.2071 17.7071C12.8166 18.0976 12.1834 18.0976 11.7929 17.7071L7.79289 13.7071C7.40237 13.3166 7.40237 12.6834 7.79289 12.2929C8.18342 11.9024 8.81658 11.9024 9.20711 12.2929L11.5 14.5858V3C11.5 2.44771 11.9477 2 12.5 2C13.0523 2 13.5 2.44771 13.5 3V14.5858L15.7929 12.2929C16.1834 11.9024 16.8166 11.9024 17.2071 12.2929C17.5976 12.6834 17.5976 13.3166 17.2071 13.7071Z"
                      fill="var(--secondary-color)"
                    />
                    <path
                      d="M4.5 17.5C4.5 16.9477 4.05228 16.5 3.5 16.5C2.94772 16.5 2.5 16.9477 2.5 17.5V19C2.5 21.2091 4.29086 23 6.5 23H18.5C20.7091 23 22.5 21.2091 22.5 19V17.5C22.5 16.9477 22.0523 16.5 21.5 16.5C20.9477 16.5 20.5 16.9477 20.5 17.5V19C20.5 20.1046 19.6046 21 18.5 21H6.5C5.39543 21 4.5 20.1046 4.5 19V17.5Z"
                      fill="var(--secondary-color)"
                    />
                  </svg>
                  Download{" "}
                  <span style={{ textTransform: "capitalize" }}>
                    {emailDetails.attributes.file_name.split(".")[1]}{" "}
                  </span> */}
									</td>
								</tr>
								<tr>
									<td>Catch all domain</td>
									<td
										style={{
											color: 'red',
										}}
									>
										{/* {emailDetails.attributes?.bad_email_count} */}
									</td>
									<td>
										{/* {calculatePercentage(
											Number(emailDetails.attributes?.bad_email_count),
											Number(emailDetails.attributes?.good_email_count) +
												Number(emailDetails.attributes?.bad_email_count)
										)} */}
										%
									</td>

									<td className="action-btn">
										<ToolTip
											classes="icon"
											position="up"
											content={`Click to download the bad file`}
											// handleClick={() => {
											// 	const link = document.createElement('a');
											// 	link.href =
											// 		emailDetails.attributes?.bad_excel_upload_file_url;
											// 	link.download = emailDetails?.attributes.file_name;
											// 	link.click();
											// }}
										>
											<FcDownload color="var(--secondary-color)" />
										</ToolTip>{' '}
										{/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                  >
                    <path
                      d="M17.2071 13.7071L13.2071 17.7071C12.8166 18.0976 12.1834 18.0976 11.7929 17.7071L7.79289 13.7071C7.40237 13.3166 7.40237 12.6834 7.79289 12.2929C8.18342 11.9024 8.81658 11.9024 9.20711 12.2929L11.5 14.5858V3C11.5 2.44771 11.9477 2 12.5 2C13.0523 2 13.5 2.44771 13.5 3V14.5858L15.7929 12.2929C16.1834 11.9024 16.8166 11.9024 17.2071 12.2929C17.5976 12.6834 17.5976 13.3166 17.2071 13.7071Z"
                      fill="var(--secondary-color)"
                    />
                    <path
                      d="M4.5 17.5C4.5 16.9477 4.05228 16.5 3.5 16.5C2.94772 16.5 2.5 16.9477 2.5 17.5V19C2.5 21.2091 4.29086 23 6.5 23H18.5C20.7091 23 22.5 21.2091 22.5 19V17.5C22.5 16.9477 22.0523 16.5 21.5 16.5C20.9477 16.5 20.5 16.9477 20.5 17.5V19C20.5 20.1046 19.6046 21 18.5 21H6.5C5.39543 21 4.5 20.1046 4.5 19V17.5Z"
                      fill="var(--secondary-color)"
                    />
                  </svg>
                  Download{" "}
                  <span style={{ textTransform: "capitalize" }}>
                    {emailDetails.attributes.file_name.split(".")[1]}{" "}
                  </span> */}
									</td>
								</tr>
								<tr>
									<td>MX server not reachable</td>
								</tr>
								<tr>
									<td>Slow MX server</td>
								</tr>
								<tr>
									<td>Blacklisted domain</td>
								</tr>
								<tr>
									<td>Invalid email format</td>
								</tr>
								<tr>
									<td>Email not found</td>
								</tr>
							</tbody>
						</table>
					</div>
					<ChartJS
						data={dirty}
						colorPallete={[
							{ name: 'Blacklisted Domain', color: '#CC400C' },
							{
								name: 'Invalid Email Format',
								color: '#FCB59A',
							},
							{ name: 'Email Does Not Exists', color: '#FFECE5' },
							{ name: 'Catch all Domain', color: '#9747FF' },
							{ name: 'Role Based Email', color: '#CC400C' },
							{ name: 'Server Not Reachable', color: '#F5B230' },
							{ name: 'Slow MX Server', color: '#F77A4A' },
						]}
					/>
				</div>
			</div>
		</div>
	);
};

export default EmailAnalytics;
