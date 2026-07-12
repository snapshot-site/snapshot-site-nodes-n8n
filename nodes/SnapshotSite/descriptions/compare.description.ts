import type { INodeProperties } from 'n8n-workflow';
import {
	delayField,
	fullSizeField,
	heightField,
	hideCookieField,
	hideField,
	javascriptCodeField,
	languageField,
	widthField,
} from '../shared/commonFields';

const showOnlyForCompare = {
	operation: ['compare'],
};

const imageUrlField: INodeProperties = {
	displayName: 'Image URL',
	name: 'imageUrl',
	type: 'string',
	default: '',
	placeholder: 'https://example.com/screenshot.png',
	description: 'Compare against an already-captured image instead of a live URL',
};

/**
 * These "Options" collections are read directly via getNodeParameter in
 * shared/compareRequest.ts, so their sub-fields intentionally carry no
 * `routing` — the whole node body for the compare operation is assembled by
 * a single custom preSend function instead of per-field routing.
 */
function sourceOptionsField(displayName: string, name: string): INodeProperties {
	return {
		displayName,
		name,
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: showOnlyForCompare,
		},
		options: [
			widthField,
			heightField,
			delayField,
			fullSizeField,
			hideCookieField,
			javascriptCodeField,
			hideField,
			languageField,
			imageUrlField,
		],
	};
}

export const compareDescription: INodeProperties[] = [
	{
		displayName: 'Before URL',
		name: 'beforeUrl',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'https://example.com/pricing',
		description: 'Address of the "before" page',
		displayOptions: {
			show: showOnlyForCompare,
		},
	},
	sourceOptionsField('Before Options', 'beforeOptions'),
	{
		displayName: 'After URL',
		name: 'afterUrl',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'https://staging.example.com/pricing',
		description: 'Address of the "after" page',
		displayOptions: {
			show: showOnlyForCompare,
		},
	},
	sourceOptionsField('After Options', 'afterOptions'),
	{
		displayName: 'Threshold',
		name: 'threshold',
		type: 'number',
		typeOptions: {
			minValue: 0,
			maxValue: 1,
			numberPrecision: 2,
		},
		default: 0.1,
		description: 'Mismatch ratio (0-1) above which pixels are considered different',
		displayOptions: {
			show: showOnlyForCompare,
		},
	},
];
