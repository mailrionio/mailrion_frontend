/* eslint-disable @typescript-eslint/no-explicit-any */
export enum tooltipPostitionEnum {
	up,
	down,
	left,
	right,
}

export interface ITooltip {
	content: string;
	position?: tooltipPostitionEnum;
	children: JSX.Element;
	disabled: boolean;
	tooltipRef?: React.RefObject<HTMLDivElement>;
}

export interface IuserType {
	id: string;
	name: string;
	email: string;
	alternate_email?: string;
	to_be_deleted?: boolean;
	deletion_date?: string;
	organization?: IOrganization;
}

export interface ILogin {
	email: string;
	password: string;
}

export interface IRegister {
	name: string;
	email: string;
	alternate_email: string;
	password: string;
	confirmPassword?: string;
}

export interface IMember {
	id: string;
	name: string;
	email: string;
	default?: number | string;
}

export interface IOrganization {
	id: string;
	organization: string;
	default: number | string;
	hostname: string;
	logo: string;
	created_date: string;
	verified_date: null | string;
	members: IMember[];
}

export interface IList {
	id: string;
	title: string;
	organization: string;
	number_of_contacts: number;
	created_date: string;
}

export interface IContacts {
	id: string;
	list_name: string;
	user: string;
	email: string;
	created_date: string;
}

export interface ICampaign {
	id: string | number;
	title: string;
	subject: string;
	created_on: string;
	content?: string;
}
export interface IDocument {
	id: string;
	name: string;
	size: string;
	type: string;
	cloud_url: string;
	created_on: string;
	attributes?: any;
}

export interface IEmailResultsType {
	id: number;
	file_name: string;
	bad_email_cloud_url: string;
	good_email_cloud_url: string;
	bad_email_count: number;
	good_email_count: number;
	total_email_upload: number;
	good_email_percentage: number;
	bad_email_percentage: number;
	file_size: number;
	file_type: string;
	date_created: string;
	attributes?: any;
}
