import type { INodeProperties } from 'n8n-workflow';
import {
	ANALYZE_FORMAT_OPTIONS,
	delayField,
	formatField,
	fullSizeField,
	heightField,
	hideCookieField,
	hideField,
	javascriptCodeField,
	languageField,
	routeToBody,
	widthField,
} from '../shared/commonFields';

const showOnlyForAnalyze = {
	operation: ['analyze'],
};

const waitForDomField: INodeProperties = {
	displayName: 'Wait for DOM',
	name: 'waitForDom',
	type: 'boolean',
	default: false,
	description: 'Whether to wait for the DOM to be fully ready before analyzing the page',
};

const enableSummaryField: INodeProperties = {
	displayName: 'Enable AI Summary',
	name: 'enableSummary',
	type: 'boolean',
	default: false,
	description: 'Whether to generate an AI summary of the page content',
};

const enableQualityField: INodeProperties = {
	displayName: 'Enable Quality Check',
	name: 'enableQuality',
	type: 'boolean',
	default: false,
	description: 'Whether to run quality checks (blank page, CAPTCHA, readability, HTTP status)',
};

const forceRefreshField: INodeProperties = {
	displayName: 'Force Refresh',
	name: 'forceRefresh',
	type: 'boolean',
	default: false,
	description: 'Whether to bypass any cached analysis and re-fetch the page',
};

export const analyzeDescription: INodeProperties[] = [
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'https://example.com',
		description: 'Address of the page to analyze',
		displayOptions: {
			show: showOnlyForAnalyze,
		},
		routing: {
			send: {
				type: 'body',
				property: 'url',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: showOnlyForAnalyze,
		},
		options: [
			routeToBody(formatField(ANALYZE_FORMAT_OPTIONS)),
			routeToBody(widthField),
			routeToBody(heightField),
			routeToBody(delayField),
			routeToBody(fullSizeField),
			routeToBody(hideCookieField),
			routeToBody(javascriptCodeField),
			routeToBody(hideField),
			routeToBody(languageField),
			routeToBody(waitForDomField),
			routeToBody(enableSummaryField),
			routeToBody(enableQualityField),
			routeToBody(forceRefreshField),
		],
	},
];
