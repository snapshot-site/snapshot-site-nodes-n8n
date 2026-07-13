import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

export const FULL_FORMAT_OPTIONS: INodePropertyOptions[] = [
	{ name: 'PNG', value: 'png' },
	{ name: 'JPEG', value: 'jpeg' },
	{ name: 'JPG', value: 'jpg' },
	{ name: 'WebP', value: 'webp' },
	{ name: 'PDF', value: 'pdf' },
	{ name: 'Base64', value: 'base64' },
	{ name: 'HTML', value: 'html' },
];

export const ANALYZE_FORMAT_OPTIONS: INodePropertyOptions[] = FULL_FORMAT_OPTIONS.filter(
	(option) => option.value !== 'jpg' && option.value !== 'base64',
);

export function formatField(options: INodePropertyOptions[]): INodeProperties {
	return {
		displayName: 'Format',
		name: 'format',
		type: 'options',
		options,
		default: 'png',
		description: 'Output format of the capture',
	};
}

export const widthField: INodeProperties = {
	displayName: 'Width',
	name: 'width',
	type: 'number',
	default: 1440,
	description: 'Viewport width in pixels',
};

export const heightField: INodeProperties = {
	displayName: 'Height',
	name: 'height',
	type: 'number',
	default: 900,
	description: 'Viewport height in pixels. Ignored when Full Page is enabled.',
};

export const delayField: INodeProperties = {
	// The generic title-case rule would force "Delay (Ms)", but the SI
	// abbreviation for milliseconds is always lowercase — this is the exact
	// casing n8n's manual reviewers requested.
	// eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
	displayName: 'Delay (ms)',
	name: 'delay',
	type: 'number',
	default: 0,
	description: 'Milliseconds to wait after the page loads before capturing',
};

export const fullSizeField: INodeProperties = {
	displayName: 'Full Page',
	name: 'fullSize',
	type: 'boolean',
	default: false,
	description: 'Whether to capture the full scrollable page instead of only the viewport',
};

export const hideCookieField: INodeProperties = {
	displayName: 'Hide Cookie Banner',
	name: 'hideCookie',
	type: 'boolean',
	default: false,
	description: 'Whether to automatically hide common cookie-consent banners before capturing',
};

export const javascriptCodeField: INodeProperties = {
	displayName: 'Custom JavaScript',
	name: 'javascriptCode',
	type: 'string',
	typeOptions: { rows: 5 },
	default: '',
	description: 'JavaScript to execute on the page before it is captured',
};

export const hideField: INodeProperties = {
	displayName: 'Hide Selector',
	name: 'hide',
	type: 'string',
	default: '',
	placeholder: 'e.g. .cookie-banner, #chat-widget',
	description: 'Comma-separated CSS selector(s) to hide before capturing',
};

export const languageField: INodeProperties = {
	displayName: 'Language',
	name: 'language',
	type: 'string',
	default: '',
	placeholder: 'e.g. en-US',
	description: 'Locale sent as the Accept-Language header when loading the page',
};

export const countryField: INodeProperties = {
	displayName: 'Country',
	name: 'country',
	type: 'string',
	default: '',
	placeholder: 'e.g. US',
	description: 'Country code used to geolocate the request when loading the page',
};

export const convertField: INodeProperties = {
	displayName: 'Convert',
	name: 'convert',
	type: 'boolean',
	default: false,
	description: 'Whether to convert the capture to the requested format server-side instead of returning it as-is',
};

/** Adds body routing to a field for use in fully declarative (non-preSend) operations. */
export function routeToBody(field: INodeProperties): INodeProperties {
	return {
		...field,
		routing: {
			send: {
				type: 'body',
				property: field.name,
			},
		},
	};
}
