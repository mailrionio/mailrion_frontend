/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/Button';
import ButtonSpinner from '@/components/ButtonSpiner';
import NoItemFound from '@/components/NoItemFound';
import PageHeader from '@/components/PageHeader';
import ToolTip from '@/components/ToolTip';
import usePageMetadata from '@/components/UsePageMetadata';
import {
	ConvertFileNumberToSize,
	calculatePercentage,
	formatDateAndTime,
	useQueryParams,
} from '@/helpers';
import { GetSingleValidatedEmail } from '@/redux/features/emailValidationSlice/services';
import { useAppSelector } from '@/redux/store';
import { useEffect } from 'react';
import { FcDownload } from 'react-icons/fc';
import { useParams } from 'react-router-dom';
import ChartJS from '../Chartjs';
import './email-validation-details.scss';
/**
 * 
 * @returns 
 * import React from "react";
import { VictoryPie } from "victory-pie";

const myData = [
  { x: "Group A", y: 900 },
  { x: "Group B", y: 400 },
  { x: "Group C", y: 300 },
];

const App = () => {
  return (
    <div>
      <VictoryPie
        data={myData}
        colorScale={["blue", "yellow", "red"]}
        radius={100}
      />
    </div>
  );
};

export default App;

import React from "react";
import { PieChart, Pie, Tooltip } from "recharts";

const myData = [
  { name: "Group A", value: 900 },
  { name: "Group B", value: 400 },
  { name: "Group C", value: 300 },
];

const App = () => {
  return (
    <PieChart width={800} height={800}>
      <Pie
        dataKey="value"
        isAnimationActive={true}
        data={myData}
        outerRadius={300}
        fill="orangered"
        label
      />
      <Tooltip />
    </PieChart>
  );
};

export default App;


import React from "react";
import { PieChart } from "react-minimal-pie-chart";

const myData = [
  { title: "Dogs", value: 100, color: "orange" },
  { title: "Cats", value: 50, color: "green" },
  { title: "Dragons", value: 15, color: "purple" },
];

const App = () => {
  return (
    <div>
      <PieChart
        // your data
        data={myData}
        // width and height of the view box
        viewBoxSize={[600, 600]}
      />
    </div>
  );
};

export default App;

**/

const EmailValidationDetails = () => {
	usePageMetadata({
		title: 'Email Validation Details',
		description: 'Email Validation Details',
	});
	const { id } = useParams<{ id: string }>();
	const emailid = useQueryParams('email-id');
	const { emailDetails, isValidationLoading } = useAppSelector(
		(state) => state.emailValidation
	);
	const myData = [
		{ x: '', y: Number(emailDetails.attributes?.good_email_count) || 0 },
		{ x: '', y: Number(emailDetails.attributes?.bad_email_count) || 0 },
	];

	useEffect(() => {
		const getSingleEmailDetails = async () => {
			await GetSingleValidatedEmail(emailid as string);
		};
		if (!emailDetails.id) getSingleEmailDetails();
	}, [emailid]);
	return (
		<div className="EmailValidationDetails">
			<PageHeader
				title={`Details for ${emailDetails.attributes?.file_name ?? ''}`}
				backLink={-1}
				useBackArrow
			>
				<Button
					text="See all files"
					to={`/organization/${id}/email-validation/all-results`}
					arrIcon
				/>
			</PageHeader>

			{isValidationLoading ? (
				<ButtonSpinner />
			) : (
				<>
					{emailDetails.id ? (
						<div className="email-analysis">
							<div className="table">
								<table className="table-priority-1">
									<thead>
										<tr>
											{/* <th>Email ID</th> */}
											<th>Filename</th>
											<th>Date created</th>
											<th>File size</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											{/* <td>3240983</td> */}
											<td>{emailDetails.attributes?.file_name}</td>
											<td>
												{
													formatDateAndTime(
														emailDetails.attributes?.date_created
													).date
												}{' '}
												|{' '}
												{
													formatDateAndTime(
														emailDetails.attributes?.date_created
													).time
												}
											</td>
											<td>
												{ConvertFileNumberToSize(
													emailDetails.attributes?.file_size
												)}
											</td>
										</tr>
									</tbody>
								</table>
								<div className="mt-2"></div>
								<table className="table-priority-1">
									<thead>
										<tr>
											<th>Total record</th>
											<th>Duplicate</th>
											<th>Status</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>
												{Number(emailDetails.attributes?.good_email_count) +
													Number(emailDetails.attributes?.bad_email_count)}
											</td>
											<td>{emailDetails.attributes?.no_of_duplicates}</td>
											<td
												style={{
													// color: "#fff",
													color: '#0F973D',
													borderRadius: '12px',
													// marginTop: "10px !important",
												}}
											>
												Completed
											</td>
											<td></td>
										</tr>
									</tbody>
								</table>
								<div className="mt-2"></div>
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
												{emailDetails.attributes?.good_email_count}
											</td>
											<td>
												{calculatePercentage(
													Number(emailDetails.attributes?.good_email_count),
													Number(emailDetails.attributes?.good_email_count) +
														Number(emailDetails.attributes?.bad_email_count)
												)}
												%
											</td>

											<td className="action-btn">
												<ToolTip
													classes="icon"
													position="up"
													content={`Click to download the good ${
														emailDetails.attributes?.file_name.split('.')[1]
													} file`}
													handleClick={() => {
														// const link = document.createElement("a");
														// link.href =
														//   emailDetails.attributes.good_excel_upload_file_url;
														// link.download = emailDetails.attributes.file_name;
														// link.click();
														window.open(
															emailDetails.attributes
																?.good_excel_upload_file_url
														);
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
												{emailDetails.attributes?.bad_email_count}
											</td>
											<td>
												{calculatePercentage(
													Number(emailDetails.attributes?.bad_email_count),
													Number(emailDetails.attributes?.good_email_count) +
														Number(emailDetails.attributes?.bad_email_count)
												)}
												%
											</td>

											<td className="action-btn">
												<ToolTip
													classes="icon"
													position="up"
													content={`Click to download the bad ${
														emailDetails.attributes?.file_name.split('.')[1]
													} file`}
													handleClick={() => {
														const link = document.createElement('a');
														link.href =
															emailDetails.attributes?.bad_excel_upload_file_url;
														link.download = emailDetails?.attributes.file_name;
														link.click();
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
									</tbody>
								</table>
							</div>
							<aside className="chart">
								<ChartJS
									data={myData}
									colorPallete={[
										{ name: 'Clean', color: '#04972D' },
										{ name: 'Dirty', color: '#cc400c' },
										// { name: "Uknown", color: "#FFECE5" },
									]}
								/>
								{/* <Button
									text="List Analytics"
									arrIcon
									to={`/${baseURL()}/email-validation/email-analytics?email-id=${
										emailDetails.id
									}`}
								/> */}
							</aside>
						</div>
					) : (
						<NoItemFound content="Nothing to see here :)" />
					)}
				</>
			)}
		</div>
	);
};

export default EmailValidationDetails;
