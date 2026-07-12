import type { INodeProperties } from 'n8n-workflow';
import {
	FULL_FORMAT_OPTIONS,
	convertField,
	countryField,
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

const showOnlyForScreenshot = {
	operation: ['screenshot'],
};

export const screenshotDescription: INodeProperties[] = [
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'https://example.com',
		description: 'Address of the page to capture',
		displayOptions: {
			show: showOnlyForScreenshot,
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
			show: showOnlyForScreenshot,
		},
		options: [
			routeToBody(formatField(FULL_FORMAT_OPTIONS)),
			routeToBody(widthField),
			routeToBody(heightField),
			routeToBody(delayField),
			routeToBody(fullSizeField),
			routeToBody(hideCookieField),
			routeToBody(javascriptCodeField),
			routeToBody(hideField),
			routeToBody(convertField),
			routeToBody(languageField),
			routeToBody(countryField),
		],
	},
];
